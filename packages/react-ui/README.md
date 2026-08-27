# @fw-components/react-ui

Fundwave's React UI component library is a set of Tailwind-styled React components.

## Installation

```sh
npm i @fw-components/react-ui
```

`react` and `react-dom` (^18.2.0) are peer dependencies and must already be present in your app.

## Setup

The package ships a pre-built, ready-to-use stylesheet, you don't need Tailwind in your own app to use it. All utility classes emitted by these components are namespaced with the `fwui:` prefix (e.g. `fwui:flex`, `fwui:bg-primary`), so they can't collide with your app's own Tailwind (or other) classes, and only the classes actually used by these components are included in the build. There are two ways to bring the stylesheet into your app.

### Option 1: CSS file import (regular DOM)

For a normal (non-shadow-root) app, import the CSS file once in your app entry point and let your bundler emit it as a `<link>`/inlined `<style>` the usual way:

```ts
import "@fw-components/react-ui/styles.css";
```

### Option 2: CSS-as-string import (Shadow DOM / dynamic injection)

If your app (or the part of it rendering these components) lives inside a shadow root, a plain `<link>`/global `<style>` tag won't reach it. For that case (or any other scenario where you need the CSS as a JS string rather than a file path), the same compiled output is also published as a JS module:

```ts
import { styles } from "@fw-components/react-ui/styles";

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);
shadowRoot.adoptedStyleSheets = [sheet];
```

Or, without constructable stylesheets support, inject it as an inline `<style>` tag scoped to the shadow root:

```ts
import { styles } from "@fw-components/react-ui/styles";

const styleTag = document.createElement("style");
styleTag.textContent = styles;
shadowRoot.appendChild(styleTag);
```

`styles` is the exact same compiled, `fwui:`-prefixed, minified CSS as `styles.css` - just as a string - so there's no extra build step on the consumer's side, and because every class is prefixed, injecting it into a shadow root (or even the main document) is safe even if the host page already has its own Tailwind setup.

## Usage

```tsx
import { Button, Input, Select } from "@fw-components/react-ui";

function Example() {
  return (
    <>
      <Input label="Name" placeholder="Jane Doe" />
      <Button title="Save" theme="primary" onClick={async () => save()} />
    </>
  );
}
```

## Components

### Button

```tsx
<Button title="Save" theme="primary" variant="filled" size="md" onClick={handleClick} />
```

| Prop     | Type                                                     | Default   | Description                                                               |
| -------- | -------------------------------------------------------- | --------- | ------------------------------------------------------------------------- |
| title    | `ReactNode`                                              | -         | Button label/content (required)                                           |
| onClick  | `(e?) => Promise<void> \| void`                          | -         | Click handler; button auto-disables and shows a spinner while it resolves |
| variant  | `"filled" \| "outlined" \| "ghost" \| "plain" \| "link"` | `filled`  | Visual style                                                              |
| theme    | `"primary" \| "secondary" \| "danger"`                   | `primary` | Color theme                                                               |
| size     | `"sm" \| "md" \| "lg" \| "base"`                         | `md`      | Button size                                                               |
| mode     | `"text" \| "icon"`                                       | `text`    | Icon-only vs. text button                                                 |
| icon     | `LucideIcon`                                             | -         | Icon component (used with `mode="icon"` or alongside text)                |
| group    | `string`                                                 | -         | Groups buttons so they share a single pending/loading state               |
| disabled | `boolean`                                                | `false`   | Disables the button                                                       |

### Input / Textarea / Checkbox

```tsx
import { Input, Textarea, Checkbox } from "@fw-components/react-ui";

<Input label="Amount" type="number" value={amount} onChange={setAmount} clearable />
<Textarea label="Notes" value={notes} onChange={setNotes} />
<Checkbox label="I agree" required />
```

- `Input` supports `type="number"`, `"text"`, `"date"`, `"datetime-local"`, `"submit"`. When `type="number"`, values are comma-formatted for display and `onChange` receives a plain `number` (formatting is handled internally via `numbro`).
- All three forward a `ref` exposing a `validate(): boolean` method (checks `required` and native validity) for imperative form validation.
- Common props: `label`, `errorMessage`, `invalid`, `required`, `className`.
- `Input` additionally supports `icon` (any `lucide-react` icon name) and `clearable` (adds a clear button, fires `onClear`).

### Select

```tsx
<Select options={options} value={value} onChange={setValue} placeholder="Choose one" isMulti searchable />
```

Generic single/multi-select with search, custom option rendering, and portal-rendered dropdown. `value`/`onChange` work with plain option `value` strings (a single string, or an array when `isMulti`) rather than full option objects. `Option` shape is `{ value: string; label: string; disabled?: boolean }` by default, or pass your own type via the generic parameter along with `labelKey`/`valueKey`. Forwards a `ref` exposing `validate(): boolean`.

### DropdownMenu

A styled re-export of [Radix UI's Dropdown Menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu) primitives (`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`/`DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuSub*`, etc.) with the library's Tailwind styling applied. Use exactly as you would the underlying Radix primitives.

### RightSideModal / CenterModal

```tsx
<RightSideModal isOpen={isOpen} onClose={close} title="Edit item">
  ...
</RightSideModal>
```

| Prop                | Type          | Default            | Description                                                 |
| ------------------- | ------------- | ------------------ | ----------------------------------------------------------- |
| isOpen              | `boolean`     | -                  | Controls visibility (required)                              |
| onClose             | `() => void`  | -                  | Called on close (backdrop click / X)                        |
| title               | `string`      | -                  | Header title (required)                                     |
| subtitle            | `string`      | -                  | Header subtitle                                             |
| width               | `string`      | responsive default | Tailwind width classes                                      |
| disableOutsideClick | `boolean`     | `false`            | Prevents closing on backdrop click                          |
| zIndex              | `number`      | auto (stacked)     | ⚠️ Currently has no effect - z-index is always assigned by `ModalManager` on open, overwriting this prop. See note below. |
| mountContainer      | `HTMLElement` | `document.body`    | Portal mount target                                         |

`CenterModal` is the same component centered instead of docked to the right. Stacking order for multiple open modals is handled automatically by `ModalManager` (each modal registers on open and unregisters on close/unmount), which is why the `zIndex` prop is not currently honored.

### ConfirmationDialog

Provider + hook for imperative confirm/delete dialogs:

```tsx
import { ConfirmationProvider, ConfirmationType, useConfirmation } from "@fw-components/react-ui";

// once, near the root
<ConfirmationProvider>
  <App />
</ConfirmationProvider>;

// anywhere inside
const { confirm, confirmDelete } = useConfirmation();

const ok = await confirm("Are you sure?", "Confirm action", "Continue", ConfirmationType.WARNING);
const okDelete = await confirmDelete("This cannot be undone.", "Delete item?");
```

### Skeleton / Spinner

```tsx
<Skeleton className="" />
<Spinner className="" />
```

Simple loading placeholders; both accept a `className` to override sizing/color.

## Development

```sh
npm run build   # tsc build to dist/, then compiles styles/index.css via the Tailwind CLI into dist/styles.css and dist/styles.js
npm run dev     # tsc --watch (components only; re-run `npm run build` to pick up style changes)
```
