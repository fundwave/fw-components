export const mathematicalOperators: Set<string> = new Set(["+", "-", "*", "/", "^"]);

export const unaryOperators: string[] = ["+", "-"];

export const operatorPrecedence: { [key: string]: number } = {
  "^": 3,
  "/": 2,
  "*": 2,
  "+": 1,
  "-": 1
};
