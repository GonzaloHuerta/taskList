import React, { useState, useEffect } from 'react';
import Tareas from './components/Tareas';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Admin from './components/MisTareas';
import ResetPass from './components/ResetPass';
import Cargando from './components/Cargando';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { auth } from './utils/firebase';

import AddToHomeScreen from '@ideasio/add-to-homescreen-react';


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
      <AddToHomeScreen displayPace={0}/>
      <Navbar firebaseUser={firebaseUser} />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Inicio firebaseUser={firebaseUser} />
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
          <Route path="/reset">
            <ResetPass />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    
  ) : (
    <div>
      
      <Cargando />
    </div>
  )
}

export default App;
