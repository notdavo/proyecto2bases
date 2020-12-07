import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import SellerComponent from "./Components/SellerComponent/SellerComponent";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function App() {
  const [clients, setClients] = useState("outline-light");
  const [suppliers, setSuppliers] = useState("outline-light");
  const [stock, setStock] = useState("outline-light");
  const [sales, setSales] = useState("outline-light");
  const [stat, setStat] = useState("outline-light");
  const[show_navbar, set_show_navbar] = useState(true);
  const[show_login, set_show_login] = useState(false);
  const[show_sucursales, set_show_sucursales] = useState(false)

  const[session_user, set_session_user] = useState("");
  const[user_pass, set_user_pass] = useState("");
  const[user_sucursal, set_user_sucursal] = useState("");
  const[go_to_seller, set_go_to_seller] = useState(false);
  const[go_to_corporativo, set_go_to_corporativo] = useState(false);

  const[mensaje_erorr, set_mensaje_erorr] = useState("*Este inicio de sesión es solo para trabajadores de la tienda");

  const[sucursal_compra, set_sucursal_compra] = useState('1');
  const[sucursal_nombre, set_sucursal_nombre] = useState('Cartago');
  const[show_sucursal_modal, set_show_sucursal_modal] = useState(true);

  const [actual, setActual] = useState("");
  const location = useLocation();

  useEffect(() => {
    onClick(location.pathname);
    if (location.pathname === "/"){
      set_go_to_seller(false)
      set_go_to_corporativo(false)
      set_show_navbar(true);
      set_session_user("");
      set_user_pass("");
      set_user_sucursal("");
    }
    if (location.pathname === "/sellers") set_show_navbar(false);
    if (location.pathname === "/InventarioSucursal") set_show_navbar(false);
  }, [location]);

  const radios = [
    { name: 'Cartago', value: '1' },
    { name: 'Limón', value: '2' },
  ];

  const onClick = (button) => {
    setClients("outline-light");
    setSuppliers("outline-light");
    setStock("outline-light");
    setSales("outline-light");
    setStat("outline-light");
    if (button.includes("/clients") || button === "/clients") setClients("primary");
    if (button === "/suppliers") setSuppliers("primary");
    if (button === "/stockitems") setStock("primary");
    if (button.includes("/sales") || button === "/sales") setSales("primary");
    if (button === "/stats") setStat("primary");
  };

  const hide = () =>{
    set_show_login(true);
  }

  const homeClick = () => {
    setClients("outline-light");
    setSuppliers("outline-light");
    setStock("outline-light");
    setSales("outline-light");
    setStat("outline-light");
  };

  const GetDbUserInfo = (user, pass_u) => {
    (async () => { //mostrar mensaje de error
          //API insertar categoría
          await axios
              .post('http://localhost:8000/api/ValidarCredenciales',{
                usuario: user,
                pass: pass_u
              })
              .then((response) => {
                VerificarDatos(response.data[0]);
              })
              .catch((error) => {
              console.error("There was an error!", error);
              });
      })();
  }

  const VerificarDatos = (datos) => {
    let user_ok = false;
    let pass_ok = false
    if (datos.length > 0){
      if (datos[0].usuario === session_user) user_ok=true;
      if (datos[0].pass === user_pass) pass_ok=true;
      if (user_ok && pass_ok){
        console.log("aqui");
        set_show_login(false);
        set_user_sucursal(datos[0].idSucursal);
        if(datos[0].usuario === 'admin')
          set_go_to_corporativo(true);
        else
          set_go_to_seller(true);
      } 
      if (!user_ok)set_mensaje_erorr("*Nombre de usuario incorrecto");
      if (!pass_ok) set_mensaje_erorr("*Contraseña incorrecta");
    }
    else{
      set_mensaje_erorr("*Credenciales Incorrectas");
    }
  }

  const ValidadCredenciales = () => {
    GetDbUserInfo(session_user, user_pass);
  }

  const ProductCategoryChangeHandler = (e) => {
    set_sucursal_compra(e.target.value);
  };

  const OnChangeUser = (e) => {
    set_session_user(e.target.value);
    set_mensaje_erorr("*Este inicio de sesión es solo para trabajadores de la tienda");
  }

  const OnChangePass = (e) => {
    set_user_pass(e.target.value);
    set_mensaje_erorr("*Este inicio de sesión es solo para trabajadores de la tienda");
  }

  const SucursalOnChange = (e) => {
    set_sucursal_compra(e.currentTarget.value);
    console.log(sucursal_compra);
    if(sucursal_compra === "1") set_sucursal_nombre("Cartago");
    if(sucursal_compra === "2") set_sucursal_nombre("Limón");
  }

  return (
    <div className="div_nav">
      {go_to_seller
      ?
      <Redirect to="/sellers"/>
        : go_to_corporativo
        ?
        <Redirect to="/InventarioSucursal"/>
          :null
      }
      <Modal
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    show={show_sucursal_modal}
                    onHide={() => set_show_sucursal_modal(false)}
                    centered
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Elige una sucursal
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                     <div >
                     <Form.Control
                                        as="select"
                                        onChange={ProductCategoryChangeHandler}
                                        value={sucursal_compra}
                                    >
                                        <option key={1} value={1}>
                                        {"Cartago"}
                                        </option>
                                        <option key={2} value={2}>
                                        {"Limón"}
                                        </option>
                                    </Form.Control>
                     </div>
                    </Modal.Body>
                    </Modal>
                  <Modal
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    show={show_login}
                    onHide={() => set_show_login(false)}
                    centered
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Inicio de Sesión
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                     <div>
                     <Form>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Usuario</Form.Label>
                          <Form.Control type="text" onChange={OnChangeUser} placeholder="Ingresa tu nombre de usuario" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Contraseña</Form.Label>
                          <Form.Control type="password" onChange={OnChangePass} placeholder="Ingresa tu contraseña" />
                        </Form.Group>
                        <Button variant="primary" onClick={ValidadCredenciales}>
                          Entrar
                        </Button>
                        <Form.Group controlId="formBasicPassword">
                          <Form.Label className="modal_footer">{mensaje_erorr}</Form.Label>
                        </Form.Group>
                      
                      </Form>
                     </div>
                    </Modal.Body>
                    </Modal>
      {show_navbar
      ?
      <Navbar className="navbar" variant="dark" activeKey="/">
      <div className="ml-auto">
        <Link to="/">
          <Button variant={clients} onClick={() => set_show_sucursal_modal(true)}>
            Cambiar de Sucursal
          </Button>{" "}
        </Link>
        <Link to={{
        pathname: "/suppliers",
        state: {
          supplierName: "or"
        }
    }}>
          <Button variant={suppliers} onClick={() => onClick("/suppliers")}>
            Ver mi carrito
          </Button>{" "}
        </Link>
        <Link>
        <Button variant="primary" className="iniciarSesionButton" onClick={hide}>Iniciar Sesión</Button>{' '}
        </Link>
      </div>
    </Navbar>
    :null}
      <Switch>
      <Route path="/sellers" exact render={(props) => <SellerComponent {...props} sucursal={user_sucursal} />}></Route>
    </Switch>      
    </div>
  );
}

export default App;
