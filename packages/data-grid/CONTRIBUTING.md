# Contributing to @fw-components/data-grid

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js >= 18
- npm >= 9

### Getting Started

```bash
# Clone the repository
git clone https://github.com/fundwave/fw-components.git
cd fw-components

# Install dependencies
npm install

# Navigate to the data-grid package
cd packages/data-grid

# Build the package
npm run build

# Run type checking
npm run typecheck

# Watch mode for development
npm run dev
```

## Project Structure

```
src/
├── index.ts              # Package entry point & exports
├── types/                # TypeScript type definitions
│   └── index.ts          # All types, interfaces, and TanStack module augmentation
├── components/
│   ├── DataGrid.tsx      # Main grid component
│   ├── header/           # Header cell with sort/resize/pin
│   ├── row/              # Data row with expand/edit support
│   ├── cell/             # Editable cell & cell editor
│   ├── selection/        # Row selection checkbox
│   ├── commons/          # Shared UI primitives (SortIndicator, ExpandToggle)
│   └── states/           # Empty, Error, Skeleton states
├── hooks/
│   ├── useEditing.ts     # Cell editing state management
│   ├── useBulkEdit.ts    # Bulk edit operations
│   ├── useDataGridState.ts # Table state orchestration
│   └── useControlledState.ts # Controlled/uncontrolled pattern
└── utils/
    ├── filtering.ts      # Search index & global filter
    ├── formatting.ts     # Value formatting (currency, date, etc.)
    └── styling.ts        # CSS utilities (cn, alignment, pinning)
```

## Guidelines

### Code Style

- TypeScript strict mode
- Functional components with hooks
- Named exports (no default exports from index)
- JSDoc comments for public APIs

### Commits

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add bulk edit toolbar
fix: prevent edit loss during virtualization scroll
docs: update README with editing examples
refactor: extract cell editor into separate component
```

### Pull Requests

1. Fork the repository and create a branch from `main`
2. Add/update tests for any new functionality
3. Ensure `npm run typecheck` passes
4. Update documentation if you're changing public APIs
5. Write a clear PR description explaining the change

### Testing

```bash
# Type checking
npm run typecheck

# Build (ensures no compilation errors)
npm run build
```

### Adding New Features

When adding features:

1. Define types in `src/types/index.ts`
2. Implement logic in a hook under `src/hooks/`
3. Build UI in components under `src/components/`
4. Export from `src/index.ts`
5. Document in README.md

### Design Principles

- **Zero runtime dependencies** — only peer deps (React, TanStack)
- **Headless-first** — provide sensible defaults but allow full customization
- **Performance** — virtualization by default, memoize expensive computations
- **Accessibility** — proper ARIA roles, keyboard navigation, focus management
- **Type safety** — generic types that flow from data to columns to cells

## Reporting Issues

When filing issues, please include:

- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Version of the package
- Browser and React version

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
