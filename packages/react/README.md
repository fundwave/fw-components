# @fw-components/react

Fundwave's React UI component library is a set of Tailwind-styled React components.

## Installation

```sh
npm i @fw-components/react
```

`react` and `react-dom` (^18.2.0) are peer dependencies and must already be present in your app.

## Setup

The package ships a pre-built, ready-to-use stylesheet, you don't need Tailwind in your own app to use it. All utility classes emitted by these components are namespaced with the `fwr:` prefix (e.g. `fwr:flex`, `fwr:bg-primary`), so they can't collide with your app's own Tailwind (or other) classes, and only the classes actually used by these components are included in the build. There are two ways to bring the stylesheet into your app.

### Option 1: CSS file import (regular DOM)

For a normal (non-shadow-root) app, import the CSS file once in your app entry point and let your bundler emit it as a `<link>`/inlined `<style>` the usual way:

```ts
import "@fw-components/react/styles.css";
```

### Option 2: CSS-as-string import (Shadow DOM / dynamic injection)

If your app (or the part of it rendering these components) lives inside a shadow root, a plain `<link>`/global `<style>` tag won't reach it. For that case (or any other scenario where you need the CSS as a JS string rather than a file path), the same compiled output is also published as a JS module:

```ts
import { styles } from "@fw-components/react/styles";

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);
shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet];
```

Or, without constructable stylesheets support, inject it as an inline `<style>` tag scoped to the shadow root:

```ts
import { styles } from "@fw-components/react/styles";

const styleTag = document.createElement("style");
styleTag.textContent = styles;
shadowRoot.appendChild(styleTag);
```

`styles` is the exact same compiled, `fwr:`-prefixed, minified CSS as `styles.css` - just as a string - so there's no extra build step on the consumer's side, and because every class is prefixed, injecting it into a shadow root (or even the main document) is safe even if the host page already has its own Tailwind setup.

## Usage

```tsx
import { Button, Input, Select } from "@fw-components/react";

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
| title        | `ReactNode`                                              | -                                   | Button label/content (required)                                           |
| onClick      | `(e?) => Promise<void> \| void`                          | -                                   | Click handler; button auto-disables and shows a spinner while it resolves |
| variant      | `"filled" \| "outlined" \| "ghost" \| "plain" \| "link"` | `filled` (`ghost` when `mode="icon"`) | Visual style                                                             |
| theme        | `"primary" \| "secondary" \| "danger"`                   | `primary`                           | Color theme                                                               |
| size         | `"sm" \| "md" \| "lg" \| "base"`                         | `md`                                | Button size                                                               |
| mode         | `"text" \| "icon"`                                       | `text`                              | Icon-only vs. text button                                                 |
| icon         | `LucideIcon`                                             | -                                   | Icon component (used with `mode="icon"` or alongside text)                |
| iconPosition | `"prefix" \| "suffix"`                                   | `prefix`                            | Where `icon` renders relative to `title` (ignored when `mode="icon"`)     |
| group        | `string`                                                 | -                                   | Groups buttons so they share a single pending/loading state               |
| disabled     | `boolean`                                                | `false`                             | Disables the button                                                       |

### Input / Textarea / Checkbox

```tsx
import { Input, Textarea, Checkbox } from "@fw-components/react";

<Input label="Amount" type="number" value={amount} onChange={setAmount} clearable />
<Textarea label="Notes" value={notes} onChange={setNotes} />
<Checkbox label="I agree" required />
```

- `Input` supports `type="number"`, `"text"`, `"date"`, `"datetime-local"`, `"submit"`. When `type="number"`, values are comma-formatted for display and `onChange` receives a plain `number` (formatting is handled internally via `numbro`).
- All three forward a `ref` exposing a `validate(): boolean` method (checks `required` and native validity) for imperative form validation.
- Common props: `label`, `description` (helper text under the label), `errorMessage`, `invalid`, `required`, `className`.
- `Input` additionally supports `icon` (a `lucide-react` icon name, or any custom icon component) and `clearable` (adds a clear button, fires `onClear`).

Number formatting/parsing (comma-grouping, mantissa, parentheses for negatives) for `type="number"` inputs is powered by [`numbro`](https://numbrojs.com/), configured with app-wide defaults (`mantissa: 2`, `thousandSeparated: true`, `negative: "parenthesis"`). Override these defaults as:

```ts
import { setOptions } from "@fw-components/react";

