import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCartStore} from "../store/cartStore.js";
import {useEffectOnce} from "../helper/useEffectOnce.js";

export const Products = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const updateBooks = useCartStore(state => state.updateBooks);

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


    return (
        <div className="container">
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
                    <tr key={product.ProduktID} productid={product.ProduktID}>
                        <td>
                            <button type="button" className="btn btn-text" onClick={() => {
                                navigate('/productDetails/' + product.ProduktID);
                            }
                            }>
                                {product.Produkttitel}
                            </button>
                        </td>
                        <td> {product.PreisBrutto} €</td>
                        <td>
                            <button type="button"
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        updateBooks({ProduktID: e.target.parentNode.parentNode.getAttribute("productid"), amount: 1})
                                    }}>
                                Add to cart
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>


    )
}