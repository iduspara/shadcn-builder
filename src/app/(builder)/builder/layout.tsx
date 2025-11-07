"use client";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const currentTheme = useFormBuilderStore((state) => state.currentTheme);
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
      <style id="theme-style">{currentTheme}</style>
    </>
  );
}
