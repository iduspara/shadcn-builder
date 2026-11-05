import { FolderOpen, Loader2 } from "lucide-react";

export function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString();
}

export function DialogListLoading({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="h-6 w-6 animate-spin" />
      <span className="ml-2">{label}</span>
    </div>
  );
}

export function DialogListEmpty({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="text-center py-8 text-muted-foreground">
      <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
      <p>{title}</p>
      {hint && <p className="text-sm">{hint}</p>}
    </div>
  );
}
