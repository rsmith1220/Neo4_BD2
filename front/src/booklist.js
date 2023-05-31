import './buyer.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


// PAGINA DE NAVEGACION DONDE NAVEGAMOS
// AQUI SE NAVEGA PARA NAVEGACION
// NAVEGANCIA


function Booksa() {

  const [nodes, setNodes] = useState([]);
  const apiUrl = "http://127.0.0.1:5000/";

  useEffect(() => {
    getNodes();
  }, []);

  const getNodes = async () => {
    try {
      const response = await axios.get(apiUrl + "nodes");
      const nodesData = response.data;
      setNodes(nodesData);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  return (
    <div className="app">
      <header>
        
        <p className='titulo-principal'>
          Contenedor de libros punto com
        </p>
      </header>
    <div className = 'buscador'>
      <p>Lista de libros</p>

    </div>
    <Link to='/#'><button className='cambios'>
        
        Retailer page
        
    </button></Link>
    
<div className='has'>


    
</div>
    
</div>
  );
}

export default Booksa;
