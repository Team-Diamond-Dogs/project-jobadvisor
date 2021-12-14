# JobAdvisor

## Intro

En las comunidades online del área informática constantemente hemos observado muchas consultas de personas que no saben cuáles son las habilidades requeridas para conseguir un trabajo en el área, o que no saben por dónde comenzar. En el presente proyecto buscamos entregar una solución que oriente a los usuarios respecto a las habilidades y conocimientos que requieren las empresas, en base a las ofertas de empleo publicadas en Get On Board.

Dentro de este contexto, identificamos 4 tipos de usuario que serán el centro de la solución a desarrollar:
- Estudiantes recién egresados
- Profesionales de otras áreas que deseen cambiar de carrera
- Profesionales del área IT que deseen cambiar de especialización
- Profesionales del área IT que deseen avanzar en _seniority_ dentro del cargo

## Descripción del proyecto

JobAdvisor es una aplicación web que busca entregar recomendaciones sobre el punto de partida para quienes desean buscar un nuevo trabajo. Analizando las ofertas de trabajo publicadas en Get On Board, te indica cuáles son las habilidades que deberías adquirir/reforzar para encontrar ese puesto que tanto buscas.

Dentro de sus funcionalidades incluye:

- Búsqueda por cargo: Te permite indicar un cargo o término relacionado al cargo (ej. "Backend") y te indica cuáles son las habilidades más solicitadas por las empresas que han publicado ofertas asociadas a la búsqueda.
- Búsqueda por habilidades: Te permite seleccionar las habilidades que ya posees y te indica cuan solicitada es esa habilidad en el mercado laboral, y las categorías en las que esa habilidad está presente.

Para ambos tipos de búsqueda también se puede incluir el _seniority_ deseado, lo que permite buscar ofertas en el siguiente nivel de tu carrera profesional.

## Demostración

{Video aquí}

## Estructura del código

El repositorio en Github utiliza una estructura monorepo, la cual contiene los siguientes directorios:

- **web**: Contiene el proyecto de la aplicación web que sirve el front end.
- **api**: Contiene el proyecto de la API REST que sirve como back end para la aplicación web.
- **scrappers**: Contiene los scripts de scrapping que buscan recomendaciones de cursos para las habilidades requeridas en las ofertas de trabajo.
- **data**: Contiene información sobre el schema de base de datos y los scripts SQL para desplegar la db del proyecto.

## Aplicación web

Aplicación de página única (SPA) desarrollada con React, la cual muestra la UI para el usuario final. Se conecta con el backend a través de una API REST, desde la cual obtiene los resultados de búsqueda.

### Dependencias

Para la ejecución del proyecto, se requerirá que el ambiente de ejecución cuente con el siguiente software:

1. NodeJS
2. NPM

### Instalación

1. Clonar el repositorio.
2. Moverse a la raíz de la carpeta `web/`, ejemplo: `cd /var/www/web`.
3. Instalar las dependencias del proyecto con el comando `npm install`.
4. Crear una build de producción con el comando `npm run build`.
5. Modificar el nombre de la carpeta `build/` por otro que identifique a la aplicación, ejemplo: `jobadvisor/`
6. Mover la carpeta con el artefacto (paso anterior) al lugar de destino para el sitio web, ejemplo: `mv jobadvisor/ /var/www`.
7. Configurar el servidor web para que apunte a la carpeta de la aplicación, ejemplo `/var/www/web/jobadvisor`.

## API REST

Lorem ipsum dolor sit amet.

### Dependencias

Para la ejecución del proyecto, se requerirá que el ambiente de ejecución cuente con el siguiente software:

1. Foo
2. Bar
3. Baz

### Instalación

1. Foo
2. Bar
3. Baz

### Ejecución

1. Foo
2. Bar
3. Baz


## Scrappers

### Platzi

Lorem ipsum

#### Instrucciones de uso

1. Foo
2. Bar
3. Baz

### Udemy

Scrapper que lee los cursos recomendados para un tema en particular y los almacena en la tabla `tag_courses` de la base de datos.

#### Instrucciones de uso

1. Foo
2. Bar
3. Baz