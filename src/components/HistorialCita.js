import React, { useEffect, useState } from 'react';
import './HistorialCita.css';
import { HistorialCliente } from '../api/CitasApi'; // Importa la función de la API

const HistorialCita = ({ clienteId }) => {
    const [citas, setCitas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const response = await HistorialCliente(clienteId); // Llamada a la API
                console.log("Hola")
                console.log(response)
                setCitas(response); // Guardamos las citas obtenidas
            } catch (err) {
                setError('Error al cargar el historial de citas.');
                console.error(err);
            }
        };

        if (clienteId) {
            fetchHistorial(); // Solo buscamos si existe clienteId
        }
    }, [clienteId]);

    return (
        <div className="historial-container">
            <h3>Historial de Citas</h3>
            {error && <p className="error">{error}</p>} {/* Mostrar error si hay */}

            {citas.length > 0 ? (
                <table className="historial-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Servicios</th>
                            <th>Productos</th>
                            <th>Estilista</th>
                            <th>Comentarios</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita) => (
                            <tr key={cita.id}>
                                <td>{new Date(cita.fecha).toLocaleDateString()}</td>
                                <td>
                                    {cita.informacionDetallesServiciosCitaClienteDTOList.map((servicio) => (
                                        <div key={servicio.id}>{servicio.nombre} - ${servicio.precio}</div>
                                    ))}
                                </td>
                                <td>
                                    {cita.informacionDetallesProductosCitaClienteDTOList.map((producto) => (
                                        <div key={producto.id}>{producto.nombre} - ${producto.precio}</div>
                                    ))}
                                </td>
                                <td>{cita.nombreEstilista}</td>
                                <td>{cita.comentario || 'Sin comentarios'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay citas disponibles.</p> 
            )}
        </div>
    );
};

export default HistorialCita;