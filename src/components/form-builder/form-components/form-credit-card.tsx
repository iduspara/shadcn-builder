import { Input } from "@/components/ui/input";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { GridGroup } from "../sidebar/groups/grid-group";
import { cn, escapeHtml } from "@/lib/utils";
import { ValidationGroup } from "../sidebar/groups/validation-group";
import { ControllerRenderProps } from "react-hook-form";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { usePaymentInputs } from "react-payment-inputs";
import images, { type CardImages } from "react-payment-inputs/images";
import { useEffect, useState } from "react";
import { CalendarIcon, CreditCardIcon, LockIcon } from "lucide-react";

export function FormCreditCard(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const IconStrokeWidth = component.getField(
    "properties.style.iconStrokeWidth"
  );
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();

  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditCard({ ...creditCard, cardNumber: e.target.value });
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let expiryDate = e.target.value;
    let expiryMonth = expiryDate.split("/")[0].trim();
    let expiryYear = expiryDate.split("/")[1].trim();
    setCreditCard({
      ...creditCard,
      expiryMonth: expiryMonth,
      expiryYear: expiryYear,
    });
  };

  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditCard({ ...creditCard, cvv: e.target.value });
  };

  useEffect(() => {
    if (
      creditCard.cardNumber === "" ||
      creditCard.expiryMonth === "" ||
      creditCard.expiryYear === "" ||
      creditCard.cvv === ""
    ) {
      form.setError(component.getField("attributes.id"), {
        message: "This field is required",
      });
    } else {
      form.setValue(
        component.getField("attributes.id"),
        JSON.stringify(creditCard)
      );
      form.clearErrors(component.getField("attributes.id"));
    }
  }, [creditCard, component, form]);

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      {/* First row: Card number (full width) */}
      <div className="relative w-full">
        <Input
          key={`${component.id}-card-number`}
          {...getCardNumberProps({
            onChange: handleCardNumberChange,
          })}
          className={cn(component.getField("attributes.class"), "pe-9")}
        />
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 end-0 pe-3">
          {meta.cardType ? (
            <svg
              className="overflow-hidden rounded-sm"
              {...getCardImageProps({
                images: images as unknown as CardImages,
              })}
              width={20}
            />
          ) : (
            <CreditCardIcon className="size-4" strokeWidth={IconStrokeWidth} />
          )}
        </div>
      </div>

      {/* Second row: Expiry date and CVV (side by side) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative w-full">
          <Input
            key={`${component.id}-expiry`}
            className={cn(component.getField("attributes.class"), "pe-9")}
            {...getExpiryDateProps({
              onChange: handleExpiryDateChange,
            })}
          />
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 end-0 pe-3">
            <CalendarIcon className="size-4" strokeWidth={IconStrokeWidth} />
          </div>
        </div>

        <div className="relative w-full">
          <Input
            key={`${component.id}-cvc`}
            className={cn(component.getField("attributes.class"), "pe-9")}
            {...getCVCProps({
              onChange: handleCVCChange,
            })}
          />
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 end-0 pe-3">
            <LockIcon className="size-4" strokeWidth={IconStrokeWidth} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  return {
    logic: `
  const IconStrokeWidth = "${component.getField("properties.style.iconStrokeWidth")}";

  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();

  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditCard({ ...creditCard, cardNumber: e.target.value });
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const expiryDate = e.target.value;
    const expiryMonth = expiryDate.split("/")[0];
    const expiryYear = expiryDate.split("/")[1];
    setCreditCard({
      ...creditCard,
      expiryMonth: expiryMonth,
      expiryYear: expiryYear,
    });
  };

  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditCard({ ...creditCard, cvv: e.target.value });
  };

  useEffect(() => {
    if (creditCard.cardNumber === "" || creditCard.expiryMonth === "" || creditCard.expiryYear === "" || creditCard.cvv === "") {
      form.setError("${component.getField("attributes.id")}", {
        message: "This field is required",
      });
    } else {
      form.setValue(
        "${component.getField("attributes.id")}",
        JSON.stringify(creditCard)
      );
      form.clearErrors("${component.getField("attributes.id")}");
    }

  }, [creditCard]);
    `,
    template: `
        <div className="w-full grid grid-cols-1 gap-4">
      {/* First row: Card number (full width) */}
      <div className="relative w-full">
        <Input
          key="${component.id}-card-number"
          {...getCardNumberProps({
            onChange: handleCardNumberChange,
          })}
          className="${escapeHtml(cn(component.getField("attributes.class"), "pe-9"))}"
        />
        <div
          className="text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 end-0 pe-3"
        >
          {meta.cardType ? (
            <svg
              className="overflow-hidden rounded-sm"
              {...getCardImageProps({
                images: images as unknown as CardImages,
              })}
              width={20}
            />
          ) : (
            <CreditCardIcon
              className="size-4"
              strokeWidth={IconStrokeWidth}
            />
          )}
        </div>
      </div>

      {/* Second row: Expiry date and CVV (side by side) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative w-full">
          <Input
            key="${component.id}-expiry"
            className="${escapeHtml(cn(component.getField("attributes.class"), "pe-9"))}"
            {...getExpiryDateProps({
              onChange: handleExpiryDateChange,
            })}
          />
          <div
            className="text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 end-0 pe-3"
          >
            <CalendarIcon
              className="size-4"
              strokeWidth={IconStrokeWidth}
            />
          </div>
        </div>

        <div className="relative w-full">
          <Input
            key="${component.id}-cvc"
            className="${escapeHtml(cn(component.getField("attributes.class"), "pe-9"))}"
            {...getCVCProps({
              onChange: handleCVCChange,
            })}
          />
          <div
            className="text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 end-0 pe-3"
            
          >
            <LockIcon
              className="size-4"
              strokeWidth={IconStrokeWidth}
            />
          </div>
        </div>
      </div>
    </div>
    `,
    dependencies: {
      "@/components/ui/input": ["Input"],
      "react-payment-inputs": ["usePaymentInputs"],
      "react-payment-inputs/images": "images, { type CardImages }",
      "lucide-react": ["LockIcon", "CalendarIcon", "CreditCardIcon"],
    },
    thirdPartyDependencies: ["react-payment-inputs"],
  };
}

export const CreditCardDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup whitelist={["id", "name"]} />,
  label: (
    <LabelGroup
      whitelist={["label", "labelPosition", "labelAlign", "showLabel"]}
    />
  ),
  input: null,
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
