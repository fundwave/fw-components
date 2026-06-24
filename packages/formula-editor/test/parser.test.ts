import { describe, expect, it } from "vitest";

import { Parser } from "../src/utils/parser.js";

describe("Parser.calculate", () => {
  describe("basic arithmetic", () => {
    const vars = new Map<string, number>([
      ["A", 10],
      ["B", 5],
      ["C", 2]
    ]);
    const parser = new Parser(vars, 0);

    it("adds two variables", () => {
      expect(parser.calculate("A + B").result).toBe(15);
    });

    it("subtracts two variables", () => {
      expect(parser.calculate("A - B").result).toBe(5);
    });

    it("multiplies two variables", () => {
      expect(parser.calculate("A * B").result).toBe(50);
    });

    it("divides two variables", () => {
      expect(parser.calculate("A / B").result).toBe(2);
    });

    it("handles exponentiation", () => {
      expect(parser.calculate("C ^ B").result).toBe(32);
    });
  });

  describe("unary operators", () => {
    const vars = new Map<string, number>([
      ["X", 100],
      ["Y", 200],
      ["A", 10],
      ["B", 5],
      ["C", 2]
    ]);
    const parser = new Parser(vars, 0);

    it("negates a single variable", () => {
      expect(parser.calculate("- A").result).toBe(-10);
    });

    it("handles unary minus with division (- X / Y)", () => {
      expect(parser.calculate("- X / Y").result).toBe(-0.5);
    });

    it("rejects unary minus after operator as consecutive operators (A + - B)", () => {
      expect(parser.calculate("A + - B").result).toBeUndefined();
    });

    it("rejects unary minus after operator with multiplication (A + - B * C)", () => {
      expect(parser.calculate("A + - B * C").result).toBeUndefined();
    });

    it("handles unary minus inside parentheses ((- A + B) * C)", () => {
      expect(parser.calculate("(- A + B) * C").result).toBe(-10);
    });

    it("handles unary plus", () => {
      expect(parser.calculate("+ A").result).toBe(10);
    });

    it("rejects unary plus after operator as consecutive operators (A + + B)", () => {
      expect(parser.calculate("A + + B").result).toBeUndefined();
    });
  });

  describe("operator precedence", () => {
    const vars = new Map<string, number>([
      ["A", 10],
      ["B", 5],
      ["C", 2]
    ]);
    const parser = new Parser(vars, 0);

    it("multiplication before addition", () => {
      expect(parser.calculate("A + B * C").result).toBe(20);
    });

    it("parentheses override precedence", () => {
      expect(parser.calculate("(A + B) * C").result).toBe(30);
    });

    it("division before subtraction", () => {
      expect(parser.calculate("A - B / C").result).toBe(7.5);
    });
  });

  describe("division by zero", () => {
    const vars = new Map<string, number>([
      ["A", 10],
      ["ZERO", 0]
    ]);
    const parser = new Parser(vars, 0);

    it("returns undefined for division by zero variable (caught by parseInput)", () => {
      const result = parser.calculate("A / ZERO");
      expect(result.result).toBeUndefined();
    });

    it("returns error for division by zero literal", () => {
      const result = parser.calculate("A / 0");
      expect(result.result).toBeUndefined();
    });
  });
});

describe("Parser.parseInput", () => {
  const vars = new Map<string, number>([
    ["X", 100],
    ["Y", 200]
  ]);
  const parser = new Parser(vars, 0);

  it("does not error on valid unary formula", () => {
    expect(parser.parseInput("- X / Y").errorString).toBeNull();
  });

  it("errors on unknown variable", () => {
    expect(parser.parseInput("UNKNOWN + X").errorString).toContain("doesn't exist");
  });

  it("errors on consecutive operators", () => {
    expect(parser.parseInput("X * / Y").errorString).not.toBeNull();
  });

  it("errors on trailing operator", () => {
    expect(parser.parseInput("X +").errorString).not.toBeNull();
  });

  it("errors on unmatched parentheses", () => {
    expect(parser.parseInput("(X + Y").errorString).not.toBeNull();
  });
});

describe("Parser.addParentheses", () => {
  const vars = new Map<string, number>([
    ["A", 10],
    ["B", 5],
    ["C", 2]
  ]);
  const parser = new Parser(vars, 0);

  it("does not add redundant parentheses when precedence is unambiguous", () => {
    const result = parser.addParentheses("A + B * C");
    expect(result).toBe("A + B * C");
  });

  it("adds parentheses when lower-precedence op is nested", () => {
    const result = parser.addParentheses("(A + B) * C");
    expect(result).toBe("(A + B) * C");
  });

  it("handles unary minus formula", () => {
    const vars2 = new Map<string, number>([
      ["X", 100],
      ["Y", 200]
    ]);
    const p2 = new Parser(vars2, 0);
    const result = p2.addParentheses("- X / Y");
    expect(result).toBe("-X / Y");
  });
});
