import React, { useEffect, useState } from 'react';
import './Perfil.css';
import { useNavigate } from 'react-router-dom'; // Para la navegación

const Perfil = () => {
    const [cliente, setCliente] = useState(null);
    const navigate = useNavigate(); // Hook de navegación

    useEffect(() => {
        const clienteGuardado = sessionStorage.getItem('cliente');
        if (clienteGuardado) {
            setCliente(JSON.parse(clienteGuardado));
        }
    }, []);

    const handleClose = () => {
        navigate('/'); // Redirigir al usuario a la página principal o cualquier otra ruta
    };

    return (
        <div className="perfil-container">
            <button className="close-button" onClick={handleClose}>
                &times; {/* Icono de cerrar */}
            </button>
            <h2>Mi Perfil</h2>
            {cliente ? (
                <div className="perfil-info">
                    <p><strong>Nombre:</strong> {cliente.nombre}</p>
                    <p><strong>Email:</strong> {cliente.correo}</p>
                    <p><strong>Historial de Citas:</strong></p>
                    <ul>
                        <li>Cita 1: Corte de cabello - 12/10/2024</li>
                        <li>Cita 2: Manicura - 25/09/2024</li>
                    </ul>
                </div>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    );
};

export default Perfil;