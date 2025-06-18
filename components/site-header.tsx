import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { ThemeSwitch } from "./ui/theme-switch";

export function SiteHeader() {
  return (
    <header className=" h-(--header-height) shrink-0 items-center gap-2 flex border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <SidebarTrigger className="-ml-1" />
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 ">
        {/* <SidebarTrigger className="-ml-1" /> */}
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">
          College of Sustainable Transformation and Development
        </h1>
        <div className="ml-auto  items-center gap-2 hidden">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <Link
              href="/"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              <div className="flex items-center gap-4">
                <div className="pt-1"><ThemeSwitch /></div>
                <div>Back to Website</div>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
