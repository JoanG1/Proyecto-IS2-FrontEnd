// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link para la navegación
import './Home.css'; // Para estilos personalizados
import CorteImg from '../image/Corte.png'; // Importa la imagen de Corte
import ManicureImg from '../image/manicure.jpg'; // Importa la imagen de Manicura

const Home = () => {
    const servicios = [
        {
            id: 1,
            titulo: 'Corte de Cabello',
            precio: '$25',
            descripcion: 'Un corte de cabello fresco y moderno que se adapta a tu estilo.',
            imagen: CorteImg,
        },
        {
            id: 2,
            titulo: 'Manicura',
            precio: '$15',
            descripcion: 'Un servicio de manicura que realza la belleza de tus manos.',
            imagen: ManicureImg,
        },
        // Agrega más servicios según sea necesario
    ];

    return (
        <div className="home">
            <h2>Bienvenido a Harmoniqué</h2>
            <p>Tu destino para un cuidado de cabello excepcional y estilo elegante.</p>
            <div className="servicios-grid">
                {servicios.map((servicio) => (
                    <div key={servicio.id} className="servicio-item">
                        <div className="servicio-info">
                            <h3>{servicio.titulo}</h3>
                            <p><strong>Precio:</strong> {servicio.precio}</p>
                            <p>{servicio.descripcion}</p>
                        </div>
                        <div className="servicio-imagen">
                            <Link to="/citas"> {/* Link a la ruta de reserva */}
                                <img src={servicio.imagen} alt={servicio.titulo} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;