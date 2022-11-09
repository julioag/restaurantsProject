# restaurantsProject

## Description

Proyecto realizado en base a un desafío de gestion de restaurantes. Este cuenta con un api desarrollada en django y un front en nextjs(react).

## Installation/Usage

Para instalar la api se debe contar con python3 y pip3 instalados. Luego de clonar el repositorio se debe ejecutar el siguiente comando en la carpeta api:

`bash python3 manage.py migrate `
`bash python3 manage.py runserver `\

Esta corre en localhost:8000

Para instalar e iniciar la aplicación web se debe contar con nodejs y npm instalados. Luego de clonar el repositorio se debe ejecutar el siguiente comando en la carpeta web:

`bash npm install `
`bash npm run dev `

Esta corre en localhost:3000

## References

_Backend_: Se utilizó como referencia la siguiente guía de desarrollo de una API REST https://blog.logrocket.com/django-rest-framework-create-api/

_Frontend_:

- Para el frontend se utilizó como referencia la siguiente guía de desarrollo de una aplicación web con nextjs https://nextjs.org/learn/basics/create-nextjs-app
- El ordenamiento de columnas fue referenciado de https://blog.logrocket.com/creating-react-sortable-table/
