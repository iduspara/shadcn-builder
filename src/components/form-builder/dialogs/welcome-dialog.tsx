"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  File,
  ChevronRight,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthState } from "@/hooks/use-auth";
import { useFormBuilderStore } from "@/stores/form-builder-store";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WelcomeDialog({ open, onOpenChange }: WelcomeDialogProps) {
  const { user } = useAuthState();
  const { updateFormTitle, saveSnapshot } = useFormBuilderStore();

  const handleStartFromScratch = () => {
    onOpenChange(false);
    updateFormTitle("Untitled Form");
    // Make the first snapshot
    saveSnapshot();
  };

  return (
    <Dialog
      open={open}
      disablePointerDismissal
      onOpenChange={(nextOpen, eventDetails) => {
        // The welcome dialog can only be closed through one of its actions
        if (!nextOpen && eventDetails.reason === "escape-key") return;
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent
        className="w-full lg:max-w-3xl overflow-y-auto pb-0"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            Welcome {user?.username}
          </DialogTitle>
          <DialogDescription className="text-base">
            Quick start by choosing a template or create a form from scratch
          </DialogDescription>
        </DialogHeader>

        <div className="pt-4 grid grid-cols-2 gap-4">
          {/* Start from scratch option */}
          <Card
            className="border-2 border-dashed shadow-none border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer group mb-6 flex flex-col items-center justify-center"
            onClick={handleStartFromScratch}
          >
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <File className="h-10 w-10" strokeWidth={1} />
              <div className="flex-1 text-center flex flex-col items-center gap-2">
                <CardTitle className="font-semibold text-lg">
                  Start with a blank form
                </CardTitle>
                <CardDescription>
                  Build your form from scratch with complete creative control
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card className=" border-muted-foreground/25 transition-colors group mb-6 shadow-none">
            <CardContent className="">
              <div className="flex flex-col items-center gap-4">
                <div className="flex-1 text-center flex flex-col items-center gap-2">
                  <CardTitle className="font-semibold text-lg">
                    Quick Start
                  </CardTitle>
                  <CardDescription>
                    Choose from common form types to get started quickly
                  </CardDescription>
                </div>

                <div className="space-y-3">
                  <a
                    href="/builder?template=business&key=job_application"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-between"
                    )}
                  >
                    <FileText className="h-4 w-4 mr-2" strokeWidth={1} />
                    <span className="flex-1 text-left">Job Application</span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </a>
                  <a
                    href="/builder?template=car-rental&key=vehicle_reservation"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-between"
                    )}
                  >
                    <FileText className="h-4 w-4 mr-2" strokeWidth={1} />
                    <span className="flex-1 text-left">
                      Vehicle Reservation
                    </span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </a>
                  <a
                    href="/builder?template=business&key=contact_form"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-between"
                    )}
                  >
                    <FileText className="h-4 w-4 mr-2" strokeWidth={1} />
                    <span className="flex-1 text-left">Contact Us</span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </a>
                  <a
                    href="/builder?template=user-account&key=profile_update"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-between"
                    )}
                  >
                    <FileText className="h-4 w-4 mr-2" strokeWidth={1} />
                    <span className="flex-1 text-left">Profile Update</span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
