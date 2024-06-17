import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import InputBar from "../components/InputBar";
import "../styles/Login.css";
import ButtonTemp from "../components/ButtonTemp";
import UserSvg from "../SvgIcons/UserSvg";
import PassSvg from "../SvgIcons/PassSvg";
import Popup from "../components/Popup";

export default function LoginPage() {
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsloading] = useState(false);
    const [validUserName, setValidUserName] = useState(2);
    const [validPassword, setValidPassword] = useState(2);
    const [isAvail, setisAvail] = useState(false);
    const [showPass, setshowPasss] = useState(false);
    const [message, setMessage] = useState(null);

    const handleLogin = async () => {
        try {
            setIsloading(true);
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
            
            if(response.status === 200){
                if(data.token)
                {   
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('name', data.player.playerName);
                    navigate('/play');
                }
            }
            else{
                setTimeout(() => {
                    setMessage(data.msg);
                    setIsloading(false);
                }, 200); 
            }
        } catch (error) {
            console.error(error);
        }
    };

    const toggleshowPass = () => {
        setshowPasss(prev => !prev);
    };
    useEffect(()=>{
        if(password && name){
            setisAvail(true);
        }
        else setisAvail(false);
    },[[password, name]])
    return (
        <div className={`Login-Page ${isLoading ? 'blur' : ''}`}>      
            { isLoading && <Spinner />}
            <div className="login-container">
                <div className="login-title">
                    <div>Wordle</div>
                </div>
                <div className="header">
                    <div className="heading-text">Login</div>
                </div>
                <div className="login-input-container">
                    <InputBar placeholder="Username" val={name} setVal={setUsername} col={validUserName} setCol={setValidUserName} />
                    <InputBar placeholder="Password" val={password} setVal={setPassword} col={validPassword} setCol={setValidPassword} type={showPass ? 'text' : 'password'} />
                    <div className="svg-logos">
                        <UserSvg color="white" height="70%" />
                        <PassSvg color="white" height="70%" />
                    </div>
                </div>
                <div className="forget-password-container">
                    <div className="show-pass-container">
                        <input type="checkbox" checked={showPass} onChange={toggleshowPass} id="show-password" />
                        <label htmlFor="show-password">Show Password</label>
                    </div>
                    <a href="/forget-password" className="forget-pass">Forget Password?</a>
                </div>
                <div className="submit-container">
                    <ButtonTemp value="Login" height="70%" width="40%" color="rgb(75, 181, 67)" onClick={handleLogin} isAvail={isAvail} />
                </div>
                <div className="header" style={{ fontWeight: "5", fontSize: "15px" }}>
                    Don't have an Account?
                    <a style={{ marginLeft: '10px' }} href="/register">Register</a>
                </div>
            </div>
            <div className="login-popup">
                {message && !isLoading && <Popup col="0" message={message} setMessage={setMessage} setAnimation={true} />}
            </div>
        </div>
    );
}
