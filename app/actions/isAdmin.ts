// app/actions/isAdmin.ts
"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isAdmin = async (email: string) => {
  console.log(email);
  console.log("Checking if user exists");

  // Query for the user by email only (assuming email is unique)
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user?.role === "admin"; // Returns the user record or null if not found.
};
