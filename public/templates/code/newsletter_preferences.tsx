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

export default function NewsletterPreferences() {
  const formSchema = z.object({
    "text-0": z.string(),
    "email-input-0": z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "This field is required" }),
    "radio-group-0": z.string().min(1, { message: "This field is required" }),
    "checkbox-group-0": z.array(z.string()).optional(),
    "radio-group-1": z.string().min(1, { message: "This field is required" }),
    "select-0": z.string().min(1, { message: "This field is required" }),
    "textarea-0": z.string(),
    "submit-button-0": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-0": "",
      "email-input-0": "",
      "radio-group-0": "",
      "checkbox-group-0": [],
      "radio-group-1": "",
      "select-0": "",
      "textarea-0": "",
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
            <span className="text-lg font-semibold">
              Newsletter Preferences
            </span>
            <br />
            <span className="text-sm text-muted-foreground">
              Update your newsletter subscription preferences.
            </span>
          </p>
        </div>

        <Controller
          control={form.control}
          name="email-input-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Email Address</FieldLabel>

              <Input
                key="email-input-0"
                placeholder="Your subscribed email"
                type="email"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="radio-group-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Subscription Status
              </FieldLabel>

              <RadioGroup
                key="radio-group-0"
                id="radio-group-0"
                className="w-full"
                {...field}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="active"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-active"
                >
                  <RadioGroupItem value="active" id="radio-group-0-active" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-active"
                      className="font-normal"
                    >
                      Keep Active
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="pause"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-pause"
                >
                  <RadioGroupItem value="pause" id="radio-group-0-pause" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-pause"
                      className="font-normal"
                    >
                      Pause Temporarily
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="unsubscribe"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-unsubscribe"
                >
                  <RadioGroupItem
                    value="unsubscribe"
                    id="radio-group-0-unsubscribe"
                  />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-unsubscribe"
                      className="font-normal"
                    >
                      Unsubscribe
                    </FieldLabel>
                  </div>
                </FieldLabel>
              </RadioGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="checkbox-group-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Content Preferences
              </FieldLabel>

              <div className="grid w-full gap-2">
                <Controller
                  name="checkbox-group-0"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="news"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-news"
                          checked={OptionField.value?.includes("news")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "news",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "news",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-news"
                          >
                            Breaking News
                          </FieldLabel>
                        </div>
                      </FieldLabel>
                    );
                  }}
                />

                <Controller
                  name="checkbox-group-0"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="weekly"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-weekly"
                          checked={OptionField.value?.includes("weekly")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "weekly",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "weekly",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-weekly"
                          >
                            Weekly Roundup
                          </FieldLabel>
                        </div>
                      </FieldLabel>
                    );
                  }}
                />

                <Controller
                  name="checkbox-group-0"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="products"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-products"
                          checked={OptionField.value?.includes("products")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "products",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "products",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-products"
                          >
                            Product Updates
                          </FieldLabel>
                        </div>
                      </FieldLabel>
                    );
                  }}
                />

                <Controller
                  name="checkbox-group-0"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="offers"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-offers"
                          checked={OptionField.value?.includes("offers")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "offers",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "offers",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-offers"
                          >
                            Special Offers
                          </FieldLabel>
                        </div>
                      </FieldLabel>
                    );
                  }}
                />
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="radio-group-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Delivery Frequency
              </FieldLabel>

              <RadioGroup
                key="radio-group-1"
                id="radio-group-1"
                className="w-full"
                {...field}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="daily"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-daily"
                >
                  <RadioGroupItem value="daily" id="radio-group-1-daily" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-daily"
                      className="font-normal"
                    >
                      Daily
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="weekly"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-weekly"
                >
                  <RadioGroupItem value="weekly" id="radio-group-1-weekly" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-weekly"
                      className="font-normal"
                    >
                      Weekly
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="monthly"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-monthly"
                >
                  <RadioGroupItem value="monthly" id="radio-group-1-monthly" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-monthly"
                      className="font-normal"
                    >
                      Monthly
                    </FieldLabel>
                  </div>
                </FieldLabel>
              </RadioGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="select-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Language</FieldLabel>

              <Select
                key="select-0"
                id="select-0"
                className=""
                {...field}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="en" value="en">
                    English
                  </SelectItem>

                  <SelectItem key="es" value="es">
                    Spanish
                  </SelectItem>

                  <SelectItem key="fr" value="fr">
                    French
                  </SelectItem>

                  <SelectItem key="de" value="de">
                    German
                  </SelectItem>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="textarea-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Feedback</FieldLabel>

              <Textarea
                key="textarea-0"
                id="textarea-0"
                placeholder="How can we improve?"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="submit-button-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
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
                Update Preferences
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </form>
  );
}
