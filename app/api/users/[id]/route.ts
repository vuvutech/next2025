// app/api/users/[id]/route.ts

import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // TODO: Replace this with your DB logic
  return NextResponse.json({
    id,
    name: "Test User",
    email: "test@example.com",
    role: "USER",
  });
}
