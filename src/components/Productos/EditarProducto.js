import React, {useState, Fragment, useEffect, useRef} from 'react';
import { Container, Form, Button, Alert } from "react-bootstrap";
import {useParams, withRouter} from 'react-router-dom';
import { campoRequerido, rangoValor} from '../helpers/validaciones'
import Swal from 'sweetalert2';

const EditarProducto = (props) => {
    // obtengo el parametro de la URL
    const {id} = useParams();
    const URL = process.env.REACT_APP_API_URL;
    console.log(URL)
    // declaro los state
    const [producto, setProducto] = useState({});
    const [categoria, setCategoria] = useState("");
    // crear useRef
    const nombreProductoRef = useRef('');
    const precioProductoRef = useRef(0);    


    // traer los datos del objeto a editar
    useEffect(()=>{
        consultarProducto();
    }, [])

    const consultarProducto = async() =>{
        try{
            const respuesta = await fetch(URL+"/"+id);
            console.log(respuesta);
            if(respuesta.status === 200){
                const resultado = await respuesta.json();
                setProducto(resultado);
            }
        }catch(error){
            console.log(error);
        }
    }

    const cambiarCategoria = (e) => {
        setCategoria(e.target.value);
      };

    const handleSubmit = async (e) =>{
        e.preventDefault();
    //    revisar si la categoria cambio, si no lo hizo conservar la categoria del state producto
        const categoriaSeleccionada = (categoria === '')? producto.categoria : categoria;

        // validar los datos
        if(campoRequerido(nombreProductoRef.current.value) && rangoValor(parseInt(precioProductoRef.current.value)) && campoRequerido(categoriaSeleccionada)){
            // si esta todo bien enviar la peticion PUT a la api
            // armar el objeto a enviar

            const productoEditado ={
                nombreProducto: nombreProductoRef.current.value,
                precioProducto: precioProductoRef.current.value,
                categoria: categoriaSeleccionada
            }

            console.log(productoEditado);

            try{
                const respuesta = await fetch(URL+"/"+id,{
                    method: "PUT",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(productoEditado)
                });
                console.log(respuesta);
                if(respuesta.status === 200){
                  Swal.fire(
                    'Producto editado',
                    'Se modificaron los datos del producto',
                    'success'
                  );
                  props.consultarAPI();
                  // redireccionar a la pagina de lista de productos
                  props.history.push('/productos');
                }

            }catch(error){
                console.log(error);
                // mostrar al usuario que ocurrio un error
            }

        }else{
            console.log('mostrar cartel de error')
        }

        // si algo falla mostrar el alert de error

    }

    return (
        <Fragment>
      <Container className="my-4">
        <Form onSubmit={handleSubmit}>
          <h1 className="my-4 text-center">Editar producto</h1>
          <Form.Group>
            {/* {error === true ? (
              <Alert variant={"danger"}>
                Todos los campos son obligatorios
              </Alert>
            ) : null} */}

            <Form.Label>Nombre del producto *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Submarino"
              defaultValue={producto.nombreProducto}
              ref={nombreProductoRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio *</Form.Label>
            <Form.Control
              type="number"
              placeholder="$50"   
              defaultValue={producto.precioProducto}    
              ref={precioProductoRef}  
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
              defaultChecked={producto.categoria && producto.categoria==='bebida-caliente'}
            ></Form.Check>
            <Form.Check
              inline
              type="radio"
              label="Bebida Fria"
              name="categoria"
              value="bebida-fria"
              onChange={cambiarCategoria}
              defaultChecked={producto.categoria && producto.categoria ==='bebida-fria'}
            ></Form.Check>
            <Form.Check
              inline
              type="radio"
              label="Sandwich"
              name="categoria"
              value="sandwich"
              onChange={cambiarCategoria}
              defaultChecked={producto.categoria && producto.categoria ==='sandwich'}
            ></Form.Check>
            <Form.Check
              inline
              type="radio"
              label="Dulce"
              name="categoria"
              value="dulce"
              onChange={cambiarCategoria}
              defaultChecked={producto.categoria && producto.categoria ==='dulce'}
            ></Form.Check>
            <Form.Check
              inline
              type="radio"
              label="Salado"
              name="categoria"
              value="salado"
              onChange={cambiarCategoria}
              defaultChecked={producto.categoria && producto.categoria ==='salado'}
            ></Form.Check>
          </div>
          <Button variant="danger" type="submit" className="w-100">
            Guardar Producto
          </Button>
        </Form>
      </Container>
    </Fragment>
    );
};

export default withRouter(EditarProducto);