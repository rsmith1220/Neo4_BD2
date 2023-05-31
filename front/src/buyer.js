import './buyer.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
      <p>Creando</p>

    </div>
    <button className='cambios'>
        <Link to='/#'>
        Navigation page
        </Link>
    </button>
    
<div className='has'>
  <p className='infor'>El libro esta en WAREHOUSE</p>


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
</div>
    
    </div>
  );
}

export default Buyer;
