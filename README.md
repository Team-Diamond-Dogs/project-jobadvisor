# Proyecto: JobAdvisor

![image](https://user-images.githubusercontent.com/800655/146115054-1654fb41-f742-4ac9-92d6-1bd5cd63334c.png)


## 1. Intro

En las comunidades online del área informática constantemente hemos observado muchas consultas de personas que no saben cuáles son las habilidades requeridas para conseguir un trabajo en el área, o que no saben por dónde comenzar. En el presente proyecto buscamos entregar una solución que oriente a los usuarios respecto a las habilidades y conocimientos que requieren las empresas, en base a las ofertas de empleo publicadas en Get On Board.

Dentro de este contexto, identificamos 4 tipos de usuario que serán el centro de la solución a desarrollar:
- Estudiantes recién egresados
- Profesionales de otras áreas que deseen cambiar de carrera
- Profesionales del área IT que deseen cambiar de especialización
- Profesionales del área IT que deseen avanzar en _seniority_ dentro del cargo

## 2. Descripción del proyecto

JobAdvisor es una aplicación web que busca entregar recomendaciones sobre el punto de partida para quienes desean buscar un nuevo trabajo. Analizando las ofertas de trabajo publicadas en Get On Board, te indica cuáles son las habilidades que deberías adquirir/reforzar para encontrar ese puesto que tanto buscas.

Dentro de sus funcionalidades incluye:

- Búsqueda por cargo: Te permite indicar un cargo o término relacionado al cargo (ej. "Backend") y te indica cuáles son las habilidades más solicitadas por las empresas que han publicado ofertas asociadas a la búsqueda.

## 3. Demostración

{Video aquí}

## 4. Estructura del código

El repositorio en Github utiliza una estructura monorepo, la cual contiene los siguientes directorios:

- **web**: Contiene el proyecto de la aplicación web que sirve el front end.
- **api**: Contiene el proyecto de la API REST que sirve como back end para la aplicación web.
- **scrappers**: Contiene los scripts de scrapping que buscan recomendaciones de cursos para las habilidades requeridas en las ofertas de trabajo.
- **data**: Contiene información sobre el schema de base de datos y los scripts SQL para desplegar la db del proyecto.

## 5. Aplicación web

Aplicación de página única (SPA) desarrollada con React, la cual muestra la UI para el usuario final. Se conecta con el backend a través de una API REST, desde la cual obtiene los resultados de búsqueda.

### 5.1. Dependencias

Para la ejecución del proyecto, se requerirá que el ambiente de ejecución cuente con el siguiente software:

1. NodeJS >= v14.16
2. NPM >= v6.14

### 5.2. Instalación

1. Clonar el repositorio.
2. Moverse a la raíz de la carpeta `web/`.
3. Instalar las dependencias del proyecto con el comando `npm install`.
4. Ejecutar la aplicación en modo de desarrollo con el comando `npm start`.


## 6. API REST

API desarrollada sobre NestJS que alimenta a la aplicación web de JobAdvisor y consume 

### 6.1. Dependencias

Para la ejecución del proyecto, se requerirá que el ambiente de ejecución cuente con el siguiente software:

1. NodeJS >= v14.16
2. NPM >= v6.14


### 6.2. Instalación

1. Clonar el repositorio.
2. Moverse a la raíz de la carpeta `api/`.
3. Instalar las dependencias del proyecto con el comando `npm install`.
4. Ejecutar la aplicación en modo de desarrollo con el comando `npm start:dev`.


## 7. Scrappers

### 7.1. Udemy

Scrapper que lee los cursos recomendados para un tema en particular y los almacena en la tabla `tag_courses` de la base de datos.

#### 7.1.1. Instrucciones de uso

1. Instalar las dependencias especificadas en el archivo `requirements.txt`, con el comando `pip install -r requirements.txt`. Se recomienda usar un ambiente virtual, por ejemplo, usando `venv`.
2. Configurar la conexión a la base de datos en el archivo `.env`.
3. Invocar el script desde la línea de comandos: `python udemy_scrapper.py "Python"`
