import React, { useState, useCallback, useEffect } from "react";
import Spinner from "../components/Spinner";
import InputBar from "../components/InputBar";
import "../styles/ForgetPassword.css";
import ButtonTemp from "../components/ButtonTemp";


const Passwordset = ({setCol, setMessage, setAnimation, setPasswordSet})=>{
    const [validOtp, setValidOtp] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [newPassWord, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const[ isAvail, setisAvail] = useState(false);
    const [passMessage, setPassMessage]=useState(null);
    const [validPassword, setValidPassword]=useState(null);
    const passchangetoken = localStorage.getItem('pass-change-token');
    const handleClick = async()=>{
        try {
            setisLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/change-password`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: newPassWord, token : passchangetoken })
            });
            const data = await response.json();
            setMessage(data.msg);
            if(response.status === 200)
            {
                setCol(1);
            }
            else{
                setCol(0);
            }
            setAnimation(false);
            setisLoading(false);
            setPasswordSet(false);
           
        } catch (err) {
            console.log(err);
        }
    }

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;
        const hasNumbers = /[0-9]/;
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;
        console.log(password);
        if (
            password.length >= 8 &&
            hasUpperCase.test(password) &&
            hasLowerCase.test(password) &&
            hasNumbers.test(password) &&
            hasSpecial.test(password)
        ) {
            setPassMessage("Password valid!");
            setValidPassword(1);
        } else {
            if (password.length < 8) {
                setPassMessage("Password too short!");
            } else if (!hasUpperCase.test(password)) {
                setPassMessage("Uppercase Character missing!");
            } else if (!hasLowerCase.test(password)) {
                setPassMessage("Lowercase Character missing!");
            } else if (!hasNumbers.test(password)) {
                setPassMessage("Number is missing!");
            } else {
                setPassMessage("Special Character is missing!");
            }
            setValidPassword(0);
        }
    };
    useEffect(()=>{
        if(newPassWord){
            validatePassword(newPassWord);
        }
        if(confirmPassword  && newPassWord && validPassword)
        {
            setisAvail(confirmPassword === newPassWord);
        }
    },[confirmPassword, newPassWord])

    return(
        <div className={`Login-Page`}>
            <div className="login-container forget-password">
            <div className="login-title">WordleApp</div>
                <div className="animation-container">
                <div className="header">
                    <div className="heading-text">Password-Reset</div>
                </div>
                <div className="forget-password-container">
                    <InputBar placeholder="New Password" val={newPassWord} setVal={setNewPassword} col={validPassword} setCol={setValidPassword} msg={passMessage} />
                    <InputBar placeholder="Confirm Password" val={confirmPassword} setVal={setConfirmPassword} col={validOtp} setCol={setValidOtp} msg={passMessage}/>
                </div>
                <div className="submit-container">
                    <ButtonTemp value="Change Password" height="40%" width="40%" color="rgb(43, 130, 231)" isAvail={isAvail} onClick={handleClick} />
                </div>
            </div>
            </div>
        </div>
    );
}

export default Passwordset;