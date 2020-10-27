import React from 'react';
import { auth } from '../utils/firebase';
import { withRouter } from 'react-router-dom';

import { Link, NavLink } from 'react-router-dom';

const Navbar = (props)=>{

    const logout = ()=>{
        auth.signOut()
        .then( ()=>{
            props.history.push('/login');
        });
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">GH.dev</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" activeClassName="active" exact>Inicio</NavLink>
                    </li>
                    {
                        props.firebaseUser !==null ? (
                            <li className="nav-item">
                            <NavLink to="/mistareas" className="nav-link" activeClassName="active">Mis tareas</NavLink>
                        </li>
                        ) : null
                    }
      
                </ul>
                <div className="nav-item dropdown">
                {
                    props.firebaseUser !== null ? (
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {props.firebaseUser.email}
                            </a>
            
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <NavLink to="/perfil" className="dropdown-item">Perfil</NavLink>
                                <div className="dropdown-divider"></div>
                                    <NavLink to="/login" className="dropdown-item" onClick={()=>logout()}>Cerrar sesión</NavLink>
                            </div>
                        </div>
                    ): <ul className="navbar-nav"><li className="nav-item"><NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink></li></ul>
                }
                </div>
            </div>

        </nav>
    )
}

export default withRouter (Navbar);