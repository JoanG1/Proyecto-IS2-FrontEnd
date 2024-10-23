// src/api/CitasApi.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cita'; // Base URL de la API

// Buscar un cliente existente para iniciar sesion
export const CrearCita = async (cita) => {
    try {
      const response = await axios.post(`${API_URL}/crear-cita`, cita, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      return response.data; // Devolver el resultado de la busqueda del usuario
  
    } catch (error) {
        if (error.response && error.response.status === 404) {
          // Lanzamos una excepción con un mensaje personalizado para 404
          throw new Error('El endpoint no fue encontrado (404 Not Found)');
      } else {
          // Lanzamos cualquier otro error
          throw new Error('Error al registrar la cita');
      }
      }
  };