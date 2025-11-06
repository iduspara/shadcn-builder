"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLoadTemplates } from "@/hooks/useLoadTemplates";
import { Button } from "@/components/ui/button";

export default function Templates() {
  const [hovered, setHovered] = useState<number | null>(null);
  const {
    allTemplates,
    isLoading,
    error: loadError,
    retry,
    categoriesLoaded,
  } = useLoadTemplates();

  return (
    <section id="templates" className="max-w-8xl mx-auto relative w-full">
      <div className=" mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight">
            Over <span className="underline">100</span> pre-built Form templates
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            Showcasing form templates organized by category, built with
            shadcn/ui builder. Create your own form templates or use one of the
            templates below.
          </p>
        </div>
      </div>
      <div className="mx-auto px-4 py-20 md:px-6">
        <div className="relative">
          <div className="columns-1 gap-4 space-y-4 transition-all sm:columns-2 md:columns-3 lg:columns-4">
            {allTemplates["business"]?.map((template, index) => (
              <motion.div
                key={template.formId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="group relative overflow-hidden border rounded-2xl  transition-all duration-300 ease-in-out pl-6 pt-6 bg-dotted"
              >
                <a href={`/builder?template=${template.category}&key=${template.formId}`} className="block rounded-tl-xl rounded-br-xl border pt-6 pl-6 shadow-sm bg-white">
                  <motion.img
                    src={template.image}
                    alt={`${template.formTitle}`}
                    className={`w-full rounded-lg object-none object-top-left transition-all duration-300 ease-in-out ${
                      hovered === null
                        ? "blur-0 scale-100"
                        : hovered === index
                          ? "blur-0 scale-105"
                          : "blur-xs"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  />
                </a>
              </motion.div>
            ))}
          </div>
          
          {/* White to transparent gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
        
        {/* View All Templates Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/template/business/job_application">
              View All Templates
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
