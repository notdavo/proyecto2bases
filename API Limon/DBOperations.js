var config = require("./DBConfig");
const sql = require("mssql");

//Buscar Productos por Filtro
async function BuscarProductos(datos) {
    try {
      let pool = await sql.connect(config);
      let BuscarProducto = await pool
        .request()
        .input("filterOn", sql.Int, datos.filterOn)
        .input("nombreProducto", sql.NVarChar, datos.nombreProducto)
        .input("nombreCategoriaProducto", sql.NVarChar, datos.nombreCategoriaProducto)
        .execute("BuscarProducto");
      return BuscarProducto.recordsets;
    } catch (err) {
      console.log(err);
    }
}

//RetornarProduct
async function RetornarProductos(datos) {
  try {
    let pool = await sql.connect(config);
    let RetornarProductos = await pool
      .request().execute("RetornarProducto");
    return RetornarProductos.recordsets;
  } catch (err) {
    console.log(err);
  }
}

//Buscar Usuario
async function BuscarUsuarios() {
  try {
    let pool = await sql.connect(config);
    let BuscarUsuarios = await pool
      .request().execute("BuscarUsuario");
    return BuscarUsuarios.recordsets;
  } catch (err) {
    console.log(err);
  }
}

//Buscar Categoria
async function BuscarCategoria() {
  try {
    let pool = await sql.connect(config);
    let BuscarCategoria = await pool
      .request().execute("RetornarCategorias");
    return BuscarCategoria.recordsets;
  } catch (err) {
    console.log(err);
  }
}


//Buscar Sucursal
async function BuscarSucursal() {
  try {
    let pool = await sql.connect(config);
    let BuscarSucursal = await pool
      .request().execute("BuscarSucursal");
    return BuscarSucursal.recordsets;
  } catch (err) {
    console.log(err);
  }
}


//Crear Categoria
async function CrearCategoria(datos) {
    try {
      let pool = await sql.connect(config);
      let CrearCategoria = await pool
        .request()
        .input("nombreCategoriaProducto", sql.NVarChar, datos.nombreCategoriaProducto)
        .execute("CrearCategoria");
      return CrearCategoria.recordsets;
    } catch (err) {
      console.log(err);
    }
}

//Modificar Categoria
async function ModificarCategoria(datos) {
    try {
      let pool = await sql.connect(config);
      let ModificarCategoria = await pool
        .request()
        .input("nombreCategoria", sql.NVarChar, datos.nombreCategoria)
        .input("idCategoria", sql.Int, datos.idCategoria)
        .execute("ModificarCategoria");
      return ModificarCategoria.recordsets;
    } catch (err) {
      console.log(err);
    }
}

//Crear Producto
async function CrearProducto(datos) {
    try {
      let pool = await sql.connect(config);
      let CrearProducto = await pool
        .request()
        .input("nombreProducto", sql.NVarChar, datos.nombreProducto)
        .input("descripcion", sql.NVarChar, datos.descripcion)
        .input("precio", sql.Int, datos.precio)
        .input("idCategoriaProducto", sql.Int, datos.idCategoriaProducto)
        .input("cantidad", sql.Int, datos.cantidad)
        .execute("CrearProducto");
      return CrearProducto.recordsets;
    } catch (err) {
      console.log(err);
    }
}

//Modificar Producto
async function ModificarProducto(datos) {
    try {
      let pool = await sql.connect(config);
      let ModificarProducto = await pool
        .request()
        .input("idProducto", sql.Int, datos.idProducto)
        .input("nombreProducto", sql.NVarChar, datos.nombreProducto)
        .input("descripcion", sql.NVarChar, datos.descripcion)
        .input("precio", sql.Int, datos.precio)
        .input("idCategoriaProducto", sql.Int, datos.idCategoriaProducto)
        .input("cantidad", sql.Int, datos.cantidad)
        .execute("ModificarProducto");
      return ModificarProducto.recordsets;
    } catch (err) {
      console.log(err);
    }
}

//Crear Inventario
async function CrearInventario(datos) {
    try {
      let pool = await sql.connect(config);
      let CrearInventario = await pool
        .request()
        .input("idProducto", sql.Int, datos.idProducto)
        .input("cantidad", sql.Int, datos.cantidad)
        .input("idSucursal", sql.Int, datos.idSucursal)
        .execute("CrearInventario");
      return CrearInventario.recordsets;
    } catch (err) {
      console.log(err);
    }
}

//Modificar Inventario
async function ModificarInventario(datos) {
    try {
      let pool = await sql.connect(config);
      let ModificarInventario = await pool
        .request()
        .input("idProducto", sql.Int, datos.idProducto)
        .input("cantidad", sql.Int, datos.cantidad)
        .execute("ModificarInventario");
      return ModificarInventario.recordsets;
    } catch (err) {
      console.log(err);
    }
}

