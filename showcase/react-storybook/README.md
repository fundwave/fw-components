# React Components Storybook

This is a Storybook showcase for the `@fw-components/react` component library.

## Getting Started

### Install dependencies

```bash
npm install
```

### Run Storybook

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`.

### Build Storybook

```bash
npm run build-storybook
```

This will build a static version of Storybook in the `storybook-static` directory.

## Available Components

The following components are showcased in this Storybook:

- **Button** - Various button styles, sizes, and states
- **Input** - Text inputs with labels, icons, and validation
- **Card** - Card layouts with headers, content, and footers
- **Badge** - Status badges with different variants
- **Avatar** - User avatars with initials or images
- **Spinner** - Loading spinners in different sizes
- **Modal** - Modal dialogs with customizable content
- **Tooltip** - Tooltips with different positions
- **Select** - Dropdown select components
- **ProgressBar** - Progress indicators

## Structure

```
showcase/react-storybook/
├── .storybook/          # Storybook configuration
│   ├── main.js          # Main config
│   └── preview.js       # Global decorators and parameters
├── stories/             # Story files
│   ├── Button.stories.js
│   ├── Input.stories.js
│   └── ...
├── styles/              # Global styles
│   └── globals.css
├── package.json
└── README.md
```

## Adding New Stories

To add a new story, create a new file in the `stories/` directory:

```javascript
import Component from '@fw-components/react/Component';

export default {
  title: 'Components/Component',
  component: Component,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    // component props
  },
};
```
