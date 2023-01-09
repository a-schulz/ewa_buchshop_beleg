import {useCartStore} from "../store/cartStore.js";
import {useEffectOnce} from "../helper/useEffectOnce.js";
import {useState} from "react";

export default function Checkout() {

    const books = useCartStore(state => state.books);
    const [products, setProducts] = useState([]);

    useEffectOnce(() => {
        fetch('https://ivm108.informatik.htw-dresden.de/ewa/g14/php/index.php')
            .then(response => response.json())
            .then((usefulData) => {
                setProducts(usefulData);
            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
            });
    })

    const checkout = () => {
        const data = [];
        Object.entries(books).map((book) => {
            const product = products.find((e) => e.ProduktID === book[0]);
            const entry = {};
           entry.price_data = {
               currency: 'eur',
               unit_amount: Number.parseInt(product.PreisBrutto)*100,
               product_data: {
                   name: product.Produkttitel,
                   description: product.Kurzinhalt,
                   images: [product.LinkGrafikdatei],
               }
           }
           entry.quantity= book[1];
           data.push(entry);
        });

        const form = document.createElement('form');
        form.method = 'post';
        form.action = 'https://ivm108.informatik.htw-dresden.de/ewa/g14/php/create-checkout-session.php';

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = JSON.stringify(data[key]);
                form.appendChild(input);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }
    return (<div className={"container"}>
        <button className={"btn btn-primary"} onClick={() => {
            checkout()
        }}>Jetzt bezahlen
        </button>
    </div>);
};