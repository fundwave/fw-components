import { html } from "lit";

export const GridStyles = html`
  <style>
    @media (max-width: 767px) {
      .hidden-col {
        display: none;
      }
    }

    table {
      width: 100%;
      font-size: var(--body-font-size);
      font-family: var(--theme-font);
      color: var(--secondary-color);
      border-collapse: collapse;
      margin: 3% 0;
      text-align: left;
    }

    table.auto-width {
      width: auto;
    }

    tr,
    td,
    th {
      padding: max(5px, 1%) 2%;
      border: 1px solid var(--secondary-color-l3);
    }
    th {
      background-color: rgba(var(--secondary-color-rgb), 0.03);
    }
    table.grid {
      border: 1px solid var(--secondary-color-l3);
    }
    table.grid tr,
    table.grid td,
    table.grid th {
      border: none;
      border-bottom: 1px solid var(--secondary-color-l3);
      border-top: 1px solid var(--secondary-color-l3);
    }

    table.no-border tr,
    table.no-border td,
    table.no-border th {
      border: none;
      padding: 5px 0;
    }

    table.plain tr,
    table.plain td,
    table.plain th {
      border: none;
    }

    table.plain th {
      background-color: transparent;
      border-bottom: 1px solid var(--secondary-color-l3);
    }

    table.plain:not(.card-view) tr td:first-child,
    table.plain:not(.card-view) tr th:first-child {
      padding-left: 0;
    }
    table.plain:not(.card-view) tr td:last-child,
    table.plain:not(.card-view) tr th:last-child {
      padding-right: 0;
    }

    tr.border-top,
    td.border-top,
    th.border-top {
      border-top: 1px solid var(--secondary-color-l3) !important;
    }

    tr.no-border,
    td.no-border,
    th.no-border {
      border: none !important;
    }

    tr.header-row {
      font-weight: bold;
      font-size: calc(var(--body-font-size) + 1px);
    }

    tr.child {
      font-size: var(--tertiary-font-size);
      color: var(--secondary-color-l1);
    }
    tr.error {
      color: var(--error-color);
    }
    .child td:first-child {
      padding-left: 20px;
    }
    .w10 {
      width: 10%;
    }
    .w15 {
      width: 15%;
    }
    .w20 {
      width: 20%;
    }
    .w25 {
      width: 25%;
    }
    .w30 {
      width: 30%;
    }
    .w40 {
      width: 40%;
    }
    .w45 {
      width: 45%;
    }
    .w50 {
      width: 50%;
    }

    .right-aligned {
      text-align: right;
    }

    tr paper-input {
      --paper-input-container-input: {
        font-size: var(--body-font-size) !important;
      };
    }
    tr.child paper-input {
      --paper-input-container-input: {
        font-size: var(--tertiary-font-size) !important;
        color: var(--secondary-color-l1) !important;
      };
    }
    tr.header-row paper-input {
      --paper-input-container-shared-input-style_-_font-weight: bold;
    }

    th.box,
    td.box {
      padding-right: calc(2% + 10px);
    }
    .button {
      cursor: pointer;
    }
    .plain .button:hover {
      background-color: transparent;
      font-weight: bold;
    }
    table.no-margin {
      margin: 0 !important;
    }
    table[hidden],
    tr[hidden],
    td[hidden],
    th[hidden] {
      display: none;
    }

    @media screen and (max-width: 767px) {
      table.card-view {
        border: none;
        display: block !important;
      }
      table.card-view thead,
      table.card-view tfoot,
      table.card-view .card-view-hidden {
        display: none;
      }
      table.card-view td,
      table.card-view tr {
        display: block;
        padding: 5px;
      }
      table.card-view td {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      table.card-view.rtl td {
        direction: rtl;
      }
      table.card-view td[header]:before {
        text-align: left;
        content: attr(header);
        font-size: calc(var(--body-font-size) - 2px);
        width: 50%;
      }
      table.card-view.rtl td[header]:before {
        content: none;
      }
      table.card-view.rtl td[header]:after {
        text-align: left;
        content: attr(header);
        font-size: calc(var(--body-font-size) - 2px);
        width: 50%;
      }
      table.card-view tr {
        border: 1px solid var(--secondary-color-l3) !important;
        margin: 5px 0;
      }
      table.card-view tr.header-row {
        border: 1px solid var(--secondary-color-l3) !important;
        margin: 10px 0;
      }
    }
  </style>
`;
