# Proyecto de Administración de Proyectos

## Introducción

Este repositorio contiene la parte de "front-end" del proyecto web.
El proyecto tiene como fin crear, ver, editar o eliminar asistencias, tutorías y proyectos de investigación tanto para estudiantes, como profesores entre otros funcionarios de la universidad.
Este proyecto utiliza una [API REST](https://github.com/eacortesm/mongodb-node-restapi) específica.

## Variables de Entorno

Para que el proyecto se ejecute correctamente, se deben agregar las siguientes variables de entorno:

```
API_URL
NEXT_PUBLIC_BASE_URL
```

Siendo ambos la dirección de la API REST.

## Instalación de dependencias

Antes de inicializar el proyecto, debe instalar las dependencias plasmadas en el `package.json`. Para eso, ejecute el siguiente comando:

```
npm install
```

## Ejecución del programa

Para ejecutar este proyecto, debe ejecutar el siguiente comando

```
npm run dev
```

## Estructura del proyecto

Dentro de `src/app`, se encuentran tanto el page como el layout principal así como varias carpetas:

- `ui`: Utilizado para poner elementos para identificar a la página.
- `reportes`: Carpeta en la que se guardan las páginas de los reportes.
- `registro`: Carpeta en la que se guardan las páginas en la que los usuarios se registran.
- `perfil`: Carpeta en la que se guardan las páginas relacionadas con el perfil de un usuario.
- `oferta`: Todo lo relacionado a las ofertas, tanto CRUD como otras funcionalidades como calificar.
- `metrics`: Todo lo relacionado a métricas y estadísticas.
- `login`: Todo lo relacionado a la autenticación del usuario.
- `context`: Carpeta en la que se guardan páginas relacionadas al contexto (por ejemplo, si la página se está cargando).
- `backups`: Carpeta relacionado a los backups de la página.
- `api`: Carpeta para conectarse con la base de datos.
- `admin`: Carpeta para todo lo relacionado con los administradores.

Dentro de la carpeta `src`, además de `app`, tenemos `components`, la cual tiene componentes reutilizables a lo largo de la página.

De igual forma, existe el archivo `middleware.js` que se ejecuta antes de cada página, y se encarga de redirigir a los usuarios a la página de login si no han iniciado sesión, o a la página principal si ya han iniciado sesión.

En la raíz, existen archivos varios con sus respectivas funcionalidades:

- `.gitignore`: Archivo que indica qué archivos o carpetas no deben ser subidos al repositorio.
- `README.md`: Archivo que contiene información sobre el proyecto.
- `eslint.config.mjs`: Archivo de configuración para ESLint, una herramienta de análisis de código estático para identificar y reportar patrones encontrados en el código JavaScript.
- `jsconfig.json`: Archivo de configuración para JavaScript, utilizado para configurar el comportamiento del editor de código y las herramientas de desarrollo.
- `next.config.json`: Archivo de configuración para Next.js, un framework de React para aplicaciones web.
- `package-lock.json`: Archivo que contiene la versión exacta de cada dependencia instalada, asegurando que las instalaciones futuras sean consistentes.
- `package.json`: Archivo que contiene información sobre el proyecto, incluyendo las dependencias, scripts y metadatos del proyecto.
- `postcss.config.js`: Archivo de configuración para PostCSS, una herramienta de procesamiento de CSS que permite utilizar características avanzadas y optimizar el código CSS.
