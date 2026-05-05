# InfoTienda Frontend

Frontend de un e-commerce desarrollado con React, TypeScript y Vite. La aplicación consume la API de un repositorio backend separado para gestionar catálogo, autenticación, carrito y checkout, y está orientada a ofrecer una experiencia de compra moderna, rápida y responsiva.

## Descripción

InfoTienda Frontend es la interfaz web del sistema de tienda online. Permite a los usuarios explorar productos, aplicar filtros, ver el detalle de cada artículo, agregar productos al carrito y completar la compra. También incluye autenticación de usuarios, protección de rutas para administración y un flujo de checkout integrado con Mercado Pago.

Este proyecto funciona en conjunto con una API desarrollada en otro repositorio, que se encarga de la lógica de negocio, persistencia de datos, seguridad y procesamiento del checkout.

## Tecnologías utilizadas

- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Zod
- React Icons
- ESLint
- PostCSS y Autoprefixer

## Funcionalidades principales

- Catálogo de productos con listado paginado.
- Filtros por categoría, búsqueda por nombre y ordenamiento.
- Vista de detalle de producto con imagen, descripción, precio y stock.
- Carrito de compras con alta de productos, cambio de cantidades, eliminación de ítems y vaciado completo.
- Persistencia del carrito conectada al backend.
- Registro e inicio de sesión de usuarios.
- Manejo de sesión con cookies HttpOnly.
- Protección CSRF para operaciones sensibles contra la API.
- Checkout en dos pasos:
- Selección de método de entrega.
- Selección de método de pago.
- Integración con Mercado Pago para redirección al pago.
- Ruta protegida para administración.
- Alta de productos desde panel admin con carga de imagen.
- Formularios con validación de datos usando Zod.
- Diseño responsivo para desktop y mobile.

## Integración con backend

La aplicación consume una API REST perteneciente al backend del proyecto, mantenido en un repositorio separado y configurado mediante la variable de entorno `VITE_API_BASE_URL`. Toda la comunicación se centraliza en una capa de servicios, incluyendo:

- productos
- categorías
- autenticación
- carrito
- checkout

## Estructura general

La aplicación está organizada en módulos reutilizables:

- `src/pages`: pantallas principales de la app.
- `src/components`: componentes compartidos de interfaz.
- `src/context`: manejo global de autenticación y carrito.
- `src/hooks`: lógica reutilizable para formularios, productos y utilidades.
- `src/services`: integración con la API.
- `src/types`: tipados de dominio.
- `src/schemas`: validaciones de formularios.
