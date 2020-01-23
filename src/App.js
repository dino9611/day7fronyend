import React, {useEffect,Fragment,useState, useRef} from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom'
import ManageUsers from './pages/manageusers'
import Register from './pages/register'
import Header from './components/header'
import verifikasi from './pages/verified'
import resendVerif from './pages/waitingverified'
import login from './pages/login'
// let didupdatejalan=0
function App() {
  
 

  return (
    <Fragment>
      <Header/>
      <Switch>
        <Route path='/' exact component={ManageUsers}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/resendverif' exact component={resendVerif}/>
        <Route path='/login' exact component={login}/>
        <Route path='/verified' exact component={verifikasi}/>
      </Switch>
    </Fragment>
  );
}

export default App;
