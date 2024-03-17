# WetSnout BackEnd

<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto">Sobre el proyecto</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#diagrama-bd">Diagrama</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="#webgrafia">Webgrafia</a></li>
    <li><a href="#agradecimientos">Agradecimientos</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

## Objetivo
Este proyecto requería una API funcional conectada a una base de datos relacional.

## Sobre el proyecto
El proyecto consta de un aplicación web para la gestión de una protectora de animales. En esta aplicación los usuarios interesados pueden registrarse, ver la fiicha de los peros y pueden agendar un paseo con el perro selecionado, pueden editar sus datos, y desactivar (eliminar) las reservas en caso de no querer/poder ir al encuentro.
Además la aplicación permite a los usuarios con privilegios  registrar animales, editar el estado de las citas y ver cuantas hay.
Los super_admin, pueden cambiar de role a los usuarios y pueden cambiar el estado de los uduarios de activos a inactivos. 
El objetivo del proyecto es crear un backend para la aplicación "Wetsnout", que permita realizar todas estás operaciones desde el frontend.


## Stack
Tecnologías utilizadas:
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=flat)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![NodeJS](https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/Node) [![ExpressJS](https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=flat)](https://expressjs.com/) [![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff&style=flat)](https://dev.mysql.com/doc/) [![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000?logo=jsonwebtokens&logoColor=fff&style=flat)](https://jwt.io/introduction) [![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff&style=flat)](https://developer.mozilla.org/en-US/docs/Glossary/Git)


## Diagrama BD
!['imagen-db'](./assets/WetSnoutDB.png)

## Instalación en local
1. Clonar el repositorio
2. ` $ npm install `
3. Conectamos nuestro repositorio con la base de datos 
4. ``` $ Ejecutamos las migraciones ``` 
5. ``` $ Ejecutamos los seeders ``` 
6. ``` $ npm run dev ``` 
7. ...

## Endpoints
<details>
<summary>Endpoints</summary>

- AUTH
    - REGISTER

            POST http://localhost:3000/auth/register
        body:
        
            {
                "username": "DavZZ",
                "name": "David",
                "surname": "Rodri",
                "email": "david@example.com",
                "password": "123456"
            }
        

    - LOGIN

            POST http://localhost:3000/auth/login 
        body:
        
            {
                "email": "david@example.com",
                "password": "123456"
            }
        

- USERS

    - Crear User

            POST http://localhost:3000/api/users
            
        body:
       
     
           {
            "username": "UserClient",
            "name": "UserClie",
            "surname": "Cuser",
            "password_hash": "123456",
            "email": "cuser@example.com"
            }

    
    -  Obtener todos los usuarios (super_admin)
    
            GET http://localhost:3000/api/users

    
    - Get user by id 
    
            GET http://localhost:3000/api/users/:id

            
    - Update user info 
    
            PATCH http://localhost:3000/api/users/:id
        body: 
          
                
                {
                "username" : "Cambio333UsiarioPrueba",
                "name": "Cam33UsiarioPr",
                "surname": "USUCita",
                "password_hash": "123456",
                "email" : "Priue@example.com"
                 }
                    
            

            
- ARTISTAS
    
    -Crear tatuador
        
      POST http://localhost:3000/api/artist
      
    body:  
        
    
            {
                "username" : "UserArtis",
                "name": "UserAr",
                "surname": "Auser",
                "password_hash": "123456",
                "email" : "auser@example.com"
            }

    -Ver tatuador por id
        
        GET http://localhost:3000/api/artist/16

    -Perfil del tatuador (con id)

        GET http://localhost:3000/api/artist/artistprofile/17
        
    -Ver todos los tatuadores(super_admin)
    
        GET http://localhost:3000/api/artist
          
          
           

- CITAS

    -Crear Cita

            POST http://localhost:3000/api/appointment
            
    body:
      
            
            {
                "user_id": 9,
                "artist_id": 7,
                "date": "2024-04-12",
                "hour": "13:00h"
            }
            
    -Ver todas las citas (super_admin)
        
            GET http://localhost:3000/api/appointment
            
    -Actualizar citas (con id)
    
            PATCH http://localhost:3000/api/appointment/1
      
    -Borrar cita (con id de cita)
    
            DELETE http://localhost:3000/api/appointment/1
            
    
        
</details>

## Contribuciones
Las sugerencias y aportaciones son siempre bienvenidas.  

Puedes hacerlo de dos maneras:

1. Abriendo una issue
2. Crea un fork del repositorio
    - Crea una nueva rama  
        ```
        $ git checkout -b feature/nombreUsuario-mejora
        ```
    - Haz un commit con tus cambios 
        ```
        $ git commit -m 'feat: mejora X cosa'
        ```
    - Haz push a la rama 
        ```
        $ git push origin feature/nombreUsuario-mejora
        ```
    - Abre una solicitud de Pull Request


## Webgrafia:
Para conseguir mi objetivo he recopilado información de:
- https://github.com/fidelfsd/fsd-online-express-typeorm-academy-api 
- https://github.com/vincenzo2202/Backend_tatto-studio_API_DB
- https://typeorm.io/


## Agradecimientos:

Agradezco a mis compañeros el tiempo dedicado a este proyecto y a los profesores de [GeeksHubsAcademy_](https://geekshubsacademy.com/) que nos han guiado en el camino 🤗:

- **Gabe**  
<a href="https://github.com/GabrielEscudillo" target="_blank"><img src="https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a> 

- **Reynaldo**  
<a href="https://github.com/ReynaldoMunozF" target="_blank"><img src="https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=red" target="_blank"></a>

- **Hector**  
<a href="https://www.github.com/userGithub/" target="_blank"><img src="https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=green" target="_blank"></a> 

## Contacto
<a href = "mailto:om.erikaorlando@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/erika-orlando/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>