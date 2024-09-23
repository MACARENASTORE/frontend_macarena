import { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item._id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Agrega la validación de las propiedades
CartProvider.propTypes = {
  children: PropTypes.node.isRequired, // Asegúrate de que children sea requerido
};

export default CartProvider;
