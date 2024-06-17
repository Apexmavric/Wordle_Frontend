import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import InputBar from "../components/InputBar";
import "../styles/Register.css";
import ButtonTemp from "../components/ButtonTemp";
import { debounce } from 'lodash';
import EmailSvg from "../SvgIcons/EmailSvg";
import PassSvg from "../SvgIcons/PassSvg";
import UserSvg from "../SvgIcons/UserSvg";
import Popup from "../components/Popup";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [validUserName, setValidUserName] = useState(2);
    const [validPassword, setValidPassword] = useState(2);
    const [validEmail, setValidEmail] = useState(2);
    const [passMessage, setPassMessage] = useState(null);
    const [usernameMessage, setUsernameMessage] = useState(null);
    const [emailMessage, setEmailMessage] = useState(null);
    const [isAvailable, setIsAvailable] = useState(false);
    const [message, setMessage] = useState(null);
    const [col, setCol] = useState(1);

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
            setUsernameMessage(data.msg);
            if (response.status === 200) {
                setValidUserName(1);
            } else {
                setValidUserName(0);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const checkUserEmailAvailability = async (word) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/checkuseremail`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ new_email: word })
            });
            const data = await response.json();
            setEmailMessage(data.msg);
            if (response.status === 200) {
                setValidEmail(1);
            } else {
                setValidEmail(0);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;
        const hasNumbers = /[0-9]/;
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;

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

    const debouncedCheckUsername = useCallback(
        debounce(async (username) => {
            setIsLoading(true);
            await checkUserNameAvailability(username);
            setIsLoading(false);
        }, 300),
        []
    );

    const debouncedCheckEmail = useCallback(
        debounce(async (email) => {
            setIsLoading(true);
            await checkUserEmailAvailability(email);
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

    useEffect(() => {
        if (email) {
            debouncedCheckEmail(email);
        } else {
            setValidEmail(null);
        }
        return () => {
            debouncedCheckEmail.cancel();
        };
    }, [email, debouncedCheckEmail]);

    useEffect(() => {
        if (password) {
            validatePassword(password);
        }
    }, [password]);

    useEffect(() => {
        if (validEmail === 1 && validPassword === 1 && validUserName === 1) {
            setIsAvailable(true);
        } else {
            setIsAvailable(false);
        }
    }, [validEmail, validPassword, validUserName]);

    const handleClick = async () => {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password
            })
        });
        const data = await response.json();
        setMessage(data.msg);
        setIsLoading(false);
        if (response.status === 200) {
            setCol(1);
        } else {
            setCol(0);
        }
    };

    return (
        <div className={`Login-Page ${isLoading ? 'blur' : ''}`}>
            {isLoading && <Spinner />}
            {!message && <div className="login-container">
                <div className="login-title">WordleApp</div>
                <div className="header">
                    <div className="heading-text">Register</div>
                </div>
                <div className="register-input-container">
                    <InputBar placeholder="Username" val={username} setVal={setUsername} col={validUserName} setCol={setValidUserName} msg={usernameMessage} />
                    <InputBar placeholder="Email" val={email} setVal={setEmail} col={validEmail} setCol={setValidEmail} msg={emailMessage} type="email" />
                    <InputBar placeholder="Password" val={password} setVal={setPassword} col={validPassword} setCol={setValidPassword} msg={passMessage} type="password" />
                    <div className="svg-logos" style={{ height: '60%' }}>
                        <UserSvg color="white" height="70%" />
                        <EmailSvg color="white" height="70%" />
                        <PassSvg color="white" height="70%" />
                    </div>
                </div>
                <div className="submit-container">
                    <ButtonTemp value="Register" height="60%" width="40%" color="rgb(43, 130, 231)" isAvail={isAvailable} onClick={handleClick} />
                </div>
            </div>}
            {message && !isLoading && <div className="register-message-container">
                <Popup col={col} setAnimation={false} setMessage={setMessage} message={message} />
            </div>}
        </div>
    );
}
