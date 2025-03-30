"use client";

import { GenerateFormPreview } from "@/components/form-builder/canvas/generate-form-preview";
import { Card, CardContent } from "@/components/ui/card";
export default function CanvasPreviewPage() {
  return (
    <Card className="mt-6">
      <CardContent>
        <GenerateFormPreview />
      </CardContent>
    </Card>
  );
}
