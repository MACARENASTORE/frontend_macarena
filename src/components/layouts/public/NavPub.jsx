import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from '../../../context/CartProvider';
import SearchBar from './SearchBar'; // Asegúrate de que la ruta sea correcta

export const NavPub = () => {
  const { cartItems } = useContext(CartContext);

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
              <span className="cart-count">{cartItems.length}</span>
            )}
          </NavLink>
        </li>

        {/* Asegúrate de que el SearchBar esté aquí */}
        <li className="menu-list__item search-bar-item">
          <SearchBar />
        </li>
      </ul>
    </nav>
  );
};
