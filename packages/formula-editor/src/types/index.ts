export enum Expectation {
  VARIABLE,
  OPERATOR,
  UNDEFINED
}

export class Formula {
  constructor(name: string, formulaString: string, precision: number = -1) {
    this.name = name || "";
    this.formulaString = formulaString || "";
    this.precision = precision;
  }

  name: string;
  formulaString: string;
  precision: number;
  error: string | null = null;
}

export interface ParseResult {
  recommendations: string[];
  formattedString: string | null;
  newCursorPosition: number;
  errorString: string | null;
}

export interface CalculateResult {
  result: number | undefined;
  errorString: string | null;
}
