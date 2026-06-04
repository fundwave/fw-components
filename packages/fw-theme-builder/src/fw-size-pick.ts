import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("fw-size-pick")
export class FwSizePick extends LitElement {
  @property()
  label?: string;

  @property()
  value = "";

  handleChange(e: InputEvent) {
    const size = (e.target as HTMLInputElement)?.value;
    const detail = {
      value: `${size}px`
    };
    this.value = detail.value;
    const event = new CustomEvent("value-changed", { detail, bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  static styles = css`
    .size-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      height: 3.2rem;
      max-width: 6rem;
      padding: 0.2rem 0.5rem;
    }
    .size-container > input {
      width: 3rem;
      box-sizing: border-box;
      padding: 0.5rem 0.3rem;
      font-size: 1.2rem;
      border-radius: 4px;
      border: solid 1px #1b1b1b1b;
    }
    .size-container > input:focus {
      outline: solid 1px #1b1b1b4b;
    }

    .size-container > p {
      margin: 0;
      font-family: "DM Sans", sans-serif;
    }
  `;

  render() {
    return html`
      <style>
        .size-label {
          font-size: ${this.value} !important;
        }
      </style>
      <span part="size-container" class="size-container">
        <p class="size-label" part="size-label">${this.label}</p>
        <input part="size-input" type="number" .value="${this.value?.slice(0, -2) || ""}" @change="${this.handleChange}" />
      </span>
    `;
  }
}
