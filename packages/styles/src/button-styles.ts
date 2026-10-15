import { html } from "lit";

export const UnderlinedButtonStyles = html`
  <style>
    .primary-text-underlined {
      font-family: var(--theme-font);
      border: none;
      font-size: var(--secondary-font-size, 16px);
      color: var(--primary-color, #205081);
      padding: 0;
      margin: 0;
      border-radius: 0;
      min-width: max-content;
      text-transform: none;
      border-bottom: 1px solid rgba(var(--secondary-color-rgb), 0.3);
    }

    .secondary-text-underlined {
      font-family: var(--theme-font);
      border: none;
      font-size: var(--secondary-font-size, 16px);
      color: var(--secondary-color, #515151);
      margin: 0;
      padding: 0;
      border-radius: 0;
      min-width: max-content;
      text-transform: none;
      border-bottom: 1px solid rgba(var(--secondary-color-rgb), 0.3);
    }
  </style>
`;

export const TextButtonStyles = html`
  <style>
    .primary-text-button {
      font-family: var(--theme-font);
      border: none;
      font-size: var(--secondary-font-size, 16px);
      color: var(--primary-color, #205081);
      padding: 0 8px;
      min-width: 64px;
      height: var(--button-height, 36px);
      margin: 0;
      text-transform: none;
    }

    .secondary-text-button {
      font-family: var(--theme-font);
      border: none;
      font-size: var(--secondary-font-size, 16px);
      color: var(--secondary-color, #515151);
      padding: 0 8px;
      min-width: 64px;
      margin: 0;
      height: var(--button-height, 36px);
      text-transform: none;
    }

    .primary-text-button:hover {
      font-weight: bold;
    }

    .secondary-text-button:hover {
      font-weight: bold;
    }

    .primary-text-button[disabled],
    .secondary-text-button[disabled] {
      opacity: 0.5;
    }
  </style>
`;
export const PrimaryButtonStyles = html`
  <style>
    .primary-outlined {
      font-family: var(--theme-font);
      border: 1px solid var(--primary-color, #205081);
      border-radius: 5px;
      font-size: var(--secondary-font-size, 16px);
      color: var(--secondary-color, #515151);
      padding: 0 var(--button-padding, 16px);
      min-width: 64px;
      margin: 0;
      height: var(--button-height, 36px);
      text-transform: none;
    }
    .primary-outlined:hover {
      background-color: var(--primary-color, #205081);
      color: var(--light-color, #fff);
    }
    .primary-colored {
      font-family: var(--theme-font);
      background-color: var(--primary-color, #205081);
      border-radius: 5px;
      font-size: var(--secondary-font-size, 16px);
      color: var(--light-color, #fff);
      margin: 0;
      padding: 0 var(--button-padding, 16px);
      min-width: 64px;
      height: var(--button-height, 36px);
      text-transform: none;
    }
    .primary-colored:hover {
      box-shadow: 0 1px 2px 1px var(--primary-color, #205081);
    }
    .primary-outlined[disabled],
    .primary-colored[disabled] {
      opacity: 0.5;
    }
  </style>
`;

export const SecondaryButtonStyles = html`
  <style>
    .secondary-outlined {
      font-family: var(--theme-font);
      border: 1px solid rgba(var(--secondary-color-rgb), 0.3);
      border-radius: 5px;
      font-size: var(--secondary-font-size, 16px);
      color: var(--secondary-color, #515151);
      padding: 0 var(--button-padding, 16px);
      margin: 0;
      min-width: 64px;
      height: var(--button-height, 36px);
      text-transform: none;
    }

    .secondary-outlined:hover {
      background-color: var(--secondary-color, #515151);
      color: var(--light-color, #fff);
    }

    .secondary-colored {
      font-family: var(--theme-font);
      background-color: var(--secondary-color, #515151);
      border-radius: 5px;
      font-size: var(--secondary-font-size, 16px);
      color: var(--light-color, #fff);
      padding: 0 var(--button-padding, 16px);
      margin: 0;
      min-width: 64px;
      height: var(--button-height, 36px);
      text-transform: none;
    }

    .secondary-colored:hover {
      box-shadow: 0 1px 2px 1px var(--secondary-color, #515151);
    }

    .secondary-outlined[disabled],
    .secondary-colored[disabled] {
      opacity: 0.5;
    }
  </style>
`;

