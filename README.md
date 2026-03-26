# Form Component

A React learning project for building reusable form components with custom hooks and composable validation.

## What I Learned

- **Declarative configuration**
  - instead of writing each input by hand, the `fields` array in `App.jsx` defines form fields as data, and React renders them with `.map()`. Adding a new field is just adding an object to the array.
- **Custom hooks**
  - extracted form state, validation, and submission logic from `App.jsx` into `useFormHook.js`, making it reusable across different forms.
- **Composable validation**
  - `isRequired`, `isBetween`, and `isEmail` are small validator functions in `utils.js` that can be mixed and matched per field. Each returns `null` if valid or an error string if not.
- **Controlled components**
  - every `<input>` is controlled by React state (`value` + `onChange`), which enables real-time validation on every keystroke.
- **Curried functions**
  - validators like `isRequired(label)(value)` return a new function, so the field name is "baked in" once and the validator can be reused across fields.

## Tech Stack

- React 19
- Vite 8
- ESLint 9 (flat config) + Prettier + Stylelint
- Husky + lint-staged (pre-commit hooks)
- commitlint (conventional commits)

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

| Command            | Description               |
| ------------------ | ------------------------- |
| `npm run dev`      | Start development server  |
| `npm run build`    | Build for production      |
| `npm run lint`     | Run ESLint                |
| `npm run format`   | Format code with Prettier |
| `npm run lint:css` | Run Stylelint on CSS      |

## Project Structure

```
src/
  App.jsx          - Registration form component with declarative field config
  useFormHook.js   - Custom hook for form state, validation, and submission
  utils.js         - Composable validator functions (isRequired, isBetween, isEmail)
  App.css          - Form styling
  main.jsx         - React entry point
```
