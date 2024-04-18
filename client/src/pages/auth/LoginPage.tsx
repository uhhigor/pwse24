import React from 'react';
import $ from "jquery";
import axios from "axios";
import "../../style/LoginPage.css";
import {useNavigate} from "react-router-dom";

function LoginPage() {

    let navigate = useNavigate();

    const goToRegisterPage = () => {
        const path = `/register`;
        navigate(path)
    };

    return (
        <div className={"LoginPage"}>
            <div className="content">
                <h2>Sign In</h2>
                <form className="form">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" className="inputBox"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className="inputBox"/>
                    </div>
                    <button onClick={goToRegisterPage} className="btn text-white register p-0">Sign Up</button>
                    <button onClick={requestLogin} className="btn btn-lg  loginButton">Login</button>
                </form>

            </div>
        </div>

    )
}

function requestLogin(event: any) {
    event.preventDefault();
    const email = $("#email")
    const password = $("#password")
    if (email.length !== 0 || password.length !== 0) {
        const data = {
            email: email.val(),
            password: password.val()
        };
        axios.post(process.env.REACT_APP_API_ADDRESS + "/auth/login", data)
            .then((response) => {
                console.log(response.data);
                window.location.href = '/tasks';
            }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    }
}

export default LoginPage;