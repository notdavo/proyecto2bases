const config = {
    user: "david", //Cambiar por su usuario
    password: "2018319183", //cambiar por su contraseña
    server: "localhost",
    database: "Cartago", //Cambiar por la base a la que se conectará
    options: {
      trustedconnection: true,
      enableArithAort: true,
      instancename: "DESKTOP-DJHT36V", //Cambiar por el nombre de la instancia a la que se va a conectar
    },
    port: 1433, //Cambiar por el puerto en el que está corriendo su SQL
  };
  
  module.exports = config;