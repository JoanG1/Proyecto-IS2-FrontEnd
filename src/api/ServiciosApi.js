// src/api/ServiciosApi.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/servicios'; // Base URL de la API

// Traer los estilistas existentes en la basde de datos
export const obtenerServicios = async () => {
    try {
      const response = await axios.get(`${API_URL}/obtener-servicios`);
  
      return response.data; // Devolver los estilistas existentes
    } catch (error) {
        // Lanzamos cualquier otro error
        throw new Error('Error al obtener los servicios');
    }
  };