import { DataTable } from "@/components/data-table";

import data from "./institute_mongo.json";

export default function Page() {
  return (
    <div className="px-4 space-y-4">
      {/* Map your data to the expected shape for DataTable */}
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
    </div>
  );
}
