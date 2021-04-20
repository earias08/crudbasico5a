import React, { Fragment, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

const AgregarProducto = (props) => {
  const URL = process.env.REACT_APP_API_URL;
  console.log(URL);
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);

  const cambiarCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // validar los datos
    if (
      nombreProducto.trim() === "" ||
      precioProducto.trim() === "" ||
      categoria === ""
    ) {
      // mostrar un cartel de error;
      setError(true);
      return;
    } else {
      // enviar el producto a la api
      console.log("aqui esta todo bien envio los datos");
      setError(false);

      // crear el objeto a enviar
      const datos ={
        nombreProducto,
        precioProducto,
        categoria
      };
      console.log(datos);

      // enviar objeto a la api, operacion POST
      try{
        const parametros ={
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datos)
        };

        // ejecutar la solicitud o request
        const respuesta = await fetch(URL, parametros)
        console.log(respuesta);
        if((await respuesta.status) === 201){
          // mostrar un cartel al usuario
          Swal.fire(
            'Producto agregado',
            'Se carga un nuevo producto en la cafeteria',
            'success'
          )
          // limpiar el formuario
          // setNombreProducto(''); setPrecioProducto(''); setCategoria('')
          // redireccionar a otra ruta
          props.history.push('/productos');
        }

      }catch(error){
        console.log(error);
      }
    }
  };

  return (
    <Fragment>
      <Container className="my-4">
        <Form onSubmit={handleSubmit}>
          <h1 className="my-4 text-center">Agregar nuevo producto</h1>
          <Form.Group>
            {error === true ? (
              <Alert variant={"danger"}>
                Todos los campos son obligatorios
              </Alert>
            ) : null}

            <Form.Label>Nombre del producto *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Submarino"
              onChange={(e) => setNombreProducto(e.target.value)}
              value={nombreProducto}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio *</Form.Label>
            <Form.Control
              type="number"
              placeholder="$50"
              onChange={(e) => setPrecioProducto(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className="text-center my-4">
            <h3>Categoria *</h3>
            <Form.Check
              inline
              type="radio"
              label="Bebida caliente"
              name="categoria"
              value="bebida-caliente"
              onChange={cambiarCategoria}
            ></Form.Check>
            <Form.Check
              inline
              type="radio"
              label="Bebida Fria"
              name="categoria"
              value="bebida-fria"
              onChange={cambiarCategoria}
            ></Form.Check>
            <Form.Check
              inline
              type="radio"
              label="Sandwich"
              name="categoria"
              value="sandwich"
              onChange={cambiarCategoria}
            ></Form.Check>
            <Form.Check
              inline
              type="radio"
              label="Dulce"
              name="categoria"
              value="dulce"
              onChange={cambiarCategoria}
            ></Form.Check>
            <Form.Check
              inline
              type="radio"
              label="Salado"
              name="categoria"
              value="salado"
              onChange={cambiarCategoria}
            ></Form.Check>
          </div>
          <Button variant="danger" type="submit" className="w-100">
            Agregar Producto
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
};

export default withRouter(AgregarProducto);
