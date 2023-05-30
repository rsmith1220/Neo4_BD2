import './buyer.css';
import { Link} from "react-router-dom";

function Buyer() {
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
        <Link to='/#'>
        
        Retailer page
        </Link>
    </button>
    
<div className='has'>
  <p className='infor'>El libro esta en WAREHOUSE</p>

    <p className='infor'>Se puede encontrar en RETAILERS</p>

</div>
    
    </div>
  );
}

export default Buyer;
