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

    return (
        <div className="container">
            Products:
            <table className={"table table-striped"}>
                <thead>
                <tr>
                    <th scope="col">Produkttitel</th>
                    <th scope="col">Preis</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.ProduktID}>
                        <td>
                            <button type="button" className="btn btn-text" onClick={(e) => {
                                navigate('/productDetails/' + product.ProduktID);
                            }
                            }>
                                {product.Produkttitel}
                            </button>
                        </td>
                        <td> {product.PreisBrutto} €</td>
                        <td>
                            <button type="button" className="btn btn-primary">Add to cart</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>


    )
}