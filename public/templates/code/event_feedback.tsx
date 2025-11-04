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

export default function EventFeedback() {
  const formSchema = z.object({
    "text-0": z.string(),
    "text-input-0": z.string().min(1, { message: "This field is required" }),
    "email-input-0": z.string(),
    "text-input-1": z.string().min(1, { message: "This field is required" }),
    "date-input-0": z.date({
      error: "This field is required.",
    }),
    "radio-0": z.string().min(1, { message: "This field is required" }),
    "radio-1": z.string().min(1, { message: "This field is required" }),
    "textarea-0": z.string(),
    "textarea-1": z.string(),
    "submit-button-0": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-0": "",
      "text-input-0": "",
      "email-input-0": "",
      "text-input-1": "",
      "date-input-0": new Date("2025-11-04T16:20:12.016Z"),
      "radio-0": "",
      "radio-1": "",
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
            <span className="text-lg font-semibold">Event Feedback</span>
            <br />
            <span className="text-sm text-muted-foreground">
              Share your experience and help us improve future events.
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
              <FieldLabel className="flex w-auto!">Attendee Name</FieldLabel>

              <Input
                key="text-input-0"
                placeholder="Your Name"
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
                placeholder="attendee@example.com"
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
          name="text-input-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Event Name</FieldLabel>

              <Input
                key="text-input-1"
                placeholder="Name of the event you attended"
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
              <FieldLabel className="flex w-auto!">Event Date</FieldLabel>

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
                value={field.value}
                name={field.name}
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

                <FieldLabel
                  key="terrible"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-0-terrible"
                >
                  <RadioGroupItem value="terrible" id="radio-0-terrible" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-0-terrible"
                      className="font-normal"
                    >
                      Terrible
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
                Would you attend again?
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
          name="textarea-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                What did you enjoy most?
              </FieldLabel>

              <Textarea
                key="textarea-0"
                id="textarea-0"
                placeholder="Tell us what you enjoyed most about the event..."
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
              <FieldLabel className="flex w-auto!">
                What could be improved?
              </FieldLabel>

              <Textarea
                key="textarea-1"
                id="textarea-1"
                placeholder="Suggestions for improvement..."
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
