import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import {firebase} from './utils/firebase';
import { firestore } from 'firebase';

import moment from 'moment';
import 'moment/locale/es';

function App() {
  const [tareasdb, setTareasDb] = useState([]);
  const [tareadb, setTareaDb] = useState('');
  
  const [modoEdicion, setModoEdicion] = useState(false);
  const [stateId, setStateId] = useState('');
  const [error, setError] = useState(null);

  const listaDeTareas = [];

  const agregarTareadb = async (e)=>{
    e.preventDefault();
    if(!tareadb.trim()){
      //console.log("Ingrese una tarea");
      setError('Debe ingresar una tarea');
      return 0;
    }
    
    try {
      const db = firebase.firestore();
      const nuevaTareaDb = {
        name: tareadb,
        fecha: Date.now()
      };
      const data = await db.collection('tareas').add(nuevaTareaDb);
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
      const db = firebase.firestore();
      await db.collection('tareas').doc(id).delete();
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
      const db = firebase.firestore();
      await db.collection('tareas').doc(stateId).update({
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
        const db = firebase.firestore();
        const data = await db.collection('tareas').get();
        //console.log(data.docs);
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setTareasDb(arrayData);

      } catch (error) {
        console.log(error);
      }
    }
    obtenerDatos();
  }, [])

  return (
    <div className="container mt-4">
      <h1 className="text-center">Lista de tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center mb-4">Tareas pendientes</h4>
          {
            tareasdb.length===0 ? (<p>No hay tareas pendientes</p>):(
              <ul className="list-group">
                { tareasdb.map((item)=> (
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">{item.name}</span>
                    <button className="btn btn-danger btn-sm float-right mx-2" onClick={()=>eliminarTareaDb(item.id)}>Eliminar</button>
                    <button className="btn btn-warning btn-sm float-right" onClick={()=>activarEdicion(item)}>Editar</button>
                    <small className="float-right mr-4 mt-3">{moment(item.fecha).format('L')} - {moment(item.fecha).format('LT')} hs.</small>
                  </li>
                )) 
                } 
              </ul>
            )
          }
        </div>
        <div className="col-4">
        <h4 className="text-center mb-4">
          {
            modoEdicion ? 'Editar tarea':'Cargar tareas'
          }
        </h4>
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
              <button className="btn btn-warning btn-block" type="submit">Editar tarea</button>
            ):(
              <button className="btn btn-dark btn-block" type="submit">Agregar</button>
              )
          }

          
        </form>
        </div>
      </div>
    </div>
  );
}

export default App;
