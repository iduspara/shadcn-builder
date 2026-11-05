"use client";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TemplateSelectProps {
  value: string;
  groups: {
    category: string;
    templates: { formId: string; formTitle: string }[];
  }[];
}

/** Mobile template switcher; navigates to the chosen template's page. */
export function TemplateSelect({ value, groups }: TemplateSelectProps) {
  const router = useRouter();

  const items = groups.flatMap(({ category, templates }) =>
    templates.map((template) => ({
      value: `${category}/${template.formId}`,
      label: template.formTitle,
    }))
  );

  return (
    <Select
      items={items}
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue && nextValue !== value) {
          router.push(`/template/${nextValue}`);
        }
      }}
    >
      <SelectTrigger className="w-full md:hidden">
        <SelectValue placeholder="Select a template" />
      </SelectTrigger>
      <SelectContent>
        {groups.map(({ category, templates }) => (
          <SelectGroup key={category}>
            <SelectLabel className="capitalize">
              {category.replace(/-/g, " ")}
            </SelectLabel>
            {templates.map((template) => (
              <SelectItem
                key={template.formId}
                value={`${category}/${template.formId}`}
              >
                {template.formTitle}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
