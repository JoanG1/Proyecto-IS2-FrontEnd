import React, { useState } from 'react';
import './ConfirmacionCita.css'; // Importa el archivo de estilo
import Notification from './Notification'; // Para mostrar notificaciones
import {CancelarCita,ConfirmarCita } from '../api/CitasApi'; // Asegúrate de importar EditarCita

const ConfirmacionCita = ({ cita, onEdit, onConfirm ,citaId}) => {
    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const handleConfirm = async() => {
        try {
            await ConfirmarCita(citaId);
        setNotificationMessage('cita confirmada correctamente.');
        setSeverity('success');
        setOpenNotification(true);
            
        } catch (error) {

            setNotificationMessage('Error. Inténtalo de nuevo.');
            setSeverity('error');
            setOpenNotification(true);

        }
    };

    const handleDelete = async() => {
        try {
            await CancelarCita(citaId);
        setNotificationMessage('cita eliminada correctamente.');
        setSeverity('success');
        setOpenNotification(true);
            
        } catch (error) {

            setNotificationMessage('Error. Inténtalo de nuevo.');
            setSeverity('error');
            setOpenNotification(true);

        }
    };

    const handleCloseNotification = () => {
        setOpenNotification(false);
    };

    // Asegúrate de que la fecha esté definida antes de manipularla
    const formattedDate = cita.fecha ? 
        cita.fecha.replace('T', ' - ') : 
        'Fecha no disponible';

    // Asegúrate de que los arrays existan y sean arrays
    const servicios = cita.detalleServicioCitaDTOS || [];
    const productos = cita.detalleProductoCitaDTOS || [];

    return (
        <div className="confirmacion-cita">
            <h2>Confirmación de Cita</h2>
            <div className="cita-detalle">
                <p><strong>Fecha y Hora:</strong> {formattedDate}</p>
                <p><strong>Estilista:</strong> {cita.estilistaId}</p>
                <p><strong>Servicios:</strong> {servicios.length > 0 ? servicios.map(s => s.nombre).join(', ') : 'Sin servicios'}</p>
                <p><strong>Productos:</strong> {productos.length > 0 ? productos.map(p => p.nombre).join(', ') : 'Sin productos'}</p>
                <p><strong>Notas:</strong> {cita.notas || 'Sin notas'}</p>
            </div>
            <div className="button-group">
                <button className="edit-button" onClick={onEdit}>Editar</button>
                <button className="delete-button" onClick={handleDelete}>Eliminar</button>
                <button className="confirm-button" onClick={handleConfirm}>Confirmar</button>
            </div>

            {/* Componente de notificación */}
            <Notification
                open={openNotification}
                handleClose={handleCloseNotification}
                message={notificationMessage}
                severity={severity}
            />
        </div>
    );
};

export default ConfirmacionCita;