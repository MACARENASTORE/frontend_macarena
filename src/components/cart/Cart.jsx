import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartProvider';
import axios from 'axios';
import { Global } from '../../helpers/Global';

const Cart = () => {
  const { removeFromCart } = useContext(CartContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const userId = 'YOUR_USER_ID'; // Cambia esto para obtener el ID del usuario actual
        const response = await axios.get(`${Global.url}/cart/${userId}`);
        setCartData(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  const handleRemove = async (productId) => {
    const cartId = cartData._id; // Asegúrate de obtener el cartId
    await removeFromCart(cartId, productId);
    // Actualiza el estado después de eliminar
    setCartData(prevCart => ({
      ...prevCart,
      items: prevCart.items.filter(item => item.productId !== productId),
    }));
  };

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      {cartData.items && cartData.items.length > 0 ? (
        cartData.items.map(item => (
          <div key={item.productId} className="cart-item">
            <h3>{item.productId.name}</h3>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio: ${item.productId.price * item.quantity}</p>
            <button onClick={() => handleRemove(item.productId)}>Eliminar</button>
          </div>
        ))
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default Cart;
