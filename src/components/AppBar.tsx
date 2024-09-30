import React from 'react';
import '../AppBar.css'; // Importa el archivo de estilos

const AppBar = () => {
  return (
    <div className="app-bar">
      <div className="app-bar-content">
        <h1 className="app-bar-title">POST NOTE</h1>
        <h2 className="app-bar-subtitle"> Bienvenido Usuario Genérico 💗</h2>
      </div>
    </div>
  );
};

export default AppBar;
