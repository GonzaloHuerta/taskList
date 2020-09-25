import React from 'react';
import Title from '../components/Title';
import { Link, NavLink } from 'react-router-dom';

const Inicio = (props)=>{
    return(
        <div className="mt-4">
            {
                props.firebaseUser !==null ? (
                <h2 className="text-center">Bienvenido a TaskList 2.0, <span className="username-home"><i>{props.firebaseUser.email}</i></span></h2>
                ):( <h2 className="text-center">Bienvenido a TaskList 2.0</h2>)
            }
            <hr/>
            <div className="mt-4 text-center">
                {
                    props.firebaseUser !==null ? ( 
                        <NavLink to="/mistareas" className="btn btn-primary" activeClassName="active">Ir a mis tareas</NavLink>
                    ):( <NavLink to="/login" className="btn btn-primary" activeClassName="active">Registrarse</NavLink>)
                }
            </div>
        </div>
    )
}

export default Inicio;