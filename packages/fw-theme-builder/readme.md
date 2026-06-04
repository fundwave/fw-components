# fw-theme-builder

Fw Theme Builder is used to interactively create your theme

## Installation

```sh
npm i @fundwave/fw-theme-builder
```

## Example usage

```js
const theme = {
  fonts: {
    Title: {
      name: "DM Sans",
      url: "https://fonts.gstatic.com/s/dmsans/v11/rP2Hp2ywxg089UriCZOIHQ.woff2",
      style: "'DM Sans', sans-serif"
    },
    Body: {
      name: "DM Sans",
      url: "https://fonts.gstatic.com/s/dmsans/v11/rP2Hp2ywxg089UriCZOIHQ.woff2",
      style: "'DM Sans', sans-serif"
    }
  },
  sizes: {
    Tiny: "10px",
    XS: "14px",
    S: "16px",
    M: "18px",
    L: "20px",
    XL: "22px",
    Huge: "48px"
  },
  colors: {
    Primary: {
      Hex: "#ad38d1",
      L1: "#ba68d3",
      L2: "#dcb5e7",
      L3: "#e5d3eb",
      Contrast: "#f0f0f0"
    },
    Secondary: {
      Hex: "#4a48c7",
      L1: "#5f5dce",
      L2: "#706fd1",
      L3: "#9190df",
      Contrast: "#ebdbdb"
    },
    Background: {
      Hex: "#eeeeee"
    },
    Error: {
      Hex: "#e61e1e",
      L1: "#f1b4b4"
    },
    Text: {
      "Title": "#1b1b1b",
      "Subtitle": "#1b1b1b",
      "Body": "#1b1b1b",
      "Body-l1": "#363636"
    }
  }
};
```

```html
<fw-theme-builder .theme="${theme}" @font-changed="${updateFont}" @size-changed="${updateSize}" @color-changed="${updateColor}"></fw-theme-builder>
```

## API

### Properties/Attributes

| Name        | Type   | Description                                                                      |
| ----------- | ------ | -------------------------------------------------------------------------------- |
| theme       | Object | Object contains properties for Font, Size and Color like above mentioned example |
| fontOptions | Array  | List of font options where each object contains name, url and style              |

### Events

#### @font-changed

Return the type and updated font for that type.

```js
e.detail = {
    type: "Type of updated font like Family, Title, etc",
    value: {
        url
        name
        style
    }
}
```

#### @size-changed

Return the type and updated size value for that type.

```js
e.detail = {
  type: "Type of updated size like XL, M, etc",
  value: "Value of given size type"
};
```

#### @color-changed

Return group and its type which got updated with hsl, rgb, and hex

```js
e.detail = {
  group: "Group value like Primary, Secondary, etc.",
  type: "Type of updated color like hex, contrast, etc",
  value: "Value of updated color type",
  hsl: "HSL value of color selected",
  rgb: "RGB value of color selected"
};
```
