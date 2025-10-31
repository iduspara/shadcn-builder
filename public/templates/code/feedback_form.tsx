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

export default function FeedbackForm() {
  const formSchema = z.object({
    "text-0": z.string(),
    "text-input-0": z.string(),
    "email-input-0": z.string(),
    "select-0": z.string().min(1, { message: "This field is required" }),
    "radio-0": z.string().min(1, { message: "This field is required" }),
    "checkbox-group-0": z.array(z.string()).optional(),
    "checkbox-group-1": z.array(z.string()).optional(),
    "textarea-0": z.string(),
    "radio-1": z.string().min(1, { message: "This field is required" }),
    "submit-button-0": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-0": "",
      "text-input-0": "",
      "email-input-0": "",
      "select-0": "",
      "radio-0": "",
      "checkbox-group-0": [],
      "checkbox-group-1": [],
      "textarea-0": "",
      "radio-1": "",
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
            <span className="text-lg font-semibold">Feedback Form</span>
            <br />
            <span className="text-sm text-muted-foreground">
              We value your feedback. Help us improve our service.
            </span>
          </p>
        </div>

        <Controller
          control={form.control}
          name="text-input-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Name</FieldLabel>

              <Input
                key="text-input-0"
                placeholder="John Doe"
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
          name="select-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Feedback Type</FieldLabel>

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
                  <SelectItem key="praise" value="praise">
                    Praise
                  </SelectItem>

                  <SelectItem key="suggestion" value="suggestion">
                    Suggestion
                  </SelectItem>

                  <SelectItem key="complaint" value="complaint">
                    Complaint
                  </SelectItem>

                  <SelectItem key="question" value="question">
                    Question
                  </SelectItem>

                  <SelectItem key="other" value="other">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="radio-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Overall Experience
              </FieldLabel>

              <RadioGroup
                key="radio-0"
                id="radio-0"
                className="w-full"
                {...field}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="excellent"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-0-excellent"
                >
                  <RadioGroupItem value="excellent" id="radio-0-excellent" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-0-excellent"
                      className="font-normal"
                    >
                      Excellent
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="good"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-0-good"
                >
                  <RadioGroupItem value="good" id="radio-0-good" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel htmlFor="radio-0-good" className="font-normal">
                      Good
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="average"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-0-average"
                >
                  <RadioGroupItem value="average" id="radio-0-average" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-0-average"
                      className="font-normal"
                    >
                      Average
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="poor"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-0-poor"
                >
                  <RadioGroupItem value="poor" id="radio-0-poor" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel htmlFor="radio-0-poor" className="font-normal">
                      Poor
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
                What did you like?
              </FieldLabel>

              <div className="grid w-full gap-2">
                <Controller
                  name="checkbox-group-0"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="ease-of-use"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-ease-of-use"
                          checked={OptionField.value?.includes("ease-of-use")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "ease-of-use",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "ease-of-use",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-ease-of-use"
                          >
                            Ease of Use
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
                        key="design"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-design"
                          checked={OptionField.value?.includes("design")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "design",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "design",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-design"
                          >
                            Design
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
                        key="features"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-features"
                          checked={OptionField.value?.includes("features")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "features",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "features",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-features"
                          >
                            Features
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
                        key="performance"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-performance"
                          checked={OptionField.value?.includes("performance")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "performance",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "performance",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-performance"
                          >
                            Performance
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
                        key="support"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-support"
                          checked={OptionField.value?.includes("support")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "support",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "support",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-support"
                          >
                            Customer Support
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
                What could be improved?
              </FieldLabel>

              <div className="grid w-full gap-2">
                <Controller
                  name="checkbox-group-1"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="ease-of-use"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-1-ease-of-use"
                          checked={OptionField.value?.includes("ease-of-use")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "ease-of-use",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "ease-of-use",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-1-ease-of-use"
                          >
                            Ease of Use
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
                        key="design"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-1-design"
                          checked={OptionField.value?.includes("design")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "design",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "design",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-1-design"
                          >
                            Design
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
                        key="features"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-1-features"
                          checked={OptionField.value?.includes("features")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "features",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "features",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-1-features"
                          >
                            Features
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
                        key="performance"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-1-performance"
                          checked={OptionField.value?.includes("performance")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "performance",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "performance",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-1-performance"
                          >
                            Performance
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
                        key="support"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-1-support"
                          checked={OptionField.value?.includes("support")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "support",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "support",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-1-support"
                          >
                            Customer Support
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
                placeholder="Please share any additional thoughts or suggestions..."
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="radio-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Would you recommend us?
              </FieldLabel>

              <RadioGroup
                key="radio-1"
                id="radio-1"
                className="w-full"
                {...field}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="definitely"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-1-definitely"
                >
                  <RadioGroupItem value="definitely" id="radio-1-definitely" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-1-definitely"
                      className="font-normal"
                    >
                      Definitely
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="probably"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-1-probably"
                >
                  <RadioGroupItem value="probably" id="radio-1-probably" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-1-probably"
                      className="font-normal"
                    >
                      Probably
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="maybe"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-1-maybe"
                >
                  <RadioGroupItem value="maybe" id="radio-1-maybe" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel htmlFor="radio-1-maybe" className="font-normal">
                      Maybe
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="probably-not"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-1-probably-not"
                >
                  <RadioGroupItem
                    value="probably-not"
                    id="radio-1-probably-not"
                  />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-1-probably-not"
                      className="font-normal"
                    >
                      Probably Not
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="definitely-not"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-1-definitely-not"
                >
                  <RadioGroupItem
                    value="definitely-not"
                    id="radio-1-definitely-not"
                  />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-1-definitely-not"
                      className="font-normal"
                    >
                      Definitely Not
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
