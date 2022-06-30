import React from 'react';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import {BrowserRouter, Routes ,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 
