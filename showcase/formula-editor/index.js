import { LitElement, html, css } from "lit";
import { property, query, state } from "lit/decorators.js";
import "@fw-components/formula-editor";
import { Parser } from "@fw-components/formula-editor/utils/parser.js";
import { Formula } from "@fw-components/formula-editor/types/index.js";

export class FWFormulaEditorShowcase extends LitElement {
  @property({ type: Object })
  formula = new Formula("Total Sales", "sales_in_quarter + additional_cost", 2);

  @state()
  calculatedResult;

  @property({ type: Object })
  variables = new Map([
    ["sales_expense", 5000],
    ["sales_in_quarter", 30000],
    ["sales_cummulative", 70000],
    ["cummulative_sum", 80000],
    ["additional_cost", 2000],
  ]);

  @query("formula-editor")
  formulaEditor;

  static styles = css`
    .container {
      width: 95%;
      margin: auto;
      font-family: Arial, sans-serif;
    }
    .variables {
      margin: 20px 0;
      padding: 15px;
      border-radius: 8px;
      background-color: #f3f3f3;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    }
    .variable-list {
      margin-top: 10px;
    }
    .variable-item {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
    }
    .formula-builder-container {
      width: 99%;
      margin-top: 20px;
    }

    .metric-name-div {
      margin: 10px 0;
    }

    .formula-label {
      display: block;
      margin: 10px 0;
    }

    #fw-formula-err {
      border-radius: 4px;
      color: var(--fe-err-text-color, #fc514f);
      border: var(--fe-err-border-width, 2px) solid black;
      /* border-top: 0px; */
      background-color: var(--fe-background-color, #222222);
      padding: 8px;
      margin: 10px 0px 8px 0px;
    }

    .fw-formula-no-err {
      color: #098668 !important;
    }
  `;

  handleCalculate = () => {
    try {
      const formulaParser = new Parser(this.variables, 0);
      const calculatedResult = formulaParser.calculate(this.formula.formulaString);

      if (calculatedResult.errorString) {
        this.calculatedResult = "Error: Invalid formula";
        console.error("Formula calculation error:", calculatedResult.errorString);
      } else {
        this.calculatedResult = calculatedResult.result;
      }
    } catch (error) {
      console.error("Calculation failed:", error);
      this.calculatedResult = "Error: Calculation failed";
    }
  };

  handleFormat = () => {
    this.formulaEditor?.formatFormula();
  };

  render() {
    return html`
      <div class="formula-editor-showcase">
        <div class="variables">
          <!-- Current Variables -->
          <div class="variable-list">
            <h4>Current Variables</h4>
            ${Array.from(this.variables.entries()).map(
              ([key, value]) => html`
                <div class="variable-item">
                  <span>${key}</span>
                  <span>${value}</span>
                </div>
              `
            )}
          </div>
        </div>

        <div class="formula-builder-container">
          <div class="metric-name-div">
            <label for="metric-name-input">Metric Name</label>
            <input
              id="metric-name-input"
              .value=${this.formula.name}
              @input=${(e) => {
                this.formula.name = e.target.value;
                this.requestUpdate();
              }}
            />
          </div>
          <label class="formula-label">Formula</label>
          <formula-editor
            class="fe"
            minSuggestionLen="0"
            @fw-formula-content-changed=${(e) => {
              this.formula.formulaString = e.detail.formulaString;
              this.formula.error = e.detail.error;
              this.calculatedResult = 0;
              this.requestUpdate();
            }}
            .variables=${this.variables}
            .formulaString=${this.formula.formulaString}
            .errorString=${this.formula.error}
          >
          </formula-editor>

          <label class="formula-label">Formula Output</label>
          <div id="fw-formula-err" class="${this.formula.error ?? "fw-formula-no-err"}">${this.formula.error ?? `${this.formula.name} = ${this.formula.formulaString}`}</div>

          ${this.calculatedResult ? html`<p>Result: ${this.calculatedResult}</p>` : ``}
          <button class="primary-text-button" @click=${this.handleCalculate}>Calculate</button>
          <button class="primary-text-button" @click=${this.handleFormat}>Format</button>
        </div>
      </div>
    `;
  }
}

window.customElements.define("fw-formula-editor-showcase", FWFormulaEditorShowcase);
