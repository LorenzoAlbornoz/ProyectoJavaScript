//LOGIN

Registro de usuarios: Los usuarios pueden crear una cuenta ingresando su nombre, email y contraseña. Se realizan validaciones para asegurar que los campos estén completos y que el email y la contraseña cumplan con ciertos requisitos.

Inicio de sesión: Los usuarios pueden iniciar sesión ingresando su email y contraseña. Se verifica que el usuario y la contraseña coincidan con los datos almacenados en el sistema.

Interfaz interactiva: La interfaz de usuario es interactiva y cuenta con una funcionalidad de slide que permite alternar entre la pantalla de inicio de sesión y la de registro.

Mensajes de confirmación: Se utilizan mensajes de SweetAlert para mostrar confirmaciones al realizar acciones importantes, como el registro exitoso o el cierre de sesión.

Administración de usuarios: Se verifica si el usuario está logueado y si es administrador, lo que le da acceso a funcionalidades adicionales en la plataforma.


//ADMINISTRACION

Agregar Canciones: Los usuarios pueden agregar nuevas canciones ingresando los detalles de la canción, como el artista, nombre de la canción, género y URL de la imagen del artista. Se realizan validaciones para asegurar que todos los campos estén completos y que la URL de la imagen sea válida.

Editar Canciones: Los usuarios tienen la capacidad de editar y actualizar los detalles de canciones existentes, como cambiar el nombre del artista, género o la URL de la imagen. Se implementan validaciones para asegurar que los cambios sean coherentes y cumplan con ciertos requisitos.

Eliminar Canciones: Se proporciona la opción para eliminar una canción de la colección. Antes de eliminar, se muestra un mensaje de confirmación para evitar eliminaciones accidentales.

Ver Usuarios Registrados: Los administradores pueden ver una lista de usuarios registrados en un modal. Esta funcionalidad está protegida para que solo los administradores puedan acceder a ella.

Búsqueda de Canciones: Se ofrece una función de búsqueda para buscar canciones por nombre, artista o género. Los resultados de la búsqueda se actualizan en tiempo real, facilitando la navegación.

//USUARIO

Búsqueda de Canciones: Los usuarios pueden buscar canciones por tipo de búsqueda, que puede ser por canción, artista o género. Se proporciona un campo de búsqueda donde el usuario puede ingresar el término de búsqueda. Al hacer clic en el botón de búsqueda, se mostrarán los resultados en tiempo real y se actualizará la lista de canciones según el criterio de búsqueda.

Filtrado por Categorías: Los usuarios pueden filtrar las canciones por categorías en la barra lateral. Al seleccionar una categoría específica, se mostrarán solo las canciones que pertenezcan a esa categoría.

Detalle de la Canción: Cuando un usuario hace clic en una canción de la lista, se abrirá un modal que muestra los detalles de la canción seleccionada, como el artista, género, duración y código. Además, se mostrará una imagen relacionada con la canción.El modal de detalle también incluye un botón para reproducir la canción seleccionada. Al hacer clic en el botón "Reproducir", se iniciará la reproducción de la canción. 

Reproducción de Canciones: Se muestra una barra de progreso y botones para controlar la reproducción, como avanzar, retroceder y pausar.

