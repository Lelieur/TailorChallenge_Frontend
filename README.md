# TailorHub Frontend

Frontend en `Next.js + React + TypeScript` para la prueba tecnica de TailorHub.

Estado actual:

- Runtime principal en `Next.js 16` con App Router.
- Mapas y geocoding via `Mapbox GL + SearchBox`.
- Autenticacion con cookies HttpOnly y rutas protegidas en servidor.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Mapbox GL + Mapbox Search
- Vitest + Testing Library + JSDOM
- ESLint + Prettier

## Requisitos

- Node.js `>= 20.19`
- Backend accesible (ver repositorio backend)

## Configuracion

1. Crea/copia las variables de entorno desde `.env.example`.
2. Para desarrollo local, usa `.env.local` (Next lo prioriza cuando `NODE_ENV !== production`).

Variables clave:

- `API_URL` (base URL del backend usada en rutas server y proxy)
- `NEXT_PUBLIC_API_URL` (base URL usada en cliente)
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`

## Levantar en local

1. Clona el repositorio y entra al directorio:
   - `git clone <repo-url>`
   - `cd TailorChallenge_Frontend`
2. Instala dependencias:
   - `npm install`
3. Configura entorno:
   - copia `.env.example` a `.env.local`
4. Ejecuta la aplicacion:
   - `npm run dev`

## Scripts

- `npm run dev`: ejecuta frontend en modo desarrollo (`http://localhost:5173`).
- `npm run build`: genera el build de producción.
- `npm start`: ejecuta el build compilado.
- `npm run test`: ejecuta tests.
- `npm run test:coverage`: cobertura de tests.
- `npm run lint`: linting.
- `npm run typecheck`: chequeo de tipos.

## Funcionalidades

- Listado paginado de restaurantes.
- Página de detalle de restaurante.
- Crear restaurante.
- Añadir y quitar restaurantes de favoritos.
- Crear, editar y eliminar una reseña propia.
- Ver favoritos y reseñas de un usuario.

## Repositorio backend (referencia)

```text
https://github.com/Lelieur/TailorChallenge_Backend
```

## Notas

- Repo preparado para uso local. Artefactos de build, coverage y cache ignorados en `.gitignore`.
