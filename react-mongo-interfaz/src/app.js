// En tu componente de React (App.js)
import React, { useState, useEffect } from 'react';

const App = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET a la API
    fetch('http://localhost:3000/usuarios')  // Reemplaza PUERTO_DEL_SERVIDOR con el puerto de tu servidor
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {usuarios.length === 0 ? (
        <p>Cargando usuarios...</p>
      ) : (
        <ul>
          {usuarios.map(usuario => (
            <li key={usuario._id}>{usuario.nombre} - {usuario.correo}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
