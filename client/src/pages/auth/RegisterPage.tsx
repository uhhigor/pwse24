import React from 'react';
import $ from "jquery";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../../style/RegisterPage.css";

function RegisterPage() {

    let navigate = useNavigate();

    const goToLoginPage = () => {
        const path = `/login`;
        navigate(path);
    };

    return (
        <div className={"RegisterPage"}>
            <div className="content">
                <h2>Sign Up</h2>
                <form className="form">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" className="inputBox"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className="inputBox"/>
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" className="inputBox"/>
                    </div>
                    <div>
                        <label htmlFor="surname">Surname</label>
                        <input type="text" id="surname" name="surname" className="inputBox"/>
                    </div>
                    <button onClick={goToLoginPage} className="btn text-white login p-0">Sign In</button>
                    <button onClick={requestRegister} className="btn btn-lg  registerButton">Sign Up</button>
                </form>
            </div>
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
        axios.post(process.env.REACT_APP_API_ADDRESS + "/auth/register", data).then((response) => {
            console.log(response.data);
            window.location.href = '/tasks';
            localStorage.setItem("email", email.val() as string);
        }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    }
}

export default RegisterPage;