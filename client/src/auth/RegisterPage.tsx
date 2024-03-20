import React from 'react';
import $ from "jquery";
import axios from "axios";

function LoginPage() {
    return (
        <div className={"RegisterPage"}>
            <h1>Register</h1>
            <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="surname">Surname</label>
                    <input type="text" id="surname" name="surname" />
                </div>
                <button onClick={requestRegister}>Register</button>
            </form>
        </div>
    )
}

function requestRegister(event: any) {
    event.preventDefault();
    const email = $("#email")
    const password = $("#password")
    const name = $("#name")
    const surname = $("#surname")
    if (email.length !== 0 || password.length !== 0
    || name.length !== 0 || surname.length !== 0) {
        const data = {
            email: email.val(),
            password: password.val(),
            name: name.val(),
            surname: surname.val()
        };
        axios.post("http://localhost:3000/auth/register", data).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    }
}

export default LoginPage;