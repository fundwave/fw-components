import { html } from 'lit';

export const TextStyles = html`
    <style>
      .info-message {
        font-family: var(--theme-font);
        font-size: var(--body-font-size, 16px);
        color: var(--secondary-color);
      }
      .error-message {
        font-family: var(--theme-font);
        font-size: var(--secondary-font-size, 16px);
        font-weight: normal;
        color: var(--error-color);
      }
      .warning-message {
        font-family: var(--theme-font);
        font-size: var(--secondary-font-size, 16px);
        font-weight: normal;
        color: var(--warning-color);
      }
      .title {
        font-family: var(--theme-font);
        font-size: var(--h2-font-size, 24px);
        color: var(--secondary-color);
      }

      .lowlight {
        font-family: var(--theme-font);
        font-size: var(--secondary-font-size, 14x);
        color: var(--secondary-color-l1);
      }

      .caption {
        font-family: var(--theme-font);
        font-size: var(--tertiary-font-size, 12x);
        color: var(--secondary-color-l1);
      }

      .header {
        font-family: var(--theme-font);
        color: var(--secondary-color);
        font-size: var(--h1-font-size, 30px);
      }

      .pt1 {
        padding-top: max(10px , 1%);
      }

      .p1-0 {
        padding: max(10px , 1%) 0;
      }
    </style>
`;

export const IconStyles = html`
    <style>
      mwc-icon.info-icon {
        --mdc-icon-size: 50px;
        color: var(--primary-color);
      }

      iron-icon.info-icon {
        color: var(--primary-color);
        --iron-icon-height: 50px;
        --iron-icon-width: 50px;
      }

      iron-icon.info-icon-with-background {
        background-color: var(--primary-color, #fff);
        --iron-icon-fill-color: var(--header-background-color, #fff);
        --iron-icon-height: 50px;
        --iron-icon-width: 50px;
        border-radius: 50px;
        padding: 10px;
      }

      iron-icon.error-icon {
        color: var(--error-color, #d50000);
        --iron-icon-fill-color: var(--error-color, #d50000);
        --iron-icon-height: 50px;
        --iron-icon-width: 50px;
      }

      iron-icon.warning-icon {
        color: var(--warning-color, #CC7722);
        --iron-icon-height: 50px;
        --iron-icon-width: 50px;
      }

      iron-icon.caption {
        --iron-icon-height: var(--tertiary-font-size, 12x);
        --iron-icon-width: var(--tertiary-font-size, 12x);
      }

      iron-icon.lowlight {
        --iron-icon-height: var(--body-font-size, 14x);
        --iron-icon-width: var(--body-font-size, 14x);
      }

      .img-icon {
        height: var(--h1-font-size, 26px);
        width: var(--h1-font-size, 26px);
      }

      .icon-button {
        color: var(--secondary-color);
        --iron-icon-fill-color: var(--secondary-color);
        background-color: transparent;
        height: var(--h2-font-size, 26px);
        width: var(--h2-font-size, 26px);
        padding: 0px;
        margin: 5px;
        cursor: pointer;
      }
    </style>
`;

export const TooltipStyles = html`
    <style>

      .tooltip-term {
        position: relative;
        z-index: 0;
      }
      .tooltip-term:hover {
        cursor: pointer;
        z-index: 1;
      }
      .tooltip-term:hover .tooltip {
        display: block;
      }
      .tooltip {
        position: absolute;
        width: var(--tooltip-width, 300px);
        left: calc(50% - (var(--tooltip-width, 300px) / 2));
        top: 28px;
        padding: 15px;
        transition: opacity 0.25s;
        background: #fff;
        border: 2px solid #cdcfd2;
        border-radius: 4px;
        box-shadow: 0 2px 6px -1px rgba(var(--secondary-color-rgb), 0.3);
        color: var(--secondary-color, #676d76);
        text-align: inherit;
        pointer-events: none;
        text-decoration: none;
        font-size: var(--secondary-font-size, 14px);
        white-space: normal;
        display: none;
      }
      .tooltip.above {
        top: auto;
        bottom: 28px;
      }
      .tooltip.below {
        bottom: auto;
        top: 28px;
      }
      .tooltip:after {
        content: "";
        position: absolute;
        left: calc(50% - 6px);
        top: -6px;
        width: 0;
        height: 0;
        border-style: solid;
        border-color: transparent;
        border-width: 0 6px 6px;
        border-bottom-color: #fff;
        font-size: 0;
        line-height: 0;
      }
      .tooltip.above:after {
        top: auto;
        bottom: -6px;
        border-width: 6px 6px 0;
        border-top-color: #fff;
      }
      .tooltip.below:after {
        bottom: auto;
        top: -6px;
        border-width: 0px 6px 6px;
        border-bottom-color: #fff;
      }
      .tooltip:before {
        content: "";
        position: absolute;
        left: calc(50% - 8px);
        top: -9px;
        width: 0;
        height: 0;
        border-style: solid;
        border-color: transparent;
        border-width: 0 8px 8px;
        border-bottom-color: inherit;
        font-size: 0;
        line-height: 0;
      }
      .tooltip.above:before {
        top: auto;
        bottom: -9px;
        border-width: 8px 8px 0;
        border-top-color: inherit;
      }
      .tooltip.below:before {
        bottom: auto;
        top: -9px;
        border-width: 0 8px 8px;
        border-bottom-color: inherit;
      }
    </style>
`;

export const TagStyles = html`
  <style>
    .small-tag {
      width: auto;
      padding: 1px 5px;
      font-size: var(--tertiary-font-size);
      font-family: var(--font-family);
      font-weight: normal;
      color: var(--secondary-color, #fff);
      background-color: var(--secondary-color-l3, #fff);
      border-radius: 3px;
    }
    .primary-colored-tag {
      color: var(--primary-color);
      background-color: rgba(var(--primary-color-rgb), 0.1);
    }
  </style>
`;

export const MenuStyles = html`
  <style>

    mwc-menu, mwc-list-item {
      font-family: var(--theme-font);
      font-size: var(--body-font-size, 18px);
      color: var(--secondary-color);
      word-break: break-word;
      --mdc-menu-max-width: 500px;
      --mdc-menu-min-width: 200px;
      --mdc-theme-primary: var(--primary-color);
      --mdc-theme-text-icon-on-background: var(--secondary-color);
      --mdc-theme-surface: var(--header-background-color);
    }

    mwc-menu .sticky{
      position: -webkit-sticky; /*Safari*/
      position: sticky;
      background-color: var(--header-background-color, #fff);
      z-index: 4;
      top: 0;
    }

    mwc-menu .list-item{
      padding: var(--mdc-list-side-padding, 16px);
      font-family: var(--theme-font);
      font-size: var(--body-font-size, 18px);
      color: var(--secondary-color);
    }

  </style>
`;
