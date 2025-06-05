# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Grid implementation Docs:
# 🧱 Custom Responsive Grid System (React + TypeScript)

This is a minimal, fully responsive 12-column grid system built using **CSS Grid** and **React components**. It supports responsive breakpoints via props like `sm`, `md`, `lg`, and `xl`, just like Bootstrap.

---

## ✅ Features

- **12-column CSS Grid** layout
- Supports breakpoints:
  - `sm` → ≥576px
  - `md` → ≥768px
  - `lg` → ≥992px
  - `xl` → ≥1200px
- Simple prop-based usage
- Easy to extend with custom styles or utilities

---

## 🔧 Usage

### Example

```tsx
<Grid>
  <Col sm={6} md={4} lg={3} xl={2}>
    <div style={{ background: "#ccc", padding: "1rem" }}>Responsive Column</div>
  </Col>
  <Col sm={6} md={8} lg={9} xl={10}>
    <div style={{ background: "#aaa", padding: "1rem" }}>Another Column</div>
  </Col>
</Grid>


## Colours for web theme:

| Purpose           | Name          | Color         | Hex       | Notes                                      |
| ----------------- | ------------- | ------------- | --------- | ------------------------------------------ |
| **Primary**       | Primary       | 🟦 Dark Blue  | `#004080` | Base color                                 |
| **Primary Light** | Light Blue    | 🟦 Sky Tint   | `#336699` | For hover states or light background fills |
| **Primary Dark**  | Navy          | 🔵 Deep Navy  | `#002244` | Headers, footers, emphasis                 |
| **Accent 1**      | Teal Accent   | 🟩 Teal       | `#00A4A4` | For calls to action or secondary buttons   |
| **Accent 2**      | Orange Accent | 🟧 Orange     | `#FF6600` | Highlights, alerts, contrast               |
| **Background**    | Soft White    | ⚪ Off-white   | `#F8F9FA` | Main page background                       |
| **Surface**       | Light Gray    | ⚪ Light Gray  | `#E6E9F0` | Card backgrounds, secondary UI             |
| **Border**        | Medium Gray   | ⚪ Border Gray | `#CCD6DD` | Input borders, dividers                    |
| **Text Primary**  | Text Dark     | ⚫ Near Black  | `#1A1A1A` | Headings and main body text                |
| **Text Muted**    | Text Gray     | ⚫ Gray        | `#555F6B` | For subtext, muted elements                |
