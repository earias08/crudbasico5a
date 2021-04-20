import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const ItemProducto = (props) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <p>
        {props.producto.nombreProducto}<span className="font-weight-bold"> ${props.producto.precioProducto}</span>
      </p>
      <div>
        <Button variant="warning" className="mr-2 text-light">
          <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
        </Button>
        <Button variant="danger">
          <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default ItemProducto;
