import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Corporativo.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
  Link
} from "react-router-dom";

function InventarioSucursal() {
    const [sucursales  , setSucursales] = useState([]);
    const [productos  , setProductos] = useState([]);
    const [categorias  , setCategorias] = useState([]);
    const [nombreProducto  , setNombreProducto] = useState('');
    const [categoriaProducto  , setCategoriaProducto] = useState('');
    const [sucursal  , setSucursal] = useState(1);
    
    function setearSucursal(evento) {
      var indexSeleccionado = evento.target.selectedIndex;
      var idSucrusal = evento.target[indexSeleccionado].value;
      localStorage.setItem('sucursalSeleccionada', idSucrusal);
      setSucursal(localStorage.getItem('sucursalSeleccionada'));
      console.log(localStorage.getItem('sucursalSeleccionada'));
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
          if(sucursal == 1){
            const res = await axios.post(`http://localhost:8003/api/ConsultaInventario`, {
                  filterOn: '1',
                  nombreProducto: nombreProducto,
                  nombreCategoriaProducto: categoriaProducto
            });
            if(res.data[0].length != 0){
              setProductos(res.data[0]);
            }else{
              setProductos([]);
            }
          }else if(sucursal == 2){
            const res = await axios.post(`http://localhost:8003/api/ConsultaInventarioLimon`, {
                  filterOn: '1',
                  nombreProducto: nombreProducto,
                  nombreCategoriaProducto: categoriaProducto
            });
            if(res.data[0].length != 0){
              setProductos(res.data[0]);
            }else{
              setProductos([]);
            }
          }
        })()
    },[nombreProducto, categoriaProducto,sucursal])

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
                Sucursal
                </p>
                <select onChange={setearSucursal}>
                {
                    sucursales.map((sucursal) => {
                    return (
                        <option value={`${sucursal.idSucursal}`}>{`${sucursal.nombreSucursal} - ${sucursal.idSucursal}`}</option>
                    )
                    })
                }
                </select>
                <label>
                    <p>Producto</p>
                    <input 
                        type="text"
                        value={nombreProducto}
                        onChange={e => setNombreProducto(e.target.value)}
                    />
                </label>
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
                                <th>Producto</th>
                                <th>Categoria</th>
                                <th>Sucursal</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        { 
                        productos.map(producto => (
                            <tbody>                       
                                <tr>
                                    <td>{producto.Nombre_Producto}</td>
                                    <td>{producto.Categoria}</td>
                                    <td>{producto.Sucursal}</td>
                                    <td>{producto.Cantidad}</td>
                                </tr>
                            </tbody>  
                            ))
                        } 
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
}

export default InventarioSucursal;