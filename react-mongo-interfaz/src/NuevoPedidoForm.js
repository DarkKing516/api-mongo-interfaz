// NuevoPedidoForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NuevoPedidoForm = ({ onPedidoAgregado }) => {
  const [nuevoPedido, setNuevoPedido] = useState({
    fecha_creacion: '',
    fecha_pedido: '',
    total_pedido: 0,
    estado_pedido: 'por hacer',
    producto: {
      tipo_producto: {
        nombre_tipo_producto: '',
        estado_tipo_producto: '',
      },
      nombre_producto: '',
      estado_producto: '',
      cantidad_producto: 0,
      precio_producto: 0,
      estado_producto_catalogo: '',
      subtotal: 0,
    },
    servicio: {
      tipo_servicio: {
        nombre_tipo_servicio: '',
        estado_tipo_servicio: '',
      },
      nombre_servicio: '',
      estado_servicio: '',
      cantidad_servicio: 0,
      precio_servicio: 0,
      estado_servicio_catalogo: '',
      subtotal: 0,
    },
  });

  useEffect(() => {
    const fechaCreacionActual = new Date().toISOString().split('T')[0];
    setNuevoPedido((prevPedido) => ({
      ...prevPedido,
      fecha_creacion: fechaCreacionActual,
      fecha_pedido: new Date(new Date(fechaCreacionActual).getTime() + 5 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoPedido((prevPedido) => ({
      ...prevPedido,
      [name]: value,
    }));
  };

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setNuevoPedido((prevPedido) => ({
      ...prevPedido,
      producto: {
        ...prevPedido.producto,
        [name]: value,
      },
    }));
  };

  const handleServicioChange = (e) => {
    const { name, value } = e.target;
    setNuevoPedido((prevPedido) => ({
      ...prevPedido,
      servicio: {
        ...prevPedido.servicio,
        [name]: value,
      },
    }));
  };

  const handleTipoProductoChange = (e) => {
    const { name, value } = e.target;
    setNuevoPedido((prevPedido) => ({
      ...prevPedido,
      producto: {
        ...prevPedido.producto,
        tipo_producto: {
          ...prevPedido.producto.tipo_producto,
          [name]: value,
        },
      },
    }));
  };

  const handleTipoServicioChange = (e) => {
    const { name, value } = e.target;
    setNuevoPedido((prevPedido) => ({
      ...prevPedido,
      servicio: {
        ...prevPedido.servicio,
        tipo_servicio: {
          ...prevPedido.servicio.tipo_servicio,
          [name]: value,
        },
      },
    }));
  };

  const handleCantidadChange = (e) => {
    const { name, value } = e.target;
    setNuevoPedido((prevPedido) => ({
      ...prevPedido,
      [name]: value,
    }));
    calcularTotalPedido();
  };

  const calcularTotalPedido = () => {
    const subtotalProductos = nuevoPedido.producto.cantidad_producto * nuevoPedido.producto.precio_producto;
    const subtotalServicios = nuevoPedido.servicio.cantidad_servicio * nuevoPedido.servicio.precio_servicio;
    const totalPedido = subtotalProductos + subtotalServicios;
    setNuevoPedido((prevPedido) => ({
      ...prevPedido,
      total_pedido: totalPedido,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/pedidos', nuevoPedido);
      onPedidoAgregado(response.data);
      setNuevoPedido({
        fecha_creacion: '',
        fecha_pedido: '',
        total_pedido: 0,
        estado_pedido: 'por hacer',
        producto: {
          tipo_producto: {
            nombre_tipo_producto: '',
            estado_tipo_producto: '',
          },
          nombre_producto: '',
          estado_producto: '',
          cantidad_producto: 0,
          precio_producto: 0,
          estado_producto_catalogo: '',
          subtotal: 0,
        },
        servicio: {
          tipo_servicio: {
            nombre_tipo_servicio: '',
            estado_tipo_servicio: '',
          },
          nombre_servicio: '',
          estado_servicio: '',
          cantidad_servicio: 0,
          precio_servicio: 0,
          estado_servicio_catalogo: '',
          subtotal: 0,
        },
      });
    } catch (error) {
      console.error('Error al agregar un nuevo pedido:', error);
    }
  };

  return (
    <form
      style={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      onSubmit={handleSubmit}
    >
      <label>Fecha de Creación:</label>
      <input
        type="date"
        name="fecha_creacion"
        value={nuevoPedido.fecha_creacion}
        onChange={handleInputChange}
        readOnly
      />

      <label>Fecha de Pedido:</label>
      <input
        type="date"
        name="fecha_pedido"
        value={nuevoPedido.fecha_pedido}
        onChange={handleInputChange}
        min={nuevoPedido.fecha_creacion}
      />

      <label>Total Pedido:</label>
      <input
        type="number"
        name="total_pedido"
        value={nuevoPedido.total_pedido}
        onChange={handleCantidadChange}
      />

      <h2>Productos</h2>
      <label>Tipo Producto:</label>
      <input
        type="text"
        name="nombre_tipo_producto"
        value={nuevoPedido.producto.tipo_producto.nombre_tipo_producto}
        onChange={handleTipoProductoChange}
      />

      <label>Estado Tipo Producto:</label>
      <input
        type="text"
        name="estado_tipo_producto"
        value={nuevoPedido.producto.tipo_producto.estado_tipo_producto}
        onChange={handleTipoProductoChange}
      />

      <label>Nombre Producto:</label>
      <input
        type="text"
        name="nombre_producto"
        value={nuevoPedido.producto.nombre_producto}
        onChange={handleProductoChange}
      />

      <label>Estado Producto:</label>
      <input
        type="text"
        name="estado_producto"
        value={nuevoPedido.producto.estado_producto}
        onChange={handleProductoChange}
      />

      <label>Cantidad Producto:</label>
      <input
        type="number"
        name="cantidad_producto"
        value={nuevoPedido.producto.cantidad_producto}
        onChange={handleProductoChange}
      />

      <label>Precio Producto:</label>
      <input
        type="number"
        name="precio_producto"
        value={nuevoPedido.producto.precio_producto}
        onChange={handleProductoChange}
      />

      <label>Estado Producto Catálogo:</label>
      <input
        type="text"
        name="estado_producto_catalogo"
        value={nuevoPedido.producto.estado_producto_catalogo}
        onChange={handleProductoChange}
      />

      <h2>Servicios</h2>
      <label>Tipo Servicio:</label>
      <input
        type="text"
        name="nombre_tipo_servicio"
        value={nuevoPedido.servicio.tipo_servicio.nombre_tipo_servicio}
        onChange={handleTipoServicioChange}
      />

      <label>Estado Tipo Servicio:</label>
      <input
        type="text"
        name="estado_tipo_servicio"
        value={nuevoPedido.servicio.tipo_servicio.estado_tipo_servicio}
        onChange={handleTipoServicioChange}
      />

      <label>Nombre Servicio:</label>
      <input
        type="text"
        name="nombre_servicio"
        value={nuevoPedido.servicio.nombre_servicio}
        onChange={handleServicioChange}
      />

      <label>Estado Servicio:</label>
      <input
        type="text"
        name="estado_servicio"
        value={nuevoPedido.servicio.estado_servicio}
        onChange={handleServicioChange}
      />

      <label>Cantidad Servicio:</label>
      <input
        type="number"
        name="cantidad_servicio"
        value={nuevoPedido.servicio.cantidad_servicio}
        onChange={handleServicioChange}
      />

      <label>Precio Servicio:</label>
      <input
        type="number"
        name="precio_servicio"
        value={nuevoPedido.servicio.precio_servicio}
        onChange={handleServicioChange}
      />

      <label>Estado Servicio Catálogo:</label>
      <input
        type="text"
        name="estado_servicio_catalogo"
        value={nuevoPedido.servicio.estado_servicio_catalogo}
        onChange={handleServicioChange}
      />

      <button type="submit">Agregar Pedido</button>
    </form>
  );
};

export default NuevoPedidoForm;
