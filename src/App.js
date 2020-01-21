import React, {useEffect,Fragment,useState, useRef} from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom'
import ManageUsers from './pages/manageusers'
import Register from './pages/register'
import Header from './components/header'
// let didupdatejalan=0
function App() {
  
 

  return (
    <Fragment>
      <Header/>
      <Switch>
        <Route path='/' exact component={ManageUsers}/>
        <Route path='/register' exact component={Register}/>
      </Switch>
    </Fragment>
  );
}

export default App;
