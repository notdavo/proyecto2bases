var DB = require("./DBConfig"); //Se solicita la configuración para establecer la conexión a la BD
const DBOperations = require("./DBOperations"); //Se solicita el archivo en el que se encuentran las funciones para la conexión a la BD
//var Modules = require("./modules");

//Se solicitan las librerías que se utilizarán en la API
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.route('/Usuarios').get((request,response) => {
    DBOperations.BuscarUsuarios().then((result) => {
        response.json(result);
    });
});

router.route('/Categorias').get((request,response) => {
    DBOperations.BuscarCategoria().then((result) => {
        response.json(result);
    });
});

router.route('/Sucursal').get((request,response) => {
    DBOperations.BuscarSucursal().then((result) => {
        response.json(result);
    });
});

router.route('/Productos').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.BuscarProductos(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/RetornarProductos').get((request,response) => {
    let datos = { ...request.body };
    DBOperations.RetornarProductos(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/EliminarCategoria').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.EliminarCategoria(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/EliminarProducto').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.EliminarProducto(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/ConsultarInventario').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.ConsultarInventario(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/CrearCategoria').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.CrearCategoria(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/ModificarCategoria').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.ModificarCategoria(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/CrearProducto').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.CrearProducto(datos).then((result) => {
        response.status(201).json(result);
        console.log(result);
    });
});

router.route('/ModificarProducto').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.ModificarProducto(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/CrearInventario').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.CrearInventario(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/ModificarInventario').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.ModificarInventario(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/CrearFactura').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.CrearFactura(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/CrearDetalleFactura').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.CrearDetalleFactura(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/EncabezadoFactura').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.EncabezadoFactura(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/ConsultarDetalleFactura').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.ConsultarDetalleFactura(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/ValidarCredenciales').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.ValidarCredenciales(datos).then((result) => {
        response.status(201).json(result);
    });
});

var port = process.env.PORT || 8001;
app.listen(port);
console.log("The API is running at " + port);