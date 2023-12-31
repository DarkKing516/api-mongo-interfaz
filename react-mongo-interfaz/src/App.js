import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import axios from 'axios';
import NuevoPedidoForm from './NuevoPedidoForm';
import './App.css';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

Modal.setAppElement('#root');

const ITEMS_PER_PAGE = 6;

function App() {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nuevoPedidoModalIsOpen, setNuevoPedidoModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');


  useEffect(() => {
    axios
      .get('http://localhost:3000/pedidos')
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de pedidos:', error);
      });
  }, []);

  const handleVerDetalle = (pedido) => {
    setSelectedPedido(pedido);
    setModalIsOpen(true);
  };

  const handleEliminarPedido = async (id_pedido) => {
    try {
      const response = await axios.delete(`http://localhost:3000/pedidos/${id_pedido}`);
      if (response) {
        Swal.fire('Success', 'Pedido Eliminado', 'success');
        setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido._id !== id_pedido));
        return;
      }
    } catch (error) {
      console.error('Error al Eliminar pedido:', error);
      Swal.fire('Error', 'Error al eliminar el pedido', 'error');
    }
  };


  const handleEstadoChange = (selectedOption) => {
    setSelectedPedido((prevPedido) => ({ ...prevPedido, estado_pedido: selectedOption.value }));
  };

  const handleGuardarCambios = () => {
    axios
      .put(`http://localhost:3000/pedidos/${selectedPedido._id}`, {
        productos: selectedPedido.productos,
        servicios: selectedPedido.servicios,
        fecha_creacion: selectedPedido.fecha_creacion,
        fecha_pedido: selectedPedido.fecha_pedido,
        total_pedido: selectedPedido.total_pedido,
        estado_pedido: selectedPedido.estado_pedido,
      })
      .then((response) => {
        setPedidos((prevPedidos) =>
          prevPedidos.map((pedido) => (pedido._id === selectedPedido._id ? response.data : pedido))
        );
        setModalIsOpen(false);
      })
      .catch((error) => {
        console.error('Error al guardar cambios en el servidor:', error);
      });
  };

  const handleNuevoPedidoClick = () => {
    setNuevoPedidoModalIsOpen(true);
  };

  const handlePedidoAgregado = (nuevoPedido) => {
    setPedidos((prevPedidos) => [...prevPedidos, nuevoPedido]);
    setNuevoPedidoModalIsOpen(false);
  };

  const handleFiltroEstadoChange = (selectedOption) => {
    setFiltroEstado(selectedOption ? selectedOption.value : '');
    setCurrentPage(1);
  };

  const handleFiltroFechaChange = (e) => {
    setFiltroFecha(e.target.value);
    // setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const pedidosFiltrados = pedidos
    .filter((pedido) => (filtroEstado ? pedido.estado_pedido === filtroEstado : true))
    .filter((pedido) => (filtroFecha ? pedido.fecha_creacion.includes(filtroFecha) : true) || (filtroFecha ? pedido.fecha_pedido.includes(filtroFecha) : true));

  const currentItems = pedidosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pedidosFiltrados.length / ITEMS_PER_PAGE);

  const handleGenerarInforme = () => {
    const pdf = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    const footer = 'Cra 58 # 69 - 22 piso 11';

    pdf.text('Informe de Pedidos De Erikas HomeMade', 20, 10);
    pdf.text(`Informe del día: ${currentDate}`, 20, 20);

    let y = 35;
    const lineHeight = 70;

    pedidosFiltrados.forEach((pedido, index) => {
      if (y + lineHeight > pdf.internal.pageSize.height) {
        pdf.addPage();
        y = 25;
      }

      pdf.text(`Pedido #${index + 1}:`, 30, y);
      pdf.text(`Fecha Creación: ${pedido.fecha_creacion}`, 30, y + 10);
      pdf.text(`Fecha Pedido: ${pedido.fecha_pedido}`, 30, y + 20);
      pdf.text(`Total Pedido: ${pedido.total_pedido}`, 30, y + 30);
      pdf.text(`Estado Pedido: ${pedido.estado_pedido}`, 30, y + 40);
      pdf.text(`Nombre Usuario: ${pedido.nombre_usuario}`, 30, y + 50);
      pdf.text('---------------------------------------', 30, y + 60);

      y += lineHeight;
    });

    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);

      pdf.text(`${footer}, Página: ${i}`, 20, pdf.internal.pageSize.height - 10);
    }

    pdf.save('InformePedidos.pdf');
  };


  return (
    <div>
      <center>
        <h1>Listado de Pedidos</h1>
      </center>

      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <button onClick={handleNuevoPedidoClick}>Agregar Nuevo Pedido</button>
      </div>

      <br />
      <div>
        <label>Filtrar por Fecha:</label>
        <input
          type="text"
          name="fecha_creacion"
          placeholder='mm/dd/aaaa'
          value={filtroFecha}
          onChange={handleFiltroFechaChange}
        />
      </div>
      <br />
      <div>
        <label>Filtrar por Estado del Pedido:</label>
        <Select
          value={filtroEstado ? { value: filtroEstado, label: filtroEstado } : null}
          options={[
            { value: 'por hacer', label: 'Por Hacer' },
            { value: 'en proceso', label: 'En Proceso' },
            { value: 'entregado', label: 'Entregado' },
            { value: 'cancelado', label: 'Cancelado' },
          ]}
          onChange={handleFiltroEstadoChange}
          isClearable
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Fecha Creación</th>
            <th>Fecha Pedido</th>
            <th>Total Pedido</th>
            <th>Estado Pedido</th>
            <th>Nombre Usuario</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((pedido) => (
            <tr key={pedido._id}>
              <td>{pedido.fecha_creacion}</td>
              <td>{pedido.fecha_pedido}</td>
              <td>{pedido.total_pedido}</td>
              <td>{pedido.estado_pedido}</td>
              <td>{pedido.nombre_usuario}</td>
              <td>
                <button onClick={() => handleVerDetalle(pedido)}>Ver Detalle</button>
                <button onClick={() => handleEliminarPedido(pedido._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button onClick={handleGenerarInforme}>Generar Informe</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Detalles del Pedido"
      >
        {selectedPedido && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <h2>Detalles del Pedido</h2>
              <p>Nombre Usuario: {selectedPedido.nombre_usuario}</p>
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
                  { value: 'en proceso', label: 'En Proceso' },
                  { value: 'entregado', label: 'Entregado' },
                  { value: 'cancelado', label: 'Cancelado' },
                ]}
                onChange={handleEstadoChange}
              />
            </div>
            <br />
            <center>
              <button onClick={handleGuardarCambios}>Guardar Cambios</button>
            </center>
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
