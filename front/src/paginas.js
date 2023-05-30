import "./App.css"
import Retailer from "./retailer";
import Buyer from './buyer'
import {useState, useEffect} from 'react';

// El home va a ser el DDL porque es la primera pagina, la principal la importante
export const Home = () => {
  
  return (
    <div >
        <Retailer/>
    </div>
  );
};

export const Page2 = () => {
  
  return (
    <div >
        <Buyer/>
    </div>
  );
};