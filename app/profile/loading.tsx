import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="container max-w-4xl py-12 space-y-12">
      <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-12">
        <Skeleton className="size-32 rounded-full shrink-0" />
        <div className="flex-1 space-y-4 w-full">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-11 w-full" />
          </div>
        ))}
      </div>
      
      <div className="flex justify-end pt-6">
        <Skeleton className="h-11 w-40" />
      </div>
    </div>
  );
}
