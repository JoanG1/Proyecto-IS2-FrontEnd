import React, { useState, useEffect } from 'react';
import './Citas.css'; 
import Notification from './Notification'; 
import { obtenerEstilistas } from '../api/EstilistasApi'; 
import { obtenerServicios } from '../api/ServiciosApi'; 
import { obtenerProductos } from '../api/ProductosApi'; 
import { CrearCita, EditarCita } from '../api/CitasApi'; // Asegúrate de importar EditarCita
import ConfirmacionCita from './ConfirmacionCita'; // Importa el componente de Confirmación

const Citas = () => {
    const [formData, setFormData] = useState({
        fecha: '',
        estilistaId: '',
        detalleServicioCitaDTOS: [],
        detalleProductoCitaDTOS: [],
        notas: '',
        clienteId: '',
    });

    const [citaAhora, setCitaAhora] = useState(null); // Cambiar a null inicialmente
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
    const [isConfirming, setIsConfirming] = useState(false); // Estado para confirmar la cita
    const [isEditing, setIsEditing] = useState(false); // Estado para saber si se está editando
    const [citaActual , setCitaActual] = useState(0);

    useEffect(() => {
        const clienteGuardado = sessionStorage.getItem('cliente');
        if (clienteGuardado) {
            const cliente = JSON.parse(clienteGuardado);
            setFormData((prevFormData) => ({
                ...prevFormData,
                clienteId: cliente.id,
            }));
        }

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

        if (name === 'detalleServicioCitaDTOS') {
            const selectedService = servicios.find(servicio => servicio.nombre === value);
            const updatedList = checked
                ? [...formData.detalleServicioCitaDTOS, selectedService]
                : formData.detalleServicioCitaDTOS.filter(servicio => servicio.nombre !== value);

            setFormData({ ...formData, [name]: updatedList });

        } else if (name === 'detalleProductoCitaDTOS') {
            const selectedProduct = productos.find(producto => producto.nombre === value);
            const updatedList = checked
                ? [...formData.detalleProductoCitaDTOS, selectedProduct]
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
            const nuevaCita = {
                fecha: formData.fecha + ":00",
                detalleServicioCitaDTOS: formData.detalleServicioCitaDTOS,
                detalleProductoCitaDTOS: formData.detalleProductoCitaDTOS,
                clienteId: formData.clienteId,
                estilistaId: Number(formData.estilistaId),
            };

            if (isEditing && citaAhora) {

                const nuevaCita = {
                    fecha: formData.fecha + ":00",
                    detalleServicioCitaDTOS: formData.detalleServicioCitaDTOS,
                    detalleProductoCitaDTOS: formData.detalleProductoCitaDTOS,
                    estilistaId: Number(formData.estilistaId),
                };
                // Editar cita existente
                console.log(nuevaCita)
                await EditarCita(citaActual, nuevaCita); // Asumiendo que hay una cita creada
                setNotificationMessage('Cita editada correctamente.');
            } else {
                const citaId = await CrearCita(nuevaCita);
                console.log(citaId)
                setCitaActual(citaId)
                setNotificationMessage('Cita guardada y agendada correctamente.');
            }

            setSeverity('success');
            setOpenNotification(true);
            setIsConfirming(true); // Cambiar el estado a confirmación

            setCitaAhora({
                ...nuevaCita // Asegúrate de guardar el ID si estás editando
            });

            setFormData({
                fecha: "",
                estilistaId: "",
                detalleServicioCitaDTOS: [],
                detalleProductoCitaDTOS: [],
                notas: '',
                clienteId: formData.clienteId,
            });

            

        } catch (error) {
            setNotificationMessage(error.message || 'Error. Inténtalo de nuevo.');
            setSeverity('error');
            setOpenNotification(true);
        }
    };

    const imprimir= () =>{

        console.log(citaAhora)
        console.log(citaActual)
    }

    const handleCloseNotification = () => {
        setOpenNotification(false);
        imprimir();
    };

    const handleEdit = () => {
        setFormData({
            fecha: citaAhora.fecha,
            estilistaId: citaAhora.estilistaId,
            detalleServicioCitaDTOS: citaAhora.detalleServicioCitaDTOS,
            detalleProductoCitaDTOS: citaAhora.detalleProductoCitaDTOS,
            notas: citaAhora.notas,
            clienteId: citaAhora.clienteId,
        });
        setIsEditing(true); // Cambiar a modo de edición
        setIsConfirming(false); // Desactivar el estado de confirmación
    };

    return (
        <div className="citas">
            <h2>Reserva tu Cita</h2>
            {isConfirming ? (
                <ConfirmacionCita cita={citaAhora} onEdit={handleEdit} citaId={citaActual} />
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* Campo Fecha y Hora */}
                    <div className="form-group">
                        <label htmlFor="fecha">Fecha y Hora *</label>
                        <input
                            type="datetime-local"
                            id="fecha"
                            name="fecha"
                            required
                            value={formData.fecha}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Campo Estilista */}
                    <div className="form-group">
                        <label htmlFor="estilistaId">Preferencias de Estilista *</label>
                        {loadingEstilistas ? (
                            <p>Cargando estilistas...</p>
                        ) : errorEstilistas ? (
                            <p>{errorEstilistas}</p>
                        ) : (
                            <select
                                id="estilistaId"
                                name="estilistaId"
                                required
                                value={formData.estilistaId}
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
                                            name="detalleServicioCitaDTOS"
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
                    <h3>Productos</h3>
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
                                            {producto.nombre}
                                        </label>
                                        <input
                                            type="checkbox"
                                            id={`producto-${index}`}
                                            name="detalleProductoCitaDTOS"
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
                        <label htmlFor="notas">Notas</label>
                        <textarea
                            id="notas"
                            name="notas"
                            value={formData.notas}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Botón de Envío */}
                    <button type="submit" className="submit-button">
                        {isEditing ? "Editar Cita" : "Reservar Cita"}
                    </button>
                </form>
            )}

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