import React from 'react';

function LoginPage() {
    return (
        <div className={"LoginPage"}>
            <h1>Login</h1>
            <form>
                <div>
                    <label htmlFor="email">Username</label>
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
    if (email.length === 0 || password.length === 0) {
        const data = {
            username: email,
            password: password
        };
        fetch("localhost:5005/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = "/";
            } else {
                alert("Invalid email or password");
            }
        }).catch((error) => {
            alert("Error: " + error);
        });
    }
}

export default LoginPage;