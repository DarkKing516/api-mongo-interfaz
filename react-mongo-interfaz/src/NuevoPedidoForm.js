import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NuevoPedidoForm = ({ onPedidoAgregado }) => {
    const [nuevoPedido, setNuevoPedido] = useState({
        fecha_creacion: '',
        fecha_pedido: '',
        total_pedido: 0,
        estado_pedido: 'por hacer',
        productos: {
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
        servicios: {
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

    // Utiliza useEffect para actualizar la fecha_creacion al montar el componente
    useEffect(() => {
        const fechaCreacionActual = new Date().toISOString().split('T')[0];
        setNuevoPedido((prevPedido) => ({
            ...prevPedido,
            fecha_creacion: fechaCreacionActual,
            // Establecer la fecha de pedido como mínimo 5 días después de la fecha de creación
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Realizar la solicitud POST a la API para agregar un nuevo pedido
            const response = await axios.post('http://localhost:3000/pedidos', nuevoPedido);
            onPedidoAgregado(response.data); // Llama a la función proporcionada para actualizar el estado de pedidos en la lista
            setNuevoPedido({
                fecha_creacion: '',
                fecha_pedido: '',
                total_pedido: 0,
                estado_pedido: 'por hacer',
                productos: {
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
                servicios: {
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
                readOnly // Hace que el campo sea de solo lectura para que no se pueda editar
            />

            <label>Fecha de Pedido:</label>
            <input
                type="date"
                name="fecha_pedido"
                value={nuevoPedido.fecha_pedido}
                onChange={handleInputChange}
                min={nuevoPedido.fecha_creacion} // Establece la fecha mínima como la fecha de creación
            />

            {/* <input
                type="date"
                name="fecha_pedido"
                value={nuevoPedido.fecha_pedido}
                onChange={handleInputChange}
                min={new Date(new Date(nuevoPedido.fecha_creacion).getTime() + 5 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split('T')[0]}
            /> */}

            <label>Total Pedido:</label>
            <input
                type="number"
                name="total_pedido"
                value={nuevoPedido.total_pedido}
                onChange={handleInputChange}
            />

            <label>Producto - Nombre Tipo:</label>
            <input
                type="text"
                name="productos.tipo_producto.nombre_tipo_producto"
                value={nuevoPedido.productos.tipo_producto.nombre_tipo_producto}
                onChange={handleInputChange}
            />

            <button type="submit">Agregar Pedido</button>
        </form>
    );
};

export default NuevoPedidoForm;