export const AlertButtonStyles = html`
  <style>
    .alert-outlined {
      font-family: var(--theme-font);
      border: 1px solid var(--error-color);
      border-radius: 5px;
      font-size: var(--secondary-font-size, 16px);
      color: var(--error-color, #d50000);
      padding: 0 var(--button-padding, 16px);
      margin: 0;
      min-width: 64px;
      height: var(--button-height, 36px);
      text-transform: none;
    }

    .alert-outlined:hover {
      background-color: var(--error-color-l1, #db4437);
      color: var(--light-color, #fff);
    }

    .alert-colored {
      font-family: var(--theme-font);
      background-color: var(--error-color, #d50000);
      border-radius: 5px;
      font-size: var(--secondary-font-size, 16px);
      color: var(--light-color, #fff);
      padding: 0 var(--button-padding, 16px);
      margin: 0;
      min-width: 64px;
      height: var(--button-height, 36px);
      text-transform: none;
    }

    .alert-colored:hover {
      box-shadow: 0 1px 2px 1px var(--error-color, #d50000);
    }

    .alert-outlined[disabled],
    .alert-colored[disabled] {
      opacity: 0.5;
    }
  </style>
`;

export const ToggleButtonStyles = html`
  <style>
    .toggle-group {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: wrap;
    }

    .toggle-group .toggle:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    .toggle-group .toggle:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    .toggle {
      text-transform: none;
      margin: 0px;
      border-radius: 0px;
      background-color: transparent;
      border: 1px solid var(--secondary-color-l3);
      color: var(--secondary-color);
      font-size: var(--secondary-font-size, 16px);
      font-family: var(--theme-font);
      display: flex;
      justify-content: space-around;
      min-width: 64px;
      align-items: center;
    }

    .toggle.small {
      height: 30px;
      font-size: var(--tertiary-font-size, 14px);
    }

    .toggle:hover {
      box-shadow: 0 1px 2px 1px rgba(var(--secondary-color-rgb), 0.1);
    }

    .selected-toggle {
      background-color: var(--secondary-color);
      color: var(--light-color, #fff);
    }

    .toggle iron-icon {
      --iron-icon-height: var(--body-font-size, 16px);
      margin-right: 5px;
    }

    .toggle mwc-icon {
      --mdc-icon-size: var(--body-font-size, 16px);
      margin-right: 5px;
    }
  </style>
`;

export const FabStyles = html`
  <style>
    paper-fab {
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      bottom: 3%;
      right: 2%;
    }

    paper-fab[disabled],
    .fab[disabled] {
      opacity: 0.5;
    }

    .fab {
      font-size: var(--secondary-font-size, 16px);
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 3%;
      right: 2%;
      box-shadow: var(--paper-material-elevation-2_-_box-shadow);
      font-family: var(--theme-font);
    }

    .colored-fab {
      background-color: var(--secondary-color, #515151);
      --iron-icon-height: var(--h2-font-size, 26px);
      --iron-icon-width: var(--h2-font-size, 26px);
      color: var(--light-color, #fff);
    }

    .light-colored-fab {
      background-color: var(--light-color, #fff);
      --iron-icon-height: var(--h2-font-size, 20px);
      --iron-icon-width: var(--h2-font-size, 20px);
      color: var(--secondary-color);
      /* --iron-icon-stroke-color: var(--secondary-color); */
    }

    .light-colored-fab:hover,
    .colored-fab:hover {
      box-shadow: var(--paper-material-elevation-3_-_box-shadow);
      font-weight: bold;
    }

    .rectangular-fab {
      height: var(--rectangular-fab-height, 50px);
      width: var(--rectangular-fab-width, 120px);
      border-radius: var(--rectangular-fab-height, 50px);
      padding: var(--rectangular-fab-padding, 0px);
      max-height: var(--rectangular-fab-max-height, 50px);
      z-index: var(--rectangular-fab-z-index, 1);
    }
    .small-fab {
      height: 50px;
      width: 50px;
      padding: 5px;
    }
    @media all and (max-width: 767px) {
      .rectangular-fab {
        height: var(--rectangular-fab-height, 40px);
        width: var(--rectangular-fab-width, 120px);
        border-radius: 50px;
        padding: 0;
        --fab-icon-height: 40px;
      }
    }
  </style>
`;

