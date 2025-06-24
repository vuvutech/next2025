import { getCurrentUser } from "@/app/actions/functions";
import { prisma } from "@/prisma/dbConnect";

export async function GET() {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return new Response(JSON.stringify({ message: "Profile not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log("GOTTEN PROFILE");
    return new Response(JSON.stringify(profile), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[PROFILE_ME_ERROR]", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
