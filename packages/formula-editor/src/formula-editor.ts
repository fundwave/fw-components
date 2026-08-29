import { SuggestionMenu } from "./suggestion-menu.js";

import { html, LitElement, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import { getFormulaTokens } from "./utils/get-formula-tokens.js";
import { Parser } from "./utils/parser.js";

import { FormulaEditorStyles } from "./styles/editor.js";
import { mathematicalOperators } from "./utils/constants.js";

@customElement("formula-editor")
export class FormulaEditor extends LitElement {
  /**
   * Formula Parser
   */
  private _parser!: Parser;

  @state()
  recommendations: string[] = [];

  @state()
  currentCursorPosition: number = 0;

  /**
   * user input event type
   */
  @state()
  lastInputType: string = "";

  @state()
  _selectedRecommendation: string = "";

  @state()
  isFocused: boolean = false;

  /**
   * Text area input value
   */
  @property()
  formulaString: string = "";

  @property()
  placeholder: string = "Type your formula...";

  @property({ type: Object })
  recommendationLabels: Map<string, number> = new Map();

  @property({ type: String })
  label: string = "";

  @property({ type: Object })
  variables: Map<string, number> = new Map();

  @property({ type: String })
  variableType: string = "";

  @property({ type: Number })
  minSuggestionLen: number = 2;

  @property({ type: String })
  errorString: string = "";

  @property({ type: Object })
  formulaRegex: RegExp = /[A-Za-z0-9_#@.]+|[-+(),*^/\s]/g;

  @property({ type: Boolean })
  allowedNumbers: boolean = true;

  @property({ type: Object })
  allowedOperators: Set<string> = mathematicalOperators;

  @query("#fw-formula-editor")
  editor!: HTMLTextAreaElement;

  @query("suggestion-menu")
  suggestionMenu!: SuggestionMenu;

  protected updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has("formulaString")) {
      if (!this.formulaString?.trim()) {
        this.recommendations = Array.from(this.variables.keys());
      }

      this._adjustTextAreaHeight();
    }

    if (_changedProperties.has("variables")) {
      this._parser = new Parser(this.variables, this.minSuggestionLen, this.formulaRegex, this.allowedNumbers, this.allowedOperators, this.variableType);
      this.recommendations = Array.from(this.variables.keys());
    }
  }

  onRecommendationClick(recommendation: string) {
    this.parseInput(recommendation);
  }

  handleContentUpdate(event: InputEvent) {
    event.preventDefault();

    this.lastInputType = event.inputType;
    this.formulaString = (event.target as HTMLInputElement).value;
    this.parseInput();
  }

  _adjustTextAreaHeight() {
    requestAnimationFrame(() => {
      if (!this.editor) return;

      this.editor.style.height = "var(--fe-height, 30px)";

      const newHeight = this.editor.scrollHeight;

      this.editor.style.height = `${newHeight + 5}px`;
    });
  }

  /**
   * @param recommendation The recommendation which needs to be inserted
   * at the current cursor position
   * @returns void
   */
  parseInput(recommendation: string = "") {
    this.currentCursorPosition = this.editor.selectionStart;

    const { recommendations, errorString, formattedString, newCursorPosition } = this._parser.parseInput(this.formulaString, this.currentCursorPosition, recommendation);

    this.recommendations = recommendations;
    this.errorString = errorString || "";

    /**
     * Don't modify the text stream manually if the text is being composed,
     * unless the user manually chooses to do so by selecting a recommendation.
     * @see https://github.com/w3c/input-events/issues/86
     * @see https://github.com/w3c/input-events/pull/122
     * @see https://bugs.chromium.org/p/chromium/issues/detail?id=689541
     */
    if (this.lastInputType !== "insertCompositionText" || recommendation) {
      this.formulaString = formattedString!;
    }

    if (Boolean(recommendation)) {
      this.recommendations = [];
      this.currentCursorPosition = newCursorPosition;

      /* update cursor position in text area */
      setTimeout(() => {
        this.editor.setSelectionRange(this.currentCursorPosition, this.currentCursorPosition);
      }, 0);
    }

    this.dispatchEvent(
      new CustomEvent("fw-formula-content-changed", {
        detail: {
          formulaString: this.formulaString,
          error: this.errorString,
          recommendations: this.recommendations,
          formulaTokens: getFormulaTokens(this.formulaString || "", this.formulaRegex)
        },
        bubbles: true
      })
    );
  }

  formatFormula() {
    if (!this.formulaString) return;

    const newContent = this._parser.addParentheses(this.formulaString);
    this.formulaString = newContent && newContent.length ? newContent : this.formulaString;

    this.parseInput();
    this.recommendations = [];
  }

  handleFocus(focus: boolean) {
    this.isFocused = focus;
  }

  handleKeydown(event: KeyboardEvent) {
    if (!this.recommendations?.length) return;

    if (event.code === "Tab") {
      event.preventDefault();
      if (this.recommendations?.length === 1) {
        this.suggestionMenu.handleRecommendationSelect(0);
      } else {
        const direction = event.shiftKey ? "up" : "down";
        this.suggestionMenu.navigate(direction);
      }
    } else if (event.code === "ArrowDown" || event.code === "ArrowUp") {
      event.preventDefault();
      const direction = event.code === "ArrowDown" ? "down" : "up";
      this.suggestionMenu.navigate(direction);
    } else if (event.code === "Enter") {
      event.preventDefault();
      this.suggestionMenu.handleRecommendationSelect();
    }
  }

  render() {
    return html`
      <style>
        ${FormulaEditorStyles}
      </style>

      ${this.label ? html`<label for="fw-formula-editor" class="editor-label">${this.label}</label>` : ""}

      <textarea
        id="fw-formula-editor"
        class=${this.errorString?.length ? "error" : ""}
        .value=${this.formulaString}
        .placeholder=${this.placeholder}
        spellcheck="false"
        autocomplete="off"
        @input=${this.handleContentUpdate}
        @keydown=${this.handleKeydown}
        @blur=${() => this.handleFocus(false)}
        @focus=${() => this.handleFocus(true)}
      ></textarea>

      ${this.isFocused && this.recommendations?.length
        ? html`<suggestion-menu
            .recommendations=${this.recommendations}
            .currentSelection=${this._selectedRecommendation}
            .onRecommendationClick=${this.onRecommendationClick.bind(this)}
            .recommendationLabels=${this.recommendationLabels}
          ></suggestion-menu>`
        : ""}
    `;
  }
}
