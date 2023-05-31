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
      <p>Navegando</p>
    </div>
    <button className='cambios'>
        <Link to='/buyer'>
        Create page
        </Link>
    </button>
<div className='contiene'>
  <p className='infor'>Aqui se esta navegando</p>

</div>
    
    </div>
  );
}

export default Retailer;
