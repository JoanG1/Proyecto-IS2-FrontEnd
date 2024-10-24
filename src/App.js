import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar'; 
import InicioSesion from './components/InicioSesion'; 
import Citas from './components/Citas'; 
import Home from './components/Home';
import Perfil from './components/Perfil'; // Importar el componente Perfil

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const clienteGuardado = sessionStorage.getItem('cliente');
        if (clienteGuardado) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (authStatus) => {
        setIsAuthenticated(authStatus);
        if (!authStatus) {
            sessionStorage.removeItem('cliente'); 
        }
    };

    return (
        <Router>
            <div>
                {isAuthenticated && <NavBar />}

                <Routes>
                    <Route 
                        path="/inicio-sesion" 
                        element={isAuthenticated ? <Navigate to="/" /> : <InicioSesion onLogin={handleLogin} />} 
                    />

                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/citas" element={<Citas />} />
                            <Route path="/perfil" element={<Perfil />} /> {/* Ruta para el perfil */}
                        </>
                    ) : (
                        <Route path="*" element={<Navigate to="/inicio-sesion" />} />
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;