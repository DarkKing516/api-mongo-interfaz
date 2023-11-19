import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import axios from 'axios';
import NuevoPedidoForm from './NuevoPedidoForm';
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nuevoPedidoModalIsOpen, setNuevoPedidoModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/pedidos')
      .then(response => {
        setPedidos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de pedidos:', error);
      });
  }, []);

  const handleVerDetalle = (pedido) => {
    setSelectedPedido(pedido);
    setModalIsOpen(true);
  };

  const handleEstadoChange = (selectedOption) => {
    setSelectedPedido(prevPedido => ({ ...prevPedido, estado_pedido: selectedOption.value }));
  };

  const handleGuardarCambios = () => {
    setPedidos(prevPedidos =>
      prevPedidos.map(pedido => (pedido._id === selectedPedido._id ? selectedPedido : pedido))
    );
    setModalIsOpen(false);
  };

  const handleNuevoPedidoClick = () => {
    setNuevoPedidoModalIsOpen(true);
  };

  const handlePedidoAgregado = (nuevoPedido) => {
    setPedidos(prevPedidos => [...prevPedidos, nuevoPedido]);
    setNuevoPedidoModalIsOpen(false);
  };

  return (
    <div>
      <h1>Listado de Pedidos</h1>

      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <button onClick={handleNuevoPedidoClick}>Agregar Nuevo Pedido</button>
      </div>

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
            {(selectedPedido.servicios || selectedPedido.productos) ? (
             <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
             {selectedPedido.servicios && selectedPedido.servicios.length > 0 && (
               <div>
                 <h3>Detalles de Servicios</h3>
                 {selectedPedido.servicios.map((servicio, index) => (
                   <div key={index}>
                    <p>---------------------------------------</p>
                     <p>Nombre del Servicio: {servicio.nombre_servicio}</p>
                     <p>Estado del Servicio: {servicio.estado_servicio}</p>
                     <p>Cantidad del Servicio: {servicio.cantidad_servicio}</p>
                     <p>Precio del Servicio: {servicio.precio_servicio}</p>
                     <p>Estado del Catálogo del Servicio: {servicio.estado_servicio_catalogo}</p>
                     <p>Subtotal del Servicio: {servicio.subtotal}</p>
                     {servicio.tipo_servicio && (
                       <div>
                         <h4>Detalles del Tipo de Servicio</h4>
                         <p>Nombre del Tipo de Servicio: {servicio.tipo_servicio.nombre_tipo_servicio}</p>
                         <p>Estado del Tipo de Servicio: {servicio.tipo_servicio.estado_tipo_servicio}</p>
                       </div>
                     )}
                   </div>
                 ))}
               </div>
             )}
           
             {selectedPedido.productos && selectedPedido.productos.length > 0 && (
               <div>
                 <h3>Detalles de Productos</h3>
                 {selectedPedido.productos.map((producto, index) => (
                   <div key={index}>
                    <p>---------------------------------------</p>
                     <p>Nombre del Producto: {producto.nombre_producto}</p>
                     <p>Estado del Producto: {producto.estado_producto}</p>
                     <p>Cantidad del Producto: {producto.cantidad_producto}</p>
                     <p>Precio del Producto: {producto.precio_producto}</p>
                     <p>Estado del Catálogo del Producto: {producto.estado_producto_catalogo}</p>
                     <p>Subtotal del Producto: {producto.subtotal}</p>
                     {producto.tipo_producto && (
                       <div>
                         <h4>Detalles del Tipo de Producto</h4>
                         <p>Nombre del Tipo de Producto: {producto.tipo_producto.nombre_tipo_producto}</p>
                         <p>Estado del Tipo de Producto: {producto.tipo_producto.estado_tipo_producto}</p>
                       </div>
                     )}
                   </div>
                 ))}
               </div>
             )}
           </div>
            ) : (
              <p>No hay detalles de servicio y producto disponibles.</p>
            )}
            <div>
              <label>Estado del Pedido:</label>
              <Select
                value={{ value: selectedPedido.estado_pedido, label: selectedPedido.estado_pedido }}
                options={[
                  { value: 'En Proceso', label: 'En Proceso' },
                  { value: 'Entregado', label: 'Entregado' },
                  { value: 'Cancelado', label: 'Cancelado' },
                ]}
                onChange={handleEstadoChange}
              />
            </div>
            <button onClick={handleGuardarCambios}>Guardar Cambios</button>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={nuevoPedidoModalIsOpen}
        onRequestClose={() => setNuevoPedidoModalIsOpen(false)}
        contentLabel="Nuevo Pedido"
      >
        <NuevoPedidoForm onPedidoAgregado={handlePedidoAgregado} />
      </Modal>
    </div>
  );
}

export default App;
