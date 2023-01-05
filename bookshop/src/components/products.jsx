export const Products = () => {
    const products = ['Ford', 'BMW', 'Audi'];
    return(
        <div className="container">
            <ul>
                {Products.map((products) => <Products name={products} />)}
            </ul>
            Produkt: "Test Product" , Anzahl: Test Anzahl
                <button class="btn btn-outline-success ml-3">+</button>
				<button class="btn btn-outline-danger" >-</button>
				<button class="btn btn-outline-primary" >Reset to 0</button>
        </div>
        

    )
}