# API REST y Aplicación React con MongoDB - Proyecto Formativo SENA

Este proyecto consta de una API REST construida con Express y MongoDB, junto con una interfaz de usuario construida con React. Aquí encontrarás las instrucciones para ejecutar ambos componentes.

## Iniciar la API REST

### Ruta del Proyecto
```bash
\express-mongo-api
```
```bash
cd express-mongo-api
```

### Comando de Inicio
```bash
npm run start
```

La API REST se ejecutará en el puerto predeterminado 3000. Asegúrate de que no haya conflictos con otros servicios en el mismo puerto.

**Nota:** Asegúrate de tener MongoDB instalado y en ejecución antes de iniciar la API REST.

## Iniciar la Aplicación React

### Ruta del Proyecto
```bash
\react-mongo-interfaz
```
```bash
cd react-mongo-interfaz
```

### Comando de Inicio
```bash
npm start
```

Esto iniciará la aplicación React en modo de desarrollo. Abre [http://localhost:3001](http://localhost:3001) en tu navegador para ver la interfaz de usuario. La página se recargará automáticamente si realizas cambios en el código fuente.

**Nota:** La interfaz se ejecuta en [http://localhost:3001](http://localhost:3001), mientras que la API se ejecuta en [http://localhost:3000](http://localhost:3000). Además, puedes ver los registros desde la API en [http://localhost:3000/pedidos](http://localhost:3000/pedidos).


### Comandos Curl para testear la api
#### Agregar
<!-- ```bash
curl -X POST -H "Content-Type: application/json" -d '{"productos":[{"tipo_producto":{"nombre_tipo_producto":"prendas de vestir","estado_tipo_producto":"activo"},"nombre_producto":"pantalón casual","estado_producto":"activo","cantidad_producto":2,"precio_producto":2800,"estado_producto_catalogo":"activo","subtotal":5600},{"tipo_producto":{"nombre_tipo_producto":"uniformes","estado_tipo_producto":"activo"},"nombre_producto":"uniforme escolar pantalón","estado_producto":"activo","cantidad_producto":1,"precio_producto":2300,"estado_producto_catalogo":"activo","subtotal":2300}],"servicios":[{"tipo_servicio":{"nombre_tipo_servicio":"servicio1","estado_tipo_servicio":"activo"},"nombre_servicio":"nombre_servicio1","estado_servicio":"activo","cantidad_servicio":3,"precio_servicio":1500,"estado_servicio_catalogo":"activo","subtotal":4500},{"tipo_servicio":{"nombre_tipo_servicio":"servicio2","estado_tipo_servicio":"activo"},"nombre_servicio":"nombre_servicio2","estado_servicio":"activo","cantidad_servicio":1,"precio_servicio":2000,"estado_servicio_catalogo":"activo","subtotal":2000}],"fecha_creacion":"09/11/2023","fecha_pedido":"23/11/2023","total_pedido":7900,"estado_pedido":"entregado"}' http://localhost:3000/pedidos
``` -->
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "productos": [
    {
      "tipo_producto": {
        "nombre_tipo_producto": "prendas de vestir",
        "estado_tipo_producto": "activo"
      },
      "nombre_producto": "pantalón casual",
      "estado_producto": "activo",
      "cantidad_producto": 2,
      "precio_producto": 2800,
      "estado_producto_catalogo": "activo",
      "subtotal": 5600
    },
    {
      "tipo_producto": {
        "nombre_tipo_producto": "uniformes",
        "estado_tipo_producto": "activo"
      },
      "nombre_producto": "uniforme escolar pantalón",
      "estado_producto": "activo",
      "cantidad_producto": 1,
      "precio_producto": 2300,
      "estado_producto_catalogo": "activo",
      "subtotal": 2300
    }
  ],
  "servicios": [
    {
      "tipo_servicio": {
        "nombre_tipo_servicio": "servicio1",
        "estado_tipo_servicio": "activo"
      },
      "nombre_servicio": "nombre_servicio1",
      "estado_servicio": "activo",
      "cantidad_servicio": 3,
      "precio_servicio": 1500,
      "estado_servicio_catalogo": "activo",
      "subtotal": 4500
    },
    {
      "tipo_servicio": {
        "nombre_tipo_servicio": "servicio2",
        "estado_tipo_servicio": "activo"
      },
      "nombre_servicio": "nombre_servicio2",
      "estado_servicio": "activo",
      "cantidad_servicio": 1,
      "precio_servicio": 2000,
      "estado_servicio_catalogo": "activo",
      "subtotal": 2000
    }
  ],
  "fecha_creacion": "09/11/2023",
  "fecha_pedido": "23/11/2023",
  "total_pedido": 7900,
  "estado_pedido": "entregado"
}' http://localhost:3000/pedidos
```


#### Eliminar
```bash
curl -X DELETE http://localhost:3000/pedidos/ID_DEL_PEDIDO
```

#### Editar
```bash
curl -X PUT -H "Content-Type: application/json" -d '{
  "servicios": [
    {
      "tipo_servicio": {
        "nombre_tipo_servicio": "nuevo",
        "estado_tipo_servicio": "nuevo"
      },
      "nombre_servicio": "nuevo",
      "estado_servicio": "nuevo",
      "cantidad_servicio": 3,
      "precio_servicio": 1500,
      "estado_servicio_catalogo": "nuevo",
      "subtotal": 4500,
      "_id": "655c053cba64b1b1b3ad9590"
    },
    {
      "tipo_servicio": {
        "nombre_tipo_servicio": "nuevo",
        "estado_tipo_servicio": "nuevo"
      },
      "nombre_servicio": "nuevo",
      "estado_servicio": "nuevo",
      "cantidad_servicio": 1,
      "precio_servicio": 2000,
      "estado_servicio_catalogo": "nuevo",
      "subtotal": 2000,
      "_id": "655c053cba64b1b1b3ad9591"
    }
  ],
  "productos": [
    {
      "tipo_producto": {
        "nombre_tipo_producto": "nuevo de vestir",
        "estado_tipo_producto": "nuevo"
      },
      "nombre_producto": "nuevo casual",
      "estado_producto": "nuevo",
      "cantidad_producto": 2,
      "precio_producto": 2800,
      "estado_producto_catalogo": "nuevo",
      "subtotal": 5600,
      "_id": "655c053cba64b1b1b3ad9592"
    },
    {
      "tipo_producto": {
        "nombre_tipo_producto": "nuevo",
        "estado_tipo_producto": "nuevo"
      },
      "nombre_producto": "nuevo",
      "estado_producto": "nuevo",
      "cantidad_producto": 1,
      "precio_producto": 2300,
      "estado_producto_catalogo": "nuevo",
      "subtotal": 2300,
      "_id": "655c053cba64b1b1b3ad9593"
    }
  ],
  "fecha_creacion": "nuevo",
  "fecha_pedido": "nuevo",
  "total_pedido": 8500,
  "estado_pedido": "nuevo"
}' http://localhost:3000/pedidos/ID_DEL_PEDIDO_A_EDITAR
```

#### Listar un pedido especifico
Basta con poner su URL con el id del pedido [http://localhost:3000/pedidos/ID_DEL_PEDIDO_A_LISTAR](http://localhost:3000/pedidos/ID_DEL_PEDIDO_A_LISTAR), o en su defecto

```bash
curl http://localhost:3000/pedidos/ID_DEL_PEDIDO_A_LISTAR
```

## Iniciar la Aplicación Vite (Opcional - Aún no terminada debido a que no era un requerimiento hacerlo en Vite)

### Ruta del Proyecto
```bash
\vite-mongo-interfaz
```
```bash
cd vite-mongo-interfaz
```

### Comando de Inicio
```bash
npm run dev
```

Si decides utilizar Vite para el desarrollo de la interfaz de usuario, puedes ejecutar este comando en lugar de `npm start` en el proyecto React. Asegúrate de tener Vite instalado globalmente o ajusta el comando según tus necesidades.

¡Listo! Con estas instrucciones, deberías poder ejecutar tanto la API REST como la interfaz de usuario.