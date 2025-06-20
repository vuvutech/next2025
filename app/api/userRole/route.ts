import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Your Better Auth setup
import { prisma } from "@/prisma/dbConnect";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });


  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
console.log("Fetching user role for user ID.....................:", session.user.id); // Debug log
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
console.log("User role fetched successfully:", user.role); // Debug log
    return NextResponse.json({ role: user.role });
  } catch (err) {
    console.error("Error in userRole route:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
