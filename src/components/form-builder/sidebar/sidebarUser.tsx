"use client";

import { BadgeCheck, ChevronsUpDown, CreditCard, LogOut } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

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
import { PlanBadge } from "@/components/form-builder/ui/plan-badge";

type AuthUser = ReturnType<typeof useAuthState>["user"];

function UserSummary({ user }: { user: AuthUser }) {
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={user?.imageUrl || undefined} alt={user?.username || undefined} />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user?.username}</span>
        <span className="truncate text-xs">{user?.emailAddresses[0]?.emailAddress}</span>
      </div>
      <ChevronsUpDown className="ml-auto size-4" />
    </>
  );
}

export function SidebarUser() {
  const { isMobile } = useSidebar();
  const { user, subscriptionInfo } = useAuthState();
  const { signOut, openUserProfile } = useClerk();
  const [isLoading, setIsLoading] = useState(false);

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

  // Account and billing are both managed in the Clerk user profile
  const handleOpenProfile = () => openUserProfile();

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
            <UserSummary user={user} />
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
                    <PlanBadge tier={subscriptionInfo?.tier} />
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
              <DropdownMenuItem onClick={handleOpenProfile}>
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
