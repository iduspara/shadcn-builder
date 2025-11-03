"use client";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

export default function Notifications() {
  const formSchema = z.object({
    "text-0": z.string(),
    "radio-0": z.string(),
    "text-1": z.string(),
    "switch-0": z.boolean().default(false).optional(),
    "switch-1": z.boolean().default(false).optional(),
    "switch-2": z.boolean().default(false).optional(),
    "switch-3": z.boolean().default(false).optional(),
    "checkbox-0": z.boolean().default(false).optional(),
    "submit-button-0": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-0": "",
      "radio-0": "all",
      "text-1": "",
      "switch-0": true,
      "switch-1": false,
      "switch-2": false,
      "switch-3": true,
      "checkbox-0": false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={onReset}
      className="space-y-8 @container"
    >
      <div className="grid grid-cols-12 gap-4">
        <div key="text-0" id="text-0" className=" col-span-12 col-start-auto">
          <p className="leading-7 not-first:mt-6">
            <span className="text-lg font-semibold">Notifications</span>
            <br />
            <span className="text-sm text-muted-foreground">
              Configure how you receive notifications.
            </span>
          </p>
        </div>

        <Controller
          control={form.control}
          name="radio-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Notify me about...
              </FieldLabel>

              <RadioGroup
                key="radio-0"
                id="radio-0"
                className="w-full"
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
                <div
                  key="all"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
                >
                  <RadioGroupItem value="all" id="radio-0-all" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel htmlFor="radio-0-all" className="font-normal">
                      All new messages
                    </FieldLabel>
                  </div>
                </div>

                <div
                  key="direct"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
                >
                  <RadioGroupItem value="direct" id="radio-0-direct" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-0-direct"
                      className="font-normal"
                    >
                      Direct messages and mentions
                    </FieldLabel>
                  </div>
                </div>

                <div
                  key="none"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
                >
                  <RadioGroupItem value="none" id="radio-0-none" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel htmlFor="radio-0-none" className="font-normal">
                      Nothing
                    </FieldLabel>
                  </div>
                </div>
              </RadioGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div key="text-1" id="text-1" className=" col-span-12 col-start-auto">
          <p className="leading-7 not-first:mt-6">
            <span className="text-lg font-semibold">Email Notifications</span>
          </p>
        </div>

        <Controller
          control={form.control}
          name="switch-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">
                Communication emails
              </FieldLabel>

              <FieldLabel
                key="switch-0"
                className="rounded-md border p-4 space-x-2 w-full flex justify-between items-center has-[[data-state=checked]]:border-primary"
                htmlFor="switch-0"
              >
                <div className="grid gap-1.5 leading-none">
                  <FieldLabel>Communication emails</FieldLabel>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your account activity.
                  </p>
                </div>
                <Switch
                  id="switch-0"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FieldLabel>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="switch-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">
                Marketing emails
              </FieldLabel>

              <FieldLabel
                key="switch-1"
                className="rounded-md border p-4 space-x-2 w-full flex justify-between items-center has-[[data-state=checked]]:border-primary"
                htmlFor="switch-1"
              >
                <div className="grid gap-1.5 leading-none">
                  <FieldLabel>Marketing emails</FieldLabel>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new products, features, and more.
                  </p>
                </div>
                <Switch
                  id="switch-1"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FieldLabel>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="switch-2"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">Social Emails</FieldLabel>

              <FieldLabel
                key="switch-2"
                className="rounded-md border p-4 space-x-2 w-full flex justify-between items-center has-[[data-state=checked]]:border-primary"
                htmlFor="switch-2"
              >
                <div className="grid gap-1.5 leading-none">
                  <FieldLabel>Social Emails</FieldLabel>
                  <p className="text-sm text-muted-foreground">
                    Receive emails for friend requests, follows, and more.
                  </p>
                </div>
                <Switch
                  id="switch-2"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FieldLabel>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="switch-3"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">
                Security Emails
              </FieldLabel>

              <FieldLabel
                key="switch-3"
                className="rounded-md border p-4 space-x-2 w-full flex justify-between items-center has-[[data-state=checked]]:border-primary"
                htmlFor="switch-3"
              >
                <div className="grid gap-1.5 leading-none">
                  <FieldLabel>Security Emails</FieldLabel>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your account activity and security.
                  </p>
                </div>
                <Switch
                  id="switch-3"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FieldLabel>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="checkbox-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">
                Use different settings for my mobile devices
              </FieldLabel>

              <div
                key="checkbox-0"
                className="border-0 p-0 @3xl:border-0 @3xl:p-0 w-full flex items-start has-[[data-state=checked]]:border-primary"
              >
                <Checkbox
                  id="checkbox-0"
                  name={field.name}
                  className=""
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <div className="grid gap-1.5 leading-none">
                  <FieldLabel>
                    Use different settings for my mobile devices
                  </FieldLabel>
                  <p className="text-sm text-muted-foreground">
                    You can manage your mobile notifications in the mobile
                    settings page.
                  </p>
                </div>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="submit-button-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 @3xl:col-span-3 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">Submit</FieldLabel>

              <Button
                key="submit-button-0"
                id="submit-button-0"
                name=""
                className="w-full"
                type="submit"
                variant="default"
              >
                Update Nottifications
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </form>
  );
}
