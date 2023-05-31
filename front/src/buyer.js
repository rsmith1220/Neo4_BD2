import './buyer.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


// PAGINA DE NAVEGACION DONDE NAVEGAMOS
// AQUI SE NAVEGA PARA NAVEGACION
// NAVEGANCIA


function Buyer() {

  const [nodes, setNodes] = useState([]);
  const apiUrl = "http://127.0.0.1:5000/";

  useEffect(() => {
    getNodes();
  }, []);

  const getNodes = async () => {
    try {
      const response = await axios.get(apiUrl + "nodes");
      const nodesData = response.data;
      console.log(nodesData);
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
      <p>Navegando</p>

    </div>
    <Link to='/#'><button className='cambios'>
        
        Creation page
        
    </button></Link>
    <Link to='/books'><button className='cambios'>
        
        Buyer page
        
    </button></Link>
    
<div className='has'>
<Link to='/modifier'><button className='cambios'>
        
    
    Modificar un nodo
    </button></Link>

    <div>
        <h2>Nodes</h2>
        <ul>
          {nodes.map((node, index) => (
            <li key={index}>
              <h3>{node.title}</h3>
              <p>{node.tagline}</p>
              <p>{node.released}</p>
            </li>
          ))}
        </ul>
      </div>
      <p>Tabla de los nodos</p>

    
</div>
    
    </div>
  );
}

export default Buyer;
