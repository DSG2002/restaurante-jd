# restaurantejd
proyecto final materia computacion en la nube.

en todos los procesos se toma la decision de identificarlos con las iniciales JD ya que se comparte la aplicacion aws y con el fin de evitar inconvenientes con trabajos realizados por otros compañeros.

se realizo la configuracion de la aplicacion serverlees en donde como recursos principales se instala la aplicacion notejd 

se crea una infraestructura completa utilizando CloudFormation para garantizar que todos los recursos creados estén en un solo lugar el cual se encuentra identificado como trabajo-final-jd-dev el cual despliega una cantidad de recursos y los apigetway. 

el archivo serverless.yml contiene la estructura del proyecto donde se indica la region donde se va a trabajar, las funciones lambda y los endpoint de apigateway requerido por el archivo handler.js, de igual manera este archivo contiene las lineas de codigo en donde se crean el bucket en aws con la condicion de borrar los pedidos cada dos dias, la base de datos con motor mysql 


el archivo handler.js contiene las funciones implementadas para este proyecto, la funcion hacerpedido. esta encargada de recibir los datos del pedido para ser insertado en la base de datos.
la funcion obtenerpedido. se encarga de recibir el id del pedido y buscarlo en la base de datos para ser mostrado.
