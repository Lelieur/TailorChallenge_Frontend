# Análisis de la Aplicación

## Descripción

Esto es el frontend de la aplicación de prueba para Tailor Hub. Su objetivo es mostrar los restaurantes favoritos de un usuario y las reseñas que ha publicado. (Ver API [aquí](https://github.com/Lelieur/TailorChallenge_Backend))

## Características

- **Funcionalidad 1**: Mostrar los restaurantes de forma paginada.
- **Funcionalidad 2**: Mostrar una página de detalle de un restaurante.
- **Funcionalidad 3**: Crear un restaurante.
- **Funcionalidad 4**: Añadir un restaurante a favoritos.
- **Funcionalidad 5**: Eliminar un restaurante de favoritos.
- **Funcionalidad 6**: Crear una reseña para un restaurante.
- **Funcionalidad 7**: Editar una reseña propia.
- **Funcionalidad 8**: Eliminar una reseña propia.
- **Funcionalidad 7**: Mostrar los restaurantes favoritos de un usuario.
- **Funcionalidad 8**: Mostrar las reseñas que ha publicado un usuario.

## Tecnologías Utilizadas

- **Lenguaje de Programación**: TypeScript
- **Framework**: Next.js
- **Base de Datos**: MongoDB
- **Otras Tecnologías**: Tailwind CSS
- **APIs externas**:
  - Google Maps API para cargar un mapa con la ubicación de los restaurantes.
  - Cloudinary para subir y gestionar las imágenes del formulario para crear un nuevo restaurante.

## Instalación

Para instalar la parte del cliente, sigue estos pasos:

1. Clona el repositorio del backend: `git clone https://github.com/Lelieur/TailorChallenge_Backend`
2. Navega al directorio del proyecto: `cd TailorChallenge_Backend`
3. Instala las dependencias: `npm install`

## Uso

Para ejecutar la aplicación, utiliza en ambas carpetas el siguiente comando:

```bash
npm run dev
```

## Configuración

Para configurar la aplicación, sigue estos pasos:

1. Copia el archivo `.env.example` a `.env`: `cp .env.example .env`
2. Edita el archivo `.env` con tus credenciales y configuraciones específicas.
3. El CORS de la API y de Google Maps API desde local es en el puerto 5173.
