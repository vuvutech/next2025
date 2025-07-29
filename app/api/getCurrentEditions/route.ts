// app/api/getCurrentEditions/route.ts
import { getCurrentEditions } from "@/app/actions/functions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const editions = await getCurrentEditions();
    return NextResponse.json(editions);
  } catch (error) {
    console.error("API: Failed to fetch editions", error);
    return NextResponse.json({ error: "Failed to load editions" }, { status: 500 });
  }
}
