import React, { useEffect, useState, useRef } from "react";
import SearchBar from "../components/Searchbar";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import '../styles/FriendsPage.css';

export default function FriendsPage() {
    const keysToKeep = ['name', 'token'];
    for (let key in localStorage) {
        if (!keysToKeep.includes(key)) {
            localStorage.removeItem(key);
        }
    }
    const token = localStorage.getItem('token');
    const navigate = useNavigate(null);
    const [isblur, setisBlur] = useState(false);

    
    useEffect(() => {
        const verify_token = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/v1/verify/verify_token", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                let data = await response.json();
                // console.log(data);
                if (data.msg === 'Authentication Invalid') {
                    localStorage.clear();
                    alert('Your session has expired try logging in again !!');
                    navigate('/');
                }
            } catch (error) {
                console.error(error);
            }
        }
        verify_token();
    }, [token, navigate]);


   

    return (
        token && (
            <div className={`MenuPage ${isblur ? ' ' : ' '}`}>
               <NavBar setisBlur={setisBlur} val={2}/>
                <SearchBar/>
            </div>
        )
    );
}
