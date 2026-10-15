import { html } from "lit";

export const DialogStyles = html`
  <style>
    @media all and (max-width: 768px) {
      paper-dialog.centered {
        position: fixed;
        width: 80%;
        left: 10%;
        height: auto !important;
        max-height: 90% !important;
        margin: 0px;
        top: 50%;
        transform: translate(0, -50%);
      }

      paper-dialog.right-slider {
        position: fixed;
        width: 90%;
        right: 0;
        top: 0;
        height: 100vh !important;
        margin: 0px;
      }

      paper-dialog.right-slider.wide {
        width: 95%;
      }

      paper-dialog.centered.wide {
        width: 90%;
        left: 5%;
      }
    }

    @media all and (min-width: 769px) and (max-width: 1024px) {
      paper-dialog.centered {
        position: fixed;
        width: 60%;
        left: 20%;
        height: auto !important;
        max-height: 80% !important;
        margin: 0px;
        top: 50%;
        transform: translate(0, -50%);
      }

      paper-dialog.right-slider {
        position: fixed;
        width: 40%;
        right: 0;
        top: 0;
        height: 100vh !important;
        margin: 0px;
      }

      paper-dialog.right-slider.wide {
        width: 60%;
      }

      paper-dialog.centered.wide {
        width: 70%;
        left: 15%;
      }
    }

    @media all and (min-width: 1025px) {
      paper-dialog.centered {
        position: fixed;
        width: calc((100% - var(--drawer-width, 0px)) * 0.4);
        left: calc(var(--drawer-width, 0px) + (100% - var(--drawer-width, 0px)) * 0.3);
        height: auto !important;
        max-height: 80% !important;
        margin: 0px;
        top: 50%;
        transform: translate(0, -50%);
      }

      paper-dialog.right-slider {
        position: fixed;
        width: calc((100% - var(--drawer-width, 0px)) * 0.4);
        right: 0;
        top: 0;
        height: 100vh !important;
        margin: 0px;
      }

      paper-dialog.right-slider.wide {
        width: calc((100% - var(--drawer-width, 0px)) * 0.6);
      }

      paper-dialog.centered.wide {
        width: calc((100% - var(--drawer-width, 0px)) * 0.6);
        left: calc(var(--drawer-width, 0px) + (100% - var(--drawer-width, 0px)) * 0.2);
      }
    }

    paper-dialog.centered {
      border-radius: 2px;
    }

    paper-dialog.centered,
    paper-dialog.right-slider {
      overflow-y: auto;
      font-family: var(--theme-font) !important;
      z-index: 202;
      color: var(--secondary-color, #000);
      font-size: var(--body-font-size);
    }

    paper-dialog.full-screen {
      position: fixed;
      height: 80%;
      width: 90%;
      left: 5%;
      top: 10%;
      border-radius: 2px;
      z-index: 202;
      font-family: var(--theme-font) !important;
      color: var(--secondary-color, #000);
      font-size: var(--body-font-size);
      margin: 0;
    }

    paper-dialog.vertically-centered {
      position: fixed;
      z-index: 202;
      color: var(--secondary-color, #000);
      font-size: var(--body-font-size);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: auto !important;
      width: auto !important;
    }

    paper-dialog.transparent {
      background: transparent;
      box-shadow: none;
    }

    paper-dialog.centered-text {
      text-align: center;
      font-size: var(--body-font-size);
    }

    paper-dialog.rounded {
      border-radius: 10px;
    }

    paper-icon-button.dialog-close-icon,
    iron-icon.dialog-close-icon {
      position: absolute;
      right: 5px;
      top: 5px;
      cursor: pointer;
    }

    paper-dialog.right-slider paper-icon-button.dialog-close-icon,
    paper-dialog.right-slider iron-icon.dialog-close-icon {
      position: absolute;
      right: 15px;
      top: 15px;
      cursor: pointer;
    }
  </style>
`;

export const DialogHeaderStyles = html`
  <style>
    .dialog-header-button,
    .dialog-header-button--align-start {
      grid-row: 1;
      grid-column: 3;
      color: var(--secondary-color);
      height: 20px;
      width: 20px;
      cursor: pointer;
      margin: auto;
    }

    .dialog-header-button--align-start {
      grid-column: 1;
    }

    .dialog-header {
      padding: 10px 0px;
      position: relative;
      text-align: center;
      display: grid;
      grid-template-columns: 40px 1fr 40px;
      align-items: center;
      border-bottom: 1px solid rgba(9, 30, 66, 0.13);
      font-family: var(--theme-font);
      color: var(--secondary-color);
      height: var(--dialog-header-height);
      box-sizing: border-box;
    }

    .dialog-header-span {
      font-size: var(--body-font-size);
      font-weight: 400;
      display: block;
      margin: 0;
      overflow: hidden;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      grid-column: 2;
      grid-row: 1;
      padding: 0px 20px;
    }

    .dialog-header.two-columns {
      grid-template-columns: 1fr 1fr;
    }

    .two-columns .dialog-header-span {
      text-align: left;
      grid-column: 1;
    }

    .two-columns .dialog-header-buttons {
      grid-column: 2;
      display: flex;
      justify-content: flex-end;
      padding: 0px 20px;
    }
  </style>
`;
