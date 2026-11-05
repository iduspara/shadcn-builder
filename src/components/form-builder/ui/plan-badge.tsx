import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubscriptionTier } from "@/types/subscription.types";

const TIER_BADGE_CLASSES: Record<SubscriptionTier, string> = {
  free: "bg-gray-100 text-gray-700",
  advanced: "bg-blue-100 text-blue-700",
  pro: "bg-yellow-100 text-yellow-700",
};

export function PlanBadge({ tier }: { tier?: SubscriptionTier }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      {tier === "pro" && <Crown className="h-3 w-3 text-yellow-500" />}
      <span className={cn("text-xs px-1.5 py-0.5 rounded", tier && TIER_BADGE_CLASSES[tier])}>
        {tier?.toUpperCase() || "FREE"}
      </span>
    </div>
  );
}
