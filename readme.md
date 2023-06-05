# API Blog

Esta es una aplicación backend desarrollada en Node.js con Express y Sequelize.

## Descripción

La aplicación backend proporciona una API para gestionar y administrar restaurantes, donde cada restaurante tiene sus comidas.

## Características

- Despliega información a un front-end acerca de los restaurantes, usuarios, comidas y comentarios.
- Cuenta con la configuración de CORS, por lo tanto puede ser consumida por el front-end.
- Permite realizar operaciones CRUD completas en las tablas relacionadas de restaurantes, comidas, reviews, usuarios, órdenes y comentarios.
- Se tiene en cuenta los roles en la aplicación, con endpoints bloqueados para usuarios que no son administradores, lo que brinda un mayor control en la aplicación. Por defecto, el usuario creado es un administrador.
- Se utiliza Firebase para almacenar las imágenes. Para iniciar el proyecto, es necesario configurar las variables de entorno en el archivo `.env`.
- Para inicializar el proyecto, es necesario tener instalado Nodemon de forma global.
- Algunas rutas están protegidas, por lo que es necesario registrar un usuario o estar logueado para acceder a ellas.

## Tecnologías utilizadas

- Node.js
- Express
- Sequelize
- Sequelize-cli
- CORS
- Morgan
- Bcrypt
- Jsonwebtoken
- Dotenv
- Express-rate-limit
- Helmet
- HPP
- Moment
- MySQL2
- XSS-clean
- Firebase

## Requisitos de instalación

- Node.js
- npm
- Nodemon

## Documentación

La documentación de la API está disponible en [este enlace](https://apirestaurant.onrender.com/api/v1/docs/#/).

## Contacto

- Autor: Romario Ariza
- Email: romarioariza@gmail.com
- Número de contacto: +57 3224668364
- LinkedIn: [Perfil de LinkedIn](https://www.linkedin.com/in/romario-ariza-428b53260/)
- GitHub: [Repositorio de GitHub](https://github.com/rom213)
