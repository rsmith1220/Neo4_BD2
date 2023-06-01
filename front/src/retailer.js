import './App.css';
import { useState } from "react";
import axios from "axios";

function Retailer() {
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [nodeLabel, setNodeLabel] = useState("");
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

  const handleRelationshipTypeSelection = (type) => {
    setRelationshipType(type);
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

  // licensed by relationship goes from a book to a supplier
    // start date, end date, exclusive
  // purchased relationship goes from a customer to a book
      // purchase date, amount, store
  // request relationship goes from a customer to a retailer
      // amount, request date, isbn
  // owns relationship goes from a supplier to a retailer
      // percentage owned, invested amount, decision authority
  // supplies relationship goes from a supplier to a warehouse
      // supply start, supply end, supply frequency
  // stored in relationship goes from a book to a warehouse
      // quantity, arrive date, handling type
  // has relationship goes from a retailer to a book
      // amount, price, available
  // order relationship goes from a retailer to a warehouse
      // id, isbn, amount
  // shipment relationship goes from a warehouse to a retailer
      // id, arrival date, order id
  // owned by relationship goes from a warehouse to a supplier
      // percentage owned, invested amount, exclusive

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
        <p>Crear Nodos</p>
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
        <button
          className={`sub-bar-button ${selectedLabels.includes('Delete') ? 'active' : ''}`}
          onClick={() => { handleLabelSelection('Delete'); setNodeLabel('Delete'); }}
        >
          Delete
        </button>
      </div>
      <div className='contiene'>
        <p>Crear Relaciones</p>
        <button
          className={`sub-bar-button ${relationshipType === 'Licensed_by' ? 'active' : ''}`}
          onClick={() => { handleRelationshipTypeSelection('Licensed_by'); }}
        >
          Licensed_by
        </button>
        <button
    className={`relationship-button ${relationshipType === 'Purchased' ? 'active' : ''}`}
    onClick={() => handleRelationshipTypeSelection('Purchased')}
  >
    Purchased
  </button>
  <button
    className={`relationship-button ${relationshipType === 'Request' ? 'active' : ''}`}
    onClick={() => handleRelationshipTypeSelection('Request')}
  >
    Request
  </button>
  <button
    className={`relationship-button ${relationshipType === 'Owns' ? 'active' : ''}`}
    onClick={() => handleRelationshipTypeSelection('Owns')}
  >
    Owns
  </button>
  <button
    className={`relationship-button ${relationshipType === 'Supplies' ? 'active' : ''}`}
    onClick={() => handleRelationshipTypeSelection('Supplies')}
  >
    Supplies
  </button>
  <button
    className={`relationship-button ${relationshipType === 'Stored_In' ? 'active' : ''}`}
    onClick={() => handleRelationshipTypeSelection('Stored_In')}
  >
    Stored_In
  </button>
  <button
    className={`relationship-button ${relationshipType === 'Has' ? 'active' : ''}`}
    onClick={() => handleRelationshipTypeSelection('Has')}
  >
    Has
  </button>
  <button
    className={`relationship-button ${relationshipType === 'Order' ? 'active' : ''}`}
    onClick={() => handleRelationshipTypeSelection('Order')}
  >
    Order
  </button>
  <button
    className={`relationship-button ${relationshipType === 'Shipment' ? 'active' : ''}`}
    onClick={() => handleRelationshipTypeSelection('Shipment')}
  >
    Shipment
  </button>
  <button
    className={`relationship-button ${relationshipType === 'Owned_by' ? 'active' : ''}`}
    onClick={() => handleRelationshipTypeSelection('Owned_by')}
  >
    Owned_by
  </button>
      </div>

      <button className='cambios' onClick={createNode} disabled={!isCreateNodeButtonEnabled()}>
        Create Node
      </button>

      {selectedLabels.length >= 1 && (
        <div className='contiene_crear'>
          {selectedLabels[0] === "Warehouse" && (
            <>
              <p>Warehouse</p>
              <p className='infor'>Address <input name="Address" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Name <input name="Name" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Capacity <input name="Capacity" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Certificated <input name="Certificated" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Temperature_Control <input name="Temperature_Control" onChange={handleNodePropertyChange} /></p>
            </>
          )}
          {selectedLabels[0] === "Supplier" && (
            <>
              <p>Supplier</p>
              <p className='infor'>Address <input name="Address" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>CEO <input name="CEO" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Name <input name="Name" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Phone_number <input name="Phone_number" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Representatives <input name="Representatives" onChange={handleNodePropertyChange} /></p>
            </>
          )}
          {selectedLabels[0] === "Book" && (
            <>
              <p>Book</p>
              <p className='infor'>Author <input name="Author" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Content_Warning <input name="Content_Warning" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>ISBN <input name="ISBN" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Name <input name="Name" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Release_Date <input name="Release_Date" onChange={handleNodePropertyChange} /></p>
            </>
          )}

          {selectedLabels[0] === "Customer" && (
            <>
              <p>Customer</p>
              <p className='infor'>Address <input name="Address" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Adult <input name="Adult" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Email <input name="Email" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Name <input name="Name" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Phone_number <input name="Phone_number" onChange={handleNodePropertyChange} /></p>
            </>
          )}

          {selectedLabels[0] === "Retailer" && (
            <>
              <p>Retailer</p>
              <p className='infor'>Address <input name="Address" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Name <input name="Name" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Phone_number <input name="Phone_number" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Representatives <input name="Representatives" onChange={handleNodePropertyChange} /></p>
              <p className='infor'>Website <input name="Website" onChange={handleNodePropertyChange} /></p>
            </>
          )}
          {selectedLabels[0] === "Delete" && (
            <>
              <div className='contiene'>
                <p className='infor'>Node label <input value={label2} onChange={e => setLabel2(e.target.value)} /></p>
              </div>
              <button className='cambios' onClick={deleteNode}>Borrar</button>
            </>
            
          )} 
        </div>
      )}

      <button className='cambios' onClick={createRelationship} disabled={selectedLabels.length < 1}>
        Create Relationship
      </button>

      {
        relationshipType !== '' && (
          <div className='contiene_crear'>
            {relationshipType === 'Licensed_by' && (
              <>
            <p className='infor'>From <input name="From" onChange={handleRelationshipPropertyChange} /></p>
            <p className='infor'>To <input name="To" onChange={handleRelationshipPropertyChange} /></p>
            <p className='infor'>Start Date <input name="Date" onChange={handleRelationshipPropertyChange} /></p>
            <p className='infor'>End Date <input name="End_Date" onChange={handleRelationshipPropertyChange} /></p>
            <p className='infor'> Exclusive <input name="Exclusive" onChange={handleRelationshipPropertyChange} /></p>
            </>
            )}
            

    </div>

    
  );
}

export default Retailer;
