import React, { useState } from 'react';
import $ from "jquery";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../../style/RegisterPage.css";
import { useSignup } from '../../hooks/useSignup';

function RegisterPage() {

    let navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const {signup, error, isLoading} = useSignup()

    const goToLoginPage = () => {
        const path = `/login`;
        navigate(path);
    };

    
    const handleSubmit = async (e: any) => {
        e.preventDefault()
    
        await signup(email, password, name, surname)
    }

    return (
        <div className={"RegisterPage"}>
            <div className="content">
                <h2>Sign Up</h2>
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
                    <div>
                        <label htmlFor="name">Name</label>
                        <input 
                        onChange={(e) => setName(e.target.value)}
                        type="text" id="name" name="name" className="inputBox"/>
                    </div>
                    <div>
                        <label htmlFor="surname">Surname</label>
                        <input 
                        onChange={(e) => setSurname(e.target.value)}
                        type="text" id="surname" name="surname" className="inputBox"/>
                    </div>
                    <button onClick={goToLoginPage} className="btn text-white login p-0">Sign In</button>
                    <button onClick={handleSubmit} className="btn btn-lg  registerButton">Sign Up</button>
                </form>
            </div>
        </div>
    )
}


export default RegisterPage;