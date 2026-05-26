import { DataTable } from "@/components/ui/data-table/data-table";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { IconFolder } from "@tabler/icons-react";
import data from "./institute_mongo.json";

export default function Page() {
  return (
    <AdminPageWrapper
      icon={IconFolder}
      title="Publications"
      description="Manage institute publications and documentation."
      stats={[
        { label: "Total", value: data.length, variant: "default" },
      ]}
    >
      <DataTable
        data={data.map((item, idx) => ({
          header: item.name,
          id: idx,
          type: item.acronym || "",
          status: item.active ? "Active" : "Inactive",
          target: item.slug || "",
          limit: item.seo || "",
          reviewer: item.updated_at || "",
        }))}
      />
    </AdminPageWrapper>
  );
}