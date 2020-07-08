import React, { useState, useEffect } from 'react';
import Tareas from './components/Tareas';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Admin from './components/MisTareas';
import Form from './components/Form';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { auth } from './utils/firebase';


function App() {
  
  const[firebaseUser, setFirebaseUser] = useState(false);
  
  useEffect( ()=>{
    auth.onAuthStateChanged(user =>{
      //console.log(user.email);
      if(user){
        setFirebaseUser(user);
      }
      else{
        setFirebaseUser(null);
      }
    })
  }, [])



  return firebaseUser !== false ?(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Navbar firebaseUser={firebaseUser} />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Inicio />
          </Route>
          <Route path="/tareas">
            <Tareas />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/mistareas">
            <Admin />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    
  ) : (
    <p>Cargando...</p>
  )
}

export default App;
