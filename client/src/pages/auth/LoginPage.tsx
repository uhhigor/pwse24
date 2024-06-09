import React, { useState } from 'react';
import axios from "axios";
import "../../style/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useLogin } from '../../hooks/useLogin';

function LoginPage() {
    let navigate = useNavigate();
    const { login, error, isLoading } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await login(email, password);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="LoginPage">
            <div className="content">
                <h2>Sign In</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text" id="email" name="email" className="inputBox"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" id="password" name="password" className="inputBox"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn btn-lg loginButton">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
