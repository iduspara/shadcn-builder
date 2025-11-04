"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, BlocksIcon, ExternalLink, Menu, User, LogOut } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { SiBuymeacoffee } from "@icons-pack/react-simple-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import Logo from "./logo";
import { Authenticated, Unauthenticated } from "convex/react";
import { FaGithub } from "react-icons/fa6";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/components", label: "Components" },
    { href: "/templates", label: "Templates" },
    { href: "/changelog", label: "Changelog" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
  ];

  return (
    <div
      className={cn(
        "fixed top-0 w-full flex flex-row gap-2 justify-between bg-white border-b z-30"
      )}
    >
      <div className="flex flex-row gap-2 justify-between w-full max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-row gap-2 items-center justify-start md:justify-start p-2 px-4 w-full md:w-[300px]"
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center lg:justify-end">
          {navigationLinks.map((link) => (
            <Button asChild key={link.href} variant="ghost">
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            </Button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 px-4">
                <div className="flex flex-col gap-4">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium hover:underline"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <a
                    href="https://buymeacoffee.com/igorduspara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        className: "w-full justify-center",
                      })
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <SiBuymeacoffee className="size-4" />
                    Buy Me A Coffee
                  </a>
                  <a
                    href="https://github.com/iduspara/shadcn-builder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        className: "w-full justify-center",
                      })
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <FaGithub className="size-4" />
                    GitHub
                  </a>
                  <a
                    href="/builder"
                    className={cn(
                      buttonVariants({
                        variant: "default",
                        className: "w-full",
                      })
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    Open Builder <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop CTA Button & Auth */}
        <div className="hidden md:flex flex-row gap-2 py-2 pr-4 items-center justify-end">
        <a
            href="https://buymeacoffee.com/igorduspara"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "rounded-full",
                size: "icon",
              })
            )}
          >
            <SiBuymeacoffee className="size-4" />
          </a>
          <a
            href="https://github.com/iduspara/shadcn-builder"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "rounded-full mr-2",
                size: "icon",
              })
            )}
          >
            <FaGithub className="size-4" />
          </a>
        <a
            href="/builder"
            className={cn(
              buttonVariants({
                variant: "default",
                className: "rounded-full flex-1 w-[220px]",
              })
            )}
          >
            Open Builder <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
