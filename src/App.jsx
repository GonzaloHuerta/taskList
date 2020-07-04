import React, { useState, useEffect } from 'react';
import Tareas from './components/Tareas';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Admin from './components/Admin';

import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    
  )
}

export default App;