export const ButtonSpinnerStyles = html`
  <style>
    .colored-bt-spinner {
      width: 18px;
      height: 18px;
      --paper-spinner-color: var(--light-color, #fff);
      --paper-spinner-stroke-width: 3px;
      margin-right: 8px;
    }

    .secondary-outlined-bt-spinner {
      width: 18px;
      height: 18px;
      --paper-spinner-color: var(--secondary-color, #fff);
      --paper-spinner-stroke-width: 3px;
      margin-right: 8px;
    }

    .primary-outlined-bt-spinner {
      width: 18px;
      height: 18px;
      --paper-spinner-color: var(--primary-color, #fff);
      --paper-spinner-stroke-width: 3px;
      margin-right: 8px;
    }

    .button-prefix-icon {
      --iron-icon-height: var(--body-font-size, 16px);
      --mdc-icon-size: var(--body-font-size, 16px);
      margin-right: 5px;
    }
  </style>
`;

export const SmallButtonStyles = html`
  <style>
    .small-button {
      height: 25px !important;
      width: auto !important;
      padding: 0px !important;
      font-size: var(--tertiary-font-size) !important;
    }
    @media all and (max-width: 767px) {
      .small-button {
        height: 20px !important;
      }
    }
  </style>
`;

export const PaperToggleButtonStyles = html`
  <custom-style>
    <style>
      paper-toggle-button {
        font-family: var(--theme-font);
        cursor: pointer;
        --paper-toggle-button-checked-button: {
          height: 15px;
          width: 50%;
          border-radius: 0;
          bottom: 2px;
          box-shadow: none;
          border-bottom-right-radius : 8px;
          border-top-right-radius: 8px;
        }
        --paper-toggle-button-unchecked-button: {
          height: 15px;
          width: 50%;
          border-radius: 0;
          bottom: 2px;
          box-shadow: none;
          border-bottom-left-radius : 8px;
          border-top-left-radius: 8px;
        }
        --paper-toggle-button-unchecked-bar: {
          height: 15px;
          bottom: 2px;
          box-shadow: none;
        }
        --paper-toggle-button-checked-bar: {
          height: 15px;
          bottom: 2px;
          box-shadow: none;
        }
        --paper-toggle-button-label-color: var(--secondary-color);
        align-items: flex-start;
      }

      paper-toggle-button.primary-colored {
        --paper-toggle-button-unchecked-bar-color: var(--secondary-color-l1);
        --paper-toggle-button-unchecked-button-color:  var(--secondary-color-l1);
        --paper-toggle-button-checked-bar-color:  var(--primary-color-l1);
        --paper-toggle-button-checked-button-color:  var(--primary-color);
      }

      paper-toggle-button.secondary-colored {
        --paper-toggle-button-unchecked-bar-color: var(--secondary-color-l2);
        --paper-toggle-button-unchecked-button-color:  var(--secondary-color-l2);
        --paper-toggle-button-checked-bar-color:  var(--secondary-color-l1);
        --paper-toggle-button-checked-button-color:  var(--secondary-color);
      }
    </style>
  </custom-style>
`;
