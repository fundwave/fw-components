# Drag and drop list

The fw-dnd component is used to reorder the list of items using drag and drop.

## Installation

```sh
npm i @fundwave/fw-dnd
```

## Example usage

```js
const dragList = [
  { name: "Aayush", company: "Fundwave" },
  { name: "Isha Sharma", company: "Fundwave" }
];
```

```html
<fw-dnd .list="${dragList}" @list-updated="${updateList}" .dragItemRenderer="${" (item)="">
  html `
  <p>${item.name}</p>
  ` } ></fw-dnd
>
```

## API

### Properties/Attributes

| Name             | Type     | Default | Description                                |
| ---------------- | -------- | ------- | ------------------------------------------ |
| list             | Array    | []      | Array which have all list items            |
| dragItemRenderer | Function |         | HTML content render for every item of list |

### Methods

#### dragStart()

Stores drag target element to categories property and set dataTransfer of event

#### drop()

Handle the reordering of the list Using startContainer and endContainer

### Events

#### @list-updated

Return the reordered list to the parent
