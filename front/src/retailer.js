import './App.css';
import { Link} from "react-router-dom";

function Retailer() {
  return (
    <div className="app">
      <header>
        
        <p className='titulo-principal'>
          Contenedor de libros punto com
        </p>
      </header>
    <div className = 'buscador'>
      <p>Nombre del libro</p>
      <input>
      </input>
    </div>
    <button className='cambios'>
        <Link to='/buyer'>
        
        Buyer page
        </Link>
    </button>
<div className='contiene'>
  <p className='infor'>El libro esta en WAREHOUSE</p>

    <p className='infor'>El supplier es SUPPLIER</p>

    <p className='infor'>Se puede encontrar en RETAILERS</p>

    <p className='infor'>Ha sido comprado por CUSTOMERS</p>

</div>
    
    </div>
  );
}

export default Retailer;
