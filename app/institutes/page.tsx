// app/institute/page.tsx

import { getInstitutes } from "@/app/actions/functions";
import BadgeLink from "@/components/sections/BadgeLink";
import InstitutesComponent from "@/components/sections/InstitutesComponent";
import Jumbotron from "@/components/sections/Jumbotron";

export const dynamic = "force-dynamic";

export default async function InstitutesPage() {
  // Fetch institutes data server-side
  const institutes = await getInstitutes();

  return (
    <div>
      <Jumbotron height="md:h-[350px]" />
      <div className="container mx-auto py-4 sm:py-8">
        <div className="space-y-3  mb-10">
          <div>
            <BadgeLink
              href="#"
              badge={"COSTRAD & Institutes"}
              label={"Discover Transformational Leadership"}
            />
          </div>

          <h1 className="text-2xl sm:text-3xl max-w-4xl">
            We Train Tomorrow’s Leaders Today
          </h1>
          <p className="lg:text-xl m max-w-4xl text-foreground">
            At the heart of COSTRAD is a commitment to nurturing authentic
            leaders who possess not only strategic acumen but also the moral
            conviction to serve with integrity.
          </p>
        </div>

        <InstitutesComponent initialInstitutes={institutes} />
      </div>
    </div>
  );
}
