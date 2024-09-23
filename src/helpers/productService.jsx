// src/helpers/productService.jsx
import axios from 'axios';
import { Global } from './Global';

const API_URL = `${Global.url}products`; // Usando la URL global

// Obtener todos los productos
const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

// Obtener un producto por ID
const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el producto con id ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo producto
const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error('Error al crear un producto:', error);
    throw error;
  }
};

// Actualizar un producto existente
const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el producto con id ${id}:`, error);
    throw error;
  }
};

// Eliminar un producto
const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el producto con id ${id}:`, error);
    throw error;
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
