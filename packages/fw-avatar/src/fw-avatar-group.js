import "./fw-avatar";

import "@material/mwc-list/mwc-list-item.js";
import "@material/mwc-menu/mwc-menu.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-button/paper-button.js";
import { html, LitElement } from "lit";
import { repeat } from "lit/directives/repeat.js";

import { UnderlinedButtonStyles } from "@fw-components/styles/button-styles";
import { DialogHeaderStyles } from "@fw-components/styles/dialog-styles";
import { BoxInputStyles } from "@fw-components/styles/input-styles";
import { MenuStyles } from "@fw-components/styles/meta-styles";

export class FWAvatarGroup extends LitElement {
  static get properties() {
    return {
      items: Object,
      _filteredItems: Object,
      nameAttribute: Object,
      secondaryAttribute: Object,
      maxCount: Number,
      header: Object,
      avatarBackground: Object,
      showSearchBar: Boolean,
      _searchInputValue: String,
      emptyStateMessage: String,
      emptyStateAction: Object,
      primaryAction: Object,
      secondaryAction: Object,
      absolute: Boolean
    };
  }

  render() {
    return html`
      ${DialogHeaderStyles} ${MenuStyles} ${this.showSearchBar ? html` ${BoxInputStyles} ` : null}
      ${this.emptyStateAction || this.secondaryAction ? html` ${UnderlinedButtonStyles} ` : null}

      <style>
        fw-avatar {
          --avatar-color: var(--dark-color, #515151);
        }

        fw-avatar.overlap {
          margin: 0 0 0 -8px;
          --border: 1px solid var(--light-color, #fff);
          --avatar-color: var(--dark-color, #515151);
        }

        .group {
          display: inline-flex;
          padding-left: 15px;
          cursor: pointer;
        }

        mwc-menu {
          --mdc-menu-max-width: min(95vw, 500px);
          --mdc-menu-min-width: 300px;
        }
      </style>

      ${this.absolute
        ? html`
            <style>
              @media all and (max-width: 767px) {
                mwc-menu#menu {
                  position: fixed;
                  right: 10px;
                }
              }
            </style>
          `
        : null}
      ${this.items && this.items.length > 0
        ? html`
            <div style="position: relative; display: inline-block;">
              <div class="group" id="group" @click=${(e) => this.showAllAvatars(e)}>
                ${repeat(
                  this.items.slice(0, this.maxCount),
                  (item, index) => html`
                    <fw-avatar
                      class="overlap"
                      type="initials"
                      .name="${item[this.nameAttribute]}"
                      style="z-index : ${this.items.length - index}"
                      .color=${this.avatarBackground}
                    ></fw-avatar>
                  `
                )}
                ${this.items.length > this.maxCount
                  ? html` <fw-avatar class="overlap" type="text" .name="+${this.items.length - this.maxCount}" color="rgba(0,0,0,0.08)"></fw-avatar> `
                  : null}
              </div>

              <mwc-menu id="menu" @closed=${() => this.onAvatarDialogClose()}>
                <header class="dialog-header">
                  <h1 class="dialog-header-span">${this.header ? this.header : "Members"}</h1>
                  <!-- <iron-icon class="dialog-header-button" @tap=${(e) => {
                    this.closeAvatarDialog(e);
                  }} icon="icons:close"></iron-icon> -->
                </header>

                ${this.items && this.items.length > 1 && this.showSearchBar
                  ? html`
                      <paper-input
                        id="searchBar"
                        class="box list-item sticky"
                        placeholder="Search"
                        .value=${this._searchInputValue ? this._searchInputValue : ""}
                        @value-changed=${(e) => this.searchInputValueChanged(e.target.value)}
                        no-label-float
                      ></paper-input>
                    `
                  : null}
                ${this.primaryAction && this.primaryAction.title && this._filteredItems && this._filteredItems.length
                  ? html`
                      <mwc-list-item id="primary-action-item" graphic="avatar" @click=${() => this.fireEvent("primary-action-clicked")}>
                        <mwc-icon slot="graphic">${this.primaryAction?.icon ?? "add_circle"}</mwc-icon>
                        <span>${this.primaryAction.title}</span>
                      </mwc-list-item>
                    `
                  : null}
                ${this._filteredItems && this._filteredItems.length
                  ? html`
                      ${repeat(
                        this._filteredItems,
                        (item) => html`
                          <mwc-list-item
                            class="items-list-item"
                            graphic="avatar"
                            .twoline=${this.secondaryAttribute ? true : false}
                            @click=${() => this.fireEvent("item-clicked", { item })}
                          >
                            <fw-avatar slot="graphic" type="initials" .name="${item[this.nameAttribute]}" .color=${this.avatarBackground}></fw-avatar>

                            <span>${item?.[this.nameAttribute]}</span>
                            ${this.secondaryAttribute ? html` <span slot="secondary">${item?.[this.secondaryAttribute]}</span> ` : null}
                          </mwc-list-item>
                        `
                      )}
                    `
                  : html`
                      <div class="list-item">
                        <span>${this.emptyStateMessage ? this.emptyStateMessage : "Couldn't find anything"}</span><br />
                        ${this.emptyStateAction && this.emptyStateAction.title
                          ? html`
                              <paper-button class="secondary-text-underlined" @tap=${() => this.handleEmptyStateAction()} style="margin: 10px 0"
                                >${this.emptyStateAction.title}</paper-button
                              >
                            `
                          : null}
                      </div>
                    `}
                ${this.secondaryAction && this.secondaryAction.title && this._filteredItems && this._filteredItems.length
                  ? html`
                      <div class="list-item">
                        <paper-button class="secondary-text-underlined" @tap=${() => this.handleSecondaryAction()} style="margin: 10px 0"
                          >${this.secondaryAction.title}</paper-button
                        >
                      </div>
                    `
                  : null}
              </mwc-menu>
            </div>
          `
        : null}
    `;
  }

  constructor() {
    super();
    this.maxCount = 5;
    this.nameAttribute = "userName";
  }

  updated(changedProperties) {
    if (changedProperties.has("items")) {
      this.searchInputValueChanged(this._searchInputValue);
    }
  }

  showAllAvatars(e) {
    const menu = this.shadowRoot.querySelector("#menu");
    menu.anchor = e.target;
    menu.corner = "BOTTOM_START";
    menu.menuCorner = "START";
    menu.show();
  }

  closeAvatarDialog() {
    const menu = this.shadowRoot.querySelector("#menu");
    menu.close();
  }

  onAvatarDialogClose() {
    this.searchInputValueChanged("");
  }

  searchInputValueChanged(value) {
    this._searchInputValue = value;
    if (!this._searchInputValue) {
      this._filteredItems = this.items;
    } else {
      this._filteredItems = this.items.filter(
        (item) =>
          item[this.nameAttribute]?.toLowerCase()?.includes(this._searchInputValue.toLowerCase()) ||
          item[this.secondaryAttribute]?.toLowerCase()?.includes(this._searchInputValue.toLowerCase())
      );
    }
  }

  handleEmptyStateAction() {
    if (this.emptyStateAction?.closeDialog) {
      this.closeAvatarDialog();
    }
    this.fireEvent("empty-state-action-clicked", { value: this.searchInputValue });
  }

  handleSecondaryAction() {
    if (this.secondaryAction?.closeDialog) {
      this.closeAvatarDialog();
    }
    this.fireEvent("secondary-action-clicked", { value: this.searchInputValue });
  }

  fireEvent(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, { detail, bubbles: true, composed: true }));
  }
}

customElements.define("fw-avatar-group", FWAvatarGroup);
