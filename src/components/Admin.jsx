import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { auth } from '../utils/firebase';
import { withRouter } from 'react-router-dom';

const Admin = (props)=>{
    const[user, setUser] = useState(null);

    useEffect( ()=>{
        if(auth.currentUser){
            //console.log("existe un usuario logeado");
            setUser(auth.currentUser);
            //console.log(user)
        }else{
            //console.log("No existe usuario logeado");
            props.history.push('/login');
        }
    }, [props.history])
    return(
        <div className="mt-4">
            <Title title="Admin"/>
            <hr/>
            {
                user !==null ? (
                    <h2>Bienvenido al admin {user.email} </h2>
                ):null
            }
        </div>
    )
}

export default withRouter(Admin);