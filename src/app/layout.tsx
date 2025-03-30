import "./globals.css";
import { cn } from "@/lib/utils";
import { fontVariables } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/react";
import { PostHogProvider } from "@/providers/PostHogProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Shadcn Builder - Create Beautiful Forms",
    template: "%s | Shadcn Builder",
  },
  description: "Create beautiful, responsive forms with our easy-to-use form builder and generate React code using shadcn/ui components.",
  keywords: ["form builder", "online forms", "form creator", "web forms", "form designer", "form templates", "shadcn/ui", "react components", "react form builder", "shadcn form builder", "shadcn builder", "shadcn builder form", "shadcn builder form builder", "shadcn builder form templates", "shadcn builder form designer", "shadcn builder form creator", "shadcn builder form templates", "shadcn builder form designer", "shadcn builder form creator"],
  authors: [{ name: "Igor Duspara" }],
  creator: "Igor Duspara",
  publisher: "Shadcn Builder",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL('https://www.shadcn-builder.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.shadcn-builder.com",
    siteName: "Shadcn Builder",
    title: "Shadcn Builder - Create Beautiful Forms",
    description: "Create beautiful, responsive forms with our easy-to-use form builder and generate React code using shadcn/ui components.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shadcn Builder Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(fontVariables)}>
        <PostHogProvider>
          {children}
          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  );
}
