import React, { useState} from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    password
                })
            });
            const data = await response.json();
            console.log(data);
            if(data.token)
            {   localStorage.setItem('token', data.token);
                localStorage.setItem('name', data.player.playerName);
                navigate('/menu');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignup = async(e) => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    password
                })
            });
            const data = await response.json();
            if(data.token)
            {   localStorage.setItem('token', data.token);
                localStorage.setItem('name', data.player.playerName);
                navigate('/menu');
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="Login-Page">
            <h1 className="login-title">WordleApp</h1>
            <div className="login-container">
                <div className="header">
                    <div className="sign-up-text">SignUp</div>
                </div>
                <div className="user-name-container">
                    <input
                        className="username-input"
                        placeholder="Username"
                        type="text"
                        value={name}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="password-container">
                    <input
                        className="password-input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="submit-container">
                    <button className="login-btn" onClick={handleLogin}>Login</button>
                    <button className="signup-btn" onClick={handleSignup}>Signup</button>
                </div>
            </div>
        </div>
    );
}
