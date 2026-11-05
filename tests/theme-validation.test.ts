import { describe, expect, it } from "vitest";
import { getThemeCSSError, getThemeFormError } from "@/components/form-builder/dialogs/theme-config-dialog";

const VALID = ":root { --a: 1; } .dark { --a: 2; }";

describe("theme validation", () => {
  it.each([
    ["", "Theme CSS cannot be empty"],
    ["   ", "Theme CSS cannot be empty"],
    [".dark {}", "Theme must include :root selector"],
    [":root {}", "Theme must include .dark selector"],
    [":root { .dark {}", "CSS has unbalanced braces"],
    [VALID, null],
  ])("css %j", (css, error) => {
    expect(getThemeCSSError(css)).toBe(error);
  });

  it("checks the CSS before the name", () => {
    expect(getThemeFormError("", "")).toBe("Theme CSS cannot be empty");
    expect(getThemeFormError(VALID, "  ")).toBe("Theme name is required");
    expect(getThemeFormError(VALID, "Ocean")).toBeNull();
  });
});
