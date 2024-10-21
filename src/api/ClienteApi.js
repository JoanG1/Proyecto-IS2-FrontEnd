// src/api/clienteApi.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clientes'; // Base URL de la API

// Crear un cliente enviando un objeto en el cuerpo de la petición
export const crearCliente = async (cliente) => {
  try {
    const response = await axios.post(`${API_URL}/crear`, cliente, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data; // Devolver el cliente creado o el resultado de la petición
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Lanzamos una excepción con un mensaje personalizado para 404
      throw new Error('El endpoint no fue encontrado (404 Not Found)');
  } else {
      // Lanzamos cualquier otro error
      throw new Error('Error al registrar el cliente, el correo ya esta registrado');
  }
  }
};


// Buscar un cliente existente para iniciar sesion
export const inicioSesion = async (cliente) => {
  try {
    const response = await axios.post(`${API_URL}/InicioSesion`, cliente, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data; // Devolver el resultado de la busqueda del usuario

  } catch (error) {
   
    // Lanzamos cualquier otro error
    throw new Error('error al iniciar sesion');
  
  }
};