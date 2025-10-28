# Task 3

## [Task](https://innowise-group.atlassian.net/jira/software/c/projects/JST/boards/390?selectedIssue=JST-2421)

--- 

# Brief functionality

Created SPA web-app with using react, RTK (react toolkit), RTK query and MaterialUI.
An online store was implemented with token-based authentication (with user session preservation), form validation, filtering (and saving parameters in the URL), pagination, and a shopping cart.
---

# How to build the app
1. **Install dependencies:**  
   `npm install`

2. **Run a build command:**
   * Production mode: `npm run build`
   * Development mode: `npm run dev`
   * Start dev server: `npm run start`

---

## [Deploy](https://halubko.github.io/task3/)

---

# Dependencies
### Prod: 
* **React (`react`, `react-dom`)**
* **State Management (`@reduxjs/toolkit`, `react-redux`)**
* **UI Components (Material UI)**:
   * `@mui/material`
   * `@mui/icons-material`
   * `@emotion/react`, `@emotion/styled` (styling engine for MUI)
* **Routing (`react-router-dom`)**
* **Notifications (`react-toastify`)**
### Dev:
* **Webpack & Loaders:**
    * `webpack`, `webpack-cli`, `webpack-dev-server`
    * `babel-loader`
    * `html-webpack-plugin`, `eslint-webpack-plugin`, `fork-ts-checker-webpack-plugin`
    * `webpack-bundle-analyzer`
* **TypeScript:**
    * `typescript`, `ts-node`, `jiti`
    * `@types/*`: Type definition packages for various libraries (`node`, `react`, `redux`, `webpack`, ...).
* **ESLint & Prettier:**
    * `eslint`, `@typescript-eslint/parser`, `eslint-config-prettier`, `eslint-plugin-react`
    * `prettier`.
* **Git Hooks & Pre-commit Checks:**
    * `husky`, `lint-staged`