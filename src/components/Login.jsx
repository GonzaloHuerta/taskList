import React, { useState, useCallback } from 'react';
import Title from '../components/Title';
import Error from '../components/Error';
import ButtonSubmit from '../components/ButtonSubmit';
import { auth, db } from '../utils/firebase';
import { withRouter } from 'react-router-dom';

const Login = (props)=>{
    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const[error, setError] = useState('');
    const[esRegistro, setEsRegistro] = useState(false);

    const procesarDatosForm = (e)=>{
        e.preventDefault();
        if(!email.trim()){
            setError('Ingrese un email valido');
            return 0;
        }
        if(!pass.trim()){
            setError('Ingrese un password');
            return 0;
        }
        if(pass.length < 6){
            setError("El password debe tener al menos 6 caracteres");
            return 0;
        }
        setError('');

        if(esRegistro){
            registrarUsuario();
        }else{
            login();
        }
    }

    const registrarUsuario = useCallback( async()=>{
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass);
            await db.collection('usuarios').doc(res.user.uid).set({
                email: res.user.email,
                uid: res.user.uid
            })
            setEmail('');
            setPass('');
            setError('');
            setEsRegistro(false);
        } catch (error) {
            if(error.code === "auth/invalid-email"){
                setError("El email es invalido");
            }
            if(error.code === "auth/email-already-in-use"){
                setError("El email ya esta en uso");
            }
        }
    }, [email, pass] )

    const login = useCallback( async()=>{
        try {
            await auth.signInWithEmailAndPassword(email, pass);
            
            setEmail('');
            setPass('');
            setError('');
            props.history.push('/admin');
        } catch (error) {
            if(error.code === "auth/invalid-email"){
                setError("El email es invalido");
            }
            if(error.code === "auth/wrong-password"){
                setError("La contrasena es incorrecta");
            }
            if(error.code === "auth/user-not-found"){
                setError("No existe cuenta con ese email");
            }
            console.log(error);
        }
    }, [email, pass, props.history])

    return(
        <div className="mt-4">
            {
                esRegistro ? <Title title="Crear nueva cuenta"/> : <Title title="Login"/> 
            }
            
            <hr/>
            <h3 className="text-center mb-4">
                {
                    esRegistro ? "Registrarse" : "Iniciar sesion"
                }
            </h3>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatosForm}>
                        {error ? <Error text={error}/>:null}
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
                        {
                            esRegistro ?  
                                <ButtonSubmit class="btn btn-dark btn-lg btn-block" text="Registrarse"/> :
                                <ButtonSubmit class="btn btn-dark btn-lg btn-block" text="Ingresar"/>

                        }
                       
                        <button 
                            className="btn btn-info btn-sm btn-block" 
                            onClick={(e)=> setEsRegistro(!esRegistro)}
                            type="button">
                            {esRegistro ? "Ya tienes cuenta?":"Crear nueva cuenta"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login);