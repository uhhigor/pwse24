import React from 'react';
import $ from "jquery";
import axios from "axios";

function LoginPage() {
    return (
        <div className={"LoginPage"}>
            <h1>Login</h1>
            <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button onClick={requestLogin}>Login</button>
            </form>
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
        axios.post("http://localhost:3000/auth/login", data)
            .then((response) => {
                console.log(response.data);
        }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    }
}

export default LoginPage;