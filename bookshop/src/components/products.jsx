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
            <ul>
                {products.map(product => (
                    <li key={product.ProduktID}>{product.Produkttitel}</li>
                ))}
            </ul>
        </div>

    )
}