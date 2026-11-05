import { describe, expect, it } from "vitest";
import { buildFormPayload } from "@/hooks/use-save-form";

describe("buildFormPayload", () => {
  it("falls back to defaults", () => {
    expect(buildFormPayload(undefined, "My form", [{ id: "a" }])).toEqual({
      title: "My form",
      description: "Form created with Form Builder",
      components: [{ id: "a" }],
      tags: [],
      category: "custom",
    });
  });

  it("prefers explicit options, ignoring empty strings", () => {
    expect(
      buildFormPayload({ title: "", description: "Desc", tags: ["x"], category: "survey", forceNew: true }, "Fallback", [])
    ).toEqual({ title: "Fallback", description: "Desc", components: [], tags: ["x"], category: "survey" });
  });
});
