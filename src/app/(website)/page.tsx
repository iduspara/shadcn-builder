"use client";

import Hero from "@/components/landingpage/hero";
import FeatureSteps from "@/components/landingpage/featureSteps";
import Templates from "@/components/landingpage/templates";
import TestimonialsCarousel from "@/components/landingpage/testimonials";

export default function FormBuilderPage() {
  return (
    <>
      <Hero />
      <FeatureSteps />
      <Templates />
      <TestimonialsCarousel />
    </>
  );
}
