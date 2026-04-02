import { html } from "lit";

export const SelectInputStyles = html`
  <style>
    sl-select {
      --sl-input-border-radius-medium: 0;
      --sl-focus-ring: none;
      --sl-input-border-color-focus: none;
      --sl-input-border-width: 0px;
      --sl-input-border-color: none;
      --sl-input-font-family: var(--theme-font);
      --sl-font-sans: var(--theme-font);
      --sl-input-spacing-medium: 4px;
      --sl-input-font-size-medium: var(--secondary-font-size);
      --sl-input-label-font-size-medium: var(--tertiary-font-size);
      --sl-input-height-medium: 32px;
      /*  hover text color */
      --sl-color-neutral-0: var(--secondary-color);
      /* Text color */
      --sl-color-neutral-700: var(--secondary-color);
      /* Padding */
      --sl-spacing-2x-small: calc(var(--secondary-font-size) / 2);
      --sl-color-primary-600: var(--secondary-color-l3);
    }
    sl-select.underlined {
      border-bottom: 1px solid;
    }
    sl-select * {
      font-family: var(--theme-font);
    }
    sl-option {
      margin: 5px 0;
    }
    sl-option::part(base):hover {
      background-color: var(--secondary-color-l3);
    }
    sl-option[aria-selected="true"]::part(base), sl-option[selected]::part(base) {
      background-color: var(--primary-color-l1) !important;
      color: var(--header-background-color) !important;
    }
    sl-select::part(tag__base) {
      font-family: var(--theme-font);
      padding: 10px;
      border-radius: 2px;
    }
  </style>
`;

const InputStyles = html`
  <custom-style>
    <style>
      .right-aligned {
        text-align: right;
      }

      .suffix-icon {
        padding: 0px;
        height: 24px;
      }
      paper-input,
      paper-dropdown-menu,
      paper-textarea {
        --paper-input-container : {
          padding: 0px;
        }
      }
    </style>
  </custom-style>
`;

export const DropdownStyles = html`
  <custom-style>
    <style>
      paper-listbox,
      paper-item {
        font-family: var(--theme-font);
        color: var(--secondary-color);
        font-size: var(--body-font-size, 16px);
        cursor: pointer;
      }

      paper-listbox paper-item:hover {
        background-color: var(--secondary-color-l4);
      }

      paper-listbox {
        max-height: 60vh;
      }
      paper-item:hover {
        background-color: var(--secondary-color-l4);
      }
    </style>
  </custom-style>
`;

export const UnderlinedInputStyles = html`
  ${InputStyles}
  <custom-style>
    <style>
      paper-dropdown-menu.underlined[readonly],
      paper-input.underlined[readonly] {
        --paper-input-container-focus-color: var(--secondary-color);
        --paper-input-container-underline-focus: {
          display: none;
        }
      }

      paper-textarea.underlined,
      paper-input.underlined,
      paper-dropdown-menu.underlined {
        font-family: var(--theme-font);

        --paper-input-container-focus: {
          color: var(--primary-color);
        }

        --paper-input-container-label: {
          color: var(--secondary-color);
          font-family: var(--theme-font);
          font-size: var(--secondary-font-size, 15px);
        }

        --paper-input-container-label-floating: {
          font-family: var(--theme-font);
          color: var(--secondary-color);
          font-size: var(--secondary-font-size, 15px);
        }
        --paper-input-container-input: {
          color: var(--secondary-color);
          font-style: inherit;
          font-size: var(--body-font-size, 16px);
          font-family: var(--theme-font);
        }

        --paper-input-container-disabled : {
          color: var(--secondary-color);
          opacity: 1;
        }

        --paper-input-container-input-disabled: {
          color: var(--secondary-color);
        }
      }
    </style>
  </custom-style>
`;

export const CheckboxStyles = html`
  ${InputStyles}
  <custom-style>
    <style>
      paper-checkbox.primary-colored-checkbox {
        font-family: var(--theme-font);
        font-size: var(--secondary-font-size, 15px);
        --paper-checkbox-checked-color: var(--primary-color);
        --paper-checkbox-unchecked-color: var(--secondary-color-l1);
        --paper-checkbox-label-checked-color: var(--secondary-color);
        --paper-checkbox-label-color: var(--secondary-color);
      }

      paper-checkbox.secondary-colored-checkbox {
        font-family: var(--theme-font);
        font-size: var(--secondary-font-size, 15px);
        --paper-checkbox-checked-color: var(--secondary-color);
        --paper-checkbox-unchecked-color: var(--secondary-color-l1);
        --paper-checkbox-label-checked-color: var(--secondary-color);
        --paper-checkbox-label-color: var(--secondary-color);
      }

      paper-checkbox.colored-text-checkbox {
        font-family: var(--theme-font);
        font-size: var(--secondary-font-size, 15px);
        --paper-checkbox-checked-color: var(--primary-color);
        --paper-checkbox-unchecked-color: var(--primary-color);
        --paper-checkbox-label-checked-color: var(--primary-color);
        --paper-checkbox-label-color: var(--primary-color);
      }
    </style>
  </custom-style>
`;

