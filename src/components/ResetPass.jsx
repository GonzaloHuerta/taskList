import React, {useState, useCallback} from 'react';
import Title from './Title';
import Error from './Error';
import ButtonSubmit from './ButtonSubmit';
import { auth } from '../utils/firebase';
import { withRouter } from 'react-router-dom';

const ResetPass = (props)=>{
    const[email, setEmail] = useState('');
    const[error, setError] = useState('');
    const[enviado, setEnviado] = useState(false);

    const procesarDatosForm = (e)=>{
        e.preventDefault();
        if(!email.trim()){
            setError('Ingrese un email valido');
            return 0;
        }
        setError('');

        resetPassword();
    }

    const resetPassword = useCallback(async()=>{
        try {
            await auth.sendPasswordResetEmail(email);
            console.log("correo enviado...");
            setEnviado(true);
            setEmail('');
            //props.history.push('login');
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }, [email])

    return(
        <div className="mt-4">
            <Title title="Recuperar contraseña"/> 
            <hr/>
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
                        <ButtonSubmit class="btn btn-dark btn-lg btn-block" text="Enviar"/>
                        {
                            enviado ? <div class="alert alert-success mt-2" role="alert">Email enviado correctamente</div> : null
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ResetPass);