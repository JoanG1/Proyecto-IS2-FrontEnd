import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar'; // Tu componente de barra de navegación
import InicioSesion from './components/InicioSesion'; // El componente que creaste para inicio de sesión
import Citas from './components/Citas'; // Componente de citas
import Home from './components/Home'; // Componente de Home

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para la autenticación

    const handleLogin = (authStatus) => {
        setIsAuthenticated(authStatus);
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
                        element={<InicioSesion onLogin={handleLogin} />} 
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