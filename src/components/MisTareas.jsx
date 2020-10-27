import React, { useEffect, useState } from 'react';
import Tareas from './Tareas';
import { auth } from '../utils/firebase';
import { withRouter } from 'react-router-dom';

const Admin = (props)=>{
    const[user, setUser] = useState(null);

    useEffect( ()=>{
        if(auth.currentUser){
            //console.log("existe un usuario logueado");
            setUser(auth.currentUser);
            //console.log(user)
        }else{
            //console.log("No existe usuario logueado");
            props.history.push('/login');
        }
    }, [props.history])
    return(
        <div className="mt-4">
            {
                user !==null ? (
                    <Tareas user={user}/>
                ):null
            }
        </div>
    )
}

export default withRouter(Admin);