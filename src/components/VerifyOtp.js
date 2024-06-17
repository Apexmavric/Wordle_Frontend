import React, { useState, useCallback, useEffect } from "react";
import Spinner from "../components/Spinner";
import InputBar from "../components/InputBar";
import "../styles/ForgetPassword.css";
import ButtonTemp from "../components/ButtonTemp";
import ExpireOtp from "./ExpireOtp";
import ResendOtp from "./ResendOtp";

const VerifyOtp = ({setPasswordSet, setVerifyOtp, setCol, setMessage})=>{
    const [otp, setOtp] = useState(null);
    const [validOtp, setValidOtp] = useState(null);
    const [otpMessage, setOtpMessage] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const initialTime = parseInt(localStorage.getItem('otpTime')) || process.env.REACT_APP_OTP_EXPIRE_TIME;
    const [time, setTime] = useState(initialTime);
    const verifyOtpToken = localStorage.getItem('verify-otp-token');
    const [resendOTP, setResendOTP] = useState(false);

 
    const handleClick = async()=>{
        try {
            setisLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/verify-otp`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp: otp, token : verifyOtpToken })
            });
            const data = await response.json();
            setMessage(data.msg);
            if(response.status === 200)
            {
                setCol(1);
                setVerifyOtp(false);
                setPasswordSet(true);
                localStorage.setItem('pass-change-token', data.token);
            }
            else{
                setCol(0);
            }
            setisLoading(false);
        } catch (err) {
            console.log(err);
        }
    }


    return(
        <div className={`Login-Page ${isLoading ? 'blur' : ''}`}>
             {isLoading && <Spinner />}
            <div className="login-container forget-password">
            <div className="login-title">WordleApp</div>
                <div  className="animation-container">
                        <div className="header">
                            <div className="heading-text">Verify OTP</div>
                        </div>
                        <div className="forget-password-container">
                            <InputBar placeholder="OTP" val={otp} setVal={setOtp} col={validOtp} setCol={setValidOtp} msg={otpMessage} center={1}/>
                        </div>
                        <div className="otp-options">
                            <ExpireOtp time={time} setTime={setTime} resendOTP={resendOTP}/>
                            <ResendOtp time={time} setTime={setTime} setCol={setCol} setMessage={setMessage} setResendOTP={setResendOTP} setisLoading={setisLoading}/>
                        </div>
                        <div className="submit-container">
                            <ButtonTemp value="Verify OTP" height="40%" width="40%" color="rgb(43, 130, 231)" isAvail={otp} onClick={handleClick} />
                        </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;