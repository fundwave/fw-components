import "./fw-color-pick";
import "./fw-font-pick";
import { Font } from "./fw-font-pick";
import "./fw-size-pick";
import { defaultTheme, fontOptions } from "./models";

import { msg } from "@fw-components/localize";
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

enum ThemeEnum {
  COLORS = "colors",
  FONTS = "fonts",
  SIZES = "sizes"
}

type Theme = {
  colors: { [key: string]: Record<string, string> };
  fonts: { [key: string]: Font };
  sizes: { [key: string]: string };
};

@customElement("fw-theme-builder")
export class FwThemeBuilder extends LitElement {
  @state()
  nav = "Home";

  @property({ type: Array })
  fontOptions = fontOptions;

  @property({ type: Object })
  theme: Theme = defaultTheme as Theme;

  @property({ type: Boolean })
  viewByGroup = false;

  static styles = css`
    .back-button {
      user-select: none;
      cursor: pointer;
      width: 3rem;
      padding: 0.5rem 0.5rem;
      z-index: 100;
    }
    .back-hidden {
      opacity: 0;
      cursor: default;
    }
    .back-icon {
      height: 1rem;
    }

    .color-group-heading {
      font-weight: 300;
      margin: 0.25rem 0rem 0.1rem 0rem;
    }
    .section-heading {
      font-weight: 300;
      margin: 1rem 0rem 0.25rem 0rem;
      border-bottom: 1px solid #1b1b1b3b;
      padding-bottom: 0.2rem;
    }
  `;

  sectionChangeHandler(s: string) {
    this.nav = s;
  }

  navigateBack() {
    if (this.nav === "Home") return;
    if (this.nav === ThemeEnum.COLORS || this.nav === ThemeEnum.SIZES || this.nav === ThemeEnum.FONTS) {
      this.nav = "Home";
    } else {
      this.nav = ThemeEnum.COLORS;
    }
  }

  createFontPickComponent(font: string) {
    return html` <fw-font-pick
      exportparts="font-container, font-label, font-button, font-dropdown-container, font-dropdown-option, font-dropdown-selected"
      .label=${font}
      @value-changed=${(e: CustomEvent) => {
        const detail = {
          type: font,
          value: e.detail.value
        };
        this.shadowRoot?.dispatchEvent(
          new CustomEvent("font-changed", {
            detail,
            bubbles: true,
            composed: true
          })
        );
        this.theme.fonts[font as keyof typeof this.theme.fonts] = e.detail.value;
        this.theme = { ...this.theme };
      }}
      .options="${this.fontOptions}"
      .value=${this.theme.fonts[font]}
    >
    </fw-font-pick>`;
  }

  createSizePickComponent(size: string) {
    return html` <fw-size-pick
      exportparts="size-container, size-label, size-input"
      .label=${size}
      @value-changed=${(e: CustomEvent) => {
        const detail = {
          type: size,
          value: e.detail.value
        };
        this.shadowRoot?.dispatchEvent(
          new CustomEvent("size-changed", {
            detail,
            bubbles: true,
            composed: true
          })
        );
        this.theme.sizes[size] = e.detail.value;
        this.theme = { ...this.theme };
      }}
      .value=${this.theme.sizes[size]}
    >
    </fw-size-pick>`;
  }

  createColorPickComponent(group: string, type: string) {
    return html` <fw-color-pick
      exportparts="color-button, color-label, color-hidden-input"
      @value-changed=${(e: CustomEvent) => {
        const detail = {
          group: group,
          type: type,
          value: e.detail.hex,
          rgb: e.detail.rgb,
          hsl: e.detail.hsl
        };
        this.shadowRoot?.dispatchEvent(
          new CustomEvent("color-changed", {
            detail,
            bubbles: true,
            composed: true
          })
        );
        this.theme.colors[group][type] = e.detail.hex;
        this.theme = { ...this.theme };
      }}
      .label=${`${group} ${type?.toLowerCase().slice(-3) === "hex" ? type?.toLowerCase().slice(0, -4) : type}`}
      .value="${this.theme.colors[group][type]}"
    >
    </fw-color-pick>`;
  }