setOptions({ mantissa: 0, negative: "sign" });
```

### Select

```tsx
<Select options={options} value={value} onChange={setValue} placeholder="Choose one" isMulti searchable />
```

Generic single/multi-select with search, custom option rendering, and portal-rendered dropdown. `value`/`onChange` work with plain option `value` strings (a single string, or an array when `isMulti`) rather than full option objects. `Option` shape is `{ value: string; label: string; disabled?: boolean }` by default, or pass your own type via the generic parameter along with `labelKey`/`valueKey`. Forwards a `ref` exposing `validate(): boolean`.

| Prop               | Type                                                          | Default              | Description                                                                                     |
| ------------------ | -------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------ |
| options             | `T[]`                                                          | `[]`                 | Option list                                                                                       |
| value               | `string \| string[]`                                           | -                     | Selected value(s) (required); array when `isMulti`                                                |
| onChange            | `(value: string \| string[]) => void`                          | -                     | Change handler (required)                                                                         |
| isMulti             | `boolean`                                                      | `false`               | Enables multi-select with chip display                                                            |
| searchable          | `boolean`                                                      | `true`                | Shows a text input to filter options                                                              |
| filterFunction      | `(option: T, searchTerm: string) => boolean`                   | label `includes` match | Custom search matching                                                                          |
| labelKey / valueKey | `keyof T`                                                       | `"label"` / `"value"` | Keys to read label/value from when using a custom option type                                     |
| renderOption        | `(option: T) => ReactNode`                                     | -                     | Custom rendering for each option row                                                              |
| onAddNew            | `(value: string) => Promise<void> \| void`                     | -                     | Enables an inline "Add \"…\"" option that creates a new entry from the search term                |
| allowCustomValue    | `boolean`                                                      | `false`               | Lets the typed search term itself become the (single-select) value when the dropdown closes       |
| onSearchChange      | `(searchTerm: string) => Promise<unknown[] \| void> \| unknown[] \| void` | -         | Called on every keystroke, e.g. to drive async/remote option loading                              |
| loading             | `boolean`                                                      | `false`               | Shows a loading state in the dropdown                                                             |
| disabled            | `boolean`                                                      | `false`               | Disables the control                                                                               |
| disabledOptions     | `string[]`                                                     | `[]`                  | Option values to render as disabled (in addition to each option's own `disabled` flag)             |
| showClearButton     | `boolean`                                                      | `false`               | Shows a clear-all button once a value is selected                                                 |
| maxVisibleOptions   | `number`                                                        | `3`                   | Multi-select: number of chips shown before collapsing the rest into a `+N` indicator               |
| prefixIcon          | `IconComponent`                                                 | -                     | Icon rendered at the start of the control                                                         |
| usePortal           | `boolean`                                                       | `false`               | Renders the dropdown in a portal instead of inline, so it can escape clipping/`overflow` ancestors |
| mountDocument       | `ShadowRoot \| Document`                                        | `document`            | Document/shadow root to mount the portal and bind outside-click listeners to                      |
| label / description | `ReactNode`                                                    | -                     | Field label and helper text                                                                       |
| placeholder         | `string`                                                        | `"Search..."`         | Placeholder text                                                                                   |
| noResultsMessage / allSelectedMessage | `string`                                     | -                     | Empty-state copy for the dropdown                                                                  |
| errorMessage / invalid / required | `string` / `boolean` / `boolean`     | -                     | Validation display, matching `Input`/`Textarea`                                                   |
| className / containerClassName / inputClassName / listClassName | `string`     | -                     | Class overrides for the control, its container, the search input, and the dropdown list           |
| id / name           | `string`                                                        | auto-generated        | Passed through to the underlying input                                                            |

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
| headerActions       | `ReactNode`   | -                  | Extra content rendered in the header, next to the close button |
| width               | `string`      | responsive default | Tailwind width classes                                      |
| contentPadding      | `string`      | `"fwr:p-4"`        | Tailwind padding classes for the body/content area           |
| disableOutsideClick | `boolean`     | `false`            | Prevents closing on backdrop click                          |
| zIndex              | `number`      | `ModalManager.baseZIndex` | Minimum z-index for this modal; `ModalManager` stacks it above whatever is currently the highest open modal, so the effective z-index is `max(highest open modal + 10, zIndex)` |
| mountContainer      | `HTMLElement` | `document.body`    | Portal mount target                                         |

`CenterModal` is the same component centered instead of docked to the right. Stacking order for multiple open modals is handled automatically by `ModalManager` (each modal registers on open and unregisters on close/unmount).

### ConfirmationDialog

Provider + hook for imperative confirm/delete dialogs. `ConfirmationDialog` must be rendered once inside the provider - it's what actually displays the dialog when `confirm()`/`confirmDelete()` are called:

```tsx
import { ConfirmationDialog, ConfirmationProvider, ConfirmationType, useConfirmation } from "@fw-components/react";

