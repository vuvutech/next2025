import { getCurrentUser } from "@/app/actions/functions";
import { prisma } from "@/prisma/dbConnect";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, CalendarDays, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

const getBadge = (status: string) => {
  switch (status) {
    case "upcoming":
      return (
        <Badge className="bg-blue-500 text-white flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          Upcoming
        </Badge>
      );
    case "ongoing":
      return (
        <Badge className="bg-green-600 text-white flex items-center gap-1">
          <CalendarDays className="w-3.5 h-3.5" />
          Ongoing
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-gray-400 text-white flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5" />
          Completed
        </Badge>
      );
    default:
      return null;
  }
};

export default async function RegistrationSection() {
  const user = await getCurrentUser();
  if (!user) {
    return <p className="text-red-500">You must be signed in.</p>;
  }

  const rawRegistrations = await prisma.registration.findMany({
    where: { userId: user.id },
    include: {
      edition: {
        include: { institute: true },
      },
    },
  });

  if (!rawRegistrations.length) {
    return (
      <Card>
        <CardContent>
          <p>
            You haven’t registered for any Institute Edition yet. Register at{" "}
            <Link className="text-primary" href="/institutes">
              Institutes
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  const today = new Date();

  const registrationsWithStatus = rawRegistrations.map((reg) => {
    const { startDate, endDate } = reg.edition;

    let status: "upcoming" | "ongoing" | "completed" = "ongoing";

    if (startDate && today < new Date(startDate)) {
      status = "upcoming";
    } else if (endDate && today > new Date(endDate)) {
      status = "completed";
    }

    return { ...reg, status };
  });

  // Sort: upcoming → ongoing → completed
  const statusPriority = { upcoming: 0, ongoing: 1, completed: 2 };
  const registrations = registrationsWithStatus.sort((a, b) => {
    const statusDiff = statusPriority[a.status] - statusPriority[b.status];
    if (statusDiff !== 0) return statusDiff;
    return (
      new Date(b.edition.startDate ?? 0).getTime() -
      new Date(a.edition.startDate ?? 0).getTime()
    );
  });

  const getCountdown = (startDate?: Date | null) => {
    if (!startDate) return null;
    const diff = new Date(startDate).getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `Starts in ${days} day${days > 1 ? "s" : ""}` : null;
  };

  const getBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500 text-white">Upcoming</Badge>;
      case "ongoing":
        return <Badge className="bg-green-500 text-white">Ongoing</Badge>;
      case "completed":
        return <Badge className="bg-gray-400 text-white">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {registrations.map((reg) => {
        const edition = reg.edition;
        const institute = edition.institute;
        const logoSrc = institute.logo
          ? `/${institute.logo}`
          : "/images/costrad.png";
        const countdown =
          reg.status === "upcoming" ? getCountdown(edition.startDate) : null;

        return (
          <div
            key={reg.id}
            className={`p-4 rounded-xl shadow flex items-start gap-4 border-0.5 ${
              reg.status === "completed"
                ? " text-gray-500 border"
                : "border-green-500 border bg-background text-gray-900"
            }`}
          >
            <Image
              src={logoSrc}
              alt={institute.name || "Institute Logo"}
              width={50}
              height={50}
              className="rounded-full"
              loading="lazy"
            />
            <div>
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold">{edition.title}</h2>
                {getBadge(reg.status)}
              </div>
              <p className="text-sm font-bold">{institute.name}</p>
              <p className="text-sm text-bold text-firefly">
                Dates:{" "}
                {edition.startDate
                  ? new Date(edition.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}{" "}
                -{" "}
                {edition.endDate
                  ? new Date(edition.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>

              {countdown && (
                <p className="text-xs mt-1 text-blue-600 font-semibold">
                  {countdown}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