  getContent() {
    let content;
    switch (this.nav) {
      case "Home":
        content = html` <div part="content-container">
          ${(Object.keys(this.theme) ?? []).map((section) => html` <button part="theme-button" @click=${() => this.sectionChangeHandler(`${section}`)}>${section}</button>`)}
        </div>`;
        break;
      case ThemeEnum.COLORS:
        content = html` <div part="content-container">
          ${(Object.keys(this.theme.colors) ?? []).map(
            (color) => html` <button part="theme-button" @click=${() => this.sectionChangeHandler(`colors-${color}`)}>${msg(color)}</button>`
          )}
        </div>`;
        break;
      case ThemeEnum.SIZES:
        content = html` <span part="content-container">
          ${this.theme[ThemeEnum.SIZES] && Object.keys(this.theme[ThemeEnum.SIZES]).length !== 0
            ? Object.keys(this.theme[ThemeEnum.SIZES]).map((size: string) => this.createSizePickComponent(size))
            : null}
        </span>`;
        break;
      case ThemeEnum.FONTS:
        content = html` <span part="content-container"> ${Object.keys(this.theme[ThemeEnum.FONTS]).map((font: string) => this.createFontPickComponent(font))} </span>`;
        break;
      default:
        content = html` <span part="content-container">
          ${Object.keys(this.theme[ThemeEnum.COLORS][this.nav.slice(7)]).map((type: string) => this.createColorPickComponent(this.nav.slice(7), type))}
        </span>`;
        break;
    }
    return content;
  }

  render() {
    return html`
      <div part="container">
        ${this.viewByGroup
          ? html` <span part="back-icon-container" class="back-button ${this.nav === "Home" ? "back-hidden" : ""}" @click="${this.navigateBack}">
                <svg class="back-icon" width="46" height="80" viewBox="0 0 46 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M43.9567 77.8954C46.6811 75.1012 46.6811 70.5876 43.9567 67.7935L16.8527 39.9955L43.9567 12.1975C46.6811 9.40334 46.6811 4.88973 43.9567 2.0956C41.2324 -0.698533 36.8314 -0.698533 34.1071 2.0956L2.04329 34.9804C-0.681091 37.7745 -0.681092 42.2881 2.04328 45.0822L34.1071 77.967C36.7616 80.6895 41.2323 80.6895 43.9567 77.8954Z"
                    fill="black"
                  />
                </svg>
              </span>
              <span part="content-span"> ${this.getContent()} </span>`
          : html`
              ${
                // Fonts
                this.theme && this.theme[ThemeEnum.FONTS] && Object.keys(this.theme[ThemeEnum.FONTS]).length !== 0
                  ? html`<div part="fonts-ungrouped-container">
                      <h2 class="section-heading" part="fonts-ungrouped-heading">${msg("Fonts")}</h2>
                      ${Object.keys(this.theme[ThemeEnum.FONTS]).map((font: string) => this.createFontPickComponent(font))}
                    </div>`
                  : null
              }
              ${
                // Sizes
                this.theme && this.theme[ThemeEnum.SIZES] && Object.keys(this.theme[ThemeEnum.SIZES]).length !== 0
                  ? html`<div part="sizes-ungrouped-container">
                      <h2 class="section-heading" part="sizes-ungrouped-heading">${msg("Sizes")}</h2>
                      ${Object.keys(this.theme[ThemeEnum.SIZES]).map((size: string) => this.createSizePickComponent(size))}
                    </div>`
                  : null
              }
              ${
                // Colors
                this.theme && this.theme[ThemeEnum.COLORS] && Object.keys(this.theme[ThemeEnum.COLORS]).length !== 0
                  ? html`<div part="colors-ungrouped-container">
                      <h2 class="section-heading" part="colors-ungrouped-heading">${msg("Colors")}</h2>
                      ${Object.keys(this.theme[ThemeEnum.COLORS]).map(
                        (group) => html`
                          <div part="color-group-container">
                            <h3 class="color-group-heading" part="color-group-heading">${msg(group)}</h3>
                            ${Object.keys(this.theme[ThemeEnum.COLORS][group]).map((type: string) => this.createColorPickComponent(group, type))}
                          </div>
                        `
                      )}
                    </div>`
                  : null
              }
            `}
      </div>
    `;
  }
}
