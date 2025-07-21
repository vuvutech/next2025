// app/api/users/[id]/admin/route.ts


import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  const { id } = await context.params
  const user = await getCurrentUser()

  // Only allow ADMIN or SUPERADMIN to update role
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { role } = await req.json()

  if (role !== "ADMIN" && role !== "USER") {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 })
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    })

    return NextResponse.json({ success: true, updatedUser })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 })
  }
}
