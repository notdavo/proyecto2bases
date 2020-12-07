var config = require("./DBConfig");
const sql = require("mssql");

//Buscar Inventario por Filtro
async function ConsultaInventario(datos) {
    try {
      let pool = await sql.connect(config);
      let ConsultaInventario = await pool
        .request()
        .input("filterOn", sql.Int, datos.filterOn)
        .input("nombreProducto", sql.NVarChar, datos.nombreProducto)
        .input("nombreCategoriaProducto", sql.NVarChar, datos.nombreCategoriaProducto)
        .execute("ConsultaInventario    ");
      return ConsultaInventario.recordsets;
    } catch (err) {
      console.log(err);
    }

}

//Buscar Inventario por Filtro
async function ConsultaInventarioLimon(datos) {
    try {
      let pool = await sql.connect(config);
      let ConsultaInventarioLimon = await pool
        .request()
        .input("filterOn", sql.Int, datos.filterOn)
        .input("nombreProducto", sql.NVarChar, datos.nombreProducto)
        .input("nombreCategoriaProducto", sql.NVarChar, datos.nombreCategoriaProducto)
        .execute("ConsultaInventarioLimon    ");
      return ConsultaInventarioLimon.recordsets;
    } catch (err) {
      console.log(err);
    }

}

//Facturado Sucursal Cartago
async function ConsultaFacuradoSucursalCartago(datos) {
    try {
      let pool = await sql.connect(config);
      let ConsultaFacuradoSucursalCartago = await pool
        .request()
        .input("filterOn", sql.Int, datos.filterOn)
        .input("nombreCategoriaProducto", sql.NVarChar, datos.nombreCategoriaProducto)
        .input("fechaInicial", sql.NVarChar, datos.fechaInicial)
        .input("fechaFinal", sql.NVarChar, datos.fechaFinal)
        .execute("ConsultaFacuradoSucursalCartago");
      return ConsultaFacuradoSucursalCartago.recordsets;
    } catch (err) {
      console.log(err);
    }

}

//Facturado Sucursal Cartago
async function ConsultaFacuradoSucursalLimon(datos) {
    try {
      let pool = await sql.connect(config);
      let ConsultaFacuradoSucursalLimon = await pool
        .request()
        .input("filterOn", sql.Int, datos.filterOn)
        .input("nombreCategoriaProducto", sql.NVarChar, datos.nombreCategoriaProducto)
        .input("fechaInicial", sql.NVarChar, datos.fechaInicial)
        .input("fechaFinal", sql.NVarChar, datos.fechaFinal)
        .execute("ConsultaFacuradoSucursalLimon");
      return ConsultaFacuradoSucursalLimon.recordsets;
    } catch (err) {
      console.log(err);
    }
}

//Facturado Sucursal Consolidado
async function ConsultaFacuradoConsolidado(datos) {
    try {
    let pool = await sql.connect(config);
    let ConsultaFacuradoConsolidado = await pool
        .request()
        .input("filterOn", sql.Int, datos.filterOn)
        .input("nombreCategoriaProducto", sql.NVarChar, datos.nombreCategoriaProducto)
        .input("fechaInicial", sql.NVarChar, datos.fechaInicial)
        .input("fechaFinal", sql.NVarChar, datos.fechaFinal)
        .execute("ConsultaFacuradoConsolidado");
    return ConsultaFacuradoConsolidado.recordsets;
    } catch (err) {
    console.log(err);
    }
}

module.exports = {
    ConsultaInventario: ConsultaInventario,
    ConsultaInventarioLimon: ConsultaInventarioLimon,
    ConsultaFacuradoSucursalCartago: ConsultaFacuradoSucursalCartago,
    ConsultaFacuradoSucursalLimon: ConsultaFacuradoSucursalLimon,
    ConsultaFacuradoConsolidado: ConsultaFacuradoConsolidado    
}