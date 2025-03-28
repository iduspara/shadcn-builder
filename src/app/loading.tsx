import { Skeleton } from "@/components/ui/skeleton";

export default function FormBuilderLoading() {
  return (
    <div className="flex h-screen">
      <div className="w-64 border-r">
        <Skeleton className="h-full" />
      </div>
      <div className="flex-1 p-6">
        <Skeleton className="h-full" />
      </div>
      <div className="w-64 border-l">
        <Skeleton className="h-full" />
      </div>
    </div>
  );
} 
