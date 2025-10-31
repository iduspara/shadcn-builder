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

export default function CarReturn() {
  const formSchema = z.object({
    "text-0": z.string(),
    "text-input-0": z.string().min(1, { message: "This field is required" }),
    "text-input-1": z.string().min(1, { message: "This field is required" }),
    "select-0": z.string().min(1, { message: "This field is required" }),
    "radio-group-0": z.string().min(1, { message: "This field is required" }),
    "textarea-0": z.string(),
    "submit-button-0": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-0": "",
      "text-input-0": "",
      "text-input-1": "",
      "select-0": "",
      "radio-group-0": "",
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
            <span className="text-lg font-semibold">Car Return</span>
            <br />
            <span className="text-sm text-muted-foreground">
              Complete your car return with vehicle inspection.
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
              <FieldLabel className="flex w-auto!">Agreement Number</FieldLabel>

              <Input
                key="text-input-0"
                placeholder="Rental agreement number"
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
              <FieldLabel className="flex w-auto!">Current Mileage</FieldLabel>

              <Input
                key="text-input-1"
                placeholder="Current mileage"
                type="number"
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
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Fuel Level</FieldLabel>

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
                  <SelectItem key="full" value="full">
                    Full
                  </SelectItem>

                  <SelectItem key="half" value="half">
                    Half
                  </SelectItem>

                  <SelectItem key="quarter" value="quarter">
                    Quarter
                  </SelectItem>

                  <SelectItem key="empty" value="empty">
                    Empty
                  </SelectItem>
                </SelectContent>
              </Select>

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
                Vehicle Condition
              </FieldLabel>

              <RadioGroup
                key="radio-group-0"
                id="radio-group-0"
                className="w-full"
                {...field}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="excellent"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-excellent"
                >
                  <RadioGroupItem
                    value="excellent"
                    id="radio-group-0-excellent"
                  />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-excellent"
                      className="font-normal"
                    >
                      Excellent
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="good"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-good"
                >
                  <RadioGroupItem value="good" id="radio-group-0-good" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-good"
                      className="font-normal"
                    >
                      Good
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="fair"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-fair"
                >
                  <RadioGroupItem value="fair" id="radio-group-0-fair" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-fair"
                      className="font-normal"
                    >
                      Fair
                    </FieldLabel>
                  </div>
                </FieldLabel>

                <FieldLabel
                  key="damaged"
                  className="flex items-center has-[[data-state=checked]]:border-primary w-full rounded-md border p-4 space-x-2"
                  htmlFor="radio-group-0-damaged"
                >
                  <RadioGroupItem value="damaged" id="radio-group-0-damaged" />
                  <div className="grid gap-2 leading-none">
                    <FieldLabel
                      htmlFor="radio-group-0-damaged"
                      className="font-normal"
                    >
                      Damaged
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
              <FieldLabel className="flex w-auto!">Notes</FieldLabel>

              <Textarea
                key="textarea-0"
                id="textarea-0"
                placeholder="Any damages or issues"
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
                Complete Return
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </form>
  );
}
