import { html, LitElement } from "lit";

export class FWAvatar extends LitElement {
  static get properties() {
    return {
      name: Object,
      title: Object,
      color: Object,
      type: Object,
      imgSrc: String,
      luminance: String
    };
  }

  render() {
    return html`
      <style>
        .avatar {
          display: inline-block;
          font-size: calc(var(--avatar-size, 30px) / 2.5);
          width: var(--avatar-size, 30px);
          height: var(--avatar-size, 30px);
          line-height: var(--avatar-size, 30px);
          text-align: center;
          border-radius: 50%;
          vertical-align: middle;
          color: var(--avatar-color, white);
          border: var(--border, none);
          font-family: var(--theme-font);
          background: plum;
        }
      </style>

      <div
        class="avatar"
        title="${this.title ? this.title : this.name}"
        style="background: ${this.type === "image" ? `url(${this.imgSrc})` : (this.color ?? `var(--avatar-background,${this.getColor(this.name)})`)}"
      >
        ${!(this.type === "image") ? html`<div>${this.type === "initials" ? this.getInitials(this.name) : this.name}</div> ` : html``}
      </div>
    `;
  }

  constructor() {
    super();
  }

  updated(_changedProperties) {}

  getInitials(name) {
    let initials = name.split(/\s/) || [];
    const firstLetter = initials.shift() || "";
    const lastLetter = initials.pop() || "";
    initials = ((firstLetter?.[0] || "") + (lastLetter?.[0] || firstLetter?.[1] || "")).toUpperCase();
    return initials;
  }

  getColor(str) {
    if (!str) return "plum";
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    const l = this.luminance ?? "80%";
    return `hsl(${h}, 50%, ${l})`;
  }
}

customElements.define("fw-avatar", FWAvatar);
