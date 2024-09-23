import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../../context/CartProvider';
import { Global } from '../../helpers/Global';
import '../../assets/css/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext); // Asegúrate de usar useContext

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${Global.url}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          {product.image && product.image.length > 0 ? (
            <img src={product.image[0]} alt={product.name} />
          ) : (
            <img src="/path/to/placeholder-image.jpg" alt="Placeholder" /> // Cambia la ruta a una imagen de marcador de posición
          )}
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)} className="add-button">
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
