import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import FacturadoConsolidado from "./Components/Corporativo/FacturadoConsolidado.jsx";
import FacturadoSucursal from "./Components/Corporativo/FacturadoSucursal.jsx";
import InventarioSucursal from "./Components/Corporativo/InventarioSucursal.jsx";
import SellerComponent from "./Components/SellerComponent/SellerComponent.js";
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App/>
      <Switch>
        <Route path="/FacturadoConsolidado" exact component={FacturadoConsolidado}></Route>
        <Route path="/InventarioSucursal" exact component={InventarioSucursal}></Route>
        <Route path="/FacturadoSucursal" exact component={FacturadoSucursal}></Route>
      </Switch>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
