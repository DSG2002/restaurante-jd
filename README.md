# restaurantejd
proyecto final materia computacion en la nube.

el archivo serverless.yml contiene la estructura del proyecto donde se indica la region donde se va a trabajar, las funciones lambda y los endpoint de apigateway requerido por el archivo handler.js.

el archivo handler.js contiene las funciones implementadas para este proyecto, la funcion hacerpedido. esta encargada de recibir los datos del pedido para ser insertado en la base de datos.
la funcion obtenerpedido. se encarga de recibir el id del pedido y buscarlo en la base de datos para ser mostrado.
