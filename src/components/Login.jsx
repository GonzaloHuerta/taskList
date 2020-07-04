import React, { useState } from 'react';
import Title from '../components/Title';
import ButtonSubmit from '../components/ButtonSubmit';

const Login = ()=>{
    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const[error, setError] = useState('');

    const procesarDatosForm = (e)=>{
        e.preventDefault();
        if(!email.trim()){
            //console.log("Ingrese email");
            setError('Ingrese un email valido');
            return 0;
        }
        if(!pass.trim()){
            //console.log("Ingrese password");
            setError('Ingrese un password');
            return 0;
        }
        if(pass.length < 6){
           // console.log("El password debe tener al menos 6 caracteres");
            setError("El password debe tener al menos 6 caracteres");
            return 0;
        }
        console.log("Validado correctamente")

        
    }

    return(
        <div className="mt-4">
            <Title title="Login"/>
            <hr/>
            <h3 className="text-center mb-4">Registro de usuarios</h3>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatosForm}>
                        {error ? <div className="alert alert-danger" role="alert">{error}</div>:null}
                        <input 
                            type="email" 
                            className="form-control mb-2" 
                            placeholder="Ingrese su email"
                            onChange={(e)=> setEmail(e.target.value)}
                            value={email}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2" 
                            placeholder="Ingrese su contrasena"
                            onChange={(e)=> setPass(e.target.value)}
                            value={pass}
                        />
                        <ButtonSubmit class="btn btn-dark btn-lg btn-block" text="Registrarse"/>
                        <button className="btn btn-info btn-sm btn-block">Ya tienes cuenta?</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;