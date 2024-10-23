import React, { useState, useEffect } from 'react';
import './Citas.css'; 
import Notification from './Notification'; 
import { obtenerEstilistas } from '../api/EstilistasApi'; 
import { obtenerServicios } from '../api/ServiciosApi'; 
import { obtenerProductos } from '../api/ProductosApi'; 
import { CrearCita } from '../api/CitasApi';

const Citas = () => {
    const [formData, setFormData] = useState({
        fecha: '', // Cambiado de fechaCita a fecha
        estilistaId: '', // Cambiado de estilista a estilistaId
        detalleServicioCitaDTOS: [], // Cambiado de servicios a detalleServicioCitaDTOS
        detalleProductoCitaDTOS: [], // Cambiado de productos a detalleProductoCitaDTOS
        notas: '',
        clienteId: '', // Campo para almacenar el ID del cliente
    });

    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [estilistas, setEstilistas] = useState([]); 
    const [servicios, setServicios] = useState([]); 
    const [productos, setProductos] = useState([]); 
    const [loadingEstilistas, setLoadingEstilistas] = useState(true); 
    const [loadingServicios, setLoadingServicios] = useState(true); 
    const [loadingProductos, setLoadingProductos] = useState(true); 
    const [errorEstilistas, setErrorEstilistas] = useState(null); 
    const [errorServicios, setErrorServicios] = useState(null); 
    const [errorProductos, setErrorProductos] = useState(null); 

    useEffect(() => {
        // Obtener cliente de sessionStorage
        const clienteGuardado = sessionStorage.getItem('cliente');
        if (clienteGuardado) {
            const cliente = JSON.parse(clienteGuardado);
            // Actualizar formData con el ID del cliente
            setFormData((prevFormData) => ({
                ...prevFormData,
                clienteId: cliente.id, // Asegúrate de que 'id' sea el campo correcto
            }));
        }

        // Cargar estilistas, servicios y productos
        const fetchEstilistas = async () => {
            try {
                const estilistasData = await obtenerEstilistas();
                setEstilistas(estilistasData);
                setLoadingEstilistas(false);
            } catch (error) {
                setErrorEstilistas('Error al cargar los estilistas. Intenta de nuevo más tarde.');
                setLoadingEstilistas(false);
            }
        };

        const fetchServicios = async () => {
            try {
                const serviciosData = await obtenerServicios();
                setServicios(serviciosData);
                setLoadingServicios(false);
            } catch (error) {
                setErrorServicios('Error al cargar los servicios. Intenta de nuevo más tarde.');
                setLoadingServicios(false);
            }
        };

        const fetchProductos = async () => {
            try {
                const productosData = await obtenerProductos();
                setProductos(productosData);
                setLoadingProductos(false);
            } catch (error) {
                setErrorProductos('Error al cargar los productos. Intenta de nuevo más tarde.');
                setLoadingProductos(false);
            }
        };

        fetchEstilistas();
        fetchServicios();
        fetchProductos();
    }, []);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'detalleServicioCitaDTOS') { // Cambio en el nombre de servicios
            const selectedService = servicios.find(servicio => servicio.nombre === value);
            const updatedList = checked
                ? [...formData.detalleServicioCitaDTOS, selectedService] // Cambio en el nombre
                : formData.detalleServicioCitaDTOS.filter(servicio => servicio.nombre !== value);

            setFormData({ ...formData, [name]: updatedList });

        } else if (name === 'detalleProductoCitaDTOS') { // Cambio en el nombre de productos
            const selectedProduct = productos.find(producto => producto.nombre === value);
            const updatedList = checked
                ? [...formData.detalleProductoCitaDTOS, selectedProduct] // Cambio en el nombre
                : formData.detalleProductoCitaDTOS.filter(producto => producto.nombre !== value);

            setFormData({ ...formData, [name]: updatedList });

        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.detalleServicioCitaDTOS.length === 0) {
            setNotificationMessage('Debes seleccionar al menos un servicio.');
            setSeverity('error');
            setOpenNotification(true);
            return;
        }
    
        try {

            // Llamada a la API para crear la cita
            const nuevaCita = {
                fecha: formData.fecha+":00", // Cambiado de fechaCita a fecha
                detalleServicioCitaDTOS: formData.detalleServicioCitaDTOS, // Cambio en el nombre
                detalleProductoCitaDTOS: formData.detalleProductoCitaDTOS, // Cambio en el nombre
                clienteId: formData.clienteId,
                estilistaId: Number(formData.estilistaId) // Cambio en el nombre
            };

            console.log(nuevaCita);
    
            const respuesta = await CrearCita(nuevaCita);
    
            // Mostrar notificación de éxito
            setNotificationMessage('Cita guardada y agendada correctamente.');
            setSeverity('success');
            setOpenNotification(true);
    
            // Limpiar el formulario
            setFormData({
                fecha: '', // Cambiado de fechaCita a fecha
                estilistaId: '', // Cambio en el nombre
                detalleServicioCitaDTOS: [], // Cambio en el nombre
                detalleProductoCitaDTOS: [], // Cambio en el nombre
                notas: '',
                clienteId: formData.clienteId, // Mantener el clienteId
            });
        } catch (error) {
            // Mostrar notificación de error
            setNotificationMessage(error.message || 'Error al guardar la cita. Inténtalo de nuevo.');
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
                {/* Campo Fecha y Hora */}
                <div className="form-group">
                    <label htmlFor="fecha">Fecha y Hora *</label> {/* Cambiado de fechaCita a fecha */}
                    <input
                        type="datetime-local"
                        id="fecha"
                        name="fecha" // Cambiado de fechaCita a fecha
                        required
                        value={formData.fecha} // Cambiado de fechaCita a fecha
                        onChange={handleChange}
                    />
                </div>

                {/* Campo Estilista */}
                <div className="form-group">
                    <label htmlFor="estilistaId">Preferencias de Estilista *</label> {/* Cambio en el nombre */}
                    {loadingEstilistas ? (
                        <p>Cargando estilistas...</p>
                    ) : errorEstilistas ? (
                        <p>{errorEstilistas}</p>
                    ) : (
                        <select
                            id="estilistaId" // Cambio en el nombre
                            name="estilistaId" // Cambio en el nombre
                            required
                            value={formData.estilistaId} // Cambio en el nombre
                            onChange={handleChange}
                        >
                            <option value="">Selecciona un estilista</option>
                            {estilistas.map((estilista, index) => (
                                <option key={index} value={estilista.id}>
                                    {estilista.nombre}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Servicios */}
                <h3>Servicios *</h3>
                <div className="service-container">
                    {loadingServicios ? (
                        <p>Cargando servicios...</p>
                    ) : errorServicios ? (
                        <p>{errorServicios}</p>
                    ) : (
                        <div className="checkbox-group">
                            {servicios.map((servicio, index) => (
                                <div className="checkbox-item" key={index}>
                                    <label className="checkbox-label" htmlFor={`servicio-${index}`}>
                                        {servicio.nombre}
                                    </label>
                                    <input
                                        type="checkbox"
                                        id={`servicio-${index}`}
                                        name="detalleServicioCitaDTOS" // Cambio en el nombre
                                        value={servicio.nombre}
                                        checked={formData.detalleServicioCitaDTOS.some(s => s.nombre === servicio.nombre)}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Productos */}
                <h3>Productos *</h3>
                <div className="product-container">
                    {loadingProductos ? (
                        <p>Cargando productos...</p>
                    ) : errorProductos ? (
                        <p>{errorProductos}</p>
                    ) : (
                        <div className="checkbox-group">
                            {productos.map((producto, index) => (
                                <div className="checkbox-item" key={index}>
                                    <label className="checkbox-label" htmlFor={`producto-${index}`}>
                                        {producto.nombre} - ${producto.precio}
                                    </label>
                                    <input
                                        type="checkbox"
                                        id={`producto-${index}`}
                                        name="detalleProductoCitaDTOS" // Cambio en el nombre
                                        value={producto.nombre}
                                        checked={formData.detalleProductoCitaDTOS.some(p => p.nombre === producto.nombre)}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
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