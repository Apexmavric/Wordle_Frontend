import React, { useState, useCallback, useEffect } from "react";
import Spinner from "../components/Spinner";
import InputBar from "../components/InputBar";
import "../styles/ForgetPassword.css";
import ButtonTemp from "../components/ButtonTemp";
import { debounce } from 'lodash';
import EmailSvg from "../SvgIcons/EmailSvg";
import PassSvg from "../SvgIcons/PassSvg";
import UserSvg from "../SvgIcons/UserSvg";
import Popup from "../components/Popup";
import VerifyOtp from "../components/VerifyOtp";
import Passwordset from "../components/PasswordSet";

export default function ForgetPassword() {
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [validUserName, setValidUserName] = useState(2);
    const [usernameMessage, setUsernameMessage] = useState(null);
    const [message, setMessage] = useState(null);
    const [col, setCol] = useState(1);
    const [veirfyOtp, setVerifyOtp] = useState(false);
    const [generateOtp, setGenerateOtp] = useState(true);
    const [passwordset, setPasswordSet] = useState(false);
    const [animation, setAnimation] = useState(true);

    const checkUserNameAvailability = async (word) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/checkusername`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ new_name: word })
            });
            const data = await response.json();
            if (response.status === 200 && word.length <=1) {
                setValidUserName(0);
                setUsernameMessage("Invalid User");
            } else {
                setValidUserName(1);
                setUsernameMessage("Valid User");
            }
        } catch (err) {
            console.log(err);
        }
    };


    const debouncedCheckUsername = useCallback(
        debounce(async (username) => {
            setIsLoading(true);
            await checkUserNameAvailability(username);
            setIsLoading(false);
        }, 300),
        []
    );

    useEffect(() => {
        if (username) {
            debouncedCheckUsername(username);
        } else {
            setValidUserName(null);
        }
        return () => {
            debouncedCheckUsername.cancel();
        };
    }, [username, debouncedCheckUsername]);


    const handleClick = async () => {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/generate-otp`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
            })
        });
        const data = await response.json();
        setMessage(data.msg);
        setIsLoading(false);
        if (response.status === 200) {
            localStorage.setItem('verify-otp-token', data.token);
            setCol(1);
            setVerifyOtp(true);
            setGenerateOtp(false);
        } else {
            setCol(0);
        }
    };

    return (
        <div className={`Login-Page ${isLoading ? 'blur' : ''}`}>
            {isLoading && <Spinner />}
            {generateOtp && <div className="login-container forget-password">
                <div className="login-title">WordleApp</div>
                <div className="header">
                    <div className="heading-text">Forget Password</div>
                </div>
                <div className="forget-password-container">
                    <InputBar placeholder="Username" val={username} setVal={setUsername} col={validUserName} setCol={setValidUserName} msg={usernameMessage} padding = "10px"/>
                    <div className="svg-logos" style={{ height: '20%' }}>
                        <UserSvg color="white" height="70%" />
                    </div>
                </div>
                <div className="submit-container">
                    <ButtonTemp value="Get OTP" height="40%" width="40%" color="rgb(43, 130, 231)" isAvail={username} onClick={handleClick} />
                </div>
            </div>}
            {message && !isLoading && <div className="forget-message-container">
                <Popup col={col} setAnimation={animation} setMessage={setMessage} message={message} time={7000}/>
            </div>}
            {
                veirfyOtp && <VerifyOtp setPasswordSet={setPasswordSet} setVerifyOtp={setVerifyOtp} setCol={setCol} setMessage={setMessage}/>
            }
            {
                passwordset && <Passwordset setCol={setCol} setMessage={setMessage} setAnimation={setAnimation} setPasswordSet={setPasswordSet}/>
            }
        </div>
    );
}
