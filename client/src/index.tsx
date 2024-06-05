import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <div style={{overflowX: 'hidden' }}>
                <App/>
            </div>
        </AuthContextProvider>
    </React.StrictMode>
);
