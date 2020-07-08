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
                    <li className="nav-item">
                        <NavLink to="/tareas" className="nav-link" activeClassName="active">Lista de tareas</NavLink>
                    </li>

                    {
                        props.firebaseUser !==null ? (
                            <li className="nav-item">
                                <NavLink to="/admin" className="nav-link" activeClassName="active">Admin</NavLink>
                            </li>
                        ) : null
                    }
                    
                    <li className="nav-item">
                        {
                            props.firebaseUser !== null ? (
                               <NavLink to="#" className="nav-link" activeClassName="active" onClick={()=>logout()}>Logout</NavLink>
                            ): (
                                <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
                            )
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default withRouter (Navbar);