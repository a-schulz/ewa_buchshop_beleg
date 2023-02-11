import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {NavBar} from "./components/navbar.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./sites/home.jsx";
import {Details} from "./sites/details.jsx";
import {Cart} from "./components/cart";
import {Error} from "./sites/error.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter basename={'/ewa/g14'}>
          <NavBar></NavBar>
          <Cart/>
          <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/productDetails/:productId" element={<Details/>}/>
              <Route path='*' element={<Error/>} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
)

/*
Warenkorb soll aus der geasmt übersicht und aus der detailseite aktualisiert werden können

Zustand:
    Warenkorb anzahl
 */
