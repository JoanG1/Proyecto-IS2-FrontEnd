import './InicioSesion.css'; // Para estilos personalizados
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { crearCliente,inicioSesion, DatosCliente } from '../api/ClienteApi'; // Importar la API de crear cliente
import Notification from './Notification'; // Importar el componente de notificación

const InicioSesion = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
        telefono: '',
    });

    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [severity, setSeverity] = useState('success');


    const navigate = useNavigate(); // Inicializar useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (isRegister) {
            try {
                const nuevoCliente = await crearCliente(formData);
    
                if (nuevoCliente) {
                    // Guardar el cliente en sessionStorage
                    sessionStorage.setItem('cliente', JSON.stringify(nuevoCliente));
    
                    setNotificationMessage('Cliente registrado correctamente');
                    setSeverity('success');
                    setOpenNotification(true);
    
                    // Redirigir al home
                    setTimeout(() => {
                        onLogin(true); // Actualizar el estado de autenticación
                        navigate('/');
                    }, 2000);
                }
            } catch (error) {
                setNotificationMessage('Error al registrar el cliente, el correo ya está registrado');
                setSeverity('error');
                setOpenNotification(true);
            }
        } else {
            try {
                const respuesta = await inicioSesion(formData);

                const clienteEncontrado = await DatosCliente(formData)
    
                if (respuesta) {
                    // Guardar el cliente en sessionStorage
                    sessionStorage.setItem('cliente', JSON.stringify(clienteEncontrado));
    
                    setNotificationMessage('Inicio de sesión exitoso');
                    setSeverity('success');
                    setOpenNotification(true);
    
                    // Redirigir al home
                    setTimeout(() => {
                        onLogin(true); // Actualizar el estado de autenticación
                        navigate('/');
                    }, 1000);
                } else {
                    setNotificationMessage('El correo no existe, regístrate');
                    setSeverity('error');
                    setOpenNotification(true);
                }
            } catch (error) {
                console.log('Error en inicio de sesión:', error);
            }
        }
    };

    const handleCloseNotification = () => {
        setOpenNotification(false);
    };

    return (
        <div className="inicio-sesion">
            <h2>{isRegister ? 'Registro' : 'Iniciar Sesión'}</h2>
            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre *</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            required={isRegister}
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="correo">Correo *</label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        required
                        value={formData.correo}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contrasena">Contraseña *</label>
                    <input
                        type="password"
                        id="contrasena"
                        name="contrasena"
                        required
                        value={formData.contrasena}
                        onChange={handleChange}
                    />
                </div>

                {isRegister && (
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono *</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            required={isRegister}
                            value={formData.telefono}
                            onChange={handleChange}
                        />
                    </div>
                )}

                <button type="submit">
                    {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
                </button>
            </form>

            <p>
                {isRegister ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
                <button
                    type="button"
                    className="toggle-button"
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? 'Iniciar Sesión' : 'Registrarse'}
                </button>
            </p>

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

export default InicioSesion;