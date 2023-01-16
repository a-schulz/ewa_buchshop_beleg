import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useEffectOnce} from "../helper/useEffectOnce.js";

export const Search = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const [products, setProducts] = useState([]);

    useEffectOnce(()=>{
        fetch('https://ivm108.informatik.htw-dresden.de/ewa/g14/php/index.php')
            .then(response => response.json())
            .then((usefulData) => {
                setProducts(usefulData);
            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
            });
    })


    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(searchTerm);
        let product;
        if (product = products.find(product => product.Produkttitel === searchTerm)) {
            navigate('/productDetails/' + product.ProduktID);
        } else {
            navigate('/', {state: {searchTerm: searchTerm}});
        }

    }

    return (<div className="container">
        <form className="d-flex" role="search" onSubmit={onSubmit}>
            <input className="form-control me-2"
                   type="search"
                   placeholder="Search"
                   aria-label="Search"
                   list="products"
                   onChange={(e) => {
                       setSearchTerm(e.target.value)
                   }}/>
            <datalist id="products">
                {products.map(product => (<option value={product.Produkttitel} key={product.ProduktID}/>))}
            </datalist>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    </div>)
}