import { getCurrentUser } from "@/app/actions/functions";
import { prisma } from "@/prisma/dbConnect";
import Image from "next/image";

export default async function RegistrationSection() {
  const user = await getCurrentUser();
  if (!user) {
    return <p className="text-red-500">You must be signed in.</p>;
  }

  const registrations = await prisma.registration.findMany({
    where: {
      userId: user.id,
    },
    include: {
      edition: {
        include: {
          institute: true,
        },
      },
    },
  });

  if (!registrations.length) {
    return <p>You haven’t registered for any edition yet.</p>;
  }

  return (
    <div className="space-y-4">
      {registrations.map((reg) => (
        <div key={reg.id} className="border p-4 rounded-xl shadow">
          <Image
            src={`/${reg.edition.institute.logo}` || "/images/costrad.png"}
            alt={reg.edition.institute.name}
            width={50}
            height={50}
            className=""
          />
          <h2 className="text-lg font-bold">{reg.edition.title}</h2>
          <p className="text-sm text-gray-600">
            Institute: {reg.edition.institute.name}
          </p>
          <p className="text-sm">
            Dates: {reg.edition.startDate?.toLocaleDateString()} -{" "}
            {reg.edition.endDate?.toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
