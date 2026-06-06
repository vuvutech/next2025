#!/usr/bin/env bun

// scripts/backup-mongo.ts
//
// Read-only MongoDB dump. Walks every collection in the database referenced
// by DATABASE_URL and writes JSON snapshots to ./backups/<UTC-ISO-date>/.
//
// Safety: this script is strictly read-only. It only calls listCollections()
// and collection.find() cursors. It never writes, updates, deletes, drops,
// creates indexes, or runs aggregations with write stages. It opens the
// connection with readPreference=secondary so the primary write path is
// untouched.

import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { type Document, MongoClient, ReadPreference } from "mongodb";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
	console.error("[ERROR] DATABASE_URL is not set");
	process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const outDir = resolve(process.cwd(), "backups", today);

const client = new MongoClient(DATABASE_URL, {
	readPreference: ReadPreference.SECONDARY,
});

function serialise(_key: string, value: unknown): unknown {
	if (
		value !== null &&
		typeof value === "object" &&
		(value as { constructor?: { name: string } }).constructor?.name ===
			"ObjectId"
	) {
		return String(value);
	}
	return value;
}

async function main(): Promise<void> {
	await mkdir(outDir, { recursive: true });
	console.log("[INFO] Connecting to MongoDB (readPreference: secondary)...");
	await client.connect();

	const db = client.db();
	const collections = await db.listCollections().toArray();
	if (collections.length === 0) {
		console.warn("[WARN] No collections found in database");
	}

	let totalDocs = 0;
	for (const meta of collections) {
		const name = meta.name;
		const docs: Document[] = [];
		for await (const doc of db.collection(name).find({})) {
			docs.push(doc);
		}
		const file = join(outDir, `${name}.json`);
		await writeFile(file, JSON.stringify(docs, serialise, 2), "utf8");
		console.log(`[INFO] ${name}: ${docs.length} docs -> ${file}`);
		totalDocs += docs.length;
	}

	console.log(
		`[INFO] Backup complete. ${totalDocs} documents across ${collections.length} collections.`,
	);
	console.log(`[INFO] Output: ${outDir}`);
}

main()
	.catch((error: unknown) => {
		const message = error instanceof Error ? error.toString() : String(error);
		console.error(`[ERROR] Backup failed: ${message}`);
		process.exit(1);
	})
	.finally(async () => {
		await client.close().catch(() => {});
	});
