export const Products = () => {

    var products = [];


    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then((usefulData) => {
        products = usefulData;        
      })
      .catch((e) => {
        console.error('An error occurred: ${e}')
      });
    return(
        <div className="container">
            Products:
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </div>

    )
}