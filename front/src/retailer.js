import './App.css';
import { Link} from "react-router-dom";


// PAGINA DE CREACION
// AQUI SE CREA PARA CREAR CREACIONES

function Retailer() {
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
        <Link to='/buyer'>
        Navigation page
        </Link>
    </button>
<div className='contiene'>
  <p className='infor'>Aqui se esta Creando</p>

</div>
    
    </div>
  );
}

export default Retailer;
