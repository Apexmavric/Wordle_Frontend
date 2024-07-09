import React, { useState, useEffect, useRef, useContext } from "react";
import AccountDetails from "./AccountDetails";
import Sidebar from "./SideBar";
import { ReactComponent as MenuSVgIcon } from "../SvgIcons/icons8-menu.svg";
import '../styles/Navbar.css';
import '../styles/Sidebar.css';  // Import the CSS for sidebar animations
import { useNavigate } from "react-router";
import BlurContext from "../context/Playercontext";
export default function NavBar({val, wantNavbar = 1}) {
    const [showSidebar, setShowsidebar] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const sidebarRef = useRef(null);
    const {setisBlur, isblur} = useContext(BlurContext);
    const navigate = useNavigate();
    const handleMenuClick = () => {
        setShowsidebar(true);
        setIsClosing(false);
        setisBlur(true);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsClosing(true);
        }
    };

    useEffect(() => {
        if (showSidebar) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSidebar]);

    useEffect(() => {
        if (isClosing) {
            const timer = setTimeout(() => {
                setShowsidebar(false);
                setIsClosing(false);
                setisBlur(false);
            }, 500); 

            return () => clearTimeout(timer);
        }
    }, [isClosing]);

    return (
        <div className="menu-navbar">
            {!showSidebar && !isClosing && (
                <div className="menu-logo">
                    <MenuSVgIcon onClick={handleMenuClick} height="100%" width="100%" />
                </div>
            )}
            {showSidebar && (
                <Sidebar ref={sidebarRef}  isClosing={isClosing} />
            )}
            <div className={`menu-title ${isblur ? 'blur' : ''}`}>Wordle</div>
            <AccountDetails />
            {wantNavbar && <div className={`nav-buttons-container ${isblur ? 'blur' : ''}`}>
               <h3 className={`nav-buttons ${val === 0 ? 'stay': ''}`} onClick={()=>{navigate('/leaderboard')}}>LeaderBoard</h3>
               <h3 className={`nav-buttons ${val === 1 ? 'stay': ''}`} onClick={()=>{navigate('/play')}}>Play</h3>
               <h3 className={`nav-buttons ${val === 2 ? 'stay': ''}`} onClick={()=>{navigate('/friends')}}>Friends</h3>
            </div>}
        </div>
    );
}
