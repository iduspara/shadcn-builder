'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Rocket, Code, Paintbrush } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    step: 'Step 1',
    title: 'Start adding components to your form',
    content:
        'Create a new form or select one from the templates and add components to your form.',
    icon: <Rocket className="text-primary h-6 w-6" />,
    image:
      '/images/features/drag_and_drop.png',
  },
  {
    step: 'Step 2',
    title: 'Customize your form',
    content:
      'Customize your form and make it your own.',
    icon: <Paintbrush className="text-primary h-6 w-6" />,
    image:
      '/images/features/customize.png',
  },
  {
    step: 'Step 3',
    title: 'Export the code',
    content:
      'Export the code for your form and use it in your project.',
    icon: <Code className="text-primary h-6 w-6" />,
    image:
      '/images/features/code.png',
  },
];

export default function FeatureSteps() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (4000 / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <section className={'max-w-8xl mx-auto p-8 md:p-12'}>
      <div className="mx-auto w-full">
        <div className="relative mx-auto mb-12 max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h2 className="font-geist text-3xl font-medium tracking-tighter md:text-4xl lg:text-5xl">
              Build Forms in Three Steps
            </h2>
            <p className="font-geist text-foreground/60 mt-3">
              Shadcn Builder helps you create, customize, and generate your forms
              faster than ever before.
            </p>
          </div>

        </div>
        <hr className="bg-foreground/30 mx-auto mb-10 h-px w-1/2" />

        <div className="flex flex-col items-center gap-6 md:grid md:grid-cols-2 md:gap-10">
          <div className="order-2 space-y-8 md:order-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.5, x: -20 }}
                animate={{
                  opacity: index === currentFeature ? 1 : 0.5,
                  x: 0,
                  scale: index === currentFeature ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border-1 md:h-14 md:w-14',
                    index === currentFeature
                      ? 'border-primary bg-black text-white scale-110 '
                      : 'border-black',
                  )}
                >
                  {index + 1}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold md:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              'border-primary/20 relative order-1 h-[200px] overflow-hidden rounded-xl border w-full bg-dotted  md:order-2 md:h-[300px] lg:h-[400px]',
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 overflow-hidden rounded-lg"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full transform object-cover transition-transform hover:scale-105"
                        width={1000}
                        height={500}
                      />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
