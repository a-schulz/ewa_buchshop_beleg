import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useCartStore} from "../store/cartStore.js";

export const ProductDetails = () => {
    const productId = useParams().productId;
    const [product, setProduct] = useState([]);
    const [qty, setQty] = useState(1);
    const updateBooks = useCartStore(state => state.updateBooks);

    useEffect(() => {
        fetch('https://ivm108.informatik.htw-dresden.de/ewa/g14/php/index.php?id=' + productId)
            .then(response => response.json())
            .then((usefulData) => {
                setProduct(usefulData[0]);
            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
            });
    }, [productId]);

    return (<div className="container">
        <div className="row">
            <div className="col-6">
                <div className="card">
                    <div className="card-body">
                        <img src={product.LinkGrafikdatei} className="img-fluid" alt="Responsive image"/>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className="card">
                    <div className="card-body">
                        <h1>{product.Produkttitel}</h1>
                        {product.Autorname ? <p>{product.Autorname}</p> : <p>Kein Autor</p>}
                        {product.Verlagsname ? <p>{product.Verlagsname}</p> : <p>Kein Verlag</p>}
                        <p>{product.Kurzinhalt}</p>
                        <p>Nur noch {product.Lagerbestand} vorhaden!</p>
                        <p>{product.PreisBrutto} €</p>
                        <input className={"form-control"}
                            type={"number"}
                            value={qty}
                        onChange={(e) => setQty(Number.parseInt(e.target.value))}
                        />
                        <button type="button" className="btn btn-primary"
                                onClick={() => {updateBooks({ProduktID: product.ProduktID, amount: qty})}}
                        >In den Einkaufswagen hinzufügen</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}