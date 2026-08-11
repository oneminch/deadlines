# AGENTS.md

## Project snapshot

Deadlines is a small, local-first deadline tracker built with Vue 3 and Vite. All user data stays in the browser, and the app is intentionally lightweight: a Pinia store layer, a small persistence service, thin composables for UI behavior, and a component-driven shell.

Any agent working here should default to plain Vue 3 + Vite patterns, Composition API, Pinia, and browser storage.

## What to read first

- `README.md` for the public project summary and scripts.
- `src/main.ts` and `src/bootstrap.ts` for startup flow.
- `src/stores/` and `src/composables/` for the state and UI-facing logic.
- `src/utils/` for storage, schemas, shared types, and constants.

## Runtime flow

1. `src/main.ts` creates the Vue app and Pinia instance.
2. `hydrateAppStores()` runs before mount so both stores are ready at startup.
3. `src/App.vue` renders the shell and the Sonner toaster.
4. UI actions flow through composables, which call store actions and show toast feedback.

## Source map

### Entry and boot

- `src/main.ts` mounts the app.
- `src/bootstrap.ts` hydrates both stores and clears the first-time onboarding flag after startup.
- `index.html` loads `src/assets/css/main.css` and the Vue entry module.

### Stores

- `src/stores/deadlines.ts`
  - Owns the deadline collection in memory.
  - Normalizes `date` values into `Date` objects.
  - Exposes `sortedDeadlines` as a derived getter.
  - Provides `hydrate`, `addDeadline`, `updateDeadline`, `deleteDeadline`, `importDeadlines`, and `purgeDeadlines`.
- `src/stores/options.ts`
  - Owns app preferences.
  - Hydrates defaults from storage.
  - Exposes `updateOptions`.

### Composables

- `src/composables/use-deadlines.ts`
  - Thin UI wrapper around the deadlines store.
  - Adds success/error toasts for deadline actions.
  - Exposes the sorted deadline list to components.
- `src/composables/use-options.ts`
  - Thin wrapper around the options store.
  - Updates settings and optionally shows toast feedback.
- `src/composables/use-file.ts`
  - Handles JSON import/export.
  - Validates imported items before passing them to the store.
- `src/composables/use-toast.ts`
  - Central toast helper.
  - Respects `options.toastsEnabled`, unless bypassed for import/export and other forced notifications.

### Persistence and shared utilities

- `src/utils/persistence.ts`
  - Wraps `localforage` behind a small `read` / `write` / `remove` API.
  - Initializes missing keys with fallback values.
- `src/utils/constants.ts`
  - Holds storage keys, onboarding data, and default options.
- `src/utils/schema.ts`
  - Joi validation for imported deadline items.
- `src/utils/types.ts`
  - Shared domain types used across the app.
- `src/utils/helpers.ts`
  - Date helpers and utility functions used by the UI.
- `src/lib/utils.ts`
  - `cn()` class name helper used by the UI component library.

### Components

- `src/App.vue` renders the shell and mounts the toaster.
- `src/components/layout/` contains the main header, list, input, and nav pieces.
- `src/components/modals/` contains responsive dialog/drawer wrappers for about, options, and input flows.
- `src/components/ui/` contains the reusable UI primitives, including the Sonner wrapper.
- `src/components/app-deadline-item.vue` handles deadline row display and local highlight behavior after updates.
- `src/components/app-date-picker.vue` bridges the calendar UI to `Date` values.
- `src/components/app-confirmation-button.vue` is the reusable two-step destructive action control.

## Data model and storage

### Deadline items

- Shape: `{ id: string; task: string; date: Date }`
- Stored under `lf_deadlines`
- Dates are normalized to `Date` instances when read into the store
- The list is always exposed to the UI in sorted order by date

### Options

- Shape currently includes:
  - `isFirstTime`
  - `toastsEnabled`
- Stored under `lf_options`
- Defaults live in `DEFAULT_OPTIONS`

### Storage behavior

- Missing keys are initialized with fallback data on first read.
- Store actions roll back in-memory state if persistence fails.
- UI feedback stays out of the persistence layer and belongs in composables/components.

## UI conventions

- Prefer Composition API with `<script setup lang="ts">`.
- Keep components focused on rendering and local interaction.
- Use composables for cross-cutting UI behavior like toasts and file import/export.
- Keep user-facing messages in the view layer, not inside the store or persistence utility.
- Preserve local data and keep mutations deterministic.

## Testing

- Tests live in `src/__tests__/`.
- The suite uses Vitest and Vue Test Utils.
- Existing tests focus on observable behavior:
  - app shell rendering
  - store hydration and persistence
  - storage service behavior
  - startup hydration path

## Tooling

- Dev: `pnpm dev`
- Build: `pnpm build`
- Unit tests: `pnpm test:unit`
- Lint: `pnpm lint`
- Format: `pnpm format`

Generated files:

- `src/auto-imports.d.ts`
- `src/components.d.ts`

These are produced by the Vite plugin setup in `vite.config.ts`.

## Deployment

- `.github/workflows/deploy.yml` delegates GitHub Pages deployment to a shared reusable workflow.

## Working rules for future agents

- Stay within the current Vue 3 + Vite architecture.
- Prefer small, readable modules over controller-style indirection.
- Reuse the existing stores, composables, and persistence service instead of adding new layers.
- If you change storage or startup behavior, keep the existing browser data compatible unless the task explicitly requires a migration.
