import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NuevoPedidoForm = ({ onPedidoAgregado }) => {
  const [nuevoPedido, setNuevoPedido] = useState({
    fecha_creacion: '',
    fecha_pedido: '',
    total_pedido: 0,
    estado_pedido: 'por hacer',
    productos: [
      {
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
    ],
    servicios: [
      {
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
    ],
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

  const handleProductoChange = (e, index) => {
    const { name, value } = e.target;
    setNuevoPedido((prevPedido) => {
      const nuevosProductos = [...prevPedido.productos];
      nuevosProductos[index] = {
        ...nuevosProductos[index],
        [name]: value,
      };
      return {
        ...prevPedido,
        productos: nuevosProductos,
      };
    });
  };

  const handleServicioChange = (e, index) => {
    const { name, value } = e.target;
    setNuevoPedido((prevPedido) => {
      const nuevosServicios = [...prevPedido.servicios];
      nuevosServicios[index] = {
        ...nuevosServicios[index],
        [name]: value,
      };
      return {
        ...prevPedido,
        servicios: nuevosServicios,
      };
    });
  };

  const handleTipoProductoChange = (e, index) => {
    const { name, value } = e.target;
    setNuevoPedido((prevPedido) => {
      const nuevosProductos = [...prevPedido.productos];
      nuevosProductos[index] = {
        ...nuevosProductos[index],
        tipo_producto: {
          ...nuevosProductos[index].tipo_producto,
          [name]: value,
        },
      };
      return {
        ...prevPedido,
        productos: nuevosProductos,
      };
    });
  };

  const handleTipoServicioChange = (e, index) => {
    const { name, value } = e.target;
    setNuevoPedido((prevPedido) => {
      const nuevosServicios = [...prevPedido.servicios];
      nuevosServicios[index] = {
        ...nuevosServicios[index],
        tipo_servicio: {
          ...nuevosServicios[index].tipo_servicio,
          [name]: value,
        },
      };
      return {
        ...prevPedido,
        servicios: nuevosServicios,
      };
    });
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
    const subtotalProductos = nuevoPedido.productos.reduce(
      (total, producto) => total + producto.cantidad_producto * producto.precio_producto,
      0
    );
    const subtotalServicios = nuevoPedido.servicios.reduce(
      (total, servicio) => total + servicio.cantidad_servicio * servicio.precio_servicio,
      0
    );
    const totalPedido = subtotalProductos + subtotalServicios;
    setNuevoPedido((prevPedido) => ({
      ...prevPedido,
      total_pedido: totalPedido,
    }));
  };

  const agregarProducto = () => {
    setNuevoPedido((prevPedido) => ({
      ...prevPedido,
      productos: [
        ...prevPedido.productos,
        {
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
      ],
    }));
  };

  const agregarServicio = () => {
    setNuevoPedido((prevPedido) => ({
      ...prevPedido,
      servicios: [
        ...prevPedido.servicios,
        {
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
      ],
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
        productos: [
          {
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
        ],
        servicios: [
          {
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
        ],
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
      {nuevoPedido.productos.map((producto, index) => (
        <div key={index}>
          <label>Tipo Producto:</label>
          <input
            type="text"
            name="nombre_tipo_producto"
            value={producto.tipo_producto.nombre_tipo_producto}
            onChange={(e) => handleTipoProductoChange(e, index)}
          />

          <label>Estado Tipo Producto:</label>
          <input
            type="text"
            name="estado_tipo_producto"
            value={producto.tipo_producto.estado_tipo_producto}
            onChange={(e) => handleTipoProductoChange(e, index)}
          />

          <label>Nombre Producto:</label>
          <input
            type="text"
            name="nombre_producto"
            value={producto.nombre_producto}
            onChange={(e) => handleProductoChange(e, index)}
          />

          <label>Estado Producto:</label>
          <input
            type="text"
            name="estado_producto"
            value={producto.estado_producto}
            onChange={(e) => handleProductoChange(e, index)}
          />

          <label>Cantidad Producto:</label>
          <input
            type="number"
            name="cantidad_producto"
            value={producto.cantidad_producto}
            onChange={(e) => handleProductoChange(e, index)}
          />

          <label>Precio Producto:</label>
          <input
            type="number"
            name="precio_producto"
            value={producto.precio_producto}
            onChange={(e) => handleProductoChange(e, index)}
          />

          <label>Estado Producto Catálogo:</label>
          <input
            type="text"
            name="estado_producto_catalogo"
            value={producto.estado_producto_catalogo}
            onChange={(e) => handleProductoChange(e, index)}
          />
        </div>
      ))}
      <button type="button" onClick={agregarProducto}>
        Agregar Producto
      </button>

      <h2>Servicios</h2>
      {nuevoPedido.servicios.map((servicio, index) => (
        <div key={index}>
          <label>Tipo Servicio:</label>
          <input
            type="text"
            name="nombre_tipo_servicio"
            value={servicio.tipo_servicio.nombre_tipo_servicio}
            onChange={(e) => handleTipoServicioChange(e, index)}
          />

          <label>Estado Tipo Servicio:</label>
          <input
            type="text"
            name="estado_tipo_servicio"
            value={servicio.tipo_servicio.estado_tipo_servicio}
            onChange={(e) => handleTipoServicioChange(e, index)}
          />

          <label>Nombre Servicio:</label>
          <input
            type="text"
            name="nombre_servicio"
            value={servicio.nombre_servicio}
            onChange={(e) => handleServicioChange(e, index)}
          />

          <label>Estado Servicio:</label>
          <input
            type="text"
            name="estado_servicio"
            value={servicio.estado_servicio}
            onChange={(e) => handleServicioChange(e, index)}
          />

          <label>Cantidad Servicio:</label>
          <input
            type="number"
            name="cantidad_servicio"
            value={servicio.cantidad_servicio}
            onChange={(e) => handleServicioChange(e, index)}
          />

          <label>Precio Servicio:</label>
          <input
            type="number"
            name="precio_servicio"
            value={servicio.precio_servicio}
            onChange={(e) => handleServicioChange(e, index)}
          />

          <label>Estado Servicio Catálogo:</label>
          <input
            type="text"
            name="estado_servicio_catalogo"
            value={servicio.estado_servicio_catalogo}
            onChange={(e) => handleServicioChange(e, index)}
          />
        </div>
      ))}
      <button type="button" onClick={agregarServicio}>
        Agregar Servicio
      </button>

      <button type="submit">Agregar Pedido</button>
    </form>
  );
};

export default NuevoPedidoForm;
