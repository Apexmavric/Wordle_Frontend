import React from 'react';
import ResetIcon from "../SvgIcons/ResetSvg";

const handleClick = async (setTime, setCol, setMessage, setResendOTP, setisLoading) => {
  const otp_token = localStorage.getItem('verify-otp-token');
  try {
    setisLoading(true);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/regenerate-otp`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token : otp_token })
    });
    const data = await response.json();
    setMessage(data.msg);
    if(response.status === 200){
        localStorage.setItem('otpTime', process.env.REACT_APP_OTP_EXPIRE_TIME);
        setTime(process.env.REACT_APP_OTP_EXPIRE_TIME);
        setCol(1);
        setResendOTP(prev=>!prev);
    }
    else{
        setCol(0);
    }
    setisLoading(false);
  } catch (err) {
    console.log(err);
  }
}

const ResendOtp = ({ time, setTime , setCol, setMessage, setResendOTP, setisLoading}) => {
  return (
    <div className="resend-otp" style={{ display: 'flex', alignItems: 'center' }}>
      <ResetIcon height="15px" />
      <h5
        className="resend-txt"
        onClick={time > 0 ? null : ()=>{handleClick(setTime, setCol, setMessage, setResendOTP, setisLoading)}} 
        style={{ marginLeft: '0px', color: time > 0 ? 'grey' : 'rgb(64, 64, 247)', cursor: time > 0 ? 'not-allowed' : 'pointer' }}
      >
        Resend Otp
      </h5>
    </div>
  );
}

export default ResendOtp
