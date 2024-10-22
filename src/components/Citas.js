import React, { useState, useEffect } from 'react';
import './Citas.css'; // Para estilos personalizados
import Notification from './Notification'; // Importar el componente de notificación
import { obtenerEstilistas } from '../api/EstilistasApi'; // Importar la función desde la API de estilistas
import { obtenerServicios } from '../api/ServiciosApi'; // Importar la función desde la API de servicios
import { obtenerProductos } from '../api/ProductosApi'; // Importar la función desde la API de productos

const Citas = () => {
    const [formData, setFormData] = useState({
        fechaCita: '', // Fecha y hora en un mismo valor
        estilista: '', // Aquí guardaremos el ID del estilista
        servicios: [],
        productos: [],
        notas: '',
    });

    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [estilistas, setEstilistas] = useState([]); // Estado para almacenar los estilistas
    const [servicios, setServicios] = useState([]); // Estado para almacenar los servicios
    const [productos, setProductos] = useState([]); // Estado para almacenar los productos
    const [loadingEstilistas, setLoadingEstilistas] = useState(true); // Estado para mostrar un mensaje de carga para estilistas
    const [loadingServicios, setLoadingServicios] = useState(true); // Estado para mostrar un mensaje de carga para servicios
    const [loadingProductos, setLoadingProductos] = useState(true); // Estado para mostrar un mensaje de carga para productos
    const [errorEstilistas, setErrorEstilistas] = useState(null); // Estado para manejar errores en estilistas
    const [errorServicios, setErrorServicios] = useState(null); // Estado para manejar errores en servicios
    const [errorProductos, setErrorProductos] = useState(null); // Estado para manejar errores en productos

    useEffect(() => {
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

        if (name === 'servicios') {
            const selectedService = servicios.find(servicio => servicio.nombre === value);
            const updatedList = checked
                ? [...formData.servicios, selectedService]
                : formData.servicios.filter(servicio => servicio.nombre !== value);

            setFormData({ ...formData, [name]: updatedList });

        } else if (name === 'productos') {
            const selectedProduct = productos.find(producto => producto.nombre === value);
            const updatedList = checked
                ? [...formData.productos, selectedProduct]
                : formData.productos.filter(producto => producto.nombre !== value);

            setFormData({ ...formData, [name]: updatedList });

        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar si se ha seleccionado al menos un servicio
        if (formData.servicios.length === 0) {
            setNotificationMessage('Debes seleccionar al menos un servicio.');
            setSeverity('error');
            setOpenNotification(true);
            return; // Detener el proceso si no hay servicios seleccionados
        }

        console.log(formData)

        try {
            setNotificationMessage('Cita guardada y agendada correctamente.');
            setSeverity('success');
            setOpenNotification(true);
            setFormData({
                fechaCita: '',
                estilista: '',
                servicios: [],
                productos: [],
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
                {/* Campo Fecha y Hora */}
                <div className="form-group">
                    <label htmlFor="fechaCita">Fecha y Hora *</label>
                    <input
                        type="datetime-local"
                        id="fechaCita"
                        name="fechaCita"
                        required
                        value={formData.fechaCita}
                        onChange={handleChange}
                    />
                </div>

                {/* Campo Estilista */}
                <div className="form-group">
                    <label htmlFor="estilista">Preferencias de Estilista *</label>
                    {loadingEstilistas ? (
                        <p>Cargando estilistas...</p>
                    ) : errorEstilistas ? (
                        <p>{errorEstilistas}</p>
                    ) : (
                        <select
                            id="estilista"
                            name="estilista"
                            required
                            value={formData.estilista}
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
                                        name="servicios"
                                        value={servicio.nombre}
                                        checked={formData.servicios.some(s => s.nombre === servicio.nombre)}
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
                                        name="productos"
                                        value={producto.nombre}
                                        checked={formData.productos.some(p => p.nombre === producto.nombre)}
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