## @fw-components/localize

A localization utility built on top of [lit-localize](https://www.npmjs.com/package/@lit/localize), providing simplified message extraction and runtime locale switching for web applications.

### 1. How it works

The package provides two main components:

1. **CLI Tool**: A command-line utility (`fw-localize`) that extracts localizable messages from your source code and generates translation files.

2. **Runtime Library**: Functions for loading translations and switching between locales in your application.

The localization workflow consists of:

- Marking strings for translation in your code using `msg()`
- Extracting these messages using the CLI tool
- Translating the extracted messages
- Loading and applying translations at runtime

```json
// Example locales/es.json
{
  "Hello": "Hola"
}
```

### 2. Usage

#### CLI Usage

Extract messages from your source files:

```bash
npx fw-localize extract
```

Configuration is specified in a `localize.json` file:

```json
{
  "sourceLocale": "en",
  "targetLocales": ["es", "fr", "de"],
  "tsConfig": "./tsconfig.json",
  "output": {
    "mode": "runtime",
    "outputDir": "./locales"
  },
  "interchange": {
    "format": "json"
  }
}
```

#### Runtime Usage

```js
import { configureLocalization, msg } from "@fw-components/localize";

// Configure localization
const { getLocale, setLocale } = configureLocalization({
  sourceLocale: "en",
  targetLocales: ["es", "fr", "de"],
  loadLocale: (locale) => import(`./locales/${locale}.js`)
});

// Use in your components
function renderGreeting(name) {
  return html` <h1>${msg("Hello")}</h1> `;
}

// Switch locale
await setLocale("es");
```

### Note:

Use the `msg()` function to mark text for translation:

```js
// For static strings
msg("Hello world");

// For strings with expressions
msg(`Hello ${username}`);
```

For more advanced usage and options, refer to the [lit-localize documentation](https://www.npmjs.com/package/@lit/localize).
