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