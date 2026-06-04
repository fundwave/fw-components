import { html } from "lit";

export const TabStyles = html`
  <style>
    mwc-tab-bar.primary-colored {
      --mdc-theme-primary: var(--primary-color);
      --mdc-tab-color-default: var(--secondary-color, #000);
      --mdc-tab-text-label-color-default: var(--secondary-color, #000);
      --mdc-tab-height: 40px;
      --mdc-tab-horizontal-padding: 10px;
      --mdc-font-family: var(--theme-font);
      --mdc-typography-font-family: var(--theme-font);
      --mdc-typography-button-font-size: calc(var(--body-font-size)+2px);
      --mdc-typography-button-text-transform: none;
      --mdc-typography-button-font-weight: 600;
    }
  </style>
`;
