import Header from "@/components/landingpage/header";
import {  Loader2 } from "lucide-react";

export default function FormBuilderLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Header />
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
