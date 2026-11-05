import { ArrowRight } from "lucide-react";

const CUPERTINO_UI_URL =
  "https://www.cupertino-ui.com/?utm_source=shadcn-builder&utm_medium=banner&utm_campaign=homepage";

function CupertinoLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="4" width="28" height="24" rx="7" fill="#1d1d1f" />
      <circle cx="9" cy="11" r="2.1" fill="#ff5f57" />
      <circle cx="15" cy="11" r="2.1" fill="#febc2e" />
      <circle cx="21" cy="11" r="2.1" fill="#28c840" />
    </svg>
  );
}

export default function CupertinoUIBanner() {
  return (
    <section className="relative max-w-8xl mx-auto w-full px-6">
      <a
        id="cupertino-ui-banner-cta"
        href={CUPERTINO_UI_URL}
        target="_blank"
        rel="noopener"
        className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border bg-gradient-to-r from-slate-50 via-white to-sky-50 p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between md:px-6"
      >
        <div className="flex items-center gap-4">
          <CupertinoLogo className="size-11 shrink-0 drop-shadow-sm" />
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">CupertinoUI</span>
              <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700">
                New
              </span>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              macOS 27 components for shadcn/ui. Liquid Glass toolbars,
              sidebars, menus and windows, installed with the shadcn CLI.
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#1d1d1f] px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-black">
          Explore CupertinoUI
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </a>
    </section>
  );
}
