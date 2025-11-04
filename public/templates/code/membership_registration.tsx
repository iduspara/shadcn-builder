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

export default function MembershipRegistration() {
  const formSchema = z.object({
    "text-0": z.string(),
    "text-input-0": z.string().min(1, { message: "This field is required" }),
    "text-input-1": z.string().min(1, { message: "This field is required" }),
    "email-input-0": z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "This field is required" }),
    "tel-input-0": z.string().min(1, { message: "This field is required" }),
    "date-input-0": z.date({
      error: "This field is required.",
    }),
    "select-0": z.string().min(1, { message: "This field is required" }),
    "select-1": z.string().min(1, { message: "This field is required" }),
    "textarea-0": z.string().min(1, { message: "This field is required" }),
    "checkbox-group-0": z.array(z.string()).optional(),
    "textarea-1": z.string(),
    "checkbox-0": z
      .boolean({
        error: "This field is required.",
      })
      .refine((value) => value === true, {
        message: "This field is required.",
      }),
    "checkbox-1": z.boolean().default(false).optional(),
    "submit-button-0": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-0": "",
      "text-input-0": "",
      "text-input-1": "",
      "email-input-0": "",
      "tel-input-0": "",
      "date-input-0": new Date("2025-11-04T16:20:12.225Z"),
      "select-0": "",
      "select-1": "",
      "textarea-0": "",
      "checkbox-group-0": [],
      "textarea-1": "",
      "checkbox-0": false,
      "checkbox-1": false,
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
              Membership Registration
            </span>
            <br />
            <span className="text-sm text-muted-foreground">
              Join our community and unlock exclusive benefits.
            </span>
          </p>
        </div>

        <Controller
          control={form.control}
          name="text-input-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">First Name</FieldLabel>

              <Input
                key="text-input-0"
                placeholder="John"
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="text-input-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Last Name</FieldLabel>

              <Input
                key="text-input-1"
                placeholder="Doe"
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="email-input-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Email</FieldLabel>

              <Input
                key="email-input-0"
                placeholder="john@example.com"
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
          name="tel-input-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Phone Number</FieldLabel>

              <Input
                key="tel-input-0"
                placeholder="+1 (555) 000-0000"
                type="tel"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="date-input-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Date of Birth</FieldLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="justify-start text-left font-normal w-full"
                    id="date-input-0"
                    name=""
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span className="text-muted-foreground"></span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    initialFocus
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="select-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Membership Type</FieldLabel>

              <Select
                key="select-0"
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="basic" value="basic">
                    Basic Membership
                  </SelectItem>

                  <SelectItem key="premium" value="premium">
                    Premium Membership
                  </SelectItem>

                  <SelectItem key="vip" value="vip">
                    VIP Membership
                  </SelectItem>

                  <SelectItem key="lifetime" value="lifetime">
                    Lifetime Membership
                  </SelectItem>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="select-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Payment Plan</FieldLabel>

              <Select
                key="select-1"
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="monthly" value="monthly">
                    Monthly
                  </SelectItem>

                  <SelectItem key="quarterly" value="quarterly">
                    Quarterly
                  </SelectItem>

                  <SelectItem key="annual" value="annual">
                    Annual
                  </SelectItem>

                  <SelectItem key="one-time" value="one-time">
                    One-time Payment
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
              <FieldLabel className="flex w-auto!">Address</FieldLabel>

              <Textarea
                key="textarea-0"
                id="textarea-0"
                placeholder="Full residential address"
                className=""
                {...field}
              />

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
              <FieldLabel className="flex w-auto!">Interests</FieldLabel>

              <div className="grid w-full gap-2">
                <Controller
                  name="checkbox-group-0"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="events"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-events"
                          checked={OptionField.value?.includes("events")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "events",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "events",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-events"
                          >
                            Events & Workshops
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
                        key="networking"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-networking"
                          checked={OptionField.value?.includes("networking")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "networking",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "networking",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-networking"
                          >
                            Networking
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
                        key="resources"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-resources"
                          checked={OptionField.value?.includes("resources")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "resources",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "resources",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-resources"
                          >
                            Resources & Tools
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
                        key="discounts"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-discounts"
                          checked={OptionField.value?.includes("discounts")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "discounts",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "discounts",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-discounts"
                          >
                            Exclusive Discounts
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
                        key="newsletter"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-newsletter"
                          checked={OptionField.value?.includes("newsletter")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "newsletter",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "newsletter",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-newsletter"
                          >
                            Newsletter
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
                        key="community"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-community"
                          checked={OptionField.value?.includes("community")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "community",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "community",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-community"
                          >
                            Community Access
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
          name="textarea-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                How did you hear about us?
              </FieldLabel>

              <Textarea
                key="textarea-1"
                id="textarea-1"
                placeholder="Please let us know how you discovered our organization..."
                className=""
                {...field}
              />

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
                I agree to the terms and conditions
              </FieldLabel>

              <div
                key="checkbox-0"
                className="border-0 p-0 w-full flex items-start has-[[data-state=checked]]:border-primary"
              >
                <Checkbox
                  id="checkbox-0"
                  name={field.name}
                  className=""
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <div className="grid gap-1.5 leading-none">
                  <FieldLabel>I agree to the terms and conditions</FieldLabel>
                  <p className="text-sm text-muted-foreground"></p>
                </div>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="checkbox-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">
                I would like to receive promotional emails
              </FieldLabel>

              <div
                key="checkbox-1"
                className="border-0 p-0 w-full flex items-start has-[[data-state=checked]]:border-primary"
              >
                <Checkbox
                  id="checkbox-1"
                  name={field.name}
                  className=""
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <div className="grid gap-1.5 leading-none">
                  <FieldLabel>
                    I would like to receive promotional emails
                  </FieldLabel>
                  <p className="text-sm text-muted-foreground"></p>
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
                Join Now
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </form>
  );
}
