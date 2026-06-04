import "@polymer/paper-dropdown-menu/paper-dropdown-menu";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-listbox/paper-listbox";
import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { DropdownStyles, PlainInputStyles } from "@fw-components/styles/input-styles";

export type Font = {
  name: string;
  url: string;
  style: string;
};

@customElement("fw-font-pick")
export class FwFontPick extends LitElement {
  @property({ type: String })
  label = "";

  @property({ type: Array })
  options: Array<Font> = [];

  @state()
  showDropdown = false;

  @property({ type: Object })
  value = {
    name: "DM Sans",
    url: "https://fonts.gstatic.com/s/dmsans/v11/rP2Hp2ywxg089UriCZOIHQ.woff2",
    style: "'DM Sans', sans-serif"
  };

  async optionSelectHandler(e: CustomEvent) {
    const selection = e.detail.item.obj;
    if (selection.name === this.value.name) return;

    const detail = {
      value: selection
    };
    const event = new CustomEvent("value-changed", {
      detail,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);

    const selectedFont = new FontFace(selection.name, `url(${selection.url})`);
    (document.fonts as FontFaceSet).add(selectedFont);
    await selectedFont.load();
    this.value = selection;
  }

  render() {
    return html`
      ${DropdownStyles} ${PlainInputStyles}
      <span part="font-container">
        <style>
          :host {
            font-family: ${this.value.style};
          }
        </style>
        <div part="font-button">
          <paper-dropdown-menu .dynamicAlign=${true} class="plain" no-label-float @iron-select=${(e: CustomEvent) => this.optionSelectHandler(e)} style="width:100%">
            <paper-listbox style="color:#000" slot="dropdown-content" .selected=${this.value.name || ""} attr-for-selected="name">
              ${this.options && repeat(this.options, (item) => html`<paper-item style="font-family: ${item.style}" .name=${item.name} .obj=${item}>${item.name}</paper-item>`)}
            </paper-listbox>
          </paper-dropdown-menu>
        </div>
      </span>
    `;
  }
}
