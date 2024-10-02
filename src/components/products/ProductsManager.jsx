import { useEffect, useState } from 'react';
import axios from 'axios';
import { Global } from '../../helpers/Global';


const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${Global.url}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  // Create or update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    formData.append('stock', newProduct.stock);
    if (newProduct.image) {
      formData.append('image', newProduct.image); // Solo agregar imagen si ha sido seleccionada
    }

    if (editingProduct) {
      // Update product
      try {
        const response = await axios.put(`${Global.url}/products/${editingProduct._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setProducts(
          products.map((product) => (product._id === editingProduct._id ? response.data : product))
        );
        setEditingProduct(null);
      } catch (error) {
        console.error('Error al actualizar producto:', error);
      }
    } else {
      // Create product
      try {
        const response = await axios.post(`${Global.url}/products`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setProducts([...products, response.data]);
      } catch (error) {
        console.error('Error al crear producto:', error);
      }
    }

    // Limpiar formulario
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image: null,
    });
  };

  // Delete product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${Global.url}/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: null, // No cargamos la imagen existente
    });
    setEditingProduct(product);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Categoría"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">{editingProduct ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                {product.image && <img src={product.image} alt={product.name} width="50" />}
              </td>
              <td>
                <button onClick={() => handleEdit(product)}>Editar</button>
                <button onClick={() => handleDelete(product._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsManager;
