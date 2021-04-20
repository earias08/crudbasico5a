import React, { Fragment } from "react";
import { Container, ListGroup } from "react-bootstrap";
import ItemProducto from "./ItemProducto";

const ListaProductos = (props) => {
  return (
    <Fragment>
      <Container className='my-5'>
        <h1 className="text-center mb-5">Lista de productos</h1>
        <ListGroup>
          {
            props.productos.map((producto)=> <ItemProducto producto={producto} key={producto.id}></ItemProducto>)
          }
        </ListGroup>
      </Container>
    </Fragment>
  );
};

export default ListaProductos;
