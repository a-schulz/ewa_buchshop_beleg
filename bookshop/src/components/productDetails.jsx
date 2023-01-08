import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export const ProductDetails = () => {
    const productId = useParams().productId;
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch('https://ivm108.informatik.htw-dresden.de/ewa/g14/php/index.php?id=' + productId)
            .then(response => response.json())
            .then((usefulData) => {
                setProduct(usefulData[0]);
            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
            });
    }, []);

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
                        {product.Autorname ? <span>{product.Autorname}</span> : <p>Kein Autor</p>}
                        {product.Verlagname ? <span>{product.Verlagname}</span> : <p>Kein Verlag</p>}
                        <p>{product.Kurzinhalt}</p>
                        <p>Nur noch {product.Lagerbestand} vorhaden!</p>
                        <p>{product.PreisBrutto} €</p>
                        <button type="button" className="btn btn-primary">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}