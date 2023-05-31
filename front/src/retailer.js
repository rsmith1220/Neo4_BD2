import './App.css';
import { Link} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// PAGINA DE CREACION
// AQUI SE CREA PARA CREAR CREACIONES

function Retailer() {
  const [label, setLabel] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const createNode = () => {
    const payload = {
      labels: [label],
      properties: {
        [key]: value
      }
    };
  
    axios
      .post("/create_node", payload)
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
    
    </div>
  );
}

export default Retailer;
