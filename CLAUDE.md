# Form Component

## Overview

React + Vite learning project for building reusable form components. Learning focus: React patterns & hooks (custom hooks, component composition, state management). Pure JavaScript/JSX — no TypeScript.

## Tech Stack

React 19, Vite 8, ES modules. Code quality: ESLint 9 (flat config), Prettier, Stylelint, Husky + lint-staged, commitlint (conventional commits).

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint check
- `npm run format` — Prettier format
- `npm run lint:css` — Stylelint CSS check

## Project Structure

- `src/App.jsx` — main form component (has TODOs for extraction)
- `src/useFormHook.js` — custom hook for form state management
- `src/utils.js` — validator utility functions

## Code Conventions

- Functional components only
- Custom hooks for state management (prefix with `use`)
- Curried validator pattern: `validator(label)(value)` → returns `null` if valid, error string if invalid
- Declarative field configuration as data structures (objects with `name`, `label`, `type`, validators)
- Controlled components for all form inputs
- Formatting: single quotes, semicolons, 120-char line width, 2-space indent, trailing commas
- Conventional commits enforced by commitlint + Husky

## Learning Project Guidelines

- This is a learning project — always explain the **why** behind code choices, not just what to do
- Challenge the user to implement key pieces themselves before showing solutions
- Keep explanations practical with reusable patterns, not abstract theory
- When introducing new React patterns, connect them to patterns already used in this codebase
