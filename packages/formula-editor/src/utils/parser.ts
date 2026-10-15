import { mathematicalOperators, operatorPrecedence, unaryOperators } from "./constants.js";

import { getFormulaTokens } from "./get-formula-tokens.js";
import { Queue } from "./queue.js";
import { Recommender } from "./recommendor.js";
import { Stack } from "./stack.js";

import Big from "big.js";

import { CalculateResult, Expectation, ParseResult } from "../types";

export class Parser {
  private _recommender: Recommender;
  variables: Map<string, number>;
  formulaRegex: RegExp;
  allowedNumbers: boolean;
  allowedOperators: Set<string>;
  variableType: string;

  constructor(
    variables: Map<string, number>,
    minSuggestionLen: number,
    formulaRegex: RegExp = /[A-Za-z0-9_#@.]+|[-+(),*^/\s]/g,
    allowedNumbers: boolean = true,
    allowedOperators: Set<string> = mathematicalOperators,
    variableType: string = ""
  ) {
    this.variables = variables;
    this.formulaRegex = formulaRegex;
    this._recommender = new Recommender(Array.from(this.variables.keys()), minSuggestionLen);
    this.allowedNumbers = allowedNumbers;
    this.allowedOperators = allowedOperators;
    this.variableType = variableType;
  }

  isNumber(value: string) {
    if (!this.allowedNumbers || value.trim() === "") return false;

    return !Number.isNaN(Number(value));
  }

  /**
   * Checks whether a token is a valid operand: a known variable, a number, or a unary-prefixed variable
   */
  private isOperand(token: string): boolean {
    if (!token.trim().length) return false;
    if (!Number.isNaN(Number(token)) || this.variables.has(token)) return true;

    if (token.length > 1 && unaryOperators.includes(token[0])) {
      const inner = token.substring(1);
      return !Number.isNaN(Number(inner)) || this.variables.has(inner);
    }
    return false;
  }

  formatFormulaToken(token: string) {
    for (const existingKey of this.variables.keys()) {
      if (existingKey.toLowerCase() === token.toLowerCase()) {
        return existingKey;
      }
    }
    return token;
  }

  parseInput(formula: string, prevCurPos: number | null = null, recommendation: string | null = null): ParseResult {
    const tokens = getFormulaTokens(formula, this.formulaRegex);
    const parentheses = new Stack<number>();
    let expectation = Expectation.VARIABLE;
    let currentPosition = 0;
    let previousToken = "";
    let parsedString = "";

    const parseOutput: ParseResult = {
      recommendations: [],
      formattedString: "",
      newCursorPosition: prevCurPos ?? -1,
      errorString: null
    };

    if (!formula.trim() && recommendation) {
      parseOutput.formattedString = recommendation;
      parseOutput.newCursorPosition = recommendation.length;

      return parseOutput;
    }

    tokens?.forEach((token) => {
      token = this.formatFormulaToken(token);
      let isNumber = this.variables.has(token) || this.isNumber(token);
      const isOperator = this.allowedOperators.has(token);
      const isSpace = token.trim() === "";
      const isBracket = token === "(" || token === ")";

      if (isSpace) {
        parseOutput.formattedString += token;
        currentPosition += token.length;

        return;
      }

      /**
       * Check if the cursor is in between the formula string
       *
       * - If we've got a recommendation to add, replace the word with the recommendation
       * - Update recommendations based on the token/word
       */
      if (currentPosition <= prevCurPos! && currentPosition + token.length >= prevCurPos!) {
        if (recommendation) {
          isNumber = true;

          if (this.allowedOperators.has(token)) {
            const updatedTokenString = `${token} ${recommendation}`;

            parseOutput.formattedString += updatedTokenString;
            currentPosition += updatedTokenString.length;
            parseOutput.newCursorPosition = currentPosition;

            recommendation = null;
            return;
          }

          const updatedTokenLength = recommendation.length - token.length;
          parseOutput.newCursorPosition = Math.min(parseOutput.newCursorPosition, formula.length) + updatedTokenLength;

          token = recommendation;
          recommendation = null;
        }

        parseOutput.recommendations = this._recommender.getRecommendations(token);
      }

      /**
       * Error checks
       * skip error check if there is one already
       */
      if (expectation !== Expectation.UNDEFINED) {
        /**
         * Unknown symbol/variable/word
         */
        if (!(isNumber || isOperator || isBracket || isSpace)) {
          parseOutput.errorString = `${this.variableType} : '${token}' doesn't exist.`;
          expectation = Expectation.UNDEFINED;
        } else if (this.allowedOperators.has(previousToken) && isOperator) {
          parseOutput.errorString = `Please don't use mathematical operators (${Array.from(this.allowedOperators).join(" ")}) consecutively.`;
          expectation = Expectation.UNDEFINED;
        } else if (parentheses.isEmpty() && token === ")") {
          parseOutput.errorString = "Unexpected closing bracket. Make sure all opening brackets '(' have matching closing brackets ')'.";
          expectation = Expectation.UNDEFINED;
        } else if (
          /**
           * Operator or ')' after an operator (Eg: '23 / *' or '23 / )')
           * No error for Unary `+` and `-` as they might represent a positive or negative number respectively
           */
          expectation === Expectation.VARIABLE &&
          !isNumber &&
          !isSpace &&
          token !== "(" &&
          !(unaryOperators.includes(token) && (!parsedString.trim() || previousToken === "(" || this.allowedOperators.has(previousToken)))
        ) {
          parseOutput.errorString = `Please use ${this.variableType} ${this.variableType && this.allowedNumbers ? " or " : ""} ${this.allowedNumbers ? "numbers" : ""} after '${previousToken}'.`;
          expectation = Expectation.UNDEFINED;
        } else if (expectation === Expectation.OPERATOR && !isOperator && !isSpace && token !== ")") {
          /**
           * Multiple number/variable together without operator
           */
          parseOutput.errorString = `Please use mathematical operators (${Array.from(this.allowedOperators).join(" ")}) after '${previousToken}'.`;
          expectation = Expectation.UNDEFINED;
        } else if (isNumber && previousToken === "/" && (this.variables.get(token) === 0 || Number(token) === 0)) {
          /**
           * division by zero
           */
          parseOutput.errorString = `Division by zero is not possible.`;
          expectation = Expectation.UNDEFINED;
        } else if (previousToken === "(" && token === ")") {
          /**
           * Empty brackets
           */
          parseOutput.errorString = `Please don't use empty brackets ().`;
          expectation = Expectation.UNDEFINED;
        }
      }

      /**
       * Setting the expectation for the next token, if no error is there till now
       */
      if (expectation !== Expectation.UNDEFINED) {
        if (token === "(" || isOperator) {
          expectation = Expectation.VARIABLE;
        } else if (token === ")" || isNumber) {
          expectation = Expectation.OPERATOR;
        }
      }

      if (token === "(") parentheses.push(currentPosition);
      else if (token === ")") parentheses.pop();

      parseOutput.formattedString += token;
      currentPosition += token.length;
      parsedString += token;
      previousToken = token;
    });

    if (recommendation) {
      parseOutput.newCursorPosition = Math.min(parseOutput.newCursorPosition, formula.length) + recommendation.length;
      parseOutput.formattedString += recommendation;
      previousToken = recommendation;
    }

    if (this.allowedOperators.has(previousToken) || !previousToken.trim().length) {
      parseOutput.recommendations = !parseOutput.errorString?.length ? Array.from(this.variables.keys()) : [];
    }

    if (this.allowedOperators.has(previousToken)) {
      parseOutput.errorString = `Please don't use mathematical operators (${Array.from(this.allowedOperators).join(" ")}) at the end.`;
    }

    if (!parentheses.isEmpty()) {
      parseOutput.errorString = "Unexpected opening bracket. Make sure all closing brackets ')' have matching opening brackets '('.";
    }

    return parseOutput;
  }

  buildRPN(formula: string): Queue<string> | null {
    if (this.parseInput(formula).errorString) return null;

    const tokens = getFormulaTokens(formula, this.formulaRegex)?.filter((el: string) => !/\s+/.test(el) && el !== "");

    let previousToken = "";
    let carriedToken: string | null = null;
    const parsedTokens: string[] = [];
    let currentTokens = "";

    // Check if variables include unary operators `-` and `+`.
    for (const token of tokens) {
      if (unaryOperators.includes(token) && (!currentTokens.trim() || previousToken === "(" || this.allowedOperators.has(previousToken))) {
        carriedToken = token;
      } else if (carriedToken) {
        parsedTokens.push(carriedToken + token);
        carriedToken = null;
      } else {
        parsedTokens.push(token);
      }

      previousToken = token;
      currentTokens += token;
    }

    /**
     * Shunting Yard Algorithm (EW Dijkstra)
     */
    const operatorStack = new Stack<string>();
    const outputQueue = new Queue<string>();

    for (const token of parsedTokens) {
      if (token === "(") {
        operatorStack.push("(");
      } else if (token === ")") {
        while (!operatorStack.isEmpty() && operatorStack.top() !== "(") {
          outputQueue.enqueue(operatorStack.pop()!);
        }

        operatorStack.pop();
      } else if (this.allowedOperators.has(token)) {
        while (!operatorStack.isEmpty() && this.allowedOperators.has(operatorStack.top()!) && operatorPrecedence[token] <= operatorPrecedence[operatorStack.top()!]) {
          outputQueue.enqueue(operatorStack.pop()!);
        }

        operatorStack.push(token);
      } else if (this.isOperand(token)) {
        outputQueue.enqueue(token);
      }
    }

    while (!operatorStack.isEmpty() && operatorStack.top()) {
      outputQueue.enqueue(operatorStack.pop()!);
    }

    return outputQueue;
  }

  addParentheses(formula: string): string | null {
    const rpn = this.buildRPN(formula);
    if (!rpn) return null;

    const lexedRPN: string[] = [];

    while (!rpn.isEmpty()) {
      lexedRPN.push(rpn.dequeue()!);
    }

    const operatorStack = new Stack<string | null>();
    const resultStack = new Stack<string>();

    lexedRPN.forEach((symbol) => {
      let parsedLeftExpression: string;
      let parsedRightExpression: string;

      // check if the symbol is a number or variable or unaryOperatorPreceded Variable
      if (this.isOperand(symbol)) {
        resultStack.push(symbol);
        operatorStack.push(null);
      }

      // If symbol is an operator, check operatorStack, adds brackets accordingly to the result and add it to operatorStack
      else if (Object.keys(operatorPrecedence).includes(symbol)) {
        const [rightExpression, leftExpression, operatorA, operatorB] = [resultStack.pop()!, resultStack.pop()!, operatorStack.pop()!, operatorStack.pop()!];

        if (operatorPrecedence[operatorB] <= operatorPrecedence[symbol] || (operatorPrecedence[operatorB] === operatorPrecedence[symbol] && ["/", "-"].includes(symbol))) {
          parsedLeftExpression = `(${leftExpression})`;
        } else {
          parsedLeftExpression = leftExpression;
        }

        if (operatorPrecedence[operatorA] <= operatorPrecedence[symbol] || (operatorPrecedence[operatorA] === operatorPrecedence[symbol] && ["/", "-"].includes(symbol))) {
          parsedRightExpression = `(${rightExpression})`;
        } else {
          parsedRightExpression = rightExpression;
        }

        resultStack.push(`${parsedLeftExpression} ${symbol} ${parsedRightExpression}`);

        operatorStack.push(symbol);
      } else throw `${symbol} is not a recognized symbol`;
    });

    if (resultStack.isEmpty()) throw `${lexedRPN} is not a correct RPN`;

    return resultStack.pop()!;
  }

  calculate(formula: string): CalculateResult {
    const formulaRPN = this.buildRPN(formula);
    const calculationResult: CalculateResult = {
      result: undefined,
      errorString: null
    };

    if (!formulaRPN) return calculationResult;

    const calcStack = new Stack<Big>();

    while (!formulaRPN.isEmpty()) {
      const frontItem = formulaRPN.dequeue()!;
      if (this.isOperand(frontItem)) {
        const [sign, variableKey] = /^[+-]/.test(frontItem) && frontItem.length > 1 ? [frontItem[0], frontItem.slice(1)] : ["", frontItem];
        const operandValue = Number.parseFloat(this.variables.get(variableKey)?.toString() ?? variableKey);

        const number = Number.parseFloat(`${sign}1`) * operandValue;
        calcStack.push(Big(number));
      } else {
        if (calcStack.size() < 2) {
          calculationResult.errorString = "Calculation error: Invalid formula";
          return calculationResult;
        }

        const operator = frontItem;
        const numB = calcStack.pop()!;
        const numA = calcStack.pop()!;

        try {
          switch (operator) {
            case "+":
              calcStack.push(Big(numA).add(Big(numB)));
              break;
            case "-":
              calcStack.push(Big(numA).sub(Big(numB)));
              break;
            case "*":
              calcStack.push(Big(numA).mul(Big(numB)));
              break;
            case "/":
              if (Big(numB).eq(0)) {
                calculationResult.errorString = "Division by zero encountered";
                return calculationResult;
              }

              calcStack.push(Big(numA).div(Big(numB)));
              break;
            case "^":
              calcStack.push(Big(numA).pow(parseFloat(Big(numB).toString())));
          }
        } catch (error: unknown) {
          calculationResult.errorString = error instanceof Error ? error.message : "Unknown error during calculation";
          return calculationResult;
        }
      }
    }

    if (calcStack.isEmpty()) {
      calculationResult.errorString = "Calculation error: Empty result stack";
      return calculationResult;
    }
    const topValue = calcStack.top();
    calculationResult.result = topValue !== undefined ? parseFloat(topValue.toString()) : undefined;

    return calculationResult;
  }
}
