import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';  // Importa axios

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    correo: '',
  });
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/usuarios');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de usuarios.');
        }

        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setError(error.message || 'Hubo un problema al obtener los usuarios.');
      }
    };

    fetchUsuarios();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleAgregarUsuario = async () => {
    try {
      const response = await axios.post('http://localhost:3000/usuarios', nuevoUsuario);
      setUsuarios([...usuarios, response.data]); // Agrega el nuevo usuario a la lista
      setNuevoUsuario({ nombre: '', correo: '' }); // Limpia los campos del formulario
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  const handleEliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/${id}`);
      setUsuarios(usuarios.filter((usuario) => usuario._id !== id)); // Elimina el usuario de la lista
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const handleEditarUsuario = (usuario) => {
    setUsuarioEditando(usuario);
    setNuevoUsuario({
      nombre: usuario.nombre,
      correo: usuario.correo,
    });
  };

  const handleActualizarUsuario = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/usuarios/${usuarioEditando._id}`, nuevoUsuario);
      setUsuarios(usuarios.map((usuario) => (usuario._id === usuarioEditando._id ? response.data : usuario)));
      setUsuarioEditando(null);
      setNuevoUsuario({ nombre: '', correo: '' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <h2>Lista de Usuarios:</h2>
            <ul>
              {usuarios.map((usuario) => (
                <li key={usuario._id}>
                  Nombre: {usuario.nombre}, Correo: {usuario.correo}
                  <button type="button" onClick={() => handleEliminarUsuario(usuario._id)}>
                    Eliminar
                  </button>
                  <button type="button" onClick={() => handleEditarUsuario(usuario)}>
                    Editar
                  </button>
                </li>
              ))}
            </ul>
            {usuarioEditando ? (
              <>
                <h2>Editar Usuario:</h2>
                <form>
                  <label>
                    Nombre:
                    <input
                      type="text"
                      name="nombre"
                      value={nuevoUsuario.nombre}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Correo:
                    <input
                      type="text"
                      name="correo"
                      value={nuevoUsuario.correo}
                      onChange={handleInputChange}
                    />
                  </label>
                  <button type="button" onClick={handleActualizarUsuario}>
                    Actualizar Usuario
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2>Agregar Nuevo Usuario:</h2>
                <form>
                  <label>
                    Nombre:
                    <input
                      type="text"
                      name="nombre"
                      value={nuevoUsuario.nombre}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Correo:
                    <input
                      type="text"
                      name="correo"
                      value={nuevoUsuario.correo}
                      onChange={handleInputChange}
                    />
                  </label>
                  <button type="button" onClick={handleAgregarUsuario}>
                    Agregar Usuario
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
 