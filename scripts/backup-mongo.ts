#!/usr/bin/env bun

// scripts/backup-mongo.ts
//
// Beginner-friendly overview:
//   This script takes a "snapshot" of a MongoDB database by reading every
//   document from every collection and writing each collection to its own
//   .json file under ./backups/<today's UTC date>/. Think of it as a
//   no-frills pg_dump but for MongoDB, written in TypeScript.
//
//   Running it:    bun run backup
//   Output:        ./backups/2026-06-06/users.json
//                  ./backups/2026-06-06/registrations.json
//                  ./backups/2026-06-06/editions.json
//                  ... (one file per collection)
//
//   Safety:        This script is strictly read-only. It never writes to
//                  the database, never updates documents, never deletes
//                  anything, and never drops collections or indexes. It
//                  connects with readPreference=secondary so a read-heavy
//                  backup does not add load to the primary write node.

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
// `node:fs/promises` is the modern, promise-based version of Node's
// filesystem API. We use `mkdir` to create the output directory and
// `writeFile` to save each collection's JSON.
import { mkdir, writeFile } from "node:fs/promises";

// `node:path` gives us OS-independent path helpers. `join` stitches path
// segments together with the right separator ("/" on Linux/macOS, "\" on
// Windows). `resolve` turns a relative path into an absolute one by
// prepending the current working directory.
import { join, resolve } from "node:path";

// The official MongoDB driver. `MongoClient` opens a connection,
// `ReadPreference` is the enum we use to ask for secondaries, and the
// `Document` type is a generic record that represents a single row
// ("document" is MongoDB's term for a row).
import { type Document, MongoClient, ReadPreference } from "mongodb";

// ---------------------------------------------------------------------------
// Step 1: Pull the connection string from the environment
// ---------------------------------------------------------------------------
// `process.env` is an object Node.js fills in from the shell. If you ran
// `bun run backup` after `export DATABASE_URL=mongodb+srv://...`, the value
// lives there. We refuse to run without it, because connecting to the
// wrong database by accident would be a real disaster.
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
	console.error("[ERROR] DATABASE_URL is not set");
	// Exit with code 1 (a "failure" code) so shell scripts and CI pipelines
	// can detect that something went wrong. Exit code 0 means success.
	process.exit(1);
}

// ---------------------------------------------------------------------------
// Step 2: Compute the output directory for today's snapshot
// ---------------------------------------------------------------------------
// `new Date().toISOString()` returns something like
//   "2026-06-06T10:00:00.000Z"
// Slicing the first 10 characters gives us the date portion only:
//   "2026-06-06"
// Using UTC ("Z" at the end) means the folder name is the same regardless
// of where the script runs in the world, which makes it easy to share
// snapshots between machines.
const today = new Date().toISOString().slice(0, 10);

// Build an absolute path to ./backups/<today>/. `resolve` takes the
// current working directory (process.cwd()) and appends the segments,
// producing e.g. "/home/user/project/backups/2026-06-06".
const outDir = resolve(process.cwd(), "backups", today);

// ---------------------------------------------------------------------------
// Step 3: Open a MongoDB connection
// ---------------------------------------------------------------------------
// `MongoClient` is a heavy object — creating one is expensive. We make a
// single client and reuse it for every query below. The connection is not
// actually opened until we call `client.connect()` in main().
//
// `readPreference: ReadPreference.SECONDARY` tells the driver "if a
// replica set has secondaries, route my reads there". On a production
// cluster with primary + secondaries this keeps the primary (which is
// busy serving writes) from having to also serve our big backup reads.
// On a small/free Atlas tier with no secondaries, MongoDB silently falls
// back to the primary — either way the script still works.
const client = new MongoClient(DATABASE_URL, {
	readPreference: ReadPreference.SECONDARY,
});

// ---------------------------------------------------------------------------
// Step 4: Define a small helper for serialising BSON ObjectIds
// ---------------------------------------------------------------------------
// JSON.stringify turns most JavaScript values into JSON. It natively knows
// how to handle strings, numbers, booleans, arrays, plain objects, and
// `null`. It also turns `Date` into an ISO string by default. What it
// cannot do natively is serialise MongoDB's `ObjectId` (a 12-byte binary
// type used as the default `_id` for every document).
//
// JSON.stringify accepts an optional second argument: a "reviver"
// function. For every key/value pair in the object, the reviver is called
// AFTER the value is otherwise serialised. If we detect an ObjectId we
// convert it to its 24-character hex string ("507f1f77bcf86cd799439011"),
// which JSON can represent and which is still useful in a backup file.
//
// Signature note: the first parameter is the property key (e.g. "_id"),
// the second is the value. We don't use the key, so we prefix it with
// an underscore to signal that to readers and to Biome's linter.
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

