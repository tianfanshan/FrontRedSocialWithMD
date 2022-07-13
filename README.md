# Red Social

## Ejercicio - Red Social

El último proyecto individual del Bootcamp Full Stack en The Bridge, hecho con la base de dato anterior que he hecho con mongoose.

### Requisitos del ejercicio

- Registro de usuarios.
- Login de usuarios.
- Que se pueda ver las publicaciones y crear nuevas.
- Que se puedan editar y eliminar las publicaciones que hace el usuario logeado
- Dar/quitar Like a post.
- Buscador de perfiles de usuario o de posts
- Que en tu perfil puedas ver tus datos y tus posts
- Que puedas comentar en las publicaciones
- Uso de ramas con git, cuando se termine el proyecto deberán quedar dos ramas la main y la develop.
- Presentación de README
- React Router
- Utilizar Redux
- Uso de SASS
- Importante el diseño
- Los componentes no podrán sobrepasar las 400 líneas de código.
- Las funciones no deberán sobrepasar las 75 líneas de código.

#### Extras

- Frontend disponible en producción (ej:Heroku).
- El usuario puede seguir a otros usuarios y tener seguidores
- CRUD de los comentarios
- Que solo puedas editar y eliminar los comentarios que tu creas.
- El usuario puede subir fotos en los posts y cambiar su foto de perfil.
- El usuario puede dar likes a los comentarios de los posts.
- El usuario en su perfil puede ver el número de seguidores y número de a cuantos sigue
- El usuario puede ver quien le sigue y a quién sigue
- Implementación de guards
- Que sea responsive

## Tecnologías y lenguajes utilizados

### Frontend

- [X] HTML / CSS / JavaScript / JSON
- [X] NodeJS
- [X] react
- [X] antd
- [X] axios
- [X] react
- [X] react-dom
- [X] react-redux
- [X] react-router-dom
- [X] sass
- [ ] responsive

### Backend

- [X] JavaScript
- [X] Nodejs
- [X] express
- [X] MongoDB
- [X] Mongoose
- [X] multer
- [X] bcryptjs
- [X] jsonwebtoken
- [X] nodemailer
- [X] Atlas

### Menú principal

Los usuarios **no logueados** tienen las siguientes opciones: Home, Login, Registro.

Los usuarios **logueados** pueden acceder a Home, Perfil, Logout.

## Secciones

### Registro `/register`

![](./doc/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-07-13%20163257.png)

El habitual formulario de registro : Avatar, nombre de usuario, correo, constraseña y confirmación de contraseña.

### Login `/login`

![](./doc/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-07-13%20163142.png)

Formulario de acceso con email y contraseña.

### Home `/`

![](./doc/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-07-13%20174416.png)

En la sección de inicio los usuarios logueados ven el formulario para añadir un _post_ **en la parte superior**; los usuarios no logueados, en cambio, ven los botones Login, Registro y Home.

El usuario puede dar like al post, y seguir el usuario que ha hecho el post.

![](./doc/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-07-13%20202559.png)

El usuario logeado puede comentar al post.

![](./doc/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-07-13%20174056.png)
Tambien puede eliminar y editar su comentario

### Vista de usuario `/user/profile`

![](./doc/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-07-13%20175416.png)
![](./doc/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-07-13%20174222.png)

La vista de perfil del usuario muesta el avatar, las frases se crea según información(nombre, edad, cantidad del comentario, cantidad del like que ha recibido el usuario por su comentario, seguidores del usuario, a quien le esta siguiendo el usuario, el role del usuario) del usuario, los post que le ha dado like el usuario y los post que ha hecho el usuario.

El usuario puede eliminar o editar su post en su perfil.

## Despliegue

La aplicación esta desplegada para pruebas en Heroku.4Es posible acceder en este link:https://red-social-redux-front.herokuapp.com/


## Agradecimientos
* Gracias al equipo de profesores de The Bridge: Sofía [GitHub @Sofía](https://github.com/SofiaPinilla), Ger [GitHub @Ger](https://github.com/GeerDev) e Iván [GitHub @Iván](https://github.com/ivanpuebla10).

## Autor
Tianfan Shan [GitHub @Tianfan-Shan](https://github.com/tianfanshan) [LinkedIn](https://www.linkedin.com/in/tianfan-shan-084218241/)