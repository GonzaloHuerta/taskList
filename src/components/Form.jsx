import React from 'react';
import ButtonSubmit from '../components/ButtonSubmit';

const Form = ()=>{
    return(
        <div className="mt-4">
            <form>
                <h3 className="text-center mb-4">Registrar Chofer</h3>
                <label htmlFor="">DNI</label>
                <input type="text" className="form-control mb-2" placeholder="Número de factura"/>
                <label htmlFor="">Apellido</label>
                <input type="text" className="form-control mb-2" placeholder="Valor"/> 
                <label htmlFor="">Nombre</label>
                <input type="text" className="form-control mb-2" placeholder="Vencimiento"/>
                <label htmlFor="">Domicilio</label>
                <input type="text" className="form-control mb-2" placeholder="Tipo"/>
                <label htmlFor="">Localidad</label>
                <input type="text" className="form-control mb-4" placeholder="Estado"/>
                <label htmlFor="">Teléfono</label>
                <input type="text" className="form-control mb-4" placeholder="Estado"/>
                <label htmlFor="">Código postal</label>
                <input type="text" className="form-control mb-4" placeholder="Estado"/>
                <label htmlFor="">Email</label>
                <input type="text" className="form-control mb-4" placeholder="Estado"/>
                <div className="text-center mb-4">
                    <ButtonSubmit class="btn btn-dark btn-lg mr-4" text="Registrar"/>
                    <ButtonSubmit class="btn btn-dark btn-lg" text="Imprimir Chofer"/>
                </div>
                
            </form>
        </div>
    )
}

export default Form;