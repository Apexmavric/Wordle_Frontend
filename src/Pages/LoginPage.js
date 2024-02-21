import React from "react";
export default function LoginPage(){
    return(
        <div className="login-container">
                <div className="header">
                        <div className="sign-up-text">SignUp</div>
                </div>
                <div className="user-name-container">
                    <input className="username-input" placeholder="Username" type="text"/>
                </div>
                <div className="password-container">
                    <input className="password-input" placeholder="Password" type="text"/>
                </div>
                <div className="submit-container">
                    <button className="login-btn">Login</button>
                    <button className="signup-btn">Signup</button>
                </div>
        </div>
    );
}