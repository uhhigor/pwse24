import React, {useEffect, useState} from 'react';
import "../../style/ProfileManagement.css";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {useParams} from "react-router";
import $ from "jquery";
import {getEmail} from "../../UserData";

type User = {
    email: string;
    password: string;
    name: string;
    surname: string;
};

const ProfileManagement: React.FC = () => {
    let emailData = useParams().email;
    const [isEditable, setIsEditable] = useState<boolean>(true);
    const [user, setUser] = useState<User>({
        email: '',
        password: '',
        name: '',
        surname: ''
    });
    const getUser = () => {
        axios.get(process.env.REACT_APP_API_ADDRESS + "/users/" + encodeURIComponent(emailData as string))
            .then(response => {
                const { email, name, surname } = response.data;
                setUser({ email, password: '', name, surname });
            }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    const toggleEditable = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        setIsEditable(prevState => !prevState);
    };

    let navigate = useNavigate();

    const goBack = () => {
        navigate("/home");
    };

    function everythingIsFilled(): boolean {
        return $("#email").val() !== "" && $("#password").val() !== "" && $("#name").val() !== "" && $("#surname").val() !== "";
    }

    const saveChanges = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (everythingIsFilled()) {
        event.preventDefault();
        toggleEditable(event)
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
            axios.put(process.env.REACT_APP_API_ADDRESS + "/users/" + encodeURIComponent(emailData as string), data).then((response) => {
                console.log(response.data);
                localStorage.setItem("email", email.val() as string);
                navigate("/profileManagement/" + encodeURIComponent(getEmail() as string));
            }).catch((err) => {
                console.log("Error: " + err.response.data);
            });
        }} else {
            alert("Please fill all the fields");
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="ProfileManagement">
            <div className="content">
                <h2>Profile</h2>
                <form className="form">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input disabled={isEditable} type="text" id="email" name="email" className="inputBox"
                               onChange={handleInputChange}
                               value={user?.email}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input disabled={isEditable} type="password" id="password" name="password" className="inputBox"
                               onChange={handleInputChange}
                               value={user?.password}/>
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input disabled={isEditable} type="text" id="name" name="name" className="inputBox"
                               onChange={handleInputChange}
                               value={user?.name}/>
                    </div>
                    <div>
                        <label htmlFor="surname">Surname</label>
                        <input disabled={isEditable} type="text" id="surname" name="surname" className="inputBox"
                               onChange={handleInputChange}
                               value={user?.surname}/>
                    </div>
                    <button onClick={goBack} className="btn text-white login p-0">Go back</button>
                    <button onClick={isEditable ? toggleEditable : saveChanges}
                            className="btn btn-lg  registerButton">{isEditable ? 'Change data' : 'Save'}</button>
                </form>
            </div>
        </div>
    );
}

export default ProfileManagement;