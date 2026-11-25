import { msg } from "@fw-components/localize";

export function themeLabel(key: string): string {
  switch (key) {
    case "Background Color":
      return msg("Background Colour");
    case "Menu Color":
      return msg("Menu Colour");
    case "Menu Text Color":
      return msg("Menu Text Colour");
    case "Primary Color":
      return msg("Primary Colour");
    case "Text Color":
      return msg("Text Colour");
    case "Widget Color":
      return msg("Widget Colour");
    default:
      return msg(key.replace(/\bColor\b/g, "Colour"));
  }
}
