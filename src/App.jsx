import React, { useState } from 'react';

import shortid from 'shortid';

function App() {

  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [stateId, setStateId] = useState('');
  const [error, setError] = useState(null);

  const listaDeTareas = [];

  const agregarTarea = (e)=>{
    e.preventDefault();
    if(!tarea.trim()){
      //console.log("Ingrese una tarea");
      setError('Debe ingresar una tarea');
      return 0;
    }
    
    setTareas([
      ...tareas,
      {id: shortid.generate(), tarea: tarea}
    ])

    setTarea('');
    setError('');
  }

  const eliminarTarea = (id)=>{
    //console.log(id);
    const arrayFiltrado = tareas.filter(item=>item.id !== id);
    setTareas(arrayFiltrado);
  }

  const editar = (tarea) =>{
    //console.log(tarea);

    setModoEdicion(true);

    setTarea(tarea.tarea);
    setStateId(tarea.id);
  }

  const editarTarea = (e) =>{
    e.preventDefault();
    if(!tarea.trim()){
      setError('Debe ingresar una tarea');
      //console.log("Elemento vacio");
      return 0;
    }

    const arrayEditado = tareas.map(item => 
      (item.id === stateId ? {id:stateId, tarea:tarea} : item )
    );

    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea('');
    setStateId('');
    setError('');

  }

  return (
    <div className="container mt-4">
      <h1 className="text-center">Lista de tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Tareas pendientes</h4>
          {
            tareas.length===0 ? (<p>No hay tareas pendientes</p>):(
              <ul className="list-group">
                { tareas.map((item)=> (
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">{item.tarea}</span>
                    <button className="btn btn-danger btn-sm float-right mx-2" onClick={()=>eliminarTarea(item.id)}>Eliminar</button>
                    <button className="btn btn-warning btn-sm float-right" onClick={()=>editar(item)}>Editar</button>
                  </li>
                )) 
                } 
              </ul>
            )
          }
        </div>
        <div className="col-4">
        <h4 className="text-center">
          {
            modoEdicion ? 'Editar tarea':'Cargar tareas'
          }
        </h4>
        <form onSubmit={modoEdicion ? editarTarea: agregarTarea}>
          {error ? <span class="text-danger">{error}</span> : null}
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="Ingresar tarea" 
            onChange={ (e)=> setTarea(e.target.value) }
            value={tarea}
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
