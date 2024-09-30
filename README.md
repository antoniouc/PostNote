<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
=======
# PostNote
PostNote es una aplicación web interactiva para la creación, organización y gestión de notas, desarrollada en React.js. El objetivo de esta aplicación es ofrecer una experiencia fluida para manejar múltiples bloques de notas, moviendo, editando y eliminando notas de manera intuitiva con soporte para drag and drop.

## Características principales
- **Creación de notas**: Permite crear notas de texto simples y organizarlas en bloques independientes.
- **Drag and Drop**: Arrastra y suelta notas dentro de un bloque o entre bloques diferentes.
- **Edición y eliminación**: Posibilidad de editar notas individualmente o eliminar notas y bloques completos.
- **Organización visual**: Las notas pueden ser apiladas o reordenadas dentro de su bloque.
- **Gestión eficiente**: Uso de `useReducer` y `useContext` para una gestión avanzada del estado de la aplicación, optimizando el manejo de las notas y su interacción.

## Tecnologías utilizadas
- **React.js**: Librería principal para la construcción de la UI.
- **TypeScript**: Utilizado para proporcionar tipado estático y mejorar la mantenibilidad del código.
- **Hooks (useReducer, useContext)**: Para la gestión de estados y contexto de manera eficiente.



>>>>>>> ba86c6e8c67dcf7a21d7314672d425318652b081
