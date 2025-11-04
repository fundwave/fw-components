import { html, LitElement, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import { SuggestionMenuStyles } from "./styles/suggestion-menu";

@customElement("suggestion-menu")
export class SuggestionMenu extends LitElement {
  @property()
  recommendations: string[] = [];

  @property()
  recommendationLabels: Map<string, number> = new Map();

  @property()
  onRecommendationClick: (recommendation: string) => void = () => {};

  @state()
  _currentFocusedIndex: number = -1;

  @query(".fw-formula-suggestion-menu")
  suggestionList!: HTMLUListElement;

  scrollToSelectedRecommendation(index: number) {
    const listItem = this.suggestionList?.querySelectorAll("li")[index];
    if (!listItem) return;

    listItem.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth"
    });
  }

  navigate(direction: string) {
    if (!this.recommendations?.length) return;

    let newIndex = this._currentFocusedIndex;

    if (direction === "down") newIndex = (this._currentFocusedIndex + 1) % this.recommendations.length;
    else if (direction === "up") newIndex = (this._currentFocusedIndex - 1 + this.recommendations.length) % this.recommendations.length;

    this._currentFocusedIndex = newIndex;
    this.scrollToSelectedRecommendation(newIndex);
  }

  handleRecommendationSelect(index: number = this._currentFocusedIndex) {
    const recommendation = this.recommendations[index];
    if (!recommendation) return;

    this.onRecommendationClick(recommendation);
    this._currentFocusedIndex = -1;
  }

  render() {
    return html`
      <style>
        ${SuggestionMenuStyles}
      </style>
      <ul class="fw-formula-suggestion-menu" @mousedown=${(e: MouseEvent) => e.preventDefault()}>
        ${this.recommendations.map(
          (recommendation, index) =>
            html`<li class="${this._currentFocusedIndex === index ? "selected" : ""}" @click=${(e: MouseEvent) => this.handleRecommendationSelect(index)}>
              ${this.recommendationLabels.get(recommendation) ?? recommendation}
            </li>`
        )}
      </ul>
    `;
  }
}
