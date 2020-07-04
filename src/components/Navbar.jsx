import React from 'react';

import { Link, NavLink } from 'react-router-dom';

const Navbar = ()=>{
    return(
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">GH.dev</Link>
            <div className="navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" activeClassName="active" exact>Inicio</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/tareas" className="nav-link" activeClassName="active">Lista de tareas</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;