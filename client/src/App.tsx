import React from 'react';
import './style/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import TaskPage from './pages/tasks/TaskPage';
import MainPage from './pages/other/MainPage';
import axios from "axios";
import { Dashboard } from './admin/Dashboard';

axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </header>
      </Router>
    </div>
  );
}


export default App;
