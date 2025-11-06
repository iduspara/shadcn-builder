import { cn } from "@/lib/utils";
import {
  BlocksIcon,
  Coffee,
  CoffeeIcon,
  ExternalLink,
  Github,
  Heart,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "@/components/ui/badge";
import SocialLinks from "../form-builder/sidebar/socialLinks";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-8xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <BlocksIcon className="h-6 w-6" strokeWidth={2} />
              <span className="text-lg font-semibold">
                shadcn/ui <span className="font-normal">Builder</span>
                <sup className="text-xs text-muted-foreground font-normal ml-1">
                  Beta
                </sup>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Build beautiful, responsive forms with drag-and-drop simplicity.
              No coding required, just pure creativity.
            </p>
            <div className="flex flex-row gap-4 py-3 px-2">
              <SocialLinks />
            </div>
          </div>

          {/* Product Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/builder"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Form Builder
                </a>
              </li>
              <li>
                <Link
                  href="/template/business/job_application"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/components"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">
                  Tutorials <Badge variant="outline">Coming Soon</Badge>
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Community <Badge variant="outline">Coming Soon</Badge>
                </span>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:igor.duspara@iduspara.com?subject=shadcn/ui Builder"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Me
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/iduspara/shadcn-builder/issues"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Bug Reports
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="w-full flex items-center justify-center gap-1 text-sm text-muted-foreground flex-wrap">
          <span>Made with</span>
          <CoffeeIcon className="h-4 w-4 fill-current" />
          <span>by a developer who believes in simplicity</span>
        </div>
      </div>
    </footer>
  );
}
