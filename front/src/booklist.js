import "./buyer.css";
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
      const response = await axios.get(apiUrl + "nodes/" + activeTab);
      const nodesData = response.data;
      setNodes(nodesData);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  const NodeListBook = ({ node }) => {
    const { Author, Content_Warning, ISBN, Name, Release_Date } = node;
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

  const NodeListWarehouse = ({ node }) => {
    const { Address, Capacity, Certificated, Name, Temperature_Control } = node;
    return (
      <li>
        <div>
          <strong>Address:</strong> {Address}
        </div>
        <div>
          <strong>Capacity:</strong>
          {Capacity}
        </div>
        <div>
          <strong>Certificated:</strong> {Certificated}
        </div>
        <div>
          <strong>Name:</strong> {Name}
        </div>
        <div>
          <strong>Temperature_Control:</strong> {Temperature_Control}
        </div>
      </li>
    );
  };

  const NodeListCustomer = ({ node }) => {
    const { Address, Adult, Email, Name, Phone_number } = node;
    return (
      <li>
        <div>
          <strong>Address:</strong> {Address}
        </div>
        <div>
          <strong>Adult:</strong>
          {Adult}
        </div>
        <div>
          <strong>Email:</strong> {Email}
        </div>
        <div>
          <strong>Name:</strong> {Name}
        </div>
        <div>
          <strong>Phone:</strong> {Phone_number}
        </div>
      </li>
    );
  };

  const NodeListRetailer = ({ node }) => {
    const { Address, Name, Phone_number, Representatives, Website } = node;
    return (
      <li>
        <div>
          <strong>Address:</strong> {Address}
        </div>
        <div>
          <strong>Name:</strong>
          {Name}
        </div>
        <div>
          <strong>Phone_number:</strong> {Phone_number}
        </div>
        <div>
          <strong>Representatives:</strong> {Representatives}
        </div>
        <div>
          <strong>Website:</strong> {Website}
        </div>
      </li>
    );
  };

  const NodeListSupplier = ({ node }) => {
    const { Address, CEO, Name, Phone_number, Representatives } = node;
    return (
      <li>
        <div>
          <strong>CEO:</strong> {CEO}
        </div>
        <div>
          <strong>Address:</strong> {Address}
        </div>
        <div>
          <strong>Name:</strong> {Name}
        </div>
        <div>
          <strong>Phone_number:</strong> {Phone_number}
        </div>
        <div>
          <strong>Representatives:</strong> {Representatives}
        </div>
      </li>
    );
  };

  const [activeTab, setActiveTab] = useState("Book");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    getNodes();
  };

  return (
    <div className="app">
      <header>
        <p className="titulo-principal">Contenedor de libros punto com</p>
      </header>

      <div className="buscador">
        <p>Lista de libros</p>
      </div>

      <Link to="/#">
        <button className="cambios">Retailer page</button>
      </Link>

      <div>
        {/* Tab buttons */}
        <div>
          <button
            onClick={() => handleTabClick("Book")}
            className={activeTab === "Book" ? "active" : ""}
          >
            Books
          </button>
          <button
            onClick={() => handleTabClick("Customer")}
            className={activeTab === "Customer" ? "active" : ""}
          >
            Customer
          </button>
          <button
            onClick={() => handleTabClick("Warehouse")}
            className={activeTab === "Warehouse" ? "active" : ""}
          >
            Warehouse
          </button>
          <button
            onClick={() => handleTabClick("Retailer")}
            className={activeTab === "Retailer" ? "active" : ""}
          >
            Retailer
          </button>
          <button
            onClick={() => handleTabClick("Supplier")}
            className={activeTab === "Supplier" ? "active" : ""}
          >
            Supplier
          </button>
        </div>

        {/* Content based on active tab */}
        <div>
          <ul className="infobooks">
            {nodes.map((node, index) => {
              if (activeTab === "Book") {
                return <NodeListBook key={index} node={node} />;
              } else if (activeTab === "Customer") {
                return <NodeListCustomer key={index} node={node} />;
              } else if (activeTab === "Warehouse") {
                return <NodeListWarehouse key={index} node={node} />;
              } else if (activeTab === "Retailer") {
                return <NodeListRetailer key={index} node={node} />;
              } else if (activeTab === "Supplier") {
                return <NodeListSupplier key={index} node={node} />;
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      </div>

      <div className="has"></div>
    </div>
  );
}

export default Booksa;
