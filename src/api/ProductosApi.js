// src/api/ProductosApi.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/productos'; // Base URL de la API

// Traer los estilistas existentes en la basde de datos
export const obtenerProductos = async () => {
    try {
      const response = await axios.get(`${API_URL}/obtener-productos`);
  
      return response.data; // Devolver los estilistas existentes
    } catch (error) {
        // Lanzamos cualquier otro error
        throw new Error('Error al obtener los productos');
    }
  };