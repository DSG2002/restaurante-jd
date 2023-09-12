'use strict';
const AWS=require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-2' });
const sqs = new AWS.SQS();
const querystring = require("querystring")
const mysql=require('mysql');
const connection=mysql.createConnection({
  host:'trabajo-final-jd-dev-databasejd-p9voxktvuxeu.cywrvdmfoq84.us-east-2.rds.amazonaws.com',
  user:'admin',
  port:'3306',
  password:'12345678',
  database:'restaurantJD',
});

module.exports.hacerPedido = async (event) => {
  const pedido = querystring.parse(event["body"])
  await new Promise((resolve, reject) => {
  const queryclient = "CALL insert_pedidos(?,?,?,?,?);";
    connection.query(queryclient,[pedido.producto_id,pedido.cantidad_und,pedido.valorUnidad, pedido.valorTotal, pedido.cliente_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  const messageBody = {
    Cliente: pedido.cliente_id,
    Producto: pedido.producto_id,
    Cantidad: pedido.cantidad_und,
    ValorTotal: pedido.valorTotal,
  };
  // Configura los parámetros del mensaje
  const params = {
    MessageBody: JSON.stringify(messageBody),
    QueueUrl: 'https://sqs.us-east-2.amazonaws.com/834576715709/order-queue',
  };
  await sqs.sendMessage(params).promise();
  const paramsEmail = {
    Source: "jorge.valencia27229@ucaldas.edu.co",
    Destination: {
      ToAddresses: [clienteEmail],
    },
    Message: {
      Subject: {
        Data: "Detalles del pedido",
      },
      Body: {
        Text: {
          Data: `Detalles del pedido:\n\nCliente: ${pedido.cliente_id}\nProducto: ${pedido.producto_id}\nValor unitario: ${pedido.valorUnidad}\nCantidad: ${pedido.cantidad_und}\nValor Total: ${pedido.valorTotal}`,
        },
      },
    },
  };
  await ses.sendEmail(paramsEmail).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "exitoso",
        cliente_id: pedido.cliente_id,
        producto_id: pedido.producto_id,
        cantidad_und: pedido.cantidad_und,
        valorUnidad: pedido.valorUnidad,
        valorTotal: pedido.valorTotal,
      },
      null,
      2
    ),
  };
 connection.end();

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.obtenerPedido = async (event) => {
  const pedidoId = event.queryStringParameters.id;
  const queryPedido = "SELECT * FROM restauranteJd.Pedidos WHERE id = ?";
  const results = await new Promise((resolve, reject) => {
    connection.query(queryPedido, [pedidoId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        pedido: results[0],
      },
      null,
      2
    ),
  };
};

