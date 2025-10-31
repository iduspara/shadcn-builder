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

export default function AppointmentRequest() {
  const formSchema = z.object({
    "text-0": z.string(),
    "text-input-0": z.string().min(1, { message: "This field is required" }),
    "email-input-0": z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "This field is required" }),
    "tel-input-0": z.string().min(1, { message: "This field is required" }),
    "text-input-1": z.string(),
    "select-0": z.string().min(1, { message: "This field is required" }),
    "select-1": z.string().min(1, { message: "This field is required" }),
    "select-2": z.string().min(1, { message: "This field is required" }),
    "radio-0": z.string().min(1, { message: "This field is required" }),
    "textarea-0": z
      .string()
      .min(1, { message: "This field is required" })
      .min(20, { message: "Must be at least 20 characters" }),
    "textarea-1": z.string(),
    "submit-button-0": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-0": "",
      "text-input-0": "",
      "email-input-0": "",
      "tel-input-0": "",
      "text-input-1": "",
      "select-0": "",
      "select-1": "",
      "select-2": "",
      "radio-0": "",
      "textarea-0": "",
      "textarea-1": "",
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
            <span className="text-lg font-semibold">Appointment Request</span>
            <br />
            <span className="text-sm text-muted-foreground">
              Schedule an appointment with our healthcare providers.
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
          name="email-input-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Email</FieldLabel>

              <Input
                key="email-input-0"
                placeholder="patient@example.com"
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
          name="text-input-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Patient ID (if applicable)
              </FieldLabel>

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
          name="select-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Department/Specialty
              </FieldLabel>

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
                  <SelectItem key="primary" value="primary">
                    Primary Care
                  </SelectItem>

                  <SelectItem key="cardiology" value="cardiology">
                    Cardiology
                  </SelectItem>

                  <SelectItem key="dermatology" value="dermatology">
                    Dermatology
                  </SelectItem>

                  <SelectItem key="orthopedics" value="orthopedics">
                    Orthopedics
                  </SelectItem>

                  <SelectItem key="pediatrics" value="pediatrics">
                    Pediatrics
                  </SelectItem>

                  <SelectItem key="gynecology" value="gynecology">
                    Gynecology
                  </SelectItem>

                  <SelectItem key="neurology" value="neurology">
                    Neurology
                  </SelectItem>

                  <SelectItem key="psychiatry" value="psychiatry">
                    Psychiatry
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
          name="select-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Appointment Type</FieldLabel>

              <Select
                key="select-1"
                id="select-1"
                className=""
                {...field}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="consultation" value="consultation">
                    Consultation
                  </SelectItem>

                  <SelectItem key="follow-up" value="follow-up">
                    Follow-up
                  </SelectItem>

                  <SelectItem key="emergency" value="emergency">
                    Emergency
                  </SelectItem>

                  <SelectItem key="routine" value="routine">
                    Routine Check-up
                  </SelectItem>

                  <SelectItem key="procedure" value="procedure">
                    Procedure
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
          name="select-2"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Preferred Date</FieldLabel>

              <Select
                key="select-2"
                id="select-2"
                className=""
                {...field}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="asap" value="asap">
                    As Soon As Possible
                  </SelectItem>

                  <SelectItem key="this-week" value="this-week">
                    This Week
                  </SelectItem>

                  <SelectItem key="next-week" value="next-week">
                    Next Week
                  </SelectItem>

                  <SelectItem key="this-month" value="this-month">
                    This Month
                  </SelectItem>

                  <SelectItem key="flexible" value="flexible">
                    Flexible
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
              <FieldLabel className="flex w-auto!">Preferred Time</FieldLabel>

              <RadioGroup
                key="radio-0"
                id="radio-0"
                className="w-full"
                {...field}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="morning"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-0-morning"
                >
                  <RadioGroupItem value="morning" id="radio-0-morning" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-0-morning"
                      className="font-normal"
                    >
                      Morning (9AM - 12PM)
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="afternoon"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-0-afternoon"
                >
                  <RadioGroupItem value="afternoon" id="radio-0-afternoon" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-0-afternoon"
                      className="font-normal"
                    >
                      Afternoon (1PM - 4PM)
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="evening"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-0-evening"
                >
                  <RadioGroupItem value="evening" id="radio-0-evening" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-0-evening"
                      className="font-normal"
                    >
                      Evening (5PM - 7PM)
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="anytime"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-0-anytime"
                >
                  <RadioGroupItem value="anytime" id="radio-0-anytime" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-0-anytime"
                      className="font-normal"
                    >
                      Any Time Available
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
          name="textarea-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Reason for Visit</FieldLabel>

              <Textarea
                key="textarea-0"
                id="textarea-0"
                placeholder="Please describe the reason for your visit..."
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
              <FieldLabel className="flex w-auto!">Additional Notes</FieldLabel>

              <Textarea
                key="textarea-1"
                id="textarea-1"
                placeholder="Any additional information or special requests..."
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
                Request Appointment
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </form>
  );
}