//Crear Factura
async function CrearFactura(datos) {
    try {
      let pool = await sql.connect(config);
      let CrearFactura = await pool
        .request()
        .input("idUsuario", sql.Int, datos.idUsuario)
        .input("idSucursal", sql.Int, datos.idSucursal)
        .input("idVendedor", sql.Int, datos.idVendedor)
        .input("precioTotal", sql.Int, datos.precioTotal)
        .input("fecha", sql.NVarChar, datos.fecha)
        .execute("CrearFactura");
      return CrearFactura.recordsets;
    } catch (err) {
      console.log(err);
    }
}

//Crear Detalle Factura
async function CrearDetalleFactura(datos) {
    try {
      let pool = await sql.connect(config);
      let CrearDetalleFactura = await pool
        .request()
        .input("idProducto", sql.Int, datos.idProducto)
        .input("idCategoriaProducto", sql.Int, datos.idCategoriaProducto)
        .input("cantidad", sql.Int, datos.cantidad)
        .input("precioUnitario", sql.Int, datos.precioUnitario)
        .input("idFactura", sql.Int, datos.idFactura)
        .execute("CrearDetalleFactura");
      return CrearDetalleFactura.recordsets;
    } catch (err) {
      console.log(err);
    }
}

//Encabezado Factura
async function EncabezadoFactura(datos) {
    try {
      let pool = await sql.connect(config);
      let EncabezadoFactura = await pool
        .request()
        .input("filterOn", sql.Int, datos.filterOn)
        .input("idFactura", sql.Int, datos.idFactura)
        .input("nombreCliente", sql.NVarChar, datos.nombreCliente)
        .input("fecha", sql.NVarChar, datos.fecha)
        .execute("EncabezadoFactura");
      return EncabezadoFactura.recordsets;
    } catch (err) {
      console.log(err);
    }
}

//Detalle Factura
async function ConsultarDetalleFactura(datos) {
    try {
      let pool = await sql.connect(config);
      let ConsultarDetalleFactura = await pool
        .request()
        .input("idFactura", sql.Int, datos.idFactura)
        .execute("ConsultarDetalleFactura");
      return ConsultarDetalleFactura.recordsets;
    } catch (err) {
      console.log(err);
    }
}

//Eliminar Categoria
async function EliminarCategoria(datos) {
  try {
    let pool = await sql.connect(config);
    let EliminarCategoria = await pool
      .request()
      .input("idCategoria", sql.Int, datos.idCategoria)
      .execute("EliminarCategoria");
    return EliminarCategoria.recordsets;
  } catch (err) {
    console.log(err);
  }
}

//Eliminar Producto
async function EliminarProducto(datos) {
  try {
    let pool = await sql.connect(config);
    let EliminarProducto = await pool
      .request()
      .input("idProducto", sql.Int, datos.idProducto)
      .execute("EliminarProducto");
    return EliminarProducto.recordsets;
  } catch (err) {
    console.log(err);
  }
}

//Consultar Inventario
async function ConsultarInventario(datos) {
  try {
    let pool = await sql.connect(config);
    let ConsultarInventario = await pool
      .request()
      .input("idProducto", sql.Int, datos.idProducto)
      .execute("ConsultarInventario");
    return ConsultarInventario.recordsets;
  } catch (err) {
    console.log(err);
  }
}

//ValidarCredenciales
async function ValidarCredenciales(datos) {
  try {
    let pool = await sql.connect(config);
    let credenciales = await pool
      .request()
      .input("usuario", sql.NVarChar, datos.usuario)
      .input("pass", sql.NVarChar, datos.pass)
      .execute("ValidarCredenciales");
    return credenciales.recordsets;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
    BuscarProductos: BuscarProductos,
    CrearCategoria: CrearCategoria,
    ModificarCategoria: ModificarCategoria,
    CrearProducto: CrearProducto,
    ModificarProducto: ModificarProducto,
    CrearInventario: CrearInventario,
    ModificarInventario: ModificarInventario,
    CrearFactura: CrearFactura,
    CrearDetalleFactura: CrearDetalleFactura,
    EncabezadoFactura: EncabezadoFactura,
    ConsultarDetalleFactura: ConsultarDetalleFactura,
    BuscarUsuarios: BuscarUsuarios,
    BuscarSucursal: BuscarSucursal,
    BuscarCategoria: BuscarCategoria,
    ConsultarInventario: ConsultarInventario,
    EliminarCategoria: EliminarCategoria,
    EliminarProducto: EliminarProducto,
    RetornarProductos: RetornarProductos,
    ValidarCredenciales: ValidarCredenciales
}