import React, { useState } from 'react';
import $ from "jquery";
import axios from "axios";
import "../../style/LoginPage.css";
import {useNavigate} from "react-router-dom";
import { useLogin } from '../../hooks/useLogin';

function LoginPage() {

    let navigate = useNavigate();
    const {login, error, isLoading} = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const goToRegisterPage = () => {
        const path = `/register`;
        navigate(path)
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className={"LoginPage"}>
            <div className="content">
                <h2>Sign In</h2>
                <form className="form">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text" id="email" name="email" className="inputBox"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" id="password" name="password" className="inputBox"/>
                    </div>
                    <button onClick={goToRegisterPage} className="btn text-white register p-0">Sign Up</button>
                    <button onClick={handleSubmit} className="btn btn-lg  loginButton">Login</button>
                </form>

            </div>
        </div>

    )
}

// function requestLogin(event: any) {
//     event.preventDefault();
//     const email = $("#email")
//     const password = $("#password")
//     if (email.length !== 0 || password.length !== 0) {
//         const data = {
//             email: email.val(),
//             password: password.val()
//         };
//         axios.post(process.env.REACT_APP_API_ADDRESS + "/auth/login", data)
//             .then((response) => {
//                 console.log(response.data);
//                 window.location.href = '/tasks';
//                 localStorage.setItem("email", email.val() as string);
//                 localStorage.setItem("token", response.data.token);
//             }).catch((err) => {
//             console.log("Error: " + err.response.data);
//         });
//     }
// }

export default LoginPage;