export const PlainInputStyles = html`
  ${InputStyles}

  <custom-style>
    <style>
      paper-dropdown-menu.plain,
      paper-input.plain {
        font-family: var(--theme-font);

        --paper-input-container-underline: {
          display: none;
          height: 0;
        }

        --paper-input-container-focus: {
          color: var(--primary-color);
        }

        --paper-input-container-input: {
          color: var(--secondary-color);
          font-style: normal;
          font-size: var(--body-font-size, 16px);
          font-family: var(--theme-font);
        }

        --paper-input-container-label: {
          color: var(--secondary-color);
          font-family: var(--theme-font);
          font-size: var(--secondary-font-size, 15px);
        }

        --paper-input-container-placeholder: {
          color: var(--secondary-color-l3);
          font-style: normal;
          font-size: var(--secondary-font-size, 16px);
          font-family: var(--theme-font);
        }
        --paper-input-container-input-disabled: {
          color: var(--secondary-color);
        }
        --paper-input-container-disabled : {
          color: var(--secondary-color);
          opacity: 1;
          --disabled-text-color: var(--header-background-color);
        }
      }

      paper-input.no-focus {
        --paper-input-container-underline-focus: {
          display: none !important;
        }

        --paper-input-container-underline: {
          display: none !important;
        }
      }
    </style>
  </custom-style>
`;

export const LargeInputStyles = html`
  ${InputStyles}

  <custom-style>
    <style>
      paper-textarea.large,
      paper-input.large,
      paper-dropdown-menu.large {
        font-family: var(--theme-font);

        --paper-input-container-focus: {
          color: var(--primary-color);
        }

        --paper-input-container-input: {
          color: var(--secondary-color);
          font-style: normal;
          font-size: var(--h2-font-size, 16px);
          font-family: var(--theme-font);
        }

        --paper-input-container-placeholder: {
          color: var(--secondary-color-l3);
          font-style: inherit;
          font-size: var(--body-font-size, 16px);
          font-family: var(--theme-font);
        }

        --paper-input-container-disabled : {
          color: var(--secondary-color);
          opacity: 1;
        }

        --paper-input-container-input-disabled: {
          color: var(--secondary-color);
        }

        --paper-input-container-underline-disabled: {
          border-bottom: none;
        }
      }
    </style>
  </custom-style>
`;

export const BoxInputStyles = html`
  ${InputStyles}

  <custom-style>
    <style>
      paper-input.box, paper-textarea.box {
        font-family: var(--theme-font);

        --paper-input-container-input: {
          color: var(--secondary-color);
          font-style: normal;
          font-size: var(--body-font-size, 16px);
          font-family: var(--theme-font);
          border: 1px solid var(--secondary-color-l2);
          border-radius: 2px;
          padding: 5px 10px;
          box-sizing: border-box;
        }

        --paper-input-container-input-focus: {
          border: 1px solid var(--primary-color-l1);
        }

        --paper-input-container-input-invalid: {
          border: 1px solid var(--error-color-l1);
        }

        --paper-input-container-placeholder: {
          color: var(--secondary-color-l3);
          font-style: normal;
          font-size: var(--body-font-size, 16px);
          font-family: var(--theme-font);
        }

        --paper-input-container-underline-focus: {
          display: none !important;
        }

        --paper-input-container-underline: {
          display: none !important;
        }
      }

      paper-input.box.no-focus {
        --paper-input-container-input-focus: {
          border: 1px solid var(--secondary-color-l2);
        }
      }
    </style>
  </custom-style>
`;

export const SmallInputStyles = html`
  ${InputStyles}

  <custom-style>
    <style>
      paper-textarea.small,
      paper-input.small,
      paper-dropdown-menu.small {
        font-family: var(--theme-font);

        --paper-input-container-focus: {
          color: var(--primary-color);
        }

        --paper-input-container-label: {
          color: var(--secondary-color);
          font-family: var(--theme-font);
          font-size: var(--tertiary-font-size, 15px);
        }

        --paper-input-container-label-floating: {
          font-family: var(--theme-font);
          color: var(--secondary-color);
          font-size: var(--tertiary-font-size, 15px);
        }
        --paper-input-container-input: {
          color: var(--secondary-color);
          font-style: inherit;
          font-size: var(--secondary-font-size, 16px);
          font-family: var(--theme-font);
        }

        --paper-input-container-placeholder: {
          color: var(--secondary-color-l3);
          font-style: inherit;
          font-size: var(--tertiary-font-size, 16px);
          font-family: var(--theme-font);
        }

        --paper-input-container-disabled : {
          color: var(--secondary-color);
          opacity: 1;
        }

        --paper-input-container-input-disabled: {
          color: var(--secondary-color);
        }
      }
    </style>
  </custom-style>
`;

export const AllInputStyles = html`
  ${InputStyles} ${BoxInputStyles} ${CheckboxStyles} ${LargeInputStyles}
  ${PlainInputStyles} ${SmallInputStyles} ${UnderlinedInputStyles}
  ${DropdownStyles}
`;
