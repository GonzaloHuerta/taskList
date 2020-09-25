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
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">GH.dev</Link>
            <div className="navbar-collapse">
                <ul className="navbar-nav">

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
            </div>
            <div className="nav-item dropdown float-right">
                {
                    props.firebaseUser !== null ? (
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {props.firebaseUser.email}
                            </a>
            
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <NavLink to="/perfil" className="dropdown-item">Perfil</NavLink>
                                <div class="dropdown-divider"></div>
                                    <NavLink to="/login" className="dropdown-item" onClick={()=>logout()}>Cerrar sesión</NavLink>
                            </div>
                        </div>
                    ): <ul className="navbar-nav"><li className="nav-item"><NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink></li></ul>
                }
            </div>
        </div>
    )
}

export default withRouter (Navbar);