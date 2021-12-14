# Modelo: Tag Course

Modelo que representa los cursos que están relacionados con un "Tag" en específico. Se almacenan referencias a cursos online en plataformas como Platzi o Udemy.

## Diccionario de datos

**Nombre de la tabla:** tag_courses

| Columna | Tipo de dato | Atributos | Descripción | Valores |
| ---     | ---          | ---       | ---         | ---     |
| id | integer | PK, not null, auto increment | ID del registro | Números enteros desde el 1 en adelante |
| tag_id | integer | FK(tags), not null | ID del Tag al que se relaciona el curso | |
| name | varchar | not null | Nombre del curso a mostrar en pantalla | |
| url | varchar | not null | URL del curso | |
| thumbnail_url | varchar | not null | URL de la imagen que se usará como thumbnail en la UI | |
| priority | smallint | not null, default (0) | Número de prioridad usado para ordenar las recomendaciones, de menor a mayor | Números enteros del 0 al 10 |
| platform | varchar | not null | Plataforma desde la cual se obtuvo la referencia al curso. Se almacena en minúsculas. | platzi, udemy |
