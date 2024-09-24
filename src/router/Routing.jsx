import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../components/layouts/public/PublicLayout';
import { PrivateLayout } from '../components/layouts/private/PrivateLayout';
import { Login } from '../components/user/Login';
import { Register } from '../components/user/Register';
import Products from '../components/products/Products'; // Asegúrate de que sea la exportación correcta
import Cart from '../components/cart/Cart'; // Importa el componente del carrito
import { Error404 } from '../components/layouts/Error404';
import { AuthProvider } from '../context/AuthProvider';
import { Logout } from '../components/user/Logout';
import { People } from '../components/user/People';
import { Config } from '../components/user/Config';
import { Profile } from '../components/user/Profile';
import { CartProvider } from '../context/CartProvider';

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="registro" element={<Register />} />
              <Route path="products" element={<Products />} />
              <Route path="cart" element={<Cart />} /> {/* Cambia a tu componente de carrito */}
            </Route>

            {/* Rutas privadas */}
            <Route path="/rsocial" element={<PrivateLayout />}>
              <Route path="gente" element={<People />} />
              <Route path="ajustes" element={<Config />} />
              <Route path="logout" element={<Logout />} />
              <Route path="perfil/:userId" element={<Profile />} />
            </Route>

            {/* Ruta para el error 404 */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
