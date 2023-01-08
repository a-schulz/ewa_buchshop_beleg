import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const Products = () => {
    const navigate = useNavigate();

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
                        <button type="button" className="btn btn-text" onClick={(e) => {
                            navigate('/productDetails/' + product.ProduktID);
                        }
                        }>
                            {product.Produkttitel}
                        </button>
                        </li>
                ))}
            </ul>

        </div>
        

    )
}