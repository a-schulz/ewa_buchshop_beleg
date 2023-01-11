import {useCartStore} from "../store/cartStore.js";
import {useEffectOnce} from "../helper/useEffectOnce.js";
import {useEffect, useState} from "react";
import Checkout from "./checkout.jsx";


export const Cart = () => {

    const [products, setProducts] = useState([]);
    const books = useCartStore(state => state.books);
    const updateBooks = useCartStore(state => state.updateBooks);

    useEffectOnce(() => {
        fetch('https://ivm108.informatik.htw-dresden.de/ewa/g14/php/index.php')
            .then(response => response.json())
            .then((usefulData) => {
                setProducts(usefulData);
            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
            });
    },[])

    return (<div className="container">
            <div className="offcanvas offcanvas-end offcanvas-size-xl" data-bs-scroll="true"
                 data-bs-backdrop="false" //tabIndex="-1"
                 id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel"
                 style={{"--bs-offcanvas-width": "600px"}}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Warenkorb</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                {Object.keys(books).length === 0 ? <div className={"container"}>Ihr Warenkorb ist leer.</div> :
                    <div className={"container"}>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Buchtitel</th>
                                <th scope="col">Menge</th>
                                <th scope="col">Preis</th>
                                <th scope="col">Gesamt</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(books).map((entry, index) => {
                                const product = products.find((e) => e.ProduktID === entry[0]);
                                return (<tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.Produkttitel}</td>
                                    <td>{entry[1]}</td>
                                    <td>{product.PreisBrutto}</td>
                                    <td>{entry[1] * product.PreisBrutto}</td>
                                    <td>
                                        <button className={"btn btn-primary"} style={{marginLeft: "10px"}}
                                        onClick={() => {updateBooks({ProduktID: entry[0], amount: 1})}}
                                        >+</button>
                                        <button className={"btn btn-danger"} style={{marginLeft: "10px"}}
                                                onClick={() => {updateBooks({ProduktID: entry[0], amount: -1})}}
                                        >-</button>
                                    </td>
                                </tr>)
                            })}
                            </tbody>
                        </table>
                        <h5>Gesamt: {Object.entries(books).map((entry) => {
                            const product = products.find((e) => e.ProduktID === entry[0]);
                            return entry[1] * product.PreisBrutto;
                        }).reduce((a, b) => a + b, 0)}€</h5>
                        <Checkout/>
                    </div>}
            </div>
        </div>

    )
}