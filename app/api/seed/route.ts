// app/api/seed/route.ts
import { NextRequest, NextResponse } from "next/server";
import { seedCollection } from "@/lib/seedCollection";

export async function GET(req: NextRequest) {
  console.log("SEEDING ......");
  const AUTH_TOKEN = process.env.AUTH_TOKEN;
  const authHeader = req.headers.get("authorization");

  // Authorization check
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  if (token !== AUTH_TOKEN) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Extract collection name from query parameters
  const collectionName = req.nextUrl.searchParams.get("collection");
  if (!collectionName) {
    return NextResponse.json({ error: "Collection name is required" }, { status: 400 });
  }

  try {
    await seedCollection(collectionName);
    return NextResponse.json({ message: `✅ Seeding ${collectionName} complete.` });
  } catch (err: any) {
    console.error(`❌ Seeding error for ${collectionName}:`, err);
    return NextResponse.json(
      { error: `Failed to seed ${collectionName}`, details: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}