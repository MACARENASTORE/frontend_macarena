import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from '../../../context/CartProvider'; // Asegúrate de que la ruta sea correcta

export const NavPub = () => {
  const { cartItems } = useContext(CartContext); // Accedemos al contexto del carrito

  return (
    <nav className="navbar__container-lists">
      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <NavLink to='/login' className="menu-list__link">
            <i className="fa-solid fa-user"></i>
            <span className="menu-list__title">Login</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to='/registro' className="menu-list__link">
            <i className="fa-solid fa-users"></i>
            <span className="menu-list__title">Registro</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to='/cart' className="menu-list__link">
            <i className="fa-solid fa-shopping-cart"></i>
            <span className="menu-list__title">Carrito</span>
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span> // Muestra la cantidad de artículos en el carrito
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
