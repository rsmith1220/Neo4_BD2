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

  const NodeAddress = ({ node }) => {
    const { CEO,Address,Author,Name } = node.node;
  
    return (
      <li>
        <div>
          <strong>CEO:</strong> {CEO}
        </div>
        <div>
          <strong>Address:</strong> {Address}
        </div>
        <div>
          <strong>Author:</strong> {Author}
        </div>
        
        <div>
          <strong>Name:</strong> {Name}
        </div>
      </li>
    );
  };
  const [activeTab, setActiveTab] = useState("authors");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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

    <div>
      {/* Tab buttons */}
      <div>
        <button
          onClick={() => handleTabClick("authors")}
          className={activeTab === "authors" ? "active" : ""}
        >
          Authors and Books
        </button>
        <button
          onClick={() => handleTabClick("addresses")}
          className={activeTab === "addresses" ? "active" : ""}
        >
          Addresses
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "authors" && (
        <div>
          <ul className='infobooks'>
      {nodes.map((node, index) => (
        <NodeListItem key={index} node={node} />
      ))}
    </ul>
        </div>
      )}

      {activeTab === "addresses" && (
        <div>
          <ul className='infobooks'>
      {nodes.map((node, index) => (
        <NodeAddress key={index} node={node} />
      ))}
    </ul>
        </div>
      )}
    </div>

    {/* <ul className='infobooks'>
      {nodes.map((node, index) => (
        <NodeListItem key={index} node={node} />
      ))}
    </ul> */}
    
<div className='has'>


    
</div>
    
</div>
  );
}

export default Booksa;
