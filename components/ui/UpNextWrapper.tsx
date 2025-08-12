// components/ui/UpNextWrapper.tsx
import Link from "next/link";
import { prisma } from "@/prisma/dbConnect"; // adjust import to your setup
import { Edition } from "@prisma/client";

type NextEdition = {
  title: string;
  slug: string;
  startDate: Date | null;
  endDate: Date | null;
};

interface UpNextWrapperProps {
  instituteId?: string;
}

export default async function UpNextWrapper({
  instituteId,
}: UpNextWrapperProps) {
  const now = new Date();
  const nextEdition: NextEdition | null = await prisma.edition.findFirst({
    where: {
      startDate: { gt: now },
      ...(instituteId && { instituteId }),
    },
    orderBy: { startDate: "asc" },
    select: {
      title: true,
      slug: true,
      startDate: true,
      endDate: true,
    },
  });

  // If no upcoming edition, render nothing
  if (!nextEdition) return null;

  return (
    <div className="bg-linear-to-r from-primary to-primary/90">
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="py-0.5 flex flex-wrap justify-center items-center gap-1.5">
          <p className="me-2 inline-block text-[14px] text-white capitalize">
            <span className="font-bold uppercase">UpNext:</span>
            &nbsp; <span className="font-mono">{nextEdition.title}</span>
            &nbsp;|&nbsp;
            <span className="font-mono uppercase">
              {nextEdition.startDate
                ? nextEdition.startDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : ""}{" "}
              &mdash;{" "}
              {nextEdition.endDate
                ? nextEdition.endDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""}{" "}
            </span>
          </p>
          <div className="flex justify-center md:justify-start items-center gap-x-2.5">
            <Link
              className="py-1.5 px-3.5 inline-flex justify-center items-center gap-x-1  bg-white/10 text-xs font-semibold text-white hover:bg-white/20 focus:outline-hidden focus:bg-white/20 rounded-full "
              href={`/apply`}
            >
              Apply Now
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
