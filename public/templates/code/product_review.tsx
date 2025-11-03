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

export default function ProductReview() {
  const formSchema = z.object({
    "text-0": z.string(),
    "text-input-0": z.string().min(1, { message: "This field is required" }),
    "text-input-1": z.string().min(1, { message: "This field is required" }),
    "radio-group-0": z.string().min(1, { message: "This field is required" }),
    "radio-group-1": z.string().min(1, { message: "This field is required" }),
    "radio-group-2": z.string().min(1, { message: "This field is required" }),
    "text-input-2": z.string().min(1, { message: "This field is required" }),
    "textarea-0": z.string().min(1, { message: "This field is required" }),
    "textarea-1": z.string(),
    "radio-group-3": z.string().min(1, { message: "This field is required" }),
    "text-input-3": z.string(),
    "checkbox-0": z
      .boolean({
        error: "This field is required.",
      })
      .refine((value) => value === true, {
        message: "This field is required.",
      }),
    "submit-button-0": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-0": "",
      "text-input-0": "",
      "text-input-1": "",
      "radio-group-0": "",
      "radio-group-1": "",
      "radio-group-2": "",
      "text-input-2": "",
      "textarea-0": "",
      "textarea-1": "",
      "radio-group-3": "",
      "text-input-3": "",
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
            <span className="text-lg font-semibold">Product Review</span>
            <br />
            <span className="text-sm text-muted-foreground">
              Customer product review form with ratings, feedback, and photo
              upload for e-commerce platforms.
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
                placeholder="Enter product name"
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
              <FieldLabel className="flex w-auto!">Order Number</FieldLabel>

              <Input
                key="text-input-1"
                placeholder="Enter your order number"
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
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Overall Rating</FieldLabel>

              <RadioGroup
                key="radio-group-0"
                id="radio-group-0"
                className="w-full"
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
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
                      ⭐ 1 Star - Poor
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
                      ⭐⭐ 2 Stars - Fair
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
                      ⭐⭐⭐ 3 Stars - Good
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
                      ⭐⭐⭐⭐ 4 Stars - Very Good
                    </FieldLabel>
                  </div>
                </FieldLabel>

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
                      ⭐⭐⭐⭐⭐ 5 Stars - Excellent
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
              <FieldLabel className="flex w-auto!">Product Quality</FieldLabel>

              <RadioGroup
                key="radio-group-1"
                id="radio-group-1"
                className="w-full"
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="1"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-1"
                >
                  <RadioGroupItem value="1" id="radio-group-1-1" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-1"
                      className="font-normal"
                    >
                      ⭐ 1 Star - Poor
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="2"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-2"
                >
                  <RadioGroupItem value="2" id="radio-group-1-2" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-2"
                      className="font-normal"
                    >
                      ⭐⭐ 2 Stars - Fair
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="3"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-3"
                >
                  <RadioGroupItem value="3" id="radio-group-1-3" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-3"
                      className="font-normal"
                    >
                      ⭐⭐⭐ 3 Stars - Good
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="4"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-4"
                >
                  <RadioGroupItem value="4" id="radio-group-1-4" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-4"
                      className="font-normal"
                    >
                      ⭐⭐⭐⭐ 4 Stars - Very Good
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="5"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-1-5"
                >
                  <RadioGroupItem value="5" id="radio-group-1-5" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-1-5"
                      className="font-normal"
                    >
                      ⭐⭐⭐⭐⭐ 5 Stars - Excellent
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
          name="radio-group-2"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Value for Money</FieldLabel>

              <RadioGroup
                key="radio-group-2"
                id="radio-group-2"
                className="w-full"
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="1"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-2-1"
                >
                  <RadioGroupItem value="1" id="radio-group-2-1" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-2-1"
                      className="font-normal"
                    >
                      ⭐ 1 Star - Poor
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="2"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-2-2"
                >
                  <RadioGroupItem value="2" id="radio-group-2-2" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-2-2"
                      className="font-normal"
                    >
                      ⭐⭐ 2 Stars - Fair
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="3"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-2-3"
                >
                  <RadioGroupItem value="3" id="radio-group-2-3" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-2-3"
                      className="font-normal"
                    >
                      ⭐⭐⭐ 3 Stars - Good
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="4"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-2-4"
                >
                  <RadioGroupItem value="4" id="radio-group-2-4" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-2-4"
                      className="font-normal"
                    >
                      ⭐⭐⭐⭐ 4 Stars - Very Good
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="5"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-2-5"
                >
                  <RadioGroupItem value="5" id="radio-group-2-5" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-2-5"
                      className="font-normal"
                    >
                      ⭐⭐⭐⭐⭐ 5 Stars - Excellent
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
          name="text-input-2"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Review Title</FieldLabel>

              <Input
                key="text-input-2"
                placeholder="Brief summary of your review"
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
              <FieldLabel className="flex w-auto!">Your Review</FieldLabel>

              <Textarea
                key="textarea-0"
                id="textarea-0"
                placeholder="Share your experience with this product"
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
              <FieldLabel className="flex w-auto!">Pros and Cons</FieldLabel>

              <Textarea
                key="textarea-1"
                id="textarea-1"
                placeholder="What did you like and dislike about this product?"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="radio-group-3"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Would you recommend this product?
              </FieldLabel>

              <RadioGroup
                key="radio-group-3"
                id="radio-group-3"
                className="w-full"
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="yes"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-3-yes"
                >
                  <RadioGroupItem value="yes" id="radio-group-3-yes" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-3-yes"
                      className="font-normal"
                    >
                      Yes
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="no"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-3-no"
                >
                  <RadioGroupItem value="no" id="radio-group-3-no" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-3-no"
                      className="font-normal"
                    >
                      No
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="maybe"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-3-maybe"
                >
                  <RadioGroupItem value="maybe" id="radio-group-3-maybe" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-3-maybe"
                      className="font-normal"
                    >
                      Maybe
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
          name="text-input-3"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Your Name</FieldLabel>

              <Input
                key="text-input-3"
                placeholder="Enter your name (will be displayed publicly)"
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
          name="checkbox-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">
                I confirm this is a verified purchase
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
                  <FieldLabel>I confirm this is a verified purchase</FieldLabel>
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
                Submit Review
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </form>
  );
}
