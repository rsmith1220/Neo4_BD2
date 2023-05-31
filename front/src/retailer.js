import './App.css';
import { Link } from "react-router-dom";

function Retailer() {
  return (
    <div className="app">
      <header>
        <p className='titulo-principal'>
          Contenedor de libros punto com
        </p>
      </header>

      <div className='sub-bar'>
        <Link to='/navegar'>
          <button className='sub-bar-button'>
            Navigation Page
          </button>
        </Link>
      </div>

      <div className='content_creation'>
        <div className='buscador'>
          <p>Creando</p>
        </div>

        <div className='contiene'>
          <table className='create_node'>
            <tbody>
              <tr>
                <td>Node label</td>
                <td><input></input></td>
              </tr>
            </tbody>
          </table>
          <br></br>
          <table className='create_relation'>
            <tbody>
              <tr>
                <td>Relation label</td>
                <td><input></input></td>
              </tr>
            </tbody>
          </table>


          {/* AQUI AL HACER CLICK SE CREA UN NODO */}
          <button className='cambios'>Crear</button>
        </div>
      </div>
    </div>
  );
}

export default Retailer;
