export function getColorForString(input: string, luminance = "80%"): string {
  if (!input) return "plum";
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash = (hash ^ input.charCodeAt(i)) * 16777219;
  }
  const highlight = hash % 360;
  return `hsl(${highlight}, 50%, ${luminance})`;
}
