import { ReactCode, Viewports } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import {
  // Form Components
  FormInput,
  FormTextarea,
  FormSelect,
  FormNativeSelect,
  FormCheckbox,
  FormRadio,
  FormSwitch,
  FormButton,
  FormDatePicker,
  FormCheckboxGroup,
  
  // Typography Components
  Text,

  // Form Design Properties
  InputDesignProperties,
  TextareaDesignProperties,
  SelectDesignProperties,
  NativeSelectDesignProperties,
  CheckboxDesignProperties,
  RadioDesignProperties,
  SwitchDesignProperties,
  ButtonDesignProperties,
  DatePickerDesignProperties,
  CheckboxGroupDesignProperties,
  // Typography Design Properties
  TextDesignProperties,
  // React Code
  getReactCodeInput,
  getReactCodeTextarea,
  getReactCodeSelect,
  getReactCodeNativeSelect,
  getReactCodeCheckbox,
  getReactCodeRadio,
  getReactCodeSwitch,
  getReactCodeButton,
  getReactCodeDatePicker,
  getReactCodeText,
  getReactCodeCheckboxGroup,
  getReactCodeCreditCard,
  FormCreditCard,
  // New field components
  FormCombobox,
  FormSlider,
  FormInputOtp,
  FormToggleGroup,
  FormInputGroup,
  ComboboxDesignProperties,
  SliderDesignProperties,
  InputOtpDesignProperties,
  ToggleGroupDesignProperties,
  InputGroupDesignProperties,
  getReactCodeCombobox,
  getReactCodeSlider,
  getReactCodeInputOtp,
  getReactCodeToggleGroup,
  getReactCodeInputGroup,
  // New content components
  FormSeparator,
  FormAlert,
  FormBadge,
  FormKbd,
  FormSpinner,
  FormButtonGroup,
  SeparatorDesignProperties,
  AlertDesignProperties,
  BadgeDesignProperties,
  KbdDesignProperties,
  SpinnerDesignProperties,
  ButtonGroupDesignProperties,
  getReactCodeSeparator,
  getReactCodeAlert,
  getReactCodeBadge,
  getReactCodeKbd,
  getReactCodeSpinner,
  getReactCodeButtonGroup,
} from "@/components/form-builder/form-components";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { CreditCardDesignProperties } from "@/components/form-builder/form-components/form-credit-card";

const typographyComponents: FormComponentModel[] = [
  new FormComponentModel({
    id: "text",
    label: "Text block",
    label_info: "WYSIWYG Editor",
    type: "text",
    category: "content",
    icon: "TextAlignStart",
    content: "Text",
  }),
  new FormComponentModel({
    id: "separator",
    label: "Separator",
    label_info: "Horizontal or vertical divider",
    type: "separator",
    category: "content",
    icon: "SeparatorHorizontal",
    properties: { settings: { orientation: "horizontal" } },
  }),
  new FormComponentModel({
    id: "alert",
    label: "Alert",
    label_info: "Callout with title and description",
    type: "alert",
    category: "content",
    icon: "Info",
    content: "You can add components to your app using the cli.",
    properties: {
      style: { icon: "Info" },
      settings: { title: "Heads up!" },
    },
  }),
  new FormComponentModel({
    id: "badge",
    label: "Badge",
    label_info: "Small status label",
    type: "badge",
    category: "content",
    icon: "Tag",
    content: "Badge",
  }),
  new FormComponentModel({
    id: "kbd",
    label: "Keyboard Key",
    label_info: "Keyboard shortcut hint",
    type: "kbd",
    category: "content",
    icon: "Keyboard",
    content: "Ctrl+K",
  }),
  new FormComponentModel({
    id: "spinner",
    label: "Spinner",
    label_info: "Loading indicator",
    type: "spinner",
    category: "content",
    icon: "LoaderCircle",
    content: "Loading...",
    properties: { settings: { size: "default" } },
  }),
];

