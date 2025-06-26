// app/actions/isAdmin.ts
"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isAdmin = async (email: string) => {

  // Query for the user by email only (assuming email is unique)
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user?.role === "ADMIN"; 

};

export const isSuperAdmin = async (email: string) => {

  // Query for the user by email only (assuming email is unique)
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user?.role === "SUPERADMIN"; 

};
