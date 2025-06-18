// components/ui/InstituteCardWithImage.tsx
"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // updated path for ShadCN
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface InstituteCardProps {
  id: string;
  name: string;
  slug: string;
  overview?: string;
  banner: string;
  logo: string;
  editionTitle: string;
  editionDates: string; // e.g. "Mar 11 – Mar 16"
}

const defaultOverview = `The family as the basic unit of society has far reaching implications
          on individual bent and ultimately on national stability in all
          respects. Social sciences have lost the primacy of the family as the
          building block for life. The Family Development Institute (FDI) is
          dedicated to strengthening families through comprehensive programs on`;

export default function InstituteCardWithImage({
  id,
  name = `Family Development Institutte - (FDI)`,
  slug,
  overview = defaultOverview,
  banner = "/images/culture.jpg",
  logo = "/images/logos/fdi.png",
  editionTitle = `Family Development Institutte - (FDI)`,
  editionDates,
}: InstituteCardProps) {
  const router = useRouter();
  return (
    <Card
      className="w-full p-0 gap-2 dark:bg-gray-950 rounded-2xl
    flex flex-col justify-between "
    >
      <Image
        src={`/${banner}`}
        alt="Institute Banner"
        width={400}
        height={400}
        className="object-cover object-top rounded-t-2xl box-border aspect-square w-full p-1 cursor-pointer "
        style={{ aspectRatio: "3/2", objectFit: "cover" }}
        onClick={() => router.push(`/institutes/${slug}`)}
      />
      <CardHeader className="grid gap-1 p-1 space-y-2 pb-0">
        <CardTitle
          className="text-lg uppercase px-2  cursor-pointer"
          onClick={() => router.push(`/institutes/${slug}`)}
        >
          {name}
          <div className="mt-3 h-0.5 w-9 rounded-full bg-primary" />
        </CardTitle>
        <CardDescription className=" pb-4 px-2 ">
          <div className="line-clamp-3 overflow-hidden text-ellipsis text-foreground ">
            {overview}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-1 pt-0 space-y-2">
        <Button className="bg-lime-600 w-full pt-7 text-background hover:text-foreground  
        cursor-pointer hover:bg-lime-500 transition-colors p-2 rounded-lg text-center uppercase text-xs">
          Start Application
        </Button>
        <Link
          href={`/institutes/${slug}`}
          className="dark:bg-gray-900 bg-gray-200 flex items-center gap-3 md:p-2 p-2 rounded-xl w-auto"
        >
          <div>
            <Image
              className="w-15 md:w-20 md:h-20"
              src={logo}
              alt={`${slug} logo`}
              width={600}
              height={600}
            />
          </div>
          <div className="flex-1 flex justify-between items-center gap-2">
            <div>
              <p className="font-bold lg:text-sm">{editionTitle}</p>
              <p className="text-gray-500 dark:text-white text-sm">
                {editionDates}
              </p>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right-circle"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m10 8 4 4-4 4" />
              </svg>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
