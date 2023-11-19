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

## Iniciar la Aplicación Vite (Opcional)

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