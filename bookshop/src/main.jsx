import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {NavBar} from "./components/navbar.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./sites/home.jsx";
import {ProductDetails} from "./components/productDetails.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter basename={'/ewa/g14'}>
          <NavBar></NavBar>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/productDetails/:productId" element={<ProductDetails/>}/>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
)

/*
Zustand:
    Warenkorb anzahl
 */
