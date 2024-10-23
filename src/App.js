import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar'; 
import InicioSesion from './components/InicioSesion'; 
import Citas from './components/Citas'; 
import Home from './components/Home';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar si hay un cliente en sessionStorage al cargar la app
    useEffect(() => {
        const clienteGuardado = sessionStorage.getItem('cliente');
        if (clienteGuardado) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (authStatus) => {
        setIsAuthenticated(authStatus);
        if (!authStatus) {
            sessionStorage.removeItem('cliente'); // Eliminar cliente al cerrar sesión
        }
    };

    return (
        <Router>
            <div>
                {/* Mostrar la barra de navegación solo si el usuario está autenticado */}
                {isAuthenticated && <NavBar />}

                <Routes>
                    {/* Ruta para la página de inicio de sesión */}
                    <Route 
                        path="/inicio-sesion" 
                        element={isAuthenticated ? <Navigate to="/" /> : <InicioSesion onLogin={handleLogin} />} 
                    />

                    {/* Si el usuario está autenticado, mostrar las rutas */}
                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/citas" element={<Citas />} />
                        </>
                    ) : (
                        // Si no está autenticado, redirigir a inicio de sesión
                        <Route path="*" element={<Navigate to="/inicio-sesion" />} />
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;