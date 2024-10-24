import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-brand">Harmoniqué</h1>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/citas">Citas</Link>
                </li>
                <li>
                    <Link to="/perfil">Perfil</Link> {/* Nueva ruta para el perfil */}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;