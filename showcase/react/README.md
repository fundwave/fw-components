# React Components Showcase

A professional showcase for the FW Components React library, demonstrating all available components with real working examples.

## Features

- 🎨 Clean shadcn/ui-inspired design
- 📱 Fully responsive layout
- ✅ **Uses actual components from @fw-components/react**
- 🎯 Easy navigation with sidebar
- ⚡ Built with Vite for fast development

## Components Showcased

The showcase includes live demonstrations for all 25+ React components:

### Form Components
- **Button** - Multiple themes (primary, secondary, danger), variants (filled, outlined, plain, ghost), sizes, and loading states
- **Input** - Text inputs with labels, icons, validation, error states, and number formatting
- **Select** - Single and multi-select dropdowns with search, custom rendering, and add-new functionality
- **Textarea** - Multi-line text inputs
- **Checkbox** - Checkboxes with validation

### Display Components
- **Badge** - Status indicators with different variants (default, secondary, destructive, outline)
- **Card** - Container components with header, content, and footer sections
- **Avatar** - User profile images with color generation and fallback initials
- **Spinner** - Loading indicators
- **Progress Bar** - Visual progress indicators
- **Table** - Data tables with proper semantic structure
- **Stat Card** - Metric display cards with icons and theming
- **Chart** - Data visualization components (using Recharts)
- **Empty State** - Placeholder views for empty data states
- **Tooltip** - Contextual hover information

### Overlay Components
- **Modal** - Dialog overlays (right-side and center variants) with z-index management
- **Confirmation Dialog** - Confirmation prompts with context provider
- **Dropdown Menu** - Advanced dropdown menus with radix-ui

### Specialized Components
- **Action Menu** - Context menus with search functionality
- **Date Picker** - Date/time selection (native implementation)
- **Search Input** - Specialized search fields
- **Editor** - Rich text editor (TinyMCE based)
- **File Uploader** - File upload interfaces
- **File Viewer** - Document viewer for PDFs and other files
- **File Preview** - File thumbnail previews
- **Drag & Drop** - Sortable lists and kanban boards (using dnd-kit)
- **Infinite Scroll** - Load-more functionality for large lists

## Getting Started

### Installation

From the showcase/react directory:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The showcase will open automatically at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
showcase/react/
├── src/
│   ├── components/
│   │   ├── showcases/
│   │   │   ├── ButtonShowcase.jsx
│   │   │   ├── InputShowcase.jsx
│   │   │   └── ... (all component showcases)
│   │   ├── ComponentShowcase.jsx
│   │   ├── Sidebar.jsx
│   │   └── ShowcaseSection.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Using Real Components

All showcases import and use actual components from `@fw-components/react/src/`. For example:

```jsx
import Button from '@fw-components/react/src/Button';
import { Input, Textarea } from '@fw-components/react/src/Input';
import { Card, CardHeader, CardContent } from '@fw-components/react/src/Card';

// Use them in your showcase
<Button theme="primary" variant="filled">Click Me</Button>
<Input label="Email" placeholder="your@email.com" />
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **@fw-components/react** - The component library being showcased

## Design System

The showcase follows a shadcn/ui-inspired design with:
- HSL-based color system with CSS variables
- Consistent spacing and typography
- Semantic color tokens (background, foreground, border, etc.)
- Clean card-based layouts
- Subtle shadows and borders

## Contributing

To add a new component showcase:

1. Create a new file in `src/components/showcases/YourComponentShowcase.jsx`
2. Import the actual component from `@fw-components/react/src/`
3. Follow the pattern of existing showcases using `ShowcaseSection` and `VariantSection`
4. Import and add to the `showcaseComponents` object in `ComponentShowcase.jsx`
5. Add the component entry to the `components` array in `Sidebar.jsx`

Example structure:

```jsx
import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import YourComponent from '@fw-components/react/src/YourComponent';

function YourComponentShowcase() {
  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Component Name
        </h1>
        <p className="text-muted-foreground">
          Component description
        </p>
      </div>

      <ShowcaseSection title="Examples" description="Component variations">
        <VariantSection title="Variant Name">
          <YourComponent prop="value">Content</YourComponent>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default YourComponentShowcase;
```

## License

ISC
