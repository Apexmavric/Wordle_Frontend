import './App.css';
import KeyBoard from './components/KeyBoard';
import NavBar from './components/NavBar';
import Words from './components/Words';
import { useState } from 'react';
import { useEffect } from 'react';
import randomwordapi from './components/Randomwordapi';
import UserPage from './Pages/UserPage';
import LoginPage from './Pages/LoginPage';
import { Login, Route } from '@mui/icons-material';
function App() {
  return (
    <div className="App">
      {/* <UserPage></UserPage> */}
      <LoginPage/>
    </div>
  );
}

export default App;
