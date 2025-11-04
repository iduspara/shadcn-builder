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

export default function MedicalHistoryForm() {
  const formSchema = z.object({
    "text-0": z.string(),
    "text-input-0": z.string().min(1, { message: "This field is required" }),
    "date-input-0": z.date({
      error: "This field is required.",
    }),
    "text-input-1": z.string(),
    "textarea-0": z.string(),
    "textarea-1": z.string(),
    "textarea-2": z.string(),
    "textarea-3": z.string(),
    "checkbox-group-0": z.array(z.string()).optional(),
    "radio-0": z.string().min(1, { message: "This field is required" }),
    "radio-1": z.string().min(1, { message: "This field is required" }),
    "textarea-4": z.string(),
    "submit-button-0": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-0": "",
      "text-input-0": "",
      "date-input-0": new Date("2025-11-04T16:20:12.157Z"),
      "text-input-1": "",
      "textarea-0": "",
      "textarea-1": "",
      "textarea-2": "",
      "textarea-3": "",
      "checkbox-group-0": [],
      "radio-0": "",
      "radio-1": "",
      "textarea-4": "",
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
            <span className="text-lg font-semibold">Medical History Form</span>
            <br />
            <span className="text-sm text-muted-foreground">
              Please provide your complete medical history for better care.
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
              <FieldLabel className="flex w-auto!">Patient Name</FieldLabel>

              <Input
                key="text-input-0"
                placeholder="Full Name"
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
          name="text-input-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Patient ID</FieldLabel>

              <Input
                key="text-input-1"
                placeholder="Patient ID Number"
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
          name="textarea-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Current Medications
              </FieldLabel>

              <Textarea
                key="textarea-0"
                id="textarea-0"
                placeholder="List all current medications, dosages, and frequency..."
                className=""
                {...field}
              />

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
              <FieldLabel className="flex w-auto!">Allergies</FieldLabel>

              <Textarea
                key="textarea-1"
                id="textarea-1"
                placeholder="List any known allergies (medications, foods, environmental, etc.)..."
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="textarea-2"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Past Medical History
              </FieldLabel>

              <Textarea
                key="textarea-2"
                id="textarea-2"
                placeholder="List any past medical conditions, surgeries, hospitalizations..."
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="textarea-3"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Family Medical History
              </FieldLabel>

              <Textarea
                key="textarea-3"
                id="textarea-3"
                placeholder="List any relevant family medical history..."
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
              <FieldLabel className="flex w-auto!">
                Current Health Status
              </FieldLabel>

              <div className="grid w-full gap-2">
                <Controller
                  name="checkbox-group-0"
                  control={form.control}
                  render={({ field: OptionField }) => {
                    return (
                      <FieldLabel
                        key="diabetes"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-diabetes"
                          checked={OptionField.value?.includes("diabetes")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "diabetes",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "diabetes",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-diabetes"
                          >
                            Diabetes
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
                        key="hypertension"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-hypertension"
                          checked={OptionField.value?.includes("hypertension")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "hypertension",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "hypertension",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-hypertension"
                          >
                            Hypertension
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
                        key="heart-disease"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-heart-disease"
                          checked={OptionField.value?.includes("heart-disease")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "heart-disease",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) =>
                                      value !== "heart-disease",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-heart-disease"
                          >
                            Heart Disease
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
                        key="asthma"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-asthma"
                          checked={OptionField.value?.includes("asthma")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "asthma",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "asthma",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-asthma"
                          >
                            Asthma
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
                        key="depression"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-depression"
                          checked={OptionField.value?.includes("depression")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "depression",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "depression",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-depression"
                          >
                            Depression/Anxiety
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
                        key="cancer"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-cancer"
                          checked={OptionField.value?.includes("cancer")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "cancer",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "cancer",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-cancer"
                          >
                            Cancer
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
                        key="none"
                        className="flex items-start has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                      >
                        <Checkbox
                          id="checkbox-group-0-none"
                          checked={OptionField.value?.includes("none")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? OptionField.onChange([
                                  ...(OptionField.value || []),
                                  "none",
                                ])
                              : OptionField.onChange(
                                  OptionField.value?.filter(
                                    (value: string) => value !== "none",
                                  ),
                                );
                          }}
                        />
                        <div className="grid gap-2 leading-none">
                          <FieldLabel
                            className="font-normal"
                            htmlFor="checkbox-group-0-none"
                          >
                            None of the above
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
          name="radio-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Smoking Status</FieldLabel>

              <RadioGroup
                key="radio-0"
                id="radio-0"
                className="w-full"
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="never"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-0-never"
                >
                  <RadioGroupItem value="never" id="radio-0-never" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel htmlFor="radio-0-never" className="font-normal">
                      Never Smoked
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="former"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-0-former"
                >
                  <RadioGroupItem value="former" id="radio-0-former" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-0-former"
                      className="font-normal"
                    >
                      Former Smoker
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="current"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-0-current"
                >
                  <RadioGroupItem value="current" id="radio-0-current" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-0-current"
                      className="font-normal"
                    >
                      Current Smoker
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
          name="radio-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Alcohol Consumption
              </FieldLabel>

              <RadioGroup
                key="radio-1"
                id="radio-1"
                className="w-full"
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="none"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-1-none"
                >
                  <RadioGroupItem value="none" id="radio-1-none" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel htmlFor="radio-1-none" className="font-normal">
                      None
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="occasional"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-1-occasional"
                >
                  <RadioGroupItem value="occasional" id="radio-1-occasional" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-1-occasional"
                      className="font-normal"
                    >
                      Occasional
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="moderate"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-1-moderate"
                >
                  <RadioGroupItem value="moderate" id="radio-1-moderate" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-1-moderate"
                      className="font-normal"
                    >
                      Moderate
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="heavy"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-1-heavy"
                >
                  <RadioGroupItem value="heavy" id="radio-1-heavy" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel htmlFor="radio-1-heavy" className="font-normal">
                      Heavy
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
          name="textarea-4"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Additional Notes</FieldLabel>

              <Textarea
                key="textarea-4"
                id="textarea-4"
                placeholder="Any additional information you think is relevant..."
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
                Submit Medical History
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </form>
  );
}
