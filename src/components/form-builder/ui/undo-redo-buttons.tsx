import React from "react";
import { Button } from "@/components/ui/button";
import {
  Undo2,
  Redo2,
  Ellipsis,
  Clock,
  Check,
  AlertTriangle,
  Crown,
} from "lucide-react";
import { useHistory } from "@/hooks/use-history";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate, formatDistanceToNow } from "date-fns";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UndoRedoButtonsProps {
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
}

/**
 * Undo/Redo buttons component for the form builder
 * Provides visual feedback for undo/redo state
 */
export const UndoRedoButtons: React.FC<UndoRedoButtonsProps> = ({
  className,
  size = "default",
  variant = "outline",
}) => {
  const {
    undo,
    redo,
    canUndo,
    canRedo,
    snapshots,
    jumpToSnapshot,
    currentIndex,
    subscriptionInfo,
    historyUsage,
    limitInfo,
    warningMessage,
  } = useHistory();

  const formatTimestamp = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };
  const handleUndo = () => {
    if (canUndo) {
      undo();
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      redo();
    }
  };

  const handleJumpToSnapshot = (index: number) => {
    jumpToSnapshot(index);
  };

  return (
    <div className={cn("flex gap-1", className)}>
      <Button
        variant={variant}
        size={size}
        onClick={handleUndo}
        disabled={!canUndo}
        className="flex items-center gap-1"
        title={canUndo ? "Undo last action" : "Nothing to undo"}
      >
        <Undo2 className="h-4 w-4" />
      </Button>

      <Button
        variant={variant}
        size={size}
        onClick={handleRedo}
        disabled={!canRedo}
        className="flex items-center gap-1"
        title={canRedo ? "Redo last undone action" : "Nothing to redo"}
      >
        <Redo2 className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={snapshots.length === 0}
          render={
            <Button
              variant={variant}
              size={size}
              className="flex items-center gap-1"
            />
          }
        >
          <Clock className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" className="w-80">
          <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              History
            </div>
            {subscriptionInfo?.tier !== "pro" && (
              <div className="flex items-center gap-1 text-xs">
                <span
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded",
                    subscriptionInfo?.tier === "free" &&
                      "bg-gray-100 text-gray-700",
                    subscriptionInfo?.tier === "advanced" &&
                      "bg-blue-100 text-blue-700"
                  )}
                >
                  {subscriptionInfo?.tier?.toUpperCase() || "FREE"}
                </span>
              </div>
            )}
          </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {subscriptionInfo?.tier !== "pro" && (
            <>
              {/* History usage info */}
              <div className="px-2 py-1.5 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Usage: {historyUsage}</span>
                  <span>Limit: {limitInfo.maxSize}</span>
                </div>
              </div>

              {/* Warning message */}
              {warningMessage && (
                <div className="px-2 py-1">
                  <Alert className="py-2">
                    <AlertTriangle className="h-3 w-3" />
                    <AlertDescription className="text-xs">
                      {warningMessage}
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <DropdownMenuSeparator />
            </>
          )}
          <ScrollArea className="h-[300px]">
            {snapshots.map((snapshot, index) => (
              <DropdownMenuItem
                key={snapshot.timestamp}
                onClick={() => handleJumpToSnapshot(index)}
                className={cn(
                  "flex items-center gap-2",
                  index === currentIndex && "bg-accent"
                )}
              >
                <div className="flex items-center justify-center w-4 h-4">
                  {index === currentIndex && (
                    <Check className="h-3 w-3 text-primary" />
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {snapshot.formTitle || "Untitled Form"}
                    </span>
                    <span className="text-xs opacity-70">
                      #{snapshots.length - index}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs opacity-70">
                    <span>{snapshot.components.length} components</span>
                    <span>{formatTimestamp(snapshot.timestamp)}</span>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
