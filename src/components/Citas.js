import React, { useState } from 'react';
import './Citas.css'; // Para estilos personalizados
import Notification from './Notification'; // Importar el componente de notificación

const Citas = () => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        numeroTelefono: '',
        correoElectronico: '',
        fechaCita: '',
        horaCita: '',
        estilista: '',
        servicio: '', // Nuevo campo para servicio
        producto: '', // Nuevo campo para producto
        notas: '',
    });

    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    // Listas de prueba para servicios y productos
    const estilistas = ['Estilista 1', 'Estilista 2', 'Estilista 3']; // Datos de prueba
    const servicios = ['Corte de cabello', 'Tinte', 'Manicura']; // Nuevos datos de prueba
    const productos = ['Shampoo', 'Acondicionador', 'Gel']; // Nuevos datos de prueba

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Aquí podrías manejar el envío del formulario, como enviar a un backend
        console.log(formData);
        
        // Simulando el envío y el resultado
        try {
            // Simular una solicitud exitosa
            setNotificationMessage('Cita guardada y agendada correctamente.');
            setSeverity('success');
            setOpenNotification(true);

            // Limpiar el formulario
            setFormData({
                nombreCompleto: '',
                numeroTelefono: '',
                correoElectronico: '',
                fechaCita: '',
                horaCita: '',
                estilista: '',
                servicio: '', // Limpiar servicio
                producto: '', // Limpiar producto
                notas: '',
            });
        } catch (error) {
            setNotificationMessage('Error al guardar la cita. Inténtalo de nuevo.');
            setSeverity('error');
            setOpenNotification(true);
        }

        
    };

    const handleCloseNotification = () => {
        setOpenNotification(false);
    };

    return (
        <div className="citas">
            <h2>Reserva tu Cita</h2>
            <form onSubmit={handleSubmit}>
                {/* Campo Nombre */}
                <div className="form-group">
                    <label htmlFor="nombreCompleto">Nombre Completo *</label>
                    <input
                        type="text"
                        id="nombreCompleto"
                        name="nombreCompleto"
                        required
                        value={formData.nombreCompleto}
                        onChange={handleChange}
                    />
                </div>

                {/* Campo Teléfono */}
                <div className="form-group">
                    <label htmlFor="numeroTelefono">Número de Teléfono *</label>
                    <input
                        type="tel"
                        id="numeroTelefono"
                        name="numeroTelefono"
                        required
                        value={formData.numeroTelefono}
                        onChange={handleChange}
                    />
                </div>

                {/* Campo Correo */}
                <div className="form-group">
                    <label htmlFor="correoElectronico">Correo Electrónico (opcional)</label>
                    <input
                        type="email"
                        id="correoElectronico"
                        name="correoElectronico"
                        value={formData.correoElectronico}
                        onChange={handleChange}
                    />
                </div>

                {/* Campo Fecha */}
                <div className="form-group">
                    <label htmlFor="fechaCita">Fecha Cita *</label>
                    <input
                        type="date"
                        id="fechaCita"
                        name="fechaCita"
                        required
                        value={formData.fechaCita}
                        onChange={handleChange}
                    />
                </div>

                {/* Campo Hora */}
                <div className="form-group">
                    <label htmlFor="horaCita">Hora Cita *</label>
                    <input
                        type="time"
                        id="horaCita"
                        name="horaCita"
                        required
                        value={formData.horaCita}
                        onChange={handleChange}
                    />
                </div>

                {/* Campo Estilista */}
                <div className="form-group">
                    <label htmlFor="estilista">Preferencias de Estilista *</label>
                    <select
                        id="estilista"
                        name="estilista"
                        required
                        value={formData.estilista}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona un estilista</option>
                        {estilistas.map((estilista, index) => (
                            <option key={index} value={estilista}>
                                {estilista}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Campo Servicio */}
                <div className="form-group">
                    <label htmlFor="servicio">Servicio *</label>
                    <select
                        id="servicio"
                        name="servicio"
                        required
                        value={formData.servicio}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona un servicio</option>
                        {servicios.map((servicio, index) => (
                            <option key={index} value={servicio}>
                                {servicio}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Campo Producto */}
                <div className="form-group">
                    <label htmlFor="producto">Producto *</label>
                    <select
                        id="producto"
                        name="producto"
                        required
                        value={formData.producto}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona un producto</option>
                        {productos.map((producto, index) => (
                            <option key={index} value={producto}>
                                {producto}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Campo Notas */}
                <div className="form-group">
                    <label htmlFor="notas">Notas Adicionales (opcional)</label>
                    <textarea
                        id="notas"
                        name="notas"
                        value={formData.notas}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Reservar Cita</button>
            </form>

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

export default Citas;