const formComponents: FormComponentModel[] = [
  new FormComponentModel({
    id: "text-input",
    label: "Text",
    label_info: "Single line text input",
    type: "input",
    category: "form",
    icon: "TextCursorInput",
    attributes: { type: "text" },
  }),
  new FormComponentModel({
    id: "textarea",
    label: "Text Area",
    label_info: "Multi-line text input",
    type: "textarea",
    category: "form",
    icon: "TextAlignStart",
  }),
  new FormComponentModel({
    id: "number-input",
    label: "Number",
    label_info: "Input field for numeric values",
    type: "number",
    category: "form",
    icon: "Hash",
    attributes: { type: "number" },
  }),
  new FormComponentModel({
    id: "email-input",
    label: "Email",
    label_info: "Input field for email addresses",
    type: "email",
    category: "form",
    icon: "Mail",
    attributes: { type: "email" },
  }),
  new FormComponentModel({
    id: "password-input",
    label: "Password",
    label_info: "Input field for passwords",
    type: "password",
    category: "form",
    icon: "Lock",
    attributes: { type: "password" },
  }),
  new FormComponentModel({
    id: "file-input",
    label: "File upload",
    label_info: "Input field for file uploads",
    type: "file",
    category: "form",
    icon: "Upload",
    attributes: { type: "file" },
  }),
  new FormComponentModel({
    id: "tel-input",
    label: "Telephone",
    label_info: "Input field for telephone numbers",
    type: "tel",
    category: "form",
    icon: "Phone",
    attributes: { type: "tel" },
  }),
  new FormComponentModel({
    id: "url-input",
    label: "URL",
    label_info: "Input field for URLs",
    type: "url",
    category: "form",
    icon: "Link",
    attributes: { type: "url" },
  }),
  new FormComponentModel({
    id: "credit-card-input",
    label: "Credit Card",
    label_info: "Input field for credit card",
    type: "credit-card",
    category: "form",
    icon: "CreditCard",
    validations: {
      required: "yes",
    },
  }),
  new FormComponentModel({
    id: "input-group",
    label: "Input Group",
    label_info: "Input with prefix, suffix or button",
    type: "input-group",
    category: "form",
    icon: "AtSign",
    attributes: { placeholder: "example" },
    properties: { settings: { prefix: "https://", suffix: ".com" } },
  }),
  new FormComponentModel({
    id: "input-otp",
    label: "One-Time Code",
    label_info: "OTP / verification code input",
    type: "input-otp",
    category: "form",
    icon: "RectangleEllipsis",
    properties: { settings: { length: 6, pattern: "digits" } },
  }),
  new FormComponentModel({
    id: "select",
    label: "Select",
    label_info: "Dropdown select",
    type: "select",
    category: "form",
    icon: "List",
    options: [
      { value: "option1", label: "Option 1", labelDescription: "Option 1 Description" },
      { value: "option2", label: "Option 2", labelDescription: "Option 2 Description" },
    ],
  }),
  new FormComponentModel({
    id: "combobox",
    label: "Combobox",
    label_info: "Searchable select",
    type: "combobox",
    category: "form",
    icon: "TextSearch",
    attributes: { placeholder: "Search..." },
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  }),
  new FormComponentModel({
    id: "native-select",
    label: "Native Select",
    label_info: "Browser select element",
    type: "native-select",
    category: "form",
    icon: "ChevronsUpDown",
    options: [
      {
        value: "option1",
        label: "Option 1",
        labelDescription: "Option 1 Description",
      },
      {
        value: "option2",
        label: "Option 2",
        labelDescription: "Option 2 Description",
      },
    ],
  }),
  new FormComponentModel({
    id: "checkbox",
    label: "Checkbox",
    label_info: "Checkbox input",
    label_description: "Checkbox Description",
    type: "checkbox",
    category: "form",
    icon: "SquareCheck",
    properties: {
      style: {
        showLabel: "no",
      },
    },
  }),
  new FormComponentModel({
    id: "checkbox-group",
    label: "Checkbox Group",
    label_info: "Group of checkboxes",
    type: "checkbox-group",
    category: "form",
    icon: "ListChecks",
    options: [
      { value: "option1", label: "Option 1", labelDescription: "Option 1 Description", checked: true },
      { value: "option2", label: "Option 2", labelDescription: "Option 2 Description" },
    ],
  }),
  new FormComponentModel({
    id: "radio",
    label: "Radio Group",
    label_info: "Group of radio buttons",
    type: "radio",
    category: "form",
    icon: "CircleDot",
    options: [
      { value: "option1", label: "Option 1", labelDescription: "Option 1 Description" },
      { value: "option2", label: "Option 2", labelDescription: "Option 2 Description" },
    ],
  }),
  new FormComponentModel({
    id: "toggle-group",
    label: "Toggle Group",
    label_info: "Set of toggle buttons",
    type: "toggle-group",
    category: "form",
    icon: "SquareSplitHorizontal",
    properties: { variant: "outline", settings: { multiple: "no" } },
    options: [
      { value: "option1", label: "Option 1", checked: true },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  }),
  new FormComponentModel({
    id: "slider",
    label: "Slider",
    label_info: "Pick a number from a range",
    type: "slider",
    category: "form",
    icon: "SlidersHorizontal",
    value: 50,
    properties: { settings: { min: 0, max: 100, step: 1, range: "no" } },
  }),
  new FormComponentModel({
    id: "date",
    label: "Date Picker",
    label_info: "Date picker input",
    type: "date",
    category: "form",
    icon: "Calendar",
    attributes: { placeholder: "Pick a date" },
  }),
  new FormComponentModel({
    id: "switch",
    label: "Switch",
    label_info: "Toggle switch",
    label_description: "Switch Description",
    type: "switch",
    category: "form",
    icon: "ToggleLeft",
    properties: {
      style: {
        showLabel: "no",
      },
    },
  }),
  new FormComponentModel({
    id: "button",
    label: "Button",
    label_info: "Button",
    content: "Button",
    type: "button",
    category: "form",
    icon: "SquareMousePointer",
    properties: { style: { showLabel: "no" }, variant: "outline" },
    attributes: { type: "button" }
  }),
  new FormComponentModel({
    id: "submit-button",
    label: "Submit",
    label_info: "Button to submit form",
    content: "Submit",
    type: "submit-button",
    category: "form",
    icon: "SquareMousePointer",
    properties: { style: { showLabel: "no" } },
    attributes: { type: "submit" }
  }),
  new FormComponentModel({
    id: "reset-button",
    label: "Reset",
    label_info: "Button to reset form input values",
    content: "Reset",
    type: "reset-button",
    category: "form",
    icon: "SquareMousePointer",
    properties: { style: { showLabel: "no" }, variant: "outline" },
    attributes: { type: "reset" }
  }),
  new FormComponentModel({
    id: "button-group",
    label: "Button Group",
    label_info: "Row of related buttons",
    type: "button-group",
    category: "content",
    icon: "Group",
    properties: { variant: "outline", settings: { orientation: "horizontal" } },
    options: [
      { value: "reset", label: "Cancel" },
      { value: "submit", label: "Save" },
    ],
  }),
];

export const AVAILABLE_COMPONENTS: FormComponentModel[] = [...typographyComponents, ...formComponents];

export const NEW_COMPONENTS: string[] = [
  "combobox",
  "slider",
  "input-otp",
  "toggle-group",
  "input-group",
  "separator",
  "alert",
  "badge",
  "kbd",
  "spinner",
  "button-group",
];

const typographyViews = {
  text: { render: (component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps) => Text(component, form, field), renderDesignProperties: TextDesignProperties, reactCode: getReactCodeText },
};

/** Content components that render from the model alone (no form field). */
const contentViews = {
  separator: { render: FormSeparator, renderDesignProperties: SeparatorDesignProperties, reactCode: getReactCodeSeparator },
  alert: { render: FormAlert, renderDesignProperties: AlertDesignProperties, reactCode: getReactCodeAlert },
  badge: { render: FormBadge, renderDesignProperties: BadgeDesignProperties, reactCode: getReactCodeBadge },
  kbd: { render: FormKbd, renderDesignProperties: KbdDesignProperties, reactCode: getReactCodeKbd },
  spinner: { render: FormSpinner, renderDesignProperties: SpinnerDesignProperties, reactCode: getReactCodeSpinner },
  "button-group": { render: FormButtonGroup, renderDesignProperties: ButtonGroupDesignProperties, reactCode: getReactCodeButtonGroup },
};

const formViews = {
  input: { render: FormInput, renderDesignProperties: InputDesignProperties, reactCode: getReactCodeInput },
  "credit-card": { render: FormCreditCard, renderDesignProperties: CreditCardDesignProperties, reactCode: getReactCodeCreditCard },
  textarea: { render: FormTextarea, renderDesignProperties: TextareaDesignProperties, reactCode: getReactCodeTextarea },
  select: { render: FormSelect, renderDesignProperties: SelectDesignProperties, reactCode: getReactCodeSelect },
  "native-select": { render: FormNativeSelect, renderDesignProperties: NativeSelectDesignProperties, reactCode: getReactCodeNativeSelect },
  checkbox: { render: FormCheckbox, renderDesignProperties: CheckboxDesignProperties, reactCode: getReactCodeCheckbox },
  "checkbox-group": { render: FormCheckboxGroup, renderDesignProperties: CheckboxGroupDesignProperties, reactCode: getReactCodeCheckboxGroup },
  radio: { render: FormRadio, renderDesignProperties: RadioDesignProperties, reactCode: getReactCodeRadio },
  switch: { render: FormSwitch, renderDesignProperties: SwitchDesignProperties, reactCode: getReactCodeSwitch },
  button: { render: FormButton, renderDesignProperties: ButtonDesignProperties, reactCode: getReactCodeButton },
  "submit-button": { render: FormButton, renderDesignProperties: ButtonDesignProperties, reactCode: getReactCodeButton },
  "reset-button": { render: FormButton, renderDesignProperties: ButtonDesignProperties, reactCode: getReactCodeButton },
  date: { render: FormDatePicker, renderDesignProperties: DatePickerDesignProperties, reactCode: getReactCodeDatePicker },
  combobox: { render: FormCombobox, renderDesignProperties: ComboboxDesignProperties, reactCode: getReactCodeCombobox },
  slider: { render: FormSlider, renderDesignProperties: SliderDesignProperties, reactCode: getReactCodeSlider },
  "input-otp": { render: FormInputOtp, renderDesignProperties: InputOtpDesignProperties, reactCode: getReactCodeInputOtp },
  "toggle-group": { render: FormToggleGroup, renderDesignProperties: ToggleGroupDesignProperties, reactCode: getReactCodeToggleGroup },
  "input-group": { render: FormInputGroup, renderDesignProperties: InputGroupDesignProperties, reactCode: getReactCodeInputGroup },
};

const views = {
  ...typographyViews,
  ...contentViews,
  ...formViews,
  number: formViews.input,
  email: formViews.input,
  password: formViews.input,
  tel: formViews.input,
  url: formViews.input,
  file: formViews.input,
};

export function getComponentReactCode(component: FormComponentModel): ReactCode | undefined {

  const componentView = views[component.type as keyof typeof views];
  if (!componentView) return undefined;

  return componentView.reactCode(component);
}

export function getCoponentSidebarOptions(component: FormComponentModel) {

  const componentView = views[component.type as keyof typeof views];
  if (!componentView) return undefined;

  return componentView.renderDesignProperties;
}

export function renderComponent(component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps): React.ReactNode | undefined {

  const componentView = views[component.type as keyof typeof views];
  if (!componentView) return undefined;

  return componentView.render(component, form, field)
}

/** Whether a content component renders from its model (true) or via the text editor (false). */
export function isStaticContentComponent(component: FormComponentModel): boolean {
  return component.type in contentViews;
}

export function renderContentComponent(component: FormComponentModel): React.ReactNode | undefined {
  const componentView = contentViews[component.type as keyof typeof contentViews];
  return componentView?.render(component);
}
