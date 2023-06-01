import './App.css';
import { Link} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// PAGINA DE CREACION
// AQUI SE CREA PARA CREAR CREACIONES

function Retailer() {
  const [label, setLabel] = useState("");
  const [label2, setLabel2] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [key2, setKey2] = useState("");
  const [value2, setValue2] = useState("");

  const [de, setDe] = useState("");
  const [a, setA] = useState("");
  const [relationship, setRelationship] = useState("");
  const [relProperties, setRelProperties] = useState({});

  const apiUrl = "http://127.0.0.1:5000/";

  const createNode = () => {
    const payload = {
      labels: [label],
      properties: {
        [key]: value
      }
    };
  
    axios
      .post(apiUrl + "create_node", payload)
      .then(response => {
        // Node creation successful, handle the response if needed
        console.log(response.data);
      })
      .catch(error => {
        // Node creation failed, handle the error if needed
        console.log(error);
      });
  };

  const createRelationship = () => {
    const payload = {
      de,
      a,
      properties: relProperties,
      relationship
    };
  
    axios
      .post(apiUrl + "create_relationship", payload)
      .then(response => {
        // Relationship creation successful, handle the response if needed
        console.log(response.data);
      })
      .catch(error => {
        // Relationship creation failed, handle the error if needed
        console.log(error);
      });
  };
  const deleteNode = () => {
    const payload = {
      labels: [label2]
      
    };
  
    axios
      .post(apiUrl + "delete_node", payload)
      .then(response => {
        // Node creation successful, handle the response if needed
        console.log(response.data);
      })
      .catch(error => {
        // Node creation failed, handle the error if needed
        console.log(error);
      });
  };
  
  return (
    <div className="app">
      <header>
        <p className='titulo-principal'>
          Contenedor de libros punto com
        </p>
      </header>
      <div className = 'buscador'>
        <p>Creando</p>
      </div>
      <Link to='/navegar'><button className='cambios'>
          
          Navigation page
          
      </button></Link>
      <div className='contiene'>
        <p className='infor'>Node label <input value={label} onChange={e => setLabel(e.target.value)} /></p>
        <p className='infor'>Node key <input value={key} onChange={e => setKey(e.target.value)} /></p>
        <p className='infor'>Node value <input value={value} onChange={e => setValue(e.target.value)} /></p>
      </div>
      {/* AQUI AL HACER CLICK SE CREA UN NODO */}
      <button className='cambios' onClick={createNode}>Crear</button>

      <div className='contiene'>
        <p className='infor'>From <input value={de} onChange={e => setDe(e.target.value)} /></p>
        <p className='infor'>To <input value={a} onChange={e => setA(e.target.value)} /></p>
        <p className='infor'>Relationship Type <input value={relationship} onChange={e => setRelationship(e.target.value)} /></p>
      </div>
      <div className='contiene'>
        <p className='infor'>Property Key <input onChange={e => setRelProperties({ ...relProperties, [e.target.name]: e.target.value })} /></p>
        <p className='infor'>Property Value <input onChange={e => setRelProperties({ ...relProperties, [e.target.name]: e.target.value })} /></p>
      </div>
      
      {/* AQUI AL HACER CLICK SE CREEA UNA CONEXION */}
      <button className='cambios' onClick={createRelationship}>Crear</button>

      <div className='contiene'>
        <p className='infor'>Node label <input value={label2} onChange={e => setLabel2(e.target.value)} /></p>
        {/* <p className='infor'>Node key <input value={key2} onChange={e => setKey2(e.target.value)} /></p>
        <p className='infor'>Node value <input value={value2} onChange={e => setValue2(e.target.value)} /></p> */}
      </div>
      {/* AQUI AL HACER CLICK SE CREEA UNA CONEXION */}
      <button className='cambios' onClick={deleteNode}>Borrar</button>
    </div>

    
  );
}

export default Retailer;
