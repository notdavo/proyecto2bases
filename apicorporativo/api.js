const DBOperations = require("./DBOperations"); //Se solicita el archivo en el que se encuentran las funciones para la conexión a la BD

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.route('/ConsultaInventario').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.ConsultaInventario(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/ConsultaInventarioLimon').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.ConsultaInventarioLimon(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/ConsultaFacuradoSucursalCartago').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.ConsultaFacuradoSucursalCartago(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/ConsultaFacuradoSucursalLimon').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.ConsultaFacuradoSucursalLimon(datos).then((result) => {
        response.status(201).json(result);
    });
});

router.route('/ConsultaFacuradoConsolidado').post((request,response) => {
    let datos = { ...request.body };
    DBOperations.ConsultaFacuradoConsolidado(datos).then((result) => {
        response.status(201).json(result);
    });
});

var port = process.env.PORT || 8003;
app.listen(port);
console.log("The API is running at " + port);