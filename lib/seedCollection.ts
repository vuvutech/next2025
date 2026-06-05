import fs from "node:fs";
import path from "node:path";
import { MongoClient, ObjectId } from "mongodb";

export async function seedCollection(collectionName: string) {
	const dataPath = path.join(
		process.cwd(),
		"data",
		`${collectionName}_mongo.json`,
	);

	if (!fs.existsSync(dataPath)) {
		throw new Error(`Data file for ${collectionName} not found.`);
	}

	const fileContent = fs.readFileSync(dataPath, "utf8");
	const data = JSON.parse(fileContent);

	const dateFields = ["startDate", "endDate", "createdAt", "updatedAt"];

	const documentsToInsert = (data as Array<{ [key: string]: any }>).map(
		(doc) => {
			// Convert _id to ObjectId
			if (doc._id?.$oid) {
				doc._id = new ObjectId(doc._id.$oid);
			}

			// Convert string dates to actual Date objects
			for (const field of dateFields) {
				if (doc[field]) {
					doc[field] = new Date(doc[field]);
				}
			}

			return doc;
		},
	);

	const client = new MongoClient(process.env.MONGODB_URI!);
	try {
		await client.connect();
		const db = client.db();
		const collection = db.collection(collectionName);

		const count = await collection.countDocuments();
		if (count === 0) {
			await collection.insertMany(documentsToInsert, {
				forceServerObjectId: false,
			});
			console.log(`${collectionName} seeded with preserved _id.`);
		} else {
			console.log(`${collectionName} already contains data.`);
		}
	} finally {
		await client.close();
	}
}
