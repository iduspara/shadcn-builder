import { SubscriptionTier, SubscriptionInfo, SUBSCRIPTION_LIMITS } from '@/types/subscription.types';

/**
 * Get subscription information from Clerk user metadata
 * This function checks the user's public metadata for subscription information
 */
export function getSubscriptionInfo(tier: SubscriptionTier): SubscriptionInfo {
  // Check if user has subscription metadata
  const subscriptionTier = tier;
  
  if (subscriptionTier && SUBSCRIPTION_LIMITS[subscriptionTier]) {
    return {
      tier: subscriptionTier,
      ...SUBSCRIPTION_LIMITS[subscriptionTier]
    };
  }
  
  // Default to free tier if no subscription info is found
  return {
    tier: 'free',
    ...SUBSCRIPTION_LIMITS.free
  };
}

/**
 * Get remaining history slots for a user
 */
export function getRemainingHistorySlots(currentHistorySize: number, subscriptionInfo: SubscriptionInfo): number {
  if (subscriptionInfo.isUnlimited) {
    return Number.MAX_SAFE_INTEGER;
  }
  return Math.max(0, subscriptionInfo.historySize - currentHistorySize);
}
