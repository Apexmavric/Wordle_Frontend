import '../styles/Sidebar.css';
import { useNavigate } from "react-router";
import ProfilePic from "./ProfilePic";
import { forwardRef, useEffect, useState } from "react";

const Sidebar = forwardRef(({ isClosing }, ref) => {

    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const [details, setDetails] = useState(null);
    const [winRatio, setWinRatio] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchdetails = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/v1/player/details", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                setDetails(data.playerDetails);
                const gamesPlayed = data.playerDetails.stats.gamesPlayed;
                const wins = data.playerDetails.stats.wins;
                const ratio = gamesPlayed === 0 ? 0 : wins / gamesPlayed;
                const roundedRatio = parseFloat(ratio.toFixed(2)) * 100;
                setWinRatio(roundedRatio);
            } catch (error) {
                console.error(error);
            }
        }
        fetchdetails();
    }, []);

    return (
        <div className={`sidebar-container ${isClosing ? 'sidebar-exit' : ''}`} ref={ref}>
            <div className='profile-pic-container'>
                <ProfilePic />
            </div>
            {details && (
                <div className="sidebar-info-container">
                    <div className="sidebar-info">
                        <div>Name</div>
                        <div>{name}</div>
                    </div>
                    <div className="sidebar-info">
                        <div>Score</div>
                        <div>{details.stats.score}</div>
                    </div>
                    <div className="sidebar-info">
                        <div>MaxScore</div>
                        <div>{details.stats.maxScore}</div>
                    </div>
                    <div className="sidebar-info">
                        <div>MaxStreak</div>
                        <div>{details.stats.maxStreak}</div>
                    </div>
                    <div className="sidebar-info">
                        <div>Games Played</div>
                        <div>{details.stats.gamesPlayed}</div>
                    </div>
                    <div className="sidebar-info">
                        <div>Win Chances</div>
                        <div>{winRatio}</div>
                    </div>
                    <div className="sidebar-info">View Friends</div>
                    <div className="sidebar-info" onClick={() => { navigate('/gamedetails') }}>Game History</div>
                </div>
            )}
        </div>
    );
});

export default Sidebar;
