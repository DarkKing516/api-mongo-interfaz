import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import axios from 'axios';
import './App.css';

Modal.setAppElement('#root'); // Necesario para evitar errores de accesibilidad con react-modal

function App() {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Obtener la lista de pedidos al cargar el componente
  useEffect(() => {
    axios.get('http://localhost:3000/pedidos')
      .then(response => {
        setPedidos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de pedidos:', error);
      });
  }, []);

  // Abrir la modal y seleccionar el pedido al hacer clic en "ver detalle"
  const handleVerDetalle = (pedido) => {
    setSelectedPedido(pedido);
    setModalIsOpen(true);
  };

  // Manejar el cambio de estado en la modal
  const handleEstadoChange = (selectedOption) => {
    // Puedes hacer una solicitud API para actualizar el estado aquí
    // También puedes manejar el cambio localmente y actualizar la API en "Guardar cambios"
    // Para este ejemplo, simplemente actualizamos el estado localmente
    setSelectedPedido(prevPedido => ({ ...prevPedido, estado_pedido: selectedOption.value }));
  };

  // Guardar los cambios en la modal
  const handleGuardarCambios = () => {
    // Realizar una solicitud API para actualizar el estado en la base de datos
    // Aquí solo actualizamos el estado localmente
    setPedidos(prevPedidos =>
      prevPedidos.map(pedido => (pedido._id === selectedPedido._id ? selectedPedido : pedido))
    );
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Listado de Pedidos</h1>
      <table>
        <thead>
          <tr>
            <th>Fecha Creación</th>
            <th>Fecha Pedido</th>
            <th>Total Pedido</th>
            <th>Estado Pedido</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido._id}>
              <td>{pedido.fecha_creacion}</td>
              <td>{pedido.fecha_pedido}</td>
              <td>{pedido.total_pedido}</td>
              <td>{pedido.estado_pedido}</td>
              <td>
                <button onClick={() => handleVerDetalle(pedido)}>Ver Detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Detalles del Pedido"
      >
        <h2>Detalles del Pedido</h2>
        {selectedPedido && (
          <div>
            <p>Fecha Creación: {selectedPedido.fecha_creacion}</p>
            <p>Fecha Pedido: {selectedPedido.fecha_pedido}</p>
            <p>Total Pedido: {selectedPedido.total_pedido}</p>
            <p>Estado Pedido:
              <Select
                options={[
                  { value: 'en proceso', label: 'En proceso' },
                  { value: 'por hacer', label: 'Por Hacer' },
                  { value: 'hecho', label: 'Hecho' },
                  { value: 'entregado', label: 'Entregado' },
                  { value: 'deshabilitado', label: 'Deshabilitado' },
                ]}
                value={{ value: selectedPedido.estado_pedido, label: selectedPedido.estado_pedido }}
                onChange={handleEstadoChange}
              />
            </p>
            <button onClick={handleGuardarCambios}>Guardar Cambios</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
