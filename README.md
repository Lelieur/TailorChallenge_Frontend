# Analisis de la Aplicacion

## Descripcion

Este repositorio contiene solo el frontend de la prueba de Tailor Hub y esta pensado para ejecutarse en local.

Backend de referencia (opcional):

```text
https://github.com/Lelieur/TailorChallenge_Backend
```

## Funcionalidades

1. Listado paginado de restaurantes.
2. Pagina de detalle de un restaurante.
3. Crear un restaurante.
4. Anadir y quitar restaurantes de favoritos.
5. Crear, editar y eliminar una resena propia.
6. Ver favoritos y resenas de un usuario.

## Tecnologias (segun el repo)

Core

- Next.js 16.1.6
- React 19.2.4
- TypeScript 5.9.3

UI/UX

- Tailwind CSS 4.2.0
- Heroicons (@heroicons/react)
- Sileo (toasts)

Mapas

- Mapbox GL
- Mapbox Search (@mapbox/search-js-react)

HTTP

- Axios

Testing

- Vitest + coverage v8
- Testing Library (react, user-event, jest-dom)
- JSDOM

Lint/Format

- ESLint 9 + eslint-config-next
- Prettier + prettier-plugin-tailwindcss

## Requisitos

1. Node.js (LTS recomendado).
2. Backend en local si quieres flujo completo (ver enlace arriba).

## Configuracion local

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Crea el archivo `.env` a partir de `.env.example` y completa tus claves:

   ```bash
   cp .env.example .env
   ```

3. Asegurate de que el backend permite CORS para el puerto donde corre Next.js (por defecto `http://localhost:5173`).

## Ejecutar en local

```bash
npm run dev
```

## Notas

- Este repo esta preparado para uso local. Los artefactos de build, coverage y cache se ignoran en `.gitignore`.
