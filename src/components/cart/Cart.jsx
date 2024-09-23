import { useContext } from 'react';
import { CartContext } from '../../context/CartProvider'; // Asegúrate de que la ruta sea correcta

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart">
      <h2>Carrito</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              {item.name} - ${item.price}
              <button onClick={() => removeFromCart(item._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
