import React, { useEffect, useState } from 'react';
import './Perfil.css';
//import { useNavigate } from 'react-router-dom';
import HistorialCita from './HistorialCita'; // Importa el componente HistorialCita

const Perfil = () => {
    const [cliente, setCliente] = useState(null);
    const [mostrarHistorial, setMostrarHistorial] = useState(false); // Estado para mostrar el historial
    //const navigate = useNavigate();

    useEffect(() => {
        const clienteGuardado = sessionStorage.getItem('cliente');
        if (clienteGuardado) {
            setCliente(JSON.parse(clienteGuardado));
        }
    }, []);

    /*const handleClose = () => {
        navigate('/');
    };*/

    const handleMostrarHistorial = () => {
        setMostrarHistorial(true); // Cambia el estado para mostrar el historial
    };

    return (
        <div className="perfil-container">
            <h2>Mi Perfil</h2>
            {cliente ? (
                <div className="perfil-info">
                    <p><strong>Nombre:</strong> {cliente.nombre}</p>
                    <p><strong>Email:</strong> {cliente.correo}</p>
                    {!mostrarHistorial ? (
                        <button className="ver-historial-button" onClick={handleMostrarHistorial}>
                            Ver Historial de Citas
                        </button>
                    ) : (
                        <HistorialCita clienteId={cliente.id} />
                    )}
                </div>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    );
};

export default Perfil;