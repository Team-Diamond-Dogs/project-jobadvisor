# Modelo: Tag

## Decripción

Modelo basado en el objeto "Tag" de la API de Get On Board, la cual se usa para representar las etiquetas que reciben las ofertas de trabajo. Para el contexto de la aplicación, representan las habilidades del profesional, aunque en la práctica se incluyen términos que no corresponden a habilidades.

## Diccionario de datos

**Nombre de tabla:** tags

| Columna | Tipo de dato | Atributos | Descripción | Valores |
| ---     | ---          | ---       | ---         | ---     |
| id | integer | PK, auto_increment, not null | ID del registro, auto incrementable | Números enteros desde 1 en adelante |
| name | varchar | not null | Nombre del tag | Cadenas de caracteres alfanuméricos |
| value | varchar | not null | ID del tag en la API de Get On Board. Se usa como valor para realizar solicitudes a la API. | Cadenas de caracteres separadas por guión (-) |
| keywords | varchar | null | Palabras clave asociadas al tag, separadas por coma | Conceptos separados por coma |
| is_skill | boolean | not null, default(1) | Flag que indica si el tag corresponde a una habilidad profesional o a otro concepto | True (1), False (0) |

