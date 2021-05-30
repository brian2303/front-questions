
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = ({ children }) => (
  <section>
    <h1>Inicio</h1>
    <div>
      {children}
    </div>
     <Link to="/questions" className="button">
      Ver Preguntas
    </Link>
    <p>Bienvenido PREGUNTADO Y SOLUCIONANDO APP</p>
  </section>
)
export default HomePage