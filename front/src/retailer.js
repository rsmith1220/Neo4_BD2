import './App.css';
import { useState } from "react";
import axios from "axios";

function Retailer() {
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [nodeLabel, setNodeLabel] = useState("");
  const [nodeProperties, setNodeProperties] = useState({});
  const [label2, setLabel2] = useState("");
  const [labelPropiedadNodo1, setLabelPropiedadNodo1] = useState("");
  const [labelPropiedadNodo2, setLabelPropiedadNodo2] = useState("");
  const [labelPropiedadNodo3, setLabelPropiedadNodo3] = useState("");
  const [nodeKey, setNodeKey] = useState("");
  const [nodeValue, setNodeValue] = useState("");

  const [relationshipFrom, setRelationshipFrom] = useState("");
  const [relationshipTo, setRelationshipTo] = useState("");
  const [relationshipType, setRelationshipType] = useState("");
  const [relationshipProperties, setRelationshipProperties] = useState({});

  const [relation,setRelation]=useState("")
  const [de,setDe]=useState("")
  const [a,setA]=useState("")

  const [relation2,setRelation2]=useState("")
  const [de2,setDe2]=useState("")
  const [a2,setA2]=useState("")
  const [prop,setProp]=useState("")

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
      properties: { [nodeKey]: nodeValue }
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
  
  const deleteNodePropiedad = () => {
    const payload = {
      labels: [labelPropiedadNodo1],
      properties: [labelPropiedadNodo2],
      properties_to_delete: [labelPropiedadNodo3]
    };
  
    axios
      .post(apiUrl + "delete_node_properties", payload)
      .then(response => {
        // Node creation successful, handle the response if needed
        console.log(response.data);
      })
      .catch(error => {
        // Node creation failed, handle the error if needed
        console.log(error);
      });
  };
  
  const deleteRelationship = () => {
    const payload = {
      de: [de],
      a:[a],
      relation:[relation]
      
    };
  
    axios
      .post(apiUrl + "delete_relationship", payload)
      .then(response => {
        // Node creation successful, handle the response if needed
        console.log(response.data);
      })
      .catch(error => {
        // Node creation failed, handle the error if needed
        console.log(error);
      });
  };

  const deleteProp = () => {
    const payload = {
      de: [de2],
      a:[a2],
      relation:[relation2],
      prop:[prop]
      
    };
  
    axios
      .post(apiUrl + "delete_relationship_properties", payload)
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

    console.log(payload);
  
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
  
  const handleRelationshipPropertyChange = (e) => {
    const { name, value } = e.target;
    setRelationshipProperties(prevProperties => ({
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
        <button
          className={`sub-bar-button ${selectedLabels.includes('Retailer') ? 'active' : ''}`}
          onClick={() =>{ handleLabelSelection('Retailer'); setNodeLabel('Retailer'); }}
        >
          Retailer
        </button>
        <button
          className={`sub-bar-button ${selectedLabels.includes('Customer') ? 'active' : ''}`}
          onClick={() => { handleLabelSelection('Customer'); setNodeLabel('Customer'); }}
        >
          Customer
        </button>
        <button
          className={`sub-bar-button ${selectedLabels.includes('Warehouse') ? 'active' : ''}`}
          onClick={() => { handleLabelSelection('Warehouse'); setNodeLabel('Warehouse'); }}
        >
          Warehouse
        </button>
        <button
          className={`sub-bar-button ${selectedLabels.includes('Supplier') ? 'active' : ''}`}
          onClick={() => { handleLabelSelection('Supplier'); setNodeLabel('Supplier'); }}
        >
          Supplier
        </button>
        <button
          className={`sub-bar-button ${selectedLabels.includes('Book') ? 'active' : ''}`}
          onClick={() => { handleLabelSelection('Book'); setNodeLabel('Book'); }}
        >
          Book
        </button>
        <button
          className={`sub-bar-button ${selectedLabels.includes('Delete') ? 'active' : ''}`}
          onClick={() => { handleLabelSelection('Delete'); setNodeLabel('Delete'); }}
        >
          Delete
        </button>
        <button
          className={`sub-bar-button ${selectedLabels.includes('DeleteR') ? 'active' : ''}`}
          onClick={() => { handleLabelSelection('DeleteR'); setNodeLabel('DeleteR'); }}
        >
          Delete relationship
        </button>
        <button
          className={`sub-bar-button ${selectedLabels.includes('DeleteProp') ? 'active' : ''}`}
          onClick={() => { handleLabelSelection('DeleteProp'); setNodeLabel('DeleteProp'); }}
        >
          Delete property
        </button>
      </div>

      <button className='cambios' onClick={createNode} disabled={!isCreateNodeButtonEnabled()}>
        Create Node
      </button>
      
      {selectedLabels.length >= 1 && (
        <div className='contiene_crear'>
          {selectedLabels[0] === "Warehouse" && (
            <>
              <p className='infor'>Address <input name="Address" onChange = { handleNodePropertyChange } /></p>
              <p className='infor'>Name <input name="Name" onChange = { handleNodePropertyChange } /></p>
              <p className='infor'>Capacity <input name="Capacity" onChange = { handleNodePropertyChange } /></p>
              <p className='infor'>Certificated <input name="Certificated" onChange = { handleNodePropertyChange } /></p>
              <p className='infor'>Temperature_Control <input name="Temperature_Control" onChange = { handleNodePropertyChange } /></p>
            </>
            
          )}
          {selectedLabels[0] === "Supplier" && (
            <>
              <p className='infor'>Address <input name="Address" onChange = { handleNodePropertyChange } /></p>
              <p className='infor'>CEO <input name="CEO" onChange = { handleNodePropertyChange } /></p>
              <p className='infor'>Name <input name="Name" onChange = { handleNodePropertyChange } /></p>
              <p className='infor'>Phone_number <input name="Phone_number" onChange = { handleNodePropertyChange } /></p>
              <p className='infor'>Representatives <input name="Representatives" onChange = { handleNodePropertyChange } /></p>
            </>
          )}
          {selectedLabels[0] === "Book" && (
            <>
            <p className='infor'>Author <input name="Author" onChange={ handleNodePropertyChange } /></p>
            <p className='infor'>Content_Warning <input name="Content_Warning" onChange={ handleNodePropertyChange } /></p>
            <p className='infor'>ISBN <input name="ISBN" onChange={ handleNodePropertyChange } /></p>
            <p className='infor'>Name <input name="Name" onChange={ handleNodePropertyChange } /></p>
            <p className='infor'>Release_Date <input name="Release_Date" onChange={ handleNodePropertyChange } /></p>
          </>
          )}
          
          {selectedLabels[0] === "Customer" && (
            <>
            <p className='infor'>Address <input name="Address" onChange={ handleNodePropertyChange } /></p>
            <p className='infor'>Adult <input name="Adult" onChange={ handleNodePropertyChange } /></p>
            <p className='infor'>Email <input name="Email" onChange={ handleNodePropertyChange } /></p>
            <p className='infor'>Name <input name="Name" onChange={ handleNodePropertyChange } /></p>
            <p className='infor'>Phone_number <input name="Phone_number" onChange={ handleNodePropertyChange } /></p>
          </>
          )}

          {selectedLabels[0] === "Retailer" && (
            <>
            <p className='infor'>Address <input name="Address" onChange={ handleNodePropertyChange } /></p>
            <p className='infor'>Name <input name="Name" onChange={ handleNodePropertyChange } /></p>
            <p className='infor'>Phone_number <input name="Phone_number" onChange={ handleNodePropertyChange } /></p>
            <p className='infor'>Representatives <input name="Representatives" onChange={ handleNodePropertyChange } /></p>
            <p className='infor'>Website <input name="Website" onChange={ handleNodePropertyChange } /></p>
          </>
          )}  
          {selectedLabels[0] === "Delete" && (
            <>
              <p>Eliminar option</p>
              <div className='contiene'>
                <p className='infor'>Nodo <input value={label2} onChange={e => setLabel2(e.target.value)} /></p>
              </div>
              <button className='cambios' onClick={deleteNode}>Borrar</button>
              <div className='contiene'>
                <p className='infor'>Label<input value={label2} onChange={e => setLabelPropiedadNodo1(e.target.value)} /></p>
                <p className='infor'>Propiedad<input value={label2} onChange={e => setLabelPropiedadNodo2(e.target.value)} /></p>
                <p className='infor'>Propiedad a eliminar<input value={label2} onChange={e => setLabelPropiedadNodo3(e.target.value)} /></p>
              </div>
              <button className='cambios' onClick={deleteNodePropiedad}>Borrar</button>
            </>
            
          )}    
          {selectedLabels[0] === "DeleteR" && (
            <>
              <div className='contiene'>
                <p className='infor'>De <input value={de} onChange={e => setDe(e.target.value)} /></p>
                <p className='infor'>a <input value={a} onChange={e => setA(e.target.value)} /></p>
                <p className='infor'>Relationship <input value={relation} onChange={e => setRelation(e.target.value)} /></p>
              </div>
              <button className='cambios' onClick={deleteRelationship}>Borrar</button>
            </>
            
          )} 

          {selectedLabels[0] === "DeleteProp" && (
            <>
              <div className='contiene'>
                <p className='infor'>De <input value={de2} onChange={e => setDe2(e.target.value)} /></p>
                <p className='infor'>a <input value={a2} onChange={e => setA2(e.target.value)} /></p>
                <p className='infor'>Relationship <input value={relation2} onChange={e => setRelation2(e.target.value)} /></p>
                <p className='infor'>Property <input value={prop} onChange={e => setProp(e.target.value)} /></p>
              </div>
              <button className='cambios' onClick={deleteProp}>Borrar</button>
            </>
            
          )}
                    
        </div>
      )}

      <button className='cambios' onClick={createRelationship} disabled={selectedLabels.length < 1}>
        Create Relationship
      </button>

      {
        // TODO: Add relationship properties
        relationshipType !== '' && (
          <div className='contiene_crear'>
            {relationshipType === 'Licensed_by' && (
              <>
                <p className='infor'>From <input name="From" onChange={e => setRelationshipFrom(e.target.value) } /></p>
                <p className='infor'>To <input name="To" onChange={ e => setRelationshipTo(e.target.value) } /></p>
                <p className='infor'>Start Date <input name="Start_Date" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>End Date <input name="End_Date" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Exclusive <input name="Exclusive" onChange={handleRelationshipPropertyChange} /></p>
              </>
            )}
            
            {relationshipType === 'Purchased' && (
              <>
                <p className='infor'>From <input name="From" onChange={e => setRelationshipFrom(e.target.value) } /></p>
                <p className='infor'>To <input name="To" onChange={ e => setRelationshipTo(e.target.value) } /></p>
                <p className='infor'>Purchase Date <input name="Purchase_Date" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Amount <input name="Amount" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Store <input name="Store" onChange={handleRelationshipPropertyChange} /></p>
              </>
            )}
            
            {relationshipType === 'Request' && (
              <>
                <p className='infor'>From <input name="From" onChange={e => setRelationshipFrom(e.target.value) } /></p>
                <p className='infor'>To <input name="To" onChange={ e => setRelationshipTo(e.target.value) } /></p>
                <p className='infor'>Amount <input name="Amount" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Request Date <input name="Request_Date" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>ISBN <input name="ISBN" onChange={handleRelationshipPropertyChange} /></p>
              </>
            )}
            
            {relationshipType === 'Owns' && (
              <>
                <p className='infor'>From <input name="From" onChange={e => setRelationshipFrom(e.target.value) } /></p>
                <p className='infor'>To <input name="To" onChange={ e => setRelationshipTo(e.target.value) } /></p>
                <p className='infor'>Percentage Owned <input name="Percentage_Owned" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Invested Amount <input name="Invested_Amount" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Decision Authority <input name="Decision_Authority" onChange={handleRelationshipPropertyChange} /></p>
              </>
            )}
            
            {relationshipType === 'Supplies' && (
              <>
                <p className='infor'>From <input name="From" onChange={e => setRelationshipFrom(e.target.value) } /></p>
                <p className='infor'>To <input name="To" onChange={ e => setRelationshipTo(e.target.value) } /></p>
                <p className='infor'>Supply Start <input name="Supply_Start" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Supply End <input name="Supply_End" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Supply Frequency <input name="Supply_Frequency" onChange={handleRelationshipPropertyChange} /></p>
              </>
            )}
            
            {relationshipType === 'Stored_In' && (
              <>
                <p className='infor'>From <input name="From" onChange={e => setRelationshipFrom(e.target.value) } /></p>
                <p className='infor'>To <input name="To" onChange={ e => setRelationshipTo(e.target.value) } /></p>
                <p className='infor'>Quantity <input name="Quantity" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Arrival Date <input name="Arrival_Date" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Handling Type <input name="Handling_Type" onChange={handleRelationshipPropertyChange} /></p>
              </>
            )}
            
            {relationshipType === 'Has' && (
              <>
                <p className='infor'>From <input name="From" onChange={e => setRelationshipFrom(e.target.value) } /></p>
                <p className='infor'>To <input name="To" onChange={ e => setRelationshipTo(e.target.value) } /></p>
                <p className='infor'>Amount <input name="Amount" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Price <input name="Price" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Available <input name="Available" onChange={handleRelationshipPropertyChange} /></p>
              </>
            )}
            
            {relationshipType === 'Order' && (
              <>
                <p className='infor'>From <input name="From" onChange={e => setRelationshipFrom(e.target.value) } /></p>
                <p className='infor'>To <input name="To" onChange={ e => setRelationshipTo(e.target.value) } /></p>
                <p className='infor'>ID <input name="ID" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>ISBN <input name="ISBN" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Amount <input name="Amount" onChange={handleRelationshipPropertyChange} /></p>
              </>
            )}
            
            {relationshipType === 'Shipment' && (
              <>
                <p className='infor'>From <input name="From" onChange={e => setRelationshipFrom(e.target.value) } /></p>
                <p className='infor'>To <input name="To" onChange={ e => setRelationshipTo(e.target.value) } /></p>
                <p className='infor'>ID <input name="ID" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Arrival Date <input name="Arrival_Date" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Order ID <input name="Order_ID" onChange={handleRelationshipPropertyChange} /></p>
              </>
            )}
            
            {relationshipType === 'Owned_by' && (
              <>
                <p className='infor'>From <input name="From" onChange={e => setRelationshipFrom(e.target.value) } /></p>
                <p className='infor'>To <input name="To" onChange={ e => setRelationshipTo(e.target.value) } /></p>
                <p className='infor'>Percentage Owned <input name="Percentage_Owned" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Invested Amount <input name="Invested_Amount" onChange={handleRelationshipPropertyChange} /></p>
                <p className='infor'>Exclusive <input name="Exclusive" onChange={handleRelationshipPropertyChange} /></p>
              </>
            )}

          </div>      
        )}

    </div>

    
  );
}

export default Retailer;