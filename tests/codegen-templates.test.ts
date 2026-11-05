import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { FIXED_NOW, loadTemplates, toModels } from "./fixtures";

// generateFormCode accumulates imports in module state, so each case gets a fresh module.
async function generate(components: ReturnType<typeof toModels>, title: string) {
  vi.resetModules();
  const { generateFormCode } = await import(
    "@/components/form-builder/helpers/generate-react-code"
  );
  return generateFormCode(components, title);
}

describe("generated code for templates", () => {
  beforeAll(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(FIXED_NOW);
  });
  afterAll(() => vi.useRealTimers());

  for (const template of loadTemplates()) {
    it(template.name, async () => {
      const { code, thirdPartyDependenciesImports } = await generate(
        toModels(template.components),
        template.title
      );
      expect(code).toMatchSnapshot();
      expect(thirdPartyDependenciesImports).toMatchSnapshot("third-party deps");
    });
  }
});
