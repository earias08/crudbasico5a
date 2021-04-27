import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./components/Inicio";
import ListaProductos from "./components/Productos/ListaProductos";
import AgregarProducto from "./components/Productos/AgregarProducto";
import Navegacion from "./components/common/Navegacion";
import Footer from "./components/common/Footer";
import {useState, useEffect} from 'react';
import EditarProducto from "./components/Productos/EditarProducto";
import Error404 from "./components/Error404";

function App() {
  const URL = process.env.REACT_APP_API_URL;
  const [productos, setProductos] = useState([]);

  useEffect(()=>{
    consultarAPI();
  },[]);

  const consultarAPI = async() =>{
    try{
      const consulta = await fetch(URL);
      const respuesta = await consulta.json();
      console.log(respuesta);
      setProductos(respuesta);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <Router>
      <Navegacion></Navegacion>
      <Switch>
        <Route exact path="/">
          <Inicio></Inicio>
        </Route>
        <Route exact path="/productos">
          <ListaProductos productos={productos} consultarAPI={consultarAPI}></ListaProductos>
        </Route>
        <Route exact path="/productos/nuevo">
          <AgregarProducto consultarAPI={consultarAPI}></AgregarProducto>
        </Route>
        <Route exact path='/productos/editar/:id'>
          <EditarProducto consultarAPI={consultarAPI}></EditarProducto>
        </Route>
        <Route exact path='*'>
          <Error404></Error404>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
