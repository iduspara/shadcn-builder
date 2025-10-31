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

export default function CustomerExperienceSurvey() {
  const formSchema = z.object({
    "text-0": z.string(),
    "radio-group-0": z.string().min(1, { message: "This field is required" }),
    "radio-group-1": z.string().min(1, { message: "This field is required" }),
    "checkbox-group-0": z.array(z.string()).optional(),
    "checkbox-group-1": z.array(z.string()).optional(),
    "textarea-0": z.string(),
    "submit-button-0": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-0": "",
      "radio-group-0": "",
      "radio-group-1": "",
      "checkbox-group-0": [],
      "checkbox-group-1": [],
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
              Customer Experience Survey
            </span>
            <br />
            <span className="text-sm text-muted-foreground">
              Help us understand your overall experience with our company.
            </span>
          </p>
        </div>

        <Controller
          control={form.control}
          name="radio-group-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Overall Satisfaction
              </FieldLabel>

              <RadioGroup
                key="radio-group-0"
                id="radio-group-0"
                className="w-full"
                {...field}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="5"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-5"
                >
                  <RadioGroupItem value="5" id="radio-group-0-5" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-5"
                      className="font-normal"
                    >
                      Extremely Satisfied
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="4"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-4"
                >
                  <RadioGroupItem value="4" id="radio-group-0-4" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-4"
                      className="font-normal"
                    >
                      Very Satisfied
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="3"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-3"
                >
                  <RadioGroupItem value="3" id="radio-group-0-3" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-3"
                      className="font-normal"
                    >
                      Satisfied
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="2"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-2"
                >
                  <RadioGroupItem value="2" id="radio-group-0-2" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-2"
                      className="font-normal"
                    >
                      Dissatisfied
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="1"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-1"
                >
                  <RadioGroupItem value="1" id="radio-group-0-1" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-1"
                      className="font-normal"
                    >
                      Very Dissatisfied
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
          name="radio-group-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Likelihood to Recommend
              </FieldLabel>

              <RadioGroup
                key="radio-group-1"
                id="radio-group-1"
                className="w-full"
                {...field}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="10"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-10"
                >
                  <RadioGroupItem value="10" id="radio-group-1-10" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-10"
                      className="font-normal"
                    >
                      Extremely Likely (10)
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="9"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-9"
                >
                  <RadioGroupItem value="9" id="radio-group-1-9" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-9"
                      className="font-normal"
                    >
                      Very Likely (9)
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="8"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-8"
                >
                  <RadioGroupItem value="8" id="radio-group-1-8" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-8"
                      className="font-normal"
                    >
                      Likely (8)
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="7"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-7"
                >
                  <RadioGroupItem value="7" id="radio-group-1-7" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-7"
                      className="font-normal"
                    >
                      Somewhat Likely (7)
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="6"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-6"
                >
                  <RadioGroupItem value="6" id="radio-group-1-6" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-6"
                      className="font-normal"
                    >
                      Neutral (6)
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="0-5"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-0-5"
                >
                  <RadioGroupItem value="0-5" id="radio-group-1-0-5" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-0-5"
                      className="font-normal"
                    >
                      Unlikely (0-5)
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
                Which aspects impressed you most?
              </FieldLabel>

              <div className="grid w-full gap-2">
                <Controller
                  name="checkbox-group-0"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="customer-service"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-customer-service"
                          checked={OptionField.value?.includes(
                            "customer-service",
                          )}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "customer-service",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) =>
                                      value !== "customer-service",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-customer-service"
                          >
                            Customer Service
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
                        key="product-quality"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-product-quality"
                          checked={OptionField.value?.includes(
                            "product-quality",
                          )}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "product-quality",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) =>
                                      value !== "product-quality",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-product-quality"
                          >
                            Product Quality
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
                        key="pricing"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-pricing"
                          checked={OptionField.value?.includes("pricing")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "pricing",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "pricing",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-pricing"
                          >
                            Pricing
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
                        key="delivery"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-delivery"
                          checked={OptionField.value?.includes("delivery")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "delivery",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "delivery",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-delivery"
                          >
                            Delivery Speed
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
                        key="website"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-website"
                          checked={OptionField.value?.includes("website")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "website",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "website",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-website"
                          >
                            Website Experience
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
                        key="communication"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-communication"
                          checked={OptionField.value?.includes("communication")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "communication",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) =>
                                      value !== "communication",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-communication"
                          >
                            Communication
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
          name="checkbox-group-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Areas for improvement
              </FieldLabel>

              <div className="grid w-full gap-2">
                <Controller
                  name="checkbox-group-1"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="response-time"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-1-response-time"
                          checked={OptionField.value?.includes("response-time")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "response-time",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) =>
                                      value !== "response-time",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-1-response-time"
                          >
                            Response Time
                          </FieldLabel>
                        </div>
                      </FieldLabel>
                    );
                  }}
                />

                <Controller
                  name="checkbox-group-1"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="product-range"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-1-product-range"
                          checked={OptionField.value?.includes("product-range")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "product-range",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) =>
                                      value !== "product-range",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-1-product-range"
                          >
                            Product Range
                          </FieldLabel>
                        </div>
                      </FieldLabel>
                    );
                  }}
                />

                <Controller
                  name="checkbox-group-1"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="user-interface"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-1-user-interface"
                          checked={OptionField.value?.includes(
                            "user-interface",
                          )}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "user-interface",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) =>
                                      value !== "user-interface",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-1-user-interface"
                          >
                            User Interface
                          </FieldLabel>
                        </div>
                      </FieldLabel>
                    );
                  }}
                />

                <Controller
                  name="checkbox-group-1"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="support-hours"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-1-support-hours"
                          checked={OptionField.value?.includes("support-hours")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "support-hours",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) =>
                                      value !== "support-hours",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-1-support-hours"
                          >
                            Support Hours
                          </FieldLabel>
                        </div>
                      </FieldLabel>
                    );
                  }}
                />

                <Controller
                  name="checkbox-group-1"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="documentation"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-1-documentation"
                          checked={OptionField.value?.includes("documentation")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "documentation",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) =>
                                      value !== "documentation",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-1-documentation"
                          >
                            Documentation
                          </FieldLabel>
                        </div>
                      </FieldLabel>
                    );
                  }}
                />

                <Controller
                  name="checkbox-group-1"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="billing"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-1-billing"
                          checked={OptionField.value?.includes("billing")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "billing",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "billing",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-1-billing"
                          >
                            Billing Process
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
          name="textarea-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Additional Comments
              </FieldLabel>

              <Textarea
                key="textarea-0"
                id="textarea-0"
                placeholder="Share any additional feedback or suggestions"
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
                Submit Feedback
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </form>
  );
}
