import './buyer.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



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
      console.log(nodesData);
      setNodes(nodesData);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };
  const NodeListItem = ({ node }) => {
    const { Author, Content_Warning, ISBN, Name, Release_Date } = node.node;
  
    return (
      <li>
        <div>
          <strong>Author:</strong> {Author}
        </div>
        <div>
          <strong>Content Warning:</strong>{" "}
          {Content_Warning && Content_Warning.join(", ")}
        </div>
        <div>
          <strong>ISBN:</strong> {ISBN}
        </div>
        <div>
          <strong>Name:</strong> {Name}
        </div>
        <div>
          <strong>Release Date:</strong> {Release_Date}
        </div>
      </li>
    );
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

    <ul className='infobooks'>
      {nodes.map((node, index) => (
        <NodeListItem key={index} node={node} />
      ))}
    </ul>
    
<div className='has'>


    
</div>
    
</div>
  );
}

export default Booksa;
