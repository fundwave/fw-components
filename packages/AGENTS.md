===== Styling =====

1. Prefix Tailwind classes to avoid colliding with a consuming app's own styles (`react` uses `fwr:`, `data-grid` uses `fwgrid:`). Every new package needs its own prefix.
2. Merge classes with `clsx` + `tailwind-merge` (see `react/src/utils/tailwind.ts`).
3. Prefer semantic design tokens (`bg-background`, `text-primary`, `text-muted-foreground`, `bg-destructive`, etc.) over raw palette colors (`bg-gray-50`, `text-blue-600`).
4. Build the compiled stylesheet and export it from the package (follow the approach used in `packages/react`) — don't make consumers run their own Tailwind build over your source.
5. Use `lucide-react` for icons everywhere; don't mix in other icon sets or hand-rolled SVGs.

===== Licensing =====

1. Keep `license` consistent with the rest of the repo. Check against the root `LICENSE`.

===== Codebase Structure =====

1. Follow a top-level layout: `components/`, `providers/`, `types/index.ts`, `utils/`, and a single `index.ts` entry point.
2. Keep package-wide types in a single `types/index.ts`, not scattered per-component.
3. `index.ts` is the only public export surface — re-export components, types, and utils from there rather than having consumers deep-import from `src/components/...`.
4. Only export what's actually part of the public API. Internal components, hooks, and utilities (anything the package itself uses to compose its main export, but that a consumer has no reason to reach for directly) should NOT be re-exported from `index.ts`. When unsure whether something needs exporting, check whether the app actually consumes it before adding the export.
5. Before adding a new low-level component (e.g. a `Checkbox`), check `commons/` (or the equivalent shared folder) for an existing one to reuse/extend instead of duplicating it.
6. Use constants or enums for fixed sets of string/format values instead of inline string literals scattered through the code.
7. Follow YAGNI — don't leave unused files or dead code paths in a PR (e.g. a hook or module written for a feature that was deferred). Remove them, or don't add them until the feature is actually needed.
8. Don't ship unrelated changes in a PR — if a file in another package (e.g. `packages/react/package.json`) doesn't need to change for this feature, revert it.

===== Component API Design =====

1. Avoid drilling many single-purpose props through multiple component layers (e.g. passing 9 separate editing-related props from a row component down to a cell component). Group related props into a single object (e.g. an `editing` prop) when a child only consumes a subset itself and forwards the rest.
2. Favor shipping the minimal working feature first — if a sub-feature (e.g. range selection) isn't required yet, leave it out rather than building it speculatively; it can be added in a follow-up once there's a concrete need.

===== Interaction Tracking =====

1. Record user interactions via the shared eventBus, not ad-hoc per-component callback props (e.g. an `onInteraction` handler wired through each component).

===== Dependencies & Build =====

1. Anything the consumer must already have (`react`, `react-dom`) belongs in `peerDependencies`, mirrored in `devDependencies` for local building — not in `dependencies`.
2. Keep the `exports`/`main`/`module`/`types` field shape in `package.json` consistent across packages — consumers and shared tooling (bundlers, the monorepo's build/publish scripts, editor module resolution) rely on every package resolving the same way.
