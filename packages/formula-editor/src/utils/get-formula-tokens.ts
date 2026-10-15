export function getFormulaTokens(formulaString: string, formulaRegex: RegExp): string[] {
  if (!formulaString?.length) return [];

  if (!Boolean(formulaRegex)) return formulaString.split(/(\s+)/) || [];

  return formulaString.match(formulaRegex) || [];
}
