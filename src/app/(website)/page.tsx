"use client";

import Hero from "@/components/landingpage/hero";
import CupertinoUIBanner from "@/components/landingpage/cupertino-ui-banner";
import FeatureSteps from "@/components/landingpage/featureSteps";
import Templates from "@/components/landingpage/templates";
import TestimonialsCarousel from "@/components/landingpage/testimonials";

export default function FormBuilderPage() {
  return (
    <>
      <div className="flex w-full flex-col gap-8">
        <CupertinoUIBanner />
        <Hero />
      </div>
      <FeatureSteps />
      <Templates />
      <TestimonialsCarousel />
    </>
  );
}
