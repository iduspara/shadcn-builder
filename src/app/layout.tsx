import "./globals.css";
import { cn } from "@/lib/utils";
import { fontVariables } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(fontVariables)}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
