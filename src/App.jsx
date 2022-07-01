import React from 'react';
import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import './App.css';

import Login from './components/Login/Login';
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 
