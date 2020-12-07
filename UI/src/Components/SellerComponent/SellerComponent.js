import React, { useEffect, useState } from "react";
import "./SellerComponent.css";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Form from "react-bootstrap/Form";
import axios from "axios";
import DatePicker from 'react-date-picker';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
    Link
  } from "react-router-dom";



function Seller(props) {
    const [categories_selected, set_categories_selected] = useState(true);
    const [products_selected, set_products_selected] = useState(false);
    const [invoices_selected, set_invoices_selected] = useState(false);

    const [new_category, set_new_category] = useState("");

    const [new_product, set_new_product] = useState("");
    const [new_product_description, set_new_product_description] = useState("");
    const [new_product_price, set_new_product_price] = useState();
    const [new_product_category, set_new_product_category] = useState("");
    const [new_product_quantity, set_new_product_quantity] = useState();

    const[modifying_category, set_modifying_category] = useState(false);
    const[modifying_product, set_modifying_product] = useState(false);

    const[refresh, set_refresh] = useState("Categories");
    const[refresh_invoices, set_refresh_invoices] = useState(true);

    const[show_categories_div,set_show_categories_div] = useState(true);
    const[show_products_div,set_show_products_div] = useState(false);
    const[show_invoices_div,set_show_invoices_div] = useState(false);

    const[client_filter, set_client_filter] = useState("");
    const[invoice_number_filter, set_invoice_number_filter] = useState("");
    const[date_filter, set_date_filter] = useState("");

    const[categories, set_categories] = useState([]);

    const[products, set_products] = useState([])

    const[invoices, set_invoices] = useState([]);


    const GetUrl = () => {
        if (props.sucursal === 1) return 'http://localhost:8000/api';
        if (props.sucursal === 2) return 'http://localhost:8001/api';
    }

    const[show_modal, set_show_modal] = useState(false);
    const[productos_factura, set_productos_factura] = useState([]);
    const[base_url, set_base_url] = useState(GetUrl());
 

    useEffect(() => {
        (async () => {
          if(refresh === "Categories") {
            await axios
            .get(base_url+'/Categorias')
            .then((response) => set_categories(response.data[0]))
            .catch((error) => {
              console.error("There was an error!", error);
            });            
              console.log("Modifying Categories");
              set_refresh("");
            }
            if(refresh === "Products") {
                await axios
                .get(base_url + '/RetornarProductos')
                .then((response) => set_products(response.data[0]))
                .catch((error) => {
                  console.error("There was an error!", error);
                });
                  console.log("Modifying Products");
                  set_refresh("");
                }
                if(refresh === "Invoices" || refresh_invoices) {
                    let filterOn1 = 0;
                    let new_date = "";
                    if(client_filter !== "" || invoice_number_filter !== "" || date_filter !== "") filterOn1 = 1;
                    if (date_filter !== ""){
                        let mes = (date_filter.getMonth() + 1).toString() ;
                        if (mes.length === 1) mes = "0" + mes;
                        let dia = date_filter.getDate().toString() ;
                        if (dia.length === 1) dia = "0" + dia;
                        new_date = date_filter.getFullYear() + "-" + mes + "-" + dia;
                    } 
                    console.log(new_date);
                    await axios
                    .post(base_url + '/EncabezadoFactura', {
                        filterOn: filterOn1,
                        idFactura: invoice_number_filter,
                        nombreCliente: client_filter,
                        fecha: new_date
                        })
                    .then((response) => set_invoices(response.data[0]))
                    .catch((error) => {
                      console.error("There was an error!", error);
                    });
                      console.log("Modifying Invoice");
                      set_refresh("");
                }
        })();
      }, [
        refresh,
        client_filter,
        date_filter,
        invoice_number_filter,
        base_url
      ]);

      const ShowInvoiceProducts = (id) => {
          set_show_modal(true);
          (async () => {
                await axios
                    .post(base_url + '/ConsultarDetalleFactura',{
                        idFactura: id
                    })
                    .then((response) => set_productos_factura(response.data[0]))
                    .catch((error) => {
                    console.error("There was an error!", error);
                    });
        })();

      }

      const MenuOptionSelected = (id) => {
        set_categories_selected(false);
        set_products_selected(false);
        set_invoices_selected(false);

        set_show_categories_div(false);
        set_show_products_div(false);
        set_show_invoices_div(false);
        if (id === "categories"){
            set_categories_selected(true);
            set_show_categories_div(true);
            set_refresh("Categories");
            set_refresh_invoices(false);
        } 
        if (id === "products"){
            set_products_selected(true);
            set_show_products_div(true);
            set_refresh("Products");
            set_refresh_invoices(false);
        } 
        if (id === "invoices"){
            set_invoices_selected(true);
            set_show_invoices_div(true);
            set_refresh("Invoices");
            set_refresh_invoices(true);
        } 
        
    };

    const CleanFilters = (e) =>{
        set_client_filter("");
        set_date_filter("");
        set_invoice_number_filter("");
    }

    const CategoryNameChangeHandler = (e) => {
        set_new_category(e.target.value);
    };

    const ProductNameChangeHandler = (e) => {
        set_new_product(e.target.value);
    };

    const ClientFilterChangeHandler = (e) => {
        set_client_filter(e.target.value);
    };

    const InvoiceFilterChangeHandler = (e) => {
        set_invoice_number_filter(e.target.value);
    };

    const ProductDescriptionChangeHandler = (e) => {
        set_new_product_description(e.target.value);
    };

    const ProductCategoryChangeHandler = (e) => {
        set_new_product_category(e.target.value);
      };

    const AddCategoryHandler = (e) => {
        (async () => {
            if (new_category !== ""){ //mostrar mensaje de error
                //API insertar categoría
                await axios
                    .post(base_url + '/CrearCategoria',{
                    nombreCategoriaProducto: new_category 
                    })
                    .then((response) => console.log(response))
                    .catch((error) => {
                    console.error("There was an error!", error);
                    });
                set_refresh("Categories");
                set_new_category("");
            }
        })();
    }

    const AddProductHandler = (e) => {
        //Api agregar producto
        (async () => {
            await axios
            .post(base_url + '/CrearProducto',{
                nombreProducto: new_product,
                descripcion: new_product_description,
                precio: new_product_price,
                idCategoriaProducto: new_product_category,
                cantidad: new_product_quantity
            })
            .then((response) => console.log(response))
            .catch((error) => {
            console.error("There was an error!", error);
            });
            set_refresh("Products");
            set_new_product("");
            set_new_product_category(0);
            set_new_product_description("");
            set_new_product_price("");
            set_new_product_quantity("");
        })();
    }


    const ModifyCategory = (nombre, id) => {
        (async () => {
            if (nombre !== ""){ 
                //API modificar categoría
                await axios
                    .post(base_url + '/ModificarCategoria',{
                    nombreCategoria: nombre,
                    idCategoria: id 
                    })
                    .then((response) => console.log(response))
                    .catch((error) => {
                    console.error("There was an error!", error);
                    });
                set_refresh("Categories");
            }
        })();
    }

    
  const onlyNumbers = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
         set_new_product_price(e.target.value);
    }
  };

  const onlyNumbers_view = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      
    }
  };

  const onlyNumbers_quantity = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      set_new_product_quantity(e.target.value);
    }
  };

  const DisableProductForms = (e) => {
    if(document.getElementById(e.target.value + "-modificarPR") !== null) document.getElementById(e.target.value + "-modificarPR").innerHTML = "Modificar";
    if(document.getElementById(e.target.value + "-eliminarPR") !== null) document.getElementById(e.target.value + "-eliminarPR").innerHTML = "Eliminar";
    if(document.getElementById(e.target.value + "-inputNombrePR") !== null) document.getElementById(e.target.value + "-inputNombrePR").disabled = true;
    if(document.getElementById(e.target.value + "-inputPrecioPR") !== null) document.getElementById(e.target.value + "-inputPrecioPR").disabled = true;
    if(document.getElementById(e.target.value + "-selectCategoriaPR") !== null) document.getElementById(e.target.value + "-selectCategoriaPR").disabled = true;
    if(document.getElementById(e.target.value + "-inputDescripcionPR") !== null) document.getElementById(e.target.value + "-inputDescripcionPR").disabled = true;
    if(document.getElementById(e.target.value + "-inputCantidadPR") !== null) document.getElementById(e.target.value + "-inputCantidadPR").disabled = true;
  }

  const ModifyProduct = (id, nombre, precio, categoria, descripcion, cantidad) =>{
    (async () => {
        if (nombre.value !== "" && precio.value !== "" && categoria.value !== "" && descripcion.value !== "" && cantidad.value !== "" ){ 
            //API modificar producto
                await axios
                .post(base_url + '/ModificarProducto',{
                    idProducto: id ,
                    nombreProducto:  nombre.value,
                    descripcion: descripcion.value,
                    precio: precio.value,
                    idCategoriaProducto: categoria.value,
                    cantidad: cantidad.value
                })
                .then((response) => console.log(response))
                .catch((error) => {
                console.error("There was an error!", error);
                });
                
        }
        set_refresh("Products");
    })();
  }

    const ModifyProductHandler = (e) => {
        if (!modifying_product){
            if(document.getElementById(e.target.value + "-modificarPR") !== null) document.getElementById(e.target.value + "-modificarPR").innerHTML = "Listo";
            if(document.getElementById(e.target.value + "-eliminarPR") !== null) document.getElementById(e.target.value + "-eliminarPR").innerHTML = "Cancelar";
            if(document.getElementById(e.target.value + "-inputNombrePR") !== null) document.getElementById(e.target.value + "-inputNombrePR").disabled = false;
            if(document.getElementById(e.target.value + "-inputPrecioPR") !== null) document.getElementById(e.target.value + "-inputPrecioPR").disabled = false;
            if(document.getElementById(e.target.value + "-selectCategoriaPR") !== null) document.getElementById(e.target.value + "-selectCategoriaPR").disabled = false;
            if(document.getElementById(e.target.value + "-inputDescripcionPR") !== null) document.getElementById(e.target.value + "-inputDescripcionPR").disabled = false;
            if(document.getElementById(e.target.value + "-inputCantidadPR") !== null) document.getElementById(e.target.value + "-inputCantidadPR").disabled = false;
            set_modifying_product(true); 
        }
        else{
            DisableProductForms(e);
            ModifyProduct(e.target.value, document.getElementById(e.target.value + "-inputNombrePR"), document.getElementById(e.target.value + "-inputPrecioPR"), 
            document.getElementById(e.target.value + "-selectCategoriaPR"), document.getElementById(e.target.value + "-inputDescripcionPR"), document.getElementById(e.target.value + "-inputCantidadPR"));
            set_modifying_product(false); 
            set_refresh("Products");
        }
    }

    const GetOldValue = (id) => {
        console.log("Recibo");
        console.log(id);
       let index;
       for (index = 0; index < products.length; index++){
            console.log("Veo");
            console.log(products[index].idProducto);
            if (products[index].idProducto.toString() === id.toString()) return products[index].idCategoriaProducto
       }
       return 0;

    } 

    const DeleteProductHandler = (e) => {
        if(modifying_product){
            DisableProductForms(e);
            if(document.getElementById(e.target.value + "-inputNombrePR") !== null) document.getElementById(e.target.value + "-inputNombrePR").value = document.getElementById(e.target.value + "-inputNombrePR").defaultValue;
            if(document.getElementById(e.target.value + "-inputPrecioPR") !== null) document.getElementById(e.target.value + "-inputPrecioPR").value = document.getElementById(e.target.value + "-inputPrecioPR").defaultValue;
            if(document.getElementById(e.target.value + "-selectCategoriaPR") !== null) document.getElementById(e.target.value + "-selectCategoriaPR").value = GetOldValue(e.target.value);
            if(document.getElementById(e.target.value + "-inputDescripcionPR") !== null) document.getElementById(e.target.value + "-inputDescripcionPR").value = document.getElementById(e.target.value + "-inputDescripcionPR").defaultValue;
            if(document.getElementById(e.target.value + "-inputCantidadPR") !== null) document.getElementById(e.target.value + "-inputCantidadPR").value = document.getElementById(e.target.value + "-inputCantidadPR").defaultValue;
            set_modifying_product(false);
        }
        else{
            //Eliminar Producto con API
            (async () => {
                let id_product = e.target.value;
                await axios
                    .post(base_url + '/EliminarProducto',{
                        idProducto: id_product
                    })
                    .then((response) => console.log(response))
                    .catch((error) => {
                    console.error("There was an error!", error);
                    });
                set_refresh("Products");
            })();
        }
    }

    const ModifyCategoryHandler = (e) => {
        if (!modifying_category){
            if(document.getElementById(e.target.value + "-modificar") !== null) document.getElementById(e.target.value + "-modificar").innerHTML = "Listo";
            if(document.getElementById(e.target.value + "-eliminar") !== null) document.getElementById(e.target.value + "-eliminar").innerHTML = "Cancelar";
            if(document.getElementById(e.target.value + "-input") !== null) document.getElementById(e.target.value + "-input").disabled = false;
            set_modifying_category(true); 
        }
        else{
            if(document.getElementById(e.target.value + "-modificar") !== null) document.getElementById(e.target.value + "-modificar").innerHTML = "Modificar";
            if(document.getElementById(e.target.value + "-eliminar") !== null) document.getElementById(e.target.value + "-eliminar").innerHTML = "Eliminar";
            if(document.getElementById(e.target.value + "-input") !== null) document.getElementById(e.target.value + "-input").disabled = true;
            ModifyCategory(document.getElementById(e.target.value + "-input").value, e.target.value);
            set_modifying_category(false); 
            set_refresh("Categories");
        }
    }

    const DeleteCategoryHandler = (e) => {
        if(modifying_category){
            if(document.getElementById(e.target.value + "-modificar") !== null) document.getElementById(e.target.value + "-modificar").innerHTML = "Modificar";
            if(document.getElementById(e.target.value + "-eliminar") !== null) document.getElementById(e.target.value + "-eliminar").innerHTML = "Eliminar";
            if(document.getElementById(e.target.value + "-input") !== null){
                document.getElementById(e.target.value + "-input").disabled = true;
                document.getElementById(e.target.value + "-input").value = document.getElementById(e.target.value + "-input").defaultValue;
            } 
            set_modifying_category(false);
        }
        else{
            (async () => {
            let id_category = e.target.value;
            //Eliminar categoría con API
                await axios
                    .post(base_url + '/EliminarCategoria',{
                    idCategoria: id_category 
                    })
                    .then((response) => console.log(response))
                    .catch((error) => {
                    console.error("There was an error!", error);
                    });
                set_refresh("Categories");
            })();
        }
    }


    return (
        <div className="Sllr-principal-div">
            <Container fluid className="Sllr-principal-container">
                <Row>
                    <Link className="rowy" to="/">
                    <Col sm={3}><button className = "Sllr-btn-cerrarSesion">Cerrar Sesión</button></Col>
                    </Link>         
                </Row>
                <Row>
                    <Col><h1 className="Sllr-titulo1">Bienvenido</h1></Col>
                </Row>
                <Row xs={1} xl={2} sm={1} md={1} lg={2} className="Sllr-info-row">
                    <Col xl={4} lg={4}>
                        <div className="Sllr-opciones-div">
                            <div className="Sllr-opciones-secondary">
                                <div className={categories_selected ? "Sllr-opcionx-div2" : "Sllr-opcionx-div"} onClick={() => MenuOptionSelected("categories")}>
                                    <Row>
                                            <Col xs={3} xl={3}><Image src="./assets/categorias.png" rounded /></Col>
                                            <Col><h2 className="Sllr-titulo2">Categorías</h2></Col>            
                                    </Row>
                                </div>  
                                <div className={products_selected ? "Sllr-opcionx-div2" : "Sllr-opcionx-div"}  onClick={() => MenuOptionSelected("products")}>
                                    <Row>
                                            <Col xs={3} xl={3}><Image src="./assets/Productos.png" rounded /></Col>
                                            <Col><h2 className="Sllr-titulo2">Productos</h2></Col>            
                                    </Row>
                                </div>  
                                <div className={invoices_selected ? "Sllr-opcionx-div2" : "Sllr-opcionx-div"}  onClick={() => MenuOptionSelected("invoices")}>
                                    <Row>
                                            <Col xs={3} xl={3}><Image src="./assets/facturas.png" rounded /></Col>
                                            <Col><h2 className="Sllr-titulo2">Facturas</h2></Col>            
                                    </Row>
                                </div>  
                            </div>
                        </div>
                    </Col>
                    <Col xl={8} lg={8}>
                        <div className="Sllr-resultado-div">
                            <div className={show_products_div ? "Sllr-resultado-secondary2" : "Sllr-resultado-secondary"}>
                                {show_categories_div
                                ?
                                <div id="PRD3" key="PRD3" className="Sllr-nuevo-div">
                                    <h4 className="Sllr-titulo3">Nueva categoría</h4>
                                    <Row>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            value={new_category}
                                            placeholder="Ingresa el nombre de la categoría"
                                            onChange={CategoryNameChangeHandler}
                                        />
                                    </Col>
                                    <Col>
                                        <button className = "Sllr-btn-agregarCat" onClick={AddCategoryHandler}>Agregar</button>
                                    </Col>
                                    </Row>                              
                                </div>
                                :null}
                                {show_categories_div
                                ?
                                <div id="PRD2" key="PRD2" className="Sllr-nuevo-div2">
                                    <h4 className="Sllr-titulo3">Categorías</h4>
                                    {categories.map((category) => (
                                        <Row 
                                        className="Sllr-categories-row"
                                        key={category.idCategoria}>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                id={category.idCategoria + "-input"}
                                                defaultValue={category.nombreCategoria}
                                                placeholder="Ingresa el nombre de la categoría"
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <button className = "Sllr-btn-agregarCat"  id={category.idCategoria + "-modificar"} value={category.idCategoria} onClick={ModifyCategoryHandler} >Modificar</button>
                                            <button className = "Sllr-btn-agregarCat Sllr-btn-agregarCat2" id={category.idCategoria + "-eliminar"} value={category.idCategoria} onClick={DeleteCategoryHandler}>Eliminar</button>
                                        </Col>
                                        </Row>                 
                                    ))
                                    }
                                                 
                                </div>
                                :null}
                                {show_products_div
                                ?
                                <div id="PRD1" key="PRD1" className="Sllr-nuevo-div">
                                    <h4 className="Sllr-titulo3">Nuevo producto</h4>
                                    <Row>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            value={new_product}
                                            placeholder="Nombre"
                                            onChange={ProductNameChangeHandler}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control        
                                            type="number"
                                            value={new_product_price}
                                            placeholder="Precio"
                                            onChange={onlyNumbers}
                                        />
                                    </Col>
                                    <Col>
                                    <Form.Control
                                        as="select"
                                        onChange={ProductCategoryChangeHandler}
                                        value={new_product_category}
                                    >
                                        <option key={0} value={0}>
                                        {"Categoría"}
                                        </option>
                                        {categories.map((category) => {
                                        return (
                                            <option
                                            key={category.idCategoria + "PR"}
                                            value={category.idCategoria}
                                            >
                                            {category.nombreCategoria}
                                            </option>
                                        );
                                        })}
                                    </Form.Control>
                                    </Col>
                                    <Col>
                                        <button className = "Sllr-btn-agregarCat" onClick={AddProductHandler}>Agregar</button>
                                    </Col>
                                    </Row>            
                                    <Row>
                                    <Col sm={6}>
                                        <Form.Control
                                            as="textarea" 
                                            rows={1}
                                            className="Sllr-description-input"
                                            value={new_product_description}
                                            placeholder="Descripción"
                                            onChange={ProductDescriptionChangeHandler}
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Control
                                            type="number"
                                            value={new_product_quantity}
                                            className="Sllr-quantity-input"
                                            placeholder="Cantidad en inventario"
                                            onChange={onlyNumbers_quantity}
                                        />
                                    </Col>
                                    </Row>                              
                                </div>
                                :null}
                                {show_products_div
                                ?
                                <div id="PRD" key="PRD" className="Sllr-nuevo-div3">
                                    <h4 className="Sllr-titulo3">Productos</h4>
                                    {products.map((product) => {
                                        return([
                                        <Row 
                                        className="Sllr-categories-row2"
                                        key={product.idProducto}>
                                        <Col>
                                        <Form.Control
                                            type="text"
                                            defaultValue={product.nombre}
                                            placeholder="Nombre"
                                            id={product.idProducto + "-inputNombrePR"}
                                            disabled
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            defaultValue={product.precio}
                                            placeholder="Precio"
                                            id={product.idProducto + "-inputPrecioPR"}
                                            onChange={onlyNumbers_view}
                                            disabled
                                        />
                                    </Col>
                                    <Col>
                                    <Form.Control
                                        as="select"
                                        defaultValue={product.idCategoriaProducto}
                                        id={product.idProducto + "-selectCategoriaPR"}
                                        disabled
                                    >
                                        <option key={0} value={0} disabled>
                                        {"Categoría"}
                                        </option>
                                        {categories.map((category) => {
                                        return (
                                            <option
                                            key={category.idCategoria + "PR2"}
                                            value={category.idCategoria}
                                            >
                                            {category.nombreCategoria}
                                            </option>
                                        );
                                        })}
                                    </Form.Control>
                                    </Col>
                                        <Col>
                                            <button className = "Sllr-btn-agregarCat"  id={product.idProducto + "-modificarPR"} value={product.idProducto} onClick={ModifyProductHandler} >Modificar</button>
                                            <button className = "Sllr-btn-agregarCat Sllr-btn-agregarCat2" id={product.idProducto + "-eliminarPR"} value={product.idProducto} onClick={DeleteProductHandler}>Eliminar</button>
                                        </Col>
                                    </Row>,
                                    <Row className="Sllr-categories-row2" key={product.idProducto + "PR1"}>
                                    <Col sm={6}>
                                        <Form.Control
                                            as="textarea" 
                                            rows={1}
                                            defaultValue={product.descripcion}
                                            placeholder="Descripción"
                                            id={product.idProducto + "-inputDescripcionPR"}
                                            disabled
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Control        
                                            type="number"
                                            defaultValue={product.cantidad}
                                            className="Sllr-quantity-input"
                                            placeholder="Cantidad en inventario"
                                            onChange={onlyNumbers_view}
                                            id={product.idProducto + "-inputCantidadPR"}
                                            disabled
                                        />
                                    </Col>
                                </Row>,
                                <Row className="justify-content-md-center row-x" key={product.idProducto + "PR2"}>
                                <Col sm={10}>
                                <div className="separator">&nbsp;</div>
                                </Col>
                                </Row>   ]       
                                );})
                                }       
                                </div>
                                
                                :null}
                                
                                 {show_invoices_div
                                ?
                                <div id="PRD1" key="PRD1" className="Sllr-nuevo-div">
                                    <h4 className="Sllr-titulo3">Filtros</h4>
                                    <Row>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            value={client_filter}
                                            placeholder="Cliente"
                                            onChange={ClientFilterChangeHandler}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control        
                                            type="number"
                                            value={invoice_number_filter}
                                            placeholder="#Factura"
                                            onChange={InvoiceFilterChangeHandler}
                                        />
                                    </Col>
                                    <Col>
                                    <DatePicker
                                        onChange={set_date_filter}
                                        value={date_filter}
                                        clearIcon = {null}
                                        className="date"
                                        format ="y-MM-dd"
                                    />
                                    </Col>
                                    <Col>
                                        <button className = "Sllr-btn-agregarCat" onClick={CleanFilters}>Limpiar Filtros</button>
                                    </Col>
                                    </Row> 
         
                                                                 
                                </div>
                                :null}
                                {show_invoices_div
                                ?
                                <div id="PRD4" key="PRD4" className="Sllr-facturas-div">
                                    <h4 className="Sllr-titulo3">Facturas</h4>
                                    <Row>
                                       <Col sm={2}>
                                            <h5 className="Sllr-titulo3 alinear">Número</h5>
                                       </Col > 
                                       <Col sm={2}>
                                            <h5 className="Sllr-titulo3 alinear">Cliente</h5>
                                       </Col> 
                                       <Col sm={2}>
                                            <h5 className="Sllr-titulo3 alinear">Vendedor</h5>
                                       </Col> 
                                       <Col sm={2}>
                                            <h5 className="Sllr-titulo3 alinear">Fecha</h5>
                                       </Col> 
                                       <Col sm={2}>
                                            <h5 className="Sllr-titulo3 alinear">Total</h5>
                                       </Col> 
                                    </Row>
                                    <Row>
                                        <div className="Sllr-listaFacturas-div">
                                        {invoices.map((invoice) => (
                                              [<Row key={invoice.idFactura + "INV1"}>
                                              <Col sm={2} className="alinear">
                                              <Form.Label className="Sllr-titulo4">{invoice.idFactura}</Form.Label>
                                         </Col> 
                                         <Col sm={2} className="alinear">
                                         <Form.Label className="Sllr-titulo4">{invoice.Nombre_Cliente}</Form.Label>
                                         </Col > 
                                         <Col sm={2} className="alinear">
                                         <Form.Label className="Sllr-titulo4">{invoice.Nombre_Vendedor}</Form.Label>
                                         </Col> 
                                         <Col sm={2} className="alinear">
                                         <Form.Label className="Sllr-titulo4">{invoice.Fecha}</Form.Label>
                                         </Col > 
                                         <Col sm={2} className="alinear">
                                         <Form.Label className="Sllr-titulo4">{invoice.Precio_Total}</Form.Label>
                                         </Col>
                                         <Col sm={2}>
                                              <button className = "Sllr-btn-agregarCat3" onClick={() => {ShowInvoiceProducts(invoice.idFactura)}}>Ver</button>
                                          </Col>
                                              </Row>,
                                              <Row className="justify-content-md-center row-x" key={invoice.idFactura + "INV2"}>
                                              <Col sm={7}>
                                              <div className="separator">&nbsp;</div>
                                              </Col>
                                              </Row> ] 
                                         ))}
                                          
                                        </div>
                                    </Row>
                                    
                                </div>
                                :null}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    show={show_modal}
                    onHide={() => set_show_modal(false)}
                    className="modalP"
                    centered
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Productos de la factura
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                     <div className="invoice_products_div">
                     {productos_factura.map((productof) => (
                         [<Row key={productof.Nombre_Producto + "PRT1"}>
                         <Col sm={4}>
                         <Form.Label className="Sllr-titulo4">Nombre:&nbsp;{productof.Nombre_Producto}</Form.Label>
                         </Col>
                         <Col sm={4}>
                            <Form.Label className="Sllr-titulo4">Categoría:&nbsp;{productof.Nombre_Categoria}</Form.Label>
                         </Col>
                         <Col sm={3}>
                            <Form.Label className="Sllr-titulo4">Precio:&nbsp;{productof.Precio_Unitario}$</Form.Label>
                         </Col>
                         <Col sm={3}>
                            <Form.Label className="Sllr-titulo4">Cantidad:&nbsp;{productof.Cantidad}</Form.Label>
                         </Col>
                     </Row>,
                    <Row className="justify-content-md-center row-x" key={productof.Nombre_Producto + "PRT2"}>
                        <Col sm={7}>
                        <div className="separator">&nbsp;</div>
                        </Col>
                    </Row>]
                     ))}
                         
                     </div>
                    </Modal.Body>
                    </Modal>
            </Container>  
        </div>       
    )
}
export default Seller;