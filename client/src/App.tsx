import React, { useEffect } from 'react';
import './style/App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import TasksPage from "./pages/tasks/TasksPage";
import MainPage from './pages/other/MainPage';
import axios from "axios";
import { Dashboard } from './pages/admin/Dashboard';
import ProblemPage from './pages/tasks/ProblemPage';
import ProfileManagement from './pages/auth/ProfileManagement';
import { Home } from './pages/other/Home';
import { useAuthContext } from './hooks/useAuthContext';
import { Ranking } from './pages/tasks/Ranking';

axios.defaults.withCredentials = true;
const App: React.FC = () => {
  const { state }: any = useAuthContext();
  const { user } = state.user ? { "user": {"email": state.user.data.email, "role": state.user.data.role} } :
                               { "user": JSON.parse(localStorage.getItem('user')!) };

  return (
    <BrowserRouter>
      <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/login" element={ !user ? <LoginPage /> : <Navigate to="/home" />} />
              <Route path="/register" element={ !user ? <RegisterPage /> : <Navigate to="/home" />} />
              <Route path="/tasks" element={ user ? <TasksPage /> : <Navigate to="/" />} />
              <Route path="/tasks/:id" element={ user ? <ProblemPage /> : <Navigate to="/" />} />
              <Route path="/" element={ !user ? <MainPage /> : <Navigate to="/home" />} />
              <Route path="/dashboard" element={ user ? user.role === 'admin' ? <Dashboard /> : <Navigate to="/home" /> : <Navigate to="/" />} />
              <Route path="/profileManagement/:email" element={ user ? <ProfileManagement/> : <Navigate to="/" />} />
              <Route path="/home" element={ user ? <Home/> : <Navigate to="/" />} />
              <Route path="/ranking" element={ user ? <Ranking/> : <Navigate to="/" />} />
            </Routes>
          </header>
      </div>
    </BrowserRouter>
  );
}


export default App;
