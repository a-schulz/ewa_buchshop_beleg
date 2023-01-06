import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Products} from "./components/products";
import {NavBar} from "./components/navbar";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <NavBar/>
      <Products/>
  </React.StrictMode>
)
