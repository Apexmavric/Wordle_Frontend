import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";

import { MdOutlineExitToApp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const AccountDetails = () => {
    const [showdetails, setShowDetails] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        setShowDetails(!showdetails); 
    };
    let name = localStorage.getItem('name');
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const handleLogout = (e)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/');
    }
    name = capitalizeFirstLetter(name);
    return (
        <div className='account-details-par'>
            <div className="account-details" onClick={handleClick}>{name}
            </div>
            {showdetails && (<div className='account-options'>
                <Link to = '/profile' className='acc-btn'>
                    <div style={{display:'flex',alignItems:'center'}}><RxAvatar /></div>
                    <div >Account</div>
                </Link>
                <div className='acc-btn'>
                <div style={{display:'flex',alignItems:'center'}}><MdOutlineExitToApp /></div>
                    <div  onClick={handleLogout}>Logout</div>
                </div>
            </div>)}
            
        </div>
    );
};

export default AccountDetails;
