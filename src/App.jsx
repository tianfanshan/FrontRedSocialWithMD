import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './components/Login/Login';
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import PrivateZone from './guards/PrivateZone';
import NotFound from './components/NotFound/Notfound';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}  className="home"/>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={
            <PrivateZone>
              <Profile />
            </PrivateZone>
          } />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App; 
