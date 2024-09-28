// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
// Importa otros componentes según sea necesario

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/citas" element={<div>Página de Citas</div>} /> {/* Placeholder para la página de citas */}
            </Routes>
        </Router>
    );
};

export default App;
