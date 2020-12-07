const config = {
    user: "david-portatil", //Cambiar por su usuario
    password: "2018319183", //cambiar por su contraseña
    server: "DESKTOP-QCKA06B",
    database: "DBCorporativo", //Cambiar por la base a la que se conectará
    options: {
      trustedconnection: true,
      enableArithAort: true,
      instancename: "DESKTOP-QCKA06B", //Cambiar por el nombre de la instancia a la que se va a conectar
    },
    port: 1433, //Cambiar por el puerto en el que está corriendo su SQL
  };
  
  module.exports = config;