// once, near the root
<ConfirmationProvider>
  <ConfirmationDialog />
  <App />
</ConfirmationProvider>;

// anywhere inside
const { confirm, confirmDelete } = useConfirmation();

const ok = await confirm("Are you sure?", "Confirm action", "Continue", ConfirmationType.WARNING);
const okDelete = await confirmDelete("This cannot be undone.", "Delete item?");
```

`confirm(message, title?, label?, type?, icon?)` resolves `true`/`false` based on the user's choice. `type` is one of `ConfirmationType.INFO` (default), `WARNING`, `SEVERE`, or `SUCCESS`, each with its own icon/color treatment; `confirmDelete(message, title?)` is a shortcut for a `SEVERE` confirmation with a trash icon and a "Delete" label.

### Skeleton / Spinner

```tsx
<Skeleton className="" />
<Spinner className="" />
```

Simple loading placeholders; both accept a `className` to override sizing/color.

### Tooltip

A styled re-export of [Radix UI's Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip) primitives (`Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`), plus a `TooltipIconButton` convenience wrapper around `Button`:

```tsx
import { Tooltip, TooltipContent, TooltipTrigger } from "@fw-components/react";

<Tooltip>
  <TooltipTrigger asChild>
    <button>Hover me</button>
  </TooltipTrigger>
  <TooltipContent side="top">Helpful text</TooltipContent>
</Tooltip>;
```

`Tooltip` works standalone (no setup needed) - if it doesn't find an ancestor `TooltipProvider`, it wraps itself in one with `delayDuration={0}`. Wrap your app (or a subtree) in your own `<TooltipProvider delayDuration={500}>` to share one delay and Radix's hover-skip grouping across every `Tooltip` beneath it; nested `Tooltip`s detect it and won't shadow it. `TooltipContent` renders above any open `RightSideModal`/`CenterModal` automatically, and accepts an optional `mountDocument` (`ShadowRoot | Document`, same as `Select`) for portalling into a shadow root, plus all of Radix's `Content` props (`side`, `sideOffset`, `align`, etc.).

```tsx
import { Trash2 } from "lucide-react";
import { TooltipIconButton } from "@fw-components/react";

<TooltipIconButton tooltip="Delete" icon={Trash2} onClick={handleDelete} />;
<TooltipIconButton tooltip="Only admins can delete this" icon={Trash2} disabled />;
```

`TooltipIconButton` renders an icon-only `Button` (`mode="icon"`, `variant="ghost"`) wrapped in a `Tooltip`, using `tooltip` as both the button's accessible `title` and the tooltip text. It accepts every `Button` prop except `title`, plus `tooltip` (required) and `side` (default `"top"`). The tooltip still shows on hover/focus when `disabled` is set, so it can explain *why* the action is unavailable.

## Development

```sh
npm run build   # vite build: emits dist/index.js + dist/index.d.ts (types) and compiles styles/index.css into dist/styles.css and dist/styles.js
npm run dev     # vite build --watch
npm run clean   # rm -rf dist
```