// ---------------------------------------------------------------------------
// Step 5: Walk every collection and dump it
// ---------------------------------------------------------------------------
// We wrap the work in an `async` function so we can use `await`
// everywhere. The function is typed as `Promise<void>` because it does
// not return a value to its caller — it just performs side effects
// (writing files to disk) and prints status to stdout.
async function main(): Promise<void> {
	// Make sure the output directory exists. `recursive: true` means
	// "create the directory and any missing parents, and don't error if
	// it already exists". So calling this on a second run for the same
	// day is a no-op.
	await mkdir(outDir, { recursive: true });

	console.log("[INFO] Connecting to MongoDB (readPreference: secondary)...");

	// Open the actual TCP connection. Until this line runs, `client` is
	// just an unopened client object.
	await client.connect();

	// `client.db()` with no argument returns the default database — the
	// one specified in the connection string after the host. For our URL
	// (`...mongodb.net/costradUsers?...`) that is `costradUsers`.
	const db = client.db();

	// `listCollections()` returns a cursor over metadata for each
	// collection. `.toArray()` drains the cursor into a regular array of
	// `{ name: "users", type: "collection", ... }` records. We only
	// actually need the `name`, so we extract that in the loop below.
	const collections = await db.listCollections().toArray();
	if (collections.length === 0) {
		console.warn("[WARN] No collections found in database");
	}

	let totalDocs = 0;
	// `for ... of` is the standard way to iterate an array. For each
	// collection metadata record we:
	//   1. Open a cursor over every document in that collection
	//   2. Push each document into a `Document[]` array
	//   3. Write the array to ./backups/<date>/<name>.json
	for (const meta of collections) {
		const name = meta.name;

		// We could have written `find({}).toArray()` in one go, but that
		// would load the entire collection into memory. For collections
		// with millions of documents that could exhaust RAM. Instead we
		// use a cursor and `for await (...)` to pull documents one at a
		// time. For typical app-sized collections (a few thousand docs)
		// the difference is negligible; for huge ones it is the difference
		// between working and crashing.
		const docs: Document[] = [];
		for await (const doc of db.collection(name).find({})) {
			docs.push(doc);
		}

		// Build the path: ./backups/2026-06-06/users.json
		const file = join(outDir, `${name}.json`);

		// JSON.stringify with our `serialise` reviver as the second arg
		// and 2 as the third arg (for pretty-printed, 2-space-indent
		// output). The result is a string we hand to writeFile.
		await writeFile(file, JSON.stringify(docs, serialise, 2), "utf8");

		console.log(`[INFO] ${name}: ${docs.length} docs -> ${file}`);
		totalDocs += docs.length;
	}

	console.log(
		`[INFO] Backup complete. ${totalDocs} documents across ${collections.length} collections.`,
	);
	console.log(`[INFO] Output: ${outDir}`);
}

// ---------------------------------------------------------------------------
// Step 6: Run main(), catch any error, and always close the connection
// ---------------------------------------------------------------------------
// Calling `main()` kicks off the async work above. `.catch` is invoked
// if any line in main throws (network drops, auth fails, disk full, etc.).
// `.finally` is invoked whether the script succeeded or failed, and is
// the right place to clean up resources like the Mongo connection.
main()
	.catch((error: unknown) => {
		// Project convention from AGENTS.md: log with the [ERROR] prefix
		// and stringify defensively, because a thrown value is not always
		// a real Error instance (it could be a string, a number, etc.).
		const message = error instanceof Error ? error.toString() : String(error);
		console.error(`[ERROR] Backup failed: ${message}`);
		process.exit(1);
	})
	.finally(async () => {
		// Close the Mongo connection. The inner `.catch(() => {})` swallows
		// any error from close itself — if the connection is already
		// broken, there is nothing useful to do with that error, and we
		// don't want it to mask the original failure that triggered this
		// finally block.
		await client.close().catch(() => {});
	});
