import {useState} from "react";

export const Products = () => {

    var [products, setProducts] = useState([]);


    fetch('https://ivm108.informatik.htw-dresden.de/ewa/g14/php/index.php')
      .then(response => response.json())
      .then((usefulData) => {
        setProducts(usefulData);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`)
      });

    return(
        <div className="container">
            Products:
            <ul className="list-group list-group-flush">
                {products.map(product => (
                    <li className="list-group-item" key={product.ProduktID}>
                        <button type="button" className="btn btn-text" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            {product.Produkttitel}
                        </button>
                        </li>
                ))}
            </ul>

        </div>
        

    )
}