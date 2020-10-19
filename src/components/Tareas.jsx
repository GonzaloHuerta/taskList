import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import Title from './Title';
import Subtitle from './Subtitle';
import ButtonSubmit from './ButtonSubmit';
import ButtonAction from './ButtonAction';
import Cargando from './Cargando';

import moment from 'moment';
import 'moment/locale/es';

const Tareas = (props)=>{
    const [tareasdb, setTareasDb] = useState([]);
    const [tareadb, setTareaDb] = useState('');
  
    const [modoEdicion, setModoEdicion] = useState(false);
    const [stateId, setStateId] = useState('');
    const [error, setError] = useState(null);
    const [existenTareas, setExistenTareas] = useState(false);

    //const listaDeTareas = [];


    const agregarTareadb = async (e)=>{
        e.preventDefault();
        if(!tareadb.trim()){
        setError('Debe ingresar una tarea');
        return 0;
        }
        
        try {
        const nuevaTareaDb = {
            name: tareadb,
            fecha: Date.now()
        };
        const data = await db.collection(props.user.email).add(nuevaTareaDb);
        setTareasDb ([
            ...tareasdb,
            {...nuevaTareaDb, id: data.id}
        ])
        setTareaDb('');

        } catch (error) {
        console.log(error);
        }
    }

    const eliminarTareaDb = async (id)=>{
        try {
        await db.collection(props.user.email).doc(id).delete();
        const arrayFiltrado = tareasdb.filter(item=>item.id !==id);
        setTareasDb(arrayFiltrado);
        } catch (error) {
        console.log(error);
        }
    }

    const activarEdicion = (item) =>{
        setModoEdicion(true);
        setTareaDb(item.name);
        setStateId(item.id);
    }

    const editarTareaDb = async(e) =>{
        e.preventDefault();
        if(!tareadb.trim()){
        setError('Debe ingresar una tarea');
        return 0;
        }

        try {
        await db.collection(props.user.email).doc(stateId).update({
            name: tareadb
        });
        const arrayEditado = tareasdb.map(item=> (
            item.id ===stateId ? {id:stateId, fecha: item.fecha, name: tareadb} : item
        ));
        setTareasDb(arrayEditado);
        setModoEdicion(false);
        setTareaDb('');
        setStateId('');

        } catch (error) {
        console.log(error);
        }
    }

    useEffect(()=>{
        const obtenerDatos = async()=>{
        try {
            const data = await db.collection(props.user.email)
            .orderBy('fecha', 'desc')
            .get();
            const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            setTareasDb(arrayData);
            setExistenTareas(true);

        } catch (error) {
            console.log(error);
        }
        }
        obtenerDatos();
    
    }, [])

    return(
        <div className="mt-4">
            <Title title="Lista de tareas"/>
            <hr/>

            <div className="row">
                <div className="col-8">
                    <Subtitle subtitle="Tareas pendientes"/>
                    { existenTareas === false ? <Cargando /> : ( 
                        tareasdb.length === 0 ? (<p>No hay tareas pendientes</p>):(
                            
                        <ul className="list-group mb-4">
                            { tareasdb.map((item)=> (
                            <li className="list-group-item" key={item.id}>
                                <span className="lead">{item.name}</span>
                                <ButtonAction 
                                    class="btn btn-danger btn-sm float-right mx-2" 
                                    onClick={()=>eliminarTareaDb(item.id)} 
                                    text="Eliminar"
                                />
                                <ButtonAction 
                                    class="btn btn-warning btn-sm float-right" 
                                    onClick={()=>activarEdicion(item)} 
                                    text="Editar"
                                />
                                <small className="float-right mr-4 mt-3">{moment(item.fecha).format('L')} - {moment(item.fecha).format('LT')} hs.</small>
                            </li>
                            )) 
                            } 
                        </ul>
                        ))
                    }
                </div>
                <div className="col-4">
                    <Subtitle subtitle={modoEdicion ? 'Editar tarea':'Cargar tareas'}/>
                    <form onSubmit={modoEdicion ? editarTareaDb: agregarTareadb}>
                        {error ? <span className="text-danger">{error}</span> : null}
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="Ingresar tarea" 
                            onChange={ (e)=> setTareaDb(e.target.value) }
                            value={tareadb}
                        />

                        {
                            modoEdicion ? (
                            <ButtonSubmit class="btn btn-warning btn-block" text="Editar tarea" />
                            ):(
                            <ButtonSubmit class="btn btn-dark btn-block" text="Agregar tarea" />
                            )
                        }
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default Tareas;