import React, { useState, useEffect } from 'react';
import '../styles/ForgetPassword.css'

const ExpireOtp = ({time, setTime, resendOTP  }) => {

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1;
          localStorage.setItem('otpTime', newTime);
          return newTime;
        } else {
          clearInterval(timerId);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [resendOTP]);

  return (
    <div className='expire-otp-container'>
      <h5>Time left :</h5> 
      <h5>{time}</h5>
    </div>
  );
};

export default ExpireOtp;
