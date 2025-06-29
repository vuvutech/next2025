import { NextRequest, NextResponse } from "next/server";
import { isEmailVerified } from "@/app/actions/functions"; // or wherever it's defined

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const verified = await isEmailVerified(email);
    return NextResponse.json({ verified });
  } catch (err) {
    console.error("Error verifying email:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
