"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Crown,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Protect, SignedIn, useClerk, useUser } from "@clerk/nextjs";
import { CheckoutButton, PlanDetailsButton } from "@clerk/nextjs/experimental";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthState } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export function SidebarUser() {
  const { isMobile } = useSidebar();
  const { user } = useAuthState();
  const { signOut, openUserProfile } = useClerk();
  const [isLoading, setIsLoading] = useState(false);
  const { subscriptionInfo } = useAuthState();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenProfile = () => {
    openUserProfile();
  };

  const handleOpenBilling = () => {
    // For billing, we'll redirect to the user profile where billing can be managed
    openUserProfile();
  };

  const handleOpenNotifications = () => {
    // Clerk doesn't have a direct notifications portal, but we can redirect to account settings
    openUserProfile();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
              />
            }
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={user?.imageUrl || undefined}
                alt={user?.username || undefined}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.username}</span>
              <span className="truncate text-xs">
                {user?.emailAddresses[0]?.emailAddress}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--anchor-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="flex items-center gap-2 justify-between w-full">
                    <span className="font-medium">Current Plan:</span>
                    <div className="flex items-center gap-1 text-xs">
                      {subscriptionInfo?.tier === "pro" && (
                        <Crown className="h-3 w-3 text-yellow-500" />
                      )}
                      <span
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded",
                          subscriptionInfo?.tier === "free" &&
                            "bg-gray-100 text-gray-700",
                          subscriptionInfo?.tier === "advanced" &&
                            "bg-blue-100 text-blue-700",
                          subscriptionInfo?.tier === "pro" &&
                            "bg-yellow-100 text-yellow-700",
                        )}
                      >
                        {subscriptionInfo?.tier?.toUpperCase() || "FREE"}
                      </span>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleOpenProfile}>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleOpenBilling}>
                <CreditCard />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} disabled={isLoading}>
              <LogOut />
              {isLoading ? "Signing out..." : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
