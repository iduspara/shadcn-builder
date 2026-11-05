import { SubscriptionInfo, DEFAULT_HISTORY_SIZE } from '@/types/subscription.types';
import { getRemainingHistorySlots } from './subscription';

/**
 * Get the appropriate history size based on subscription information
 */
export function getHistorySize(subscriptionInfo: SubscriptionInfo): number {
  if (subscriptionInfo.isUnlimited) {
    return Number.MAX_SAFE_INTEGER;
  }
  return subscriptionInfo.historySize;
}

/**
 * Check if a new snapshot can be saved based on subscription limits
 */
export function canSaveSnapshot(currentHistorySize: number, subscriptionInfo: SubscriptionInfo): boolean {
  if (subscriptionInfo.isUnlimited) {
    return true;
  }
  return currentHistorySize < subscriptionInfo.historySize;
}

/**
 * Get history limit information for display purposes
 */
export function getHistoryLimitInfo(subscriptionInfo: SubscriptionInfo) {
  return {
    maxSize: subscriptionInfo.isUnlimited ? 'Unlimited' : subscriptionInfo.historySize.toString(),
    isUnlimited: subscriptionInfo.isUnlimited,
    tier: subscriptionInfo.tier
  };
}

/**
 * Format history usage for display
 */
export function formatHistoryUsage(currentSize: number, subscriptionInfo: SubscriptionInfo): string {
  return `${currentSize}/${subscriptionInfo.historySize}`;
}

/**
 * Get a warning message when approaching history limit
 */
export function getHistoryLimitWarning(currentSize: number, subscriptionInfo: SubscriptionInfo): string | null {
  if (subscriptionInfo.isUnlimited) {
    return null;
  }
  
  const remaining = getRemainingHistorySlots(currentSize, subscriptionInfo);
  
  if (remaining === 0) {
    return `You've reached your history limit (${subscriptionInfo.historySize}). Upgrade to ${subscriptionInfo.tier === 'free' ? 'Advanced' : 'Pro'} for more history.`;
  }
  
  if (remaining <= 2) {
    return `Only ${remaining} history slot${remaining === 1 ? '' : 's'} remaining. Consider upgrading your plan.`;
  }
  
  return null;
}
