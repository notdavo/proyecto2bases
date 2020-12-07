import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Corporativo.css';
import {
  Link
} from "react-router-dom";

function FacturadoConsolidado() {
    const [sucursales  , setSucursales] = useState([]);
    const [totalFacturado  , setFacturado] = useState([0]);
    const [categorias  , setCategorias] = useState([]);
    const [fechaInicial  , setFechaInicial] = useState('2000-01-01');
    const [fechaFinal  , setFechaFinal] = useState('2020-12-31');
    const [categoriaProducto  , setCategoriaProducto] = useState('');
    const [sucursal  , setSucursal] = useState(1);
    
    function setearSucursal(evento) {
      var indexSeleccionado = evento.target.selectedIndex;
      var idSucrusal = evento.target[indexSeleccionado].value;
      localStorage.setItem('sucursalSeleccionada', idSucrusal);
      setSucursal(localStorage.getItem('sucursalSeleccionada'));
      console.log(localStorage.getItem('sucursalSeleccionada'));
    }

    function comprobarTotal() {
      if(totalFacturado[0] != undefined)
        return totalFacturado[0].TOTAL;
      else
        return 0;
    }  
    
    function setearCategoria(evento) {
        var indexSeleccionado = evento.target.selectedIndex;
        var nombreCategoriaSeleccionada = evento.target[indexSeleccionado].value;
        setCategoriaProducto(nombreCategoriaSeleccionada);
    }

    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:8000/api/Sucursal`, { });
            setSucursales(res.data[0]);
            localStorage.setItem('sucursalSeleccionada', res.data[0][0].idUsuario);
        })()
    },[])

    useEffect(() => {
        (async () => {
          console.log("SUCURSAL", sucursal);
            const res = await axios.post(`http://localhost:8003/api/ConsultaFacuradoConsolidado`, {
                  filterOn: '1',
                  nombreCategoriaProducto: categoriaProducto,
                  fechaInicial: fechaInicial,
                  fechaFinal: fechaFinal
            });
            if(res.data[0].length != 0){
              setFacturado(res.data[0]);
              console.log(res.data);
              console.log(res.data[0]);
            }else{
              setFacturado([]);
            }
        })()
    },[fechaInicial,fechaFinal,categoriaProducto,sucursal])

    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:8000/api/Categorias`, { });
            setCategorias(res.data[0]);
        })()
    },[])

  return (
    <div className="Corporativo">
      <div className="topBarCorporativo">
            <Link to= "/">
                <button id="bot">Cerrar Sesion</button>
            </Link>
        </div>
        <div className="topBarCorporativo">

        </div>
        <div className="marco">
            <Link to={`/InventarioSucursal`}>
                <button>Inventario Sucursal</button>
            </Link>
            <Link to={`/FacturadoSucursal`}>
                <button>Facturado Por sucursal</button>
            </Link>
            <Link to={`/FacturadoConsolidado`}>
                <button>Facturado Consolidado</button>
            </Link>
        </div>
        <div className="contenedor">
            <div className="marco3">
                <p>
                  Fecha Inicial
                </p>
                <input type="date"
                       value={fechaInicial}
                       min="2000-01-01" max="2020-12-31"
                       onChange={e => setFechaInicial(e.target.value)}></input>
                <p>
                  Fecha Final
                </p>
                <input type="date"
                       value={fechaFinal}
                       min="2020-01-01" max="2020-12-31"
                       onChange={e => setFechaFinal(e.target.value)}></input>
                <p>
                Categoría
                </p>
                <select onChange={setearCategoria}>
                <option value={""}>Todo</option>
                {
                    categorias.map((categoria) => {
                    return (
                        <option value={`${categoria.nombreCategoria}`}>{`${categoria.nombreCategoria}`}</option>
                    )
                    })
                }
                </select>
            </div>
            <div className="marco2">
                <div className="marco4">
                    <table id="productos"> 
                        <thead >
                            <tr>
                                <th>Categoria</th>
                                <th>Facturado</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        { 
                          totalFacturado.map(facturado => (
                            <tbody>                       
                                <tr>
                                    <td>{facturado.Categoria}</td>
                                    <td>{facturado.Facturado_Categoria}</td>
                                    <td>{facturado.Fecha}</td>
                                </tr>
                            </tbody>  
                          ))
                        } 
                        <thead >
                            <tr>
                                <th>Total Facturado</th>
                                <td>{comprobarTotal()/*totalFacturado[0].TOTAL*/}</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
}

export default FacturadoConsolidado;