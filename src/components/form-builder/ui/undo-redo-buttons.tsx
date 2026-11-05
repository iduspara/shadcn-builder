import React from "react";
import { Button } from "@/components/ui/button";
import { Undo2, Redo2, Clock, Check, AlertTriangle } from "lucide-react";
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
import { formatDistanceToNow } from "date-fns";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlanBadge } from "./plan-badge";

type HistoryState = ReturnType<typeof useHistory>;

interface UndoRedoButtonsProps {
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
}

function HistoryUsage({ historyUsage, limitInfo, warningMessage }: Pick<HistoryState, "historyUsage" | "limitInfo" | "warningMessage">) {
  return (
    <>
      <div className="px-2 py-1.5 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Usage: {historyUsage}</span>
          <span>Limit: {limitInfo.maxSize}</span>
        </div>
      </div>

      {warningMessage && (
        <div className="px-2 py-1">
          <Alert className="py-2">
            <AlertTriangle className="h-3 w-3" />
            <AlertDescription className="text-xs">{warningMessage}</AlertDescription>
          </Alert>
        </div>
      )}

      <DropdownMenuSeparator />
    </>
  );
}

interface SnapshotItemProps {
  snapshot: HistoryState["snapshots"][number];
  number: number;
  isCurrent: boolean;
  onSelect: () => void;
}

function SnapshotItem({ snapshot, number, isCurrent, onSelect }: SnapshotItemProps) {
  return (
    <DropdownMenuItem
      onClick={onSelect}
      className={cn("flex items-center gap-2", isCurrent && "bg-accent")}
    >
      <div className="flex items-center justify-center w-4 h-4">
        {isCurrent && <Check className="h-3 w-3 text-primary" />}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <span className="text-sm">{snapshot.formTitle || "Untitled Form"}</span>
          <span className="text-xs opacity-70">#{number}</span>
        </div>
        <div className="flex items-center justify-between text-xs opacity-70">
          <span>{snapshot.components.length} components</span>
          <span>{formatDistanceToNow(new Date(snapshot.timestamp), { addSuffix: true })}</span>
        </div>
      </div>
    </DropdownMenuItem>
  );
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
  const history = useHistory();
  const { undo, redo, canUndo, canRedo, snapshots, jumpToSnapshot, currentIndex, subscriptionInfo } = history;
  const showLimits = subscriptionInfo?.tier !== "pro";

  return (
    <div className={cn("flex gap-1", className)}>
      <Button
        variant={variant}
        size={size}
        onClick={() => canUndo && undo()}
        disabled={!canUndo}
        className="flex items-center gap-1"
        title={canUndo ? "Undo last action" : "Nothing to undo"}
      >
        <Undo2 className="h-4 w-4" />
      </Button>

      <Button
        variant={variant}
        size={size}
        onClick={() => canRedo && redo()}
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
              {showLimits && <PlanBadge tier={subscriptionInfo?.tier} />}
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {showLimits && <HistoryUsage {...history} />}
          <ScrollArea className="h-[300px]">
            {snapshots.map((snapshot, index) => (
              <SnapshotItem
                key={snapshot.timestamp}
                snapshot={snapshot}
                number={snapshots.length - index}
                isCurrent={index === currentIndex}
                onSelect={() => jumpToSnapshot(index)}
              />
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
