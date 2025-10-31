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

export default function ProductFeedback() {
  const formSchema = z.object({
    "text-0": z.string(),
    "text-input-0": z.string().min(1, { message: "This field is required" }),
    "radio-group-0": z.string().min(1, { message: "This field is required" }),
    "textarea-0": z.string(),
    "textarea-1": z.string(),
    "radio-group-1": z.string().min(1, { message: "This field is required" }),
    "submit-button-0": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-0": "",
      "text-input-0": "",
      "radio-group-0": "",
      "textarea-0": "",
      "textarea-1": "",
      "radio-group-1": "",
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
            <span className="text-lg font-semibold">Product Feedback</span>
            <br />
            <span className="text-sm text-muted-foreground">
              Share your thoughts and help us improve our products.
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
              <FieldLabel className="flex w-auto!">Product Name</FieldLabel>

              <Input
                key="text-input-0"
                placeholder="Which product?"
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
                  key="very-satisfied"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-very-satisfied"
                >
                  <RadioGroupItem
                    value="very-satisfied"
                    id="radio-group-0-very-satisfied"
                  />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-very-satisfied"
                      className="font-normal"
                    >
                      Very Satisfied
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="satisfied"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-satisfied"
                >
                  <RadioGroupItem
                    value="satisfied"
                    id="radio-group-0-satisfied"
                  />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-satisfied"
                      className="font-normal"
                    >
                      Satisfied
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="neutral"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-neutral"
                >
                  <RadioGroupItem value="neutral" id="radio-group-0-neutral" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-neutral"
                      className="font-normal"
                    >
                      Neutral
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="dissatisfied"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-dissatisfied"
                >
                  <RadioGroupItem
                    value="dissatisfied"
                    id="radio-group-0-dissatisfied"
                  />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-dissatisfied"
                      className="font-normal"
                    >
                      Dissatisfied
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="very-dissatisfied"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-very-dissatisfied"
                >
                  <RadioGroupItem
                    value="very-dissatisfied"
                    id="radio-group-0-very-dissatisfied"
                  />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-very-dissatisfied"
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
          name="textarea-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                What do you like most?
              </FieldLabel>

              <Textarea
                key="textarea-0"
                id="textarea-0"
                placeholder="Tell us what you love about our product"
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
                placeholder="Share your suggestions for improvement"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="radio-group-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Would you recommend us?
              </FieldLabel>

              <RadioGroup
                key="radio-group-1"
                id="radio-group-1"
                className="w-full"
                {...field}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="definitely"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-definitely"
                >
                  <RadioGroupItem
                    value="definitely"
                    id="radio-group-1-definitely"
                  />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-definitely"
                      className="font-normal"
                    >
                      Definitely
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="probably"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-probably"
                >
                  <RadioGroupItem
                    value="probably"
                    id="radio-group-1-probably"
                  />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-probably"
                      className="font-normal"
                    >
                      Probably
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="maybe"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-maybe"
                >
                  <RadioGroupItem value="maybe" id="radio-group-1-maybe" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-maybe"
                      className="font-normal"
                    >
                      Maybe
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="probably-not"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-probably-not"
                >
                  <RadioGroupItem
                    value="probably-not"
                    id="radio-group-1-probably-not"
                  />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-probably-not"
                      className="font-normal"
                    >
                      Probably Not
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="definitely-not"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-definitely-not"
                >
                  <RadioGroupItem
                    value="definitely-not"
                    id="radio-group-1-definitely-not"
                  />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-definitely-not"
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
