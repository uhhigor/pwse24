import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import axios from "axios";
axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginPage />
          <RegisterPage />
      </header>
    </div>
  );
}

export default App;
