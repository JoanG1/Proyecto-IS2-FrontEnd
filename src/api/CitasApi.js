// src/api/CitasApi.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cita'; // Base URL de la API

// Creacion de cita
export const CrearCita = async (cita) => {
    try {
      const response = await axios.post(`${API_URL}/crear-cita`, cita, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      return response.data; // devuelve el id de la cita recien creada
  
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

  // Buscar Cita existente para modificarla
export const EditarCita = async (citaId, cita) => {
  try {
    const response = await axios.put(`${API_URL}/${citaId}/modificar-cita-pendiente`, cita, {
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

  // Buscar Cita existente para modificarla
  export const CancelarCita = async (citaId) => {
    try {
      const response = await axios.put(`${API_URL}/${citaId}/cancelar-cita`);
  
      console.log(response.data)

      return response.data; // Devolver el resultado de la busqueda del usuario
  
    } catch (error) {
        if (error.response && error.response.status === 404) {
          // Lanzamos una excepción con un mensaje personalizado para 404
          throw new Error("Error al eliminar la cita");
      } else {
          // Lanzamos cualquier otro error
          throw new Error('Error al registrar la cita');
      }
      }
  };

    // Buscar Cita existente para modificarla
    export const ConfirmarCita = async (citaId) => {
      try {
        const response = await axios.post(`${API_URL}/confirmar-cita/${citaId}`);
    
        return response.data; // Devolver el resultado de la busqueda del usuario
    
      } catch (error) {
          if (error.response && error.response.status === 404) {
            // Lanzamos una excepción con un mensaje personalizado para 404
            throw new Error(error.response);
        } else {
            // Lanzamos cualquier otro error
            throw new Error('Error al registrar la cita');
        }
        }
    };
  
  
  