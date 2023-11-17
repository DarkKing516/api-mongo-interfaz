import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import axios from 'axios';
import NuevoPedidoForm from './NuevoPedidoForm'; // Importa el nuevo componente
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nuevoPedidoModalIsOpen, setNuevoPedidoModalIsOpen] = useState(false);

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
    setSelectedPedido(prevPedido => ({ ...prevPedido, estado_pedido: selectedOption.value }));
  };

  // Guardar los cambios en la modal
  const handleGuardarCambios = () => {
    setPedidos(prevPedidos =>
      prevPedidos.map(pedido => (pedido._id === selectedPedido._id ? selectedPedido : pedido))
    );
    setModalIsOpen(false);
  };

  // Abrir la modal de nuevo pedido
  const handleNuevoPedidoClick = () => {
    setNuevoPedidoModalIsOpen(true);
  };

  // Agregar un nuevo pedido a la lista
  const handlePedidoAgregado = (nuevoPedido) => {
    setPedidos(prevPedidos => [...prevPedidos, nuevoPedido]);
    setNuevoPedidoModalIsOpen(false);
  };

  return (
    <div>
      <h1>Listado de Pedidos</h1>

      {/* Botón para abrir la modal de nuevo pedido */}
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <button onClick={handleNuevoPedidoClick}>Agregar Nuevo Pedido</button>
      </div>

      {/* Lista de pedidos existentes */}
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
        {selectedPedido && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <h2>Detalles del Pedido</h2>
              <p>Fecha Creación: {selectedPedido.fecha_creacion}</p>
              <p>Fecha Pedido: {selectedPedido.fecha_pedido}</p>
              <p>Total Pedido: {selectedPedido.total_pedido}</p>
            </div>
            {/* Mostrar detalles del Servicio y Producto en un formato de cuadro */}
            {(selectedPedido.servicios || selectedPedido.productos) ? (
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {/* Detalles del Servicio */}
                {selectedPedido.servicios && (
                  <div>
                    <h3>Detalles del Servicio</h3>
                    <p>Nombre del Servicio: {selectedPedido.servicios.nombre_servicio}</p>
                    <p>Estado del Servicio: {selectedPedido.servicios.estado_servicio}</p>
                    <p>Cantidad del Servicio: {selectedPedido.servicios.cantidad_servicio}</p>
                    <p>Precio del Servicio: {selectedPedido.servicios.precio_servicio}</p>
                    <p>Estado del Catálogo del Servicio: {selectedPedido.servicios.estado_servicio_catalogo}</p>
                    <p>Subtotal del Servicio: {selectedPedido.servicios.subtotal}</p>

                    {/* Mostrar detalles del Tipo de Servicio */}
                    {selectedPedido.servicios.tipo_servicio && (
                      <div>
                        <h4>Detalles del Tipo de Servicio</h4>
                        <p>Nombre del Tipo de Servicio: {selectedPedido.servicios.tipo_servicio.nombre_tipo_servicio}</p>
                        <p>Estado del Tipo de Servicio: {selectedPedido.servicios.tipo_servicio.estado_tipo_servicio}</p>
                        {/* Otros campos del tipo de servicio */}
                      </div>
                    )}
                  </div>
                )}

                {/* Detalles del Producto */}
                {selectedPedido.productos && (
                  <div>
                    <h3>Detalles del Producto</h3>
                    <p>Nombre del Producto: {selectedPedido.productos.nombre_producto}</p>
                    <p>Estado del Producto: {selectedPedido.productos.estado_producto}</p>
                    <p>Cantidad del Producto: {selectedPedido.productos.cantidad_producto}</p>
                    <p>Precio del Producto: {selectedPedido.productos.precio_producto}</p>
                    <p>Estado del Catálogo del Producto: {selectedPedido.productos.estado_producto_catalogo}</p>
                    <p>Subtotal del Producto: {selectedPedido.productos.subtotal}</p>

                    {/* Mostrar detalles del Tipo de Producto */}
                    {selectedPedido.productos.tipo_producto && (
                      <div>
                        <h4>Detalles del Tipo de Producto</h4>
                        <p>Nombre del Tipo de Producto: {selectedPedido.productos.tipo_producto.nombre_tipo_producto}</p>
                        <p>Estado del Tipo de Producto: {selectedPedido.productos.tipo_producto.estado_tipo_producto}</p>
                        {/* Otros campos del tipo de producto */}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p>No hay detalles de servicio y producto disponibles.</p>
            )}

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

      {/* Modal de nuevo pedido */}
      <Modal
        isOpen={nuevoPedidoModalIsOpen}
        onRequestClose={() => setNuevoPedidoModalIsOpen(false)}
        contentLabel="Agregar Nuevo Pedido"
      >
        <NuevoPedidoForm onPedidoAgregado={handlePedidoAgregado} />
      </Modal>
    </div>
  );
}

export default App;