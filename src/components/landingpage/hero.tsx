"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="relative max-w-8xl mx-auto mt-4 px-6">
      <div className="relative overflow-hidden">
        <div className="relative flex flex-col items-start justify-start rounded-xl  max-md:text-center">
          <div
            className="animate-gradient-x absolute inset-0 top-32 z-0 hidden blur-2xl dark:block"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, white, transparent)",
              background:
                "repeating-linear-gradient(65deg, hsl(var(--primary)), hsl(var(--primary)/0.8) 12px, color-mix(in oklab, hsl(var(--primary)) 30%, transparent) 20px, transparent 200px)",
              backgroundSize: "200% 100%",
            }}
          />
          <div
            className="animate-gradient-x absolute inset-0 top-32 z-0 text-left blur-2xl dark:hidden"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, white, transparent)",
              background:
                "repeating-linear-gradient(65deg, hsl(var(--primary)/0.9), hsl(var(--primary)/0.7) 12px, color-mix(in oklab, hsl(var(--primary)) 30%, transparent) 20px, transparent 200px)",
              backgroundSize: "200% 100%",
            }}
          />
          <h1 className="mb-4 flex flex-wrap gap-2 text-3xl leading-tight font-medium md:text-5xl">
            Build Your Production ready forms with ease
          </h1>
          <p className="text-muted-foreground mb-8 text-left md:max-w-[80%] md:text-xl">
            Shadcn Builder is a powerful, no-code form builder for the shadcn/ui
            component library. It helps developers visually create beautiful,
            accessible forms and export clean, production-ready React + Tailwind
            CSS code in seconds.
          </p>
          <div className="mb-6 flex flex-wrap gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <svg
                className="text-primary h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>20+ Form Components</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="text-primary h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>100+ Pre-built Form Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="text-primary h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>Responsive Form Design</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="text-primary h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>Generated React Code</span>
            </div>
          </div>
          <div className="z-10 mt-2 inline-flex items-center justify-start gap-3">
            <a
              id="hero-start-builder-cta"
              href="/builder"
              className={cn(
                buttonVariants({
                  size: "lg",
                  className: "rounded-full",
                })
              )}
            >
              Start building for free <ArrowRight className="size-4" />
            </a>
            <a
              id="hero-github-cta"
              href="https://github.com/iduspara/shadcn-builder"
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "bg-background rounded-full",
                })
              )}
            >
              GitHub
              <FaGithub />
            </a>
          </div>
          <div className="mx-auto w-full mt-16 px-8 animate-in fade-in slide-in-from-bottom-12 z-10 duration-1000">
            <div className="relative isolate -mx-6 bg-white shadow-[0_0_0_1px_rgba(24,28,33,0.06),0_16px_36px_-6px_rgba(24,28,33,0.2),0_8px_16px_-3px_rgba(0,0,0,0.08)] sm:mx-0 sm:rounded-t-lg">
              <div className="relative z-10 flex gap-x-2 p-4 shadow-[0_1px_0.5px] shadow-black/7.5">
                <div className="size-2 flex-none rounded-full bg-gray-600/10 shadow-[0_0_2px_inset] shadow-black/15"></div>
                <div className="size-2 flex-none rounded-full bg-gray-600/10 shadow-[0_0_2px_inset] shadow-black/15"></div>
                <div className="size-2 flex-none rounded-full bg-gray-600/10 shadow-[0_0_2px_inset] shadow-black/15"></div>
              </div>
              <div className="absolute -inset-x-32 -bottom-3 -top-16 z-10 bg-gradient-to-t from-white from-10% to-75%"></div>
              <div className="relative">
              <Image
              src="/images/features/hero.png"
              alt="MVPBlocks component library preview"
              width={1000}
              height={1000}
              className="object-cover w-full h-full"
            />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
