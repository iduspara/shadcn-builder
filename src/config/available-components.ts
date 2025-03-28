import { ComponentViews, FormRow } from "@/types/form-builder.types";
import { FormComponentModel } from "@/components/form-builder/Models/FormComponent";
import {
  // Form Components
  FormInput,
  FormTextarea,
  FormSelect,
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
  getReactCodeCheckbox,
  getReactCodeRadio,
  getReactCodeSwitch,
  getReactCodeButton,
  getReactCodeDatePicker,
  getReactCodeText,
  getReactCodeCheckboxGroup,
  } from "@/components/form-builder/form-components";

const typographyComponents: FormComponentModel[] = [
  new FormComponentModel({
    id: "text",
    label: "Text",
    type: "text",
    category: "content",
    icon: "Text",
    content: "Text",
  })
];

const formComponents: FormComponentModel[] = [
  new FormComponentModel({
    id: "text-input",
    label: "Text Input",
    type: "input",
    category: "form",
    icon: "TextCursorInput",
    attributes: { type: "text" },
  }),
  new FormComponentModel({
    id: "textarea",
    label: "Text Area",
    type: "textarea",
    category: "form",
    icon: "AlignLeftIcon",
  }),
  new FormComponentModel({
    id: "number-input",
    label: "Number Input",
    type: "number",
    category: "form",
    icon: "HashIcon",
    attributes: { type: "number" },
  }),
  new FormComponentModel({
    id: "email-input",
    label: "Email Input",
    type: "email",
    category: "form",
    icon: "MailIcon",
    attributes: { type: "email" },
  }),
  new FormComponentModel({
    id: "password-input",
    label: "Password Input",
    type: "password",
    category: "form",
    icon: "LockIcon",
    attributes: { type: "password" },
  }),
  new FormComponentModel({
    id: "file-input",
    label: "File Input",
    type: "file",
    category: "form",
    icon: "UploadIcon",
    attributes: { type: "file" },
  }),
  new FormComponentModel({
    id: "tel-input",
    label: "Tel Input",
    type: "tel",
    category: "form",
    icon: "PhoneIcon",
    attributes: { type: "tel" },
  }),
  new FormComponentModel({
    id: "url-input",
    label: "Url Input",
    type: "url",
    category: "form",
    icon: "LinkIcon",
    attributes: { type: "url" },
  }),
  new FormComponentModel({
    id: "select",
    label: "Select",
    type: "select",
    category: "form",
    icon: "ListIcon",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ],
  }),
  new FormComponentModel({
    id: "checkbox",
    label: "Checkbox",
    label_description: "Checkbox Description",
    type: "checkbox",
    category: "form",
    icon: "CheckSquareIcon",
    properties: {
      style: {
        showLabel: "no",
      },
    },
  }),
  new FormComponentModel({
    id: "checkbox-group",
    label: "Checkbox Group",
    type: "checkbox-group",
    category: "form",
    icon: "ListChecksIcon",
    options: [
      { value: "option1", label: "Option 1", checked: true },
      { value: "option2", label: "Option 2" },
    ],
  }),
  new FormComponentModel({
    id: "radio",
    label: "Radio Group",
    type: "radio",
    category: "form",
    icon: "CircleDotIcon",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ],
  }),
  new FormComponentModel({
    id: "date",
    label: "Date Picker",
    type: "date",
    category: "form",
    icon: "CalendarIcon",
    attributes: { placeholder: "Pick a date" },
  }),
  new FormComponentModel({
    id: "switch",
    label: "Switch",
    label_description: "Switch Description",
    type: "switch",
    category: "form",
    icon: "ToggleLeftIcon",
    properties: {
      style: {
        showLabel: "no",
      },
    },
  }),
  new FormComponentModel({
    id: "button",
    label: "Button",
    content: "Button",
    type: "button",
    category: "form",
    icon: "SquareMousePointer",
    properties: { style: { showLabel: "no" } },
    attributes: { type: "button" }
  }),
];

export const AVAILABLE_COMPONENTS: FormComponentModel[] = [...typographyComponents, ...formComponents];

const typographyViews = {
  text: { render: (component: FormComponentModel, row?: FormRow) => Text(component, row), renderDesignProperties: TextDesignProperties, reactCode: getReactCodeText },
};

const formViews = {
  input: { render: FormInput, renderDesignProperties: InputDesignProperties, reactCode: getReactCodeInput },
  textarea: { render: FormTextarea, renderDesignProperties: TextareaDesignProperties, reactCode: getReactCodeTextarea },
  select: { render: FormSelect, renderDesignProperties: SelectDesignProperties, reactCode: getReactCodeSelect },
  checkbox: { render: FormCheckbox, renderDesignProperties: CheckboxDesignProperties, reactCode: getReactCodeCheckbox },
  "checkbox-group": { render: FormCheckboxGroup, renderDesignProperties: CheckboxGroupDesignProperties, reactCode: getReactCodeCheckboxGroup },
  radio: { render: FormRadio, renderDesignProperties: RadioDesignProperties, reactCode: getReactCodeRadio },
  switch: { render: FormSwitch, renderDesignProperties: SwitchDesignProperties, reactCode: getReactCodeSwitch },
  button: { render: FormButton, renderDesignProperties: ButtonDesignProperties, reactCode: getReactCodeButton },
  date: { render: FormDatePicker, renderDesignProperties: DatePickerDesignProperties, reactCode: getReactCodeDatePicker },
};

export function getComponentViews(component: FormComponentModel, row?: FormRow): ComponentViews | undefined {
  const views = {
    ...typographyViews,
    ...formViews,
    number: formViews.input,
    email: formViews.input,
    password: formViews.input,
    tel: formViews.input,
    url: formViews.input,
    file: formViews.input,
  };

  const componentView = views[component.type as keyof typeof views];
  if (!componentView) return undefined;

  return {
    render:  componentView.render(component, row),
    renderDesignProperties: componentView.renderDesignProperties,
    reactCode: componentView.reactCode(component),
  };
}
