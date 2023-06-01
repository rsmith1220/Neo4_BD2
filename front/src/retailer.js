import './App.css';
import { useState } from "react";
import axios from "axios";

function Retailer() {
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [nodeLabel, setNodeLabel] = useState("");
  const [nodeKey, setNodeKey] = useState("");
  const [nodeValue, setNodeValue] = useState("");
  const [nodeProperties, setNodeProperties] = useState({});

  const [relationshipFrom, setRelationshipFrom] = useState("");
  const [relationshipTo, setRelationshipTo] = useState("");
  const [relationshipType, setRelationshipType] = useState("");
  const [relationshipProperties, setRelationshipProperties] = useState({});

  const apiUrl = "http://127.0.0.1:5000/";

  const handleLabelSelection = (label) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((selectedLabel) => selectedLabel !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  const isCreateNodeButtonEnabled = () => {
    if (selectedLabels.length === 0) return false;
  
    const { Address, Name, Capacity, Certificated, Temperature_Control, CEO, Phone_number, Representatives, Author, Content_Warning, ISBN, Release_Date, Adult, Email, Payment_Methods } = nodeLabel;
  
    switch (selectedLabels[0]) {
      case "Warehouse":
        return (
          Address !== "" &&
          Name !== "" &&
          Capacity !== "" &&
          Certificated !== "" &&
          Temperature_Control !== ""
        );
      case "Supplier":
        return (
          Address !== "" &&
          CEO !== "" &&
          Name !== "" &&
          Phone_number !== "" &&
          Representatives !== ""
        );
      case "Book":
        return (
          Author !== "" &&
          Content_Warning !== "" &&
          ISBN !== "" &&
          Name !== "" &&
          Release_Date !== ""
        );
      case "Customer":
        return (
          Address !== "" &&
          Adult !== "" &&
          Email !== "" &&
          Name !== "" &&
          Phone_number !== ""
        );
      case "Retailer":
        return (
          Address !== "" &&
          Name !== "" &&
          Payment_Methods !== "" &&
          Phone_number !== "" &&
          Representatives !== ""
        );
      default:
        return false;
    }
  };
  
  const createNode = () => {
    const payload = {
      labels: selectedLabels,
      properties: nodeProperties
    };

    console.log(payload);

    axios
      .post(apiUrl + "create_node", payload)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const isCreateRelationshipButtonEnabled = () => {
    return (
      relationshipFrom !== "" &&
      relationshipTo !== "" &&
      relationshipType !== ""
    );
  };
  
  
  

  const createRelationship = () => {
    const payload = {
      from: relationshipFrom,
      to: relationshipTo,
      properties: relationshipProperties,
      type: relationshipType
    };

    axios
      .post(apiUrl + "create_relationship", payload)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleNodePropertyChange = (e) => {
    const { name, value } = e.target;
    setNodeProperties(prevProperties => ({
      ...prevProperties,
      [name]: value
    }));
  };

  return (
    <div className="app">
      <header>
        <p className='titulo-principal'>
          Contenedor de libros punto com
        </p>
      </header>
      <div className='buscador'>
        <p>Creando</p>
      </div>
      <div className='contiene'>
        <button
          className={`sub-bar-button ${selectedLabels.includes('Retailer') ? 'active' : ''}`}
          onClick={() => { handleLabelSelection('Retailer'); }}
        >
          Retailer
        </button>
        <button
          className={`sub-bar-button ${selectedLabels.includes('Customer') ? 'active' : ''}`}
          onClick={() => { handleLabelSelection('Customer'); }}
        >
          Customer
        </button>
        <button
          className={`sub-bar-button ${selectedLabels.includes('Warehouse') ? 'active' : ''}`}
          onClick={() => { handleLabelSelection('Warehouse'); }}
        >
          Warehouse
        </button>
        <button
          className={`sub-bar-button ${selectedLabels.includes('Supplier') ? 'active' : ''}`}
          onClick={() => { handleLabelSelection('Supplier'); }}
        >
          Supplier
        </button>
        <button
          className={`sub-bar-button ${selectedLabels.includes('Book') ? 'active' : ''}`}
          onClick={() => { handleLabelSelection('Book'); }}
        >
          Book
        </button>
      </div>

      <button className='cambios' onClick={createNode} disabled={!isCreateNodeButtonEnabled()}>
        Create Node
      </button>

      {selectedLabels.length >= 1 && (
        <div className='contiene_crear'>
          {selectedLabels[0] === "Warehouse" && (
            <>
              <p className='infor'>Address <input name="Address" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Name <input name="Name" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Capacity <input name="Capacity" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Certificated <input name="Certificated" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Temperature_Control <input name="Temperature_Control" onChange={handleNodePropertyChange} /></p>
            </>
          )}
          {selectedLabels[0] === "Supplier" && (
            <>
              <p className='infor'>Address <input name="Address" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>CEO <input name="CEO" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Name <input name="Name" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Phone_number <input name="Phone_number" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Representatives <input name="Representatives" onChange={handleNodePropertyChange} /></p>
            </>
          )}
          {selectedLabels[0] === "Book" && (
            <>
              <p className='infor'>Author <input name="Author" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Content_Warning <input name="Content_Warning" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>ISBN <input name="ISBN" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Name <input name="Name" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Release_Date <input name="Release_Date" onChange={handleNodePropertyChange} /></p>
            </>
          )}

          {selectedLabels[0] === "Customer" && (
            <>
              <p className='infor'>Address <input name="Address" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Adult <input name="Adult" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Email <input name="Email" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Name <input name="Name" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Phone_number <input name="Phone_number" onChange={handleNodePropertyChange} /></p>
            </>
          )}

          {selectedLabels[0] === "Retailer" && (
            <>
              <p className='infor'>Address <input name="Address" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Name <input name="Name" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Phone_number <input name="Phone_number" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Representatives <input name="Representatives" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Website <input name="Website" onChange={handleNodePropertyChange} /></p>
            </>
          )}
        </div>
      )}

      <button className='cambios' onClick={createRelationship} disabled={selectedLabels.length < 1}>
        Create Relationship
      </button>
    </div>
  );
}

export default Retailer;
