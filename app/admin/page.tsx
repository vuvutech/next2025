// import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";

import { ActiveUsersCard } from "@/components/analytics/ActiveUsersCard";
import { SessionsCard } from "@/components/analytics/SessionsCard";
import { RegisteredUsersCard } from "@/components/analytics/RegisteredUsersCard";
import { MostPopularEditionCard } from "@/components/analytics/DashboardMetricsCards";
import { DevicesUsage } from "@/components/analytics/DevicesUsage";
import { GaTopPagesChartBar } from "@/components/chart-area-interactive";

export default function Page() {
  return (
    <div className="space-y-4">
      <section className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4   lg:grid-cols-4">
        <MostPopularEditionCard />
        <ActiveUsersCard />
        <SessionsCard />
        <RegisteredUsersCard />

      </section>
      {/* <SectionCards /> */}
      <section className="px-4 lg:px-6">
        {/* <ChartAreaInteractive /> */}

      <GaTopPagesChartBar />
        {/* <GaTopPagesChart /> */}
      </section>
      <section className="px-4 lg:px-6">
        {/* <ChartAreaInteractive /> */}

      
        <DevicesUsage />
      </section>

      {/* <PageTrendChart path="/about" /> */}
      {/* <DataTable data={data} /> */}
    </div>
  );
}
