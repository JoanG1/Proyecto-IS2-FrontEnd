// src/api/EstilistasApi.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/estilistas'; // Base URL de la API

// Traer los estilistas existentes en la basde de datos
export const obtenerEstilistas = async () => {
    try {
      const response = await axios.get(`${API_URL}/obtener-estilistas`);
  
      return response.data; // Devolver los estilistas existentes
    } catch (error) {
        // Lanzamos cualquier otro error
        throw new Error('Error al obtener los estilistas');
    }
  };