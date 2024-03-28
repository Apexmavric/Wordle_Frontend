import { useNavigate } from "react-router";
import Fileupload from "./Fileupload";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const [details, setDetails] = useState(null);
    const [winRatio, setWinRatio] = useState(0); // State to store the win ratio
    const navigate = useNavigate();
    useEffect(() => {
        const fetchdetails = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/v1/player/details", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                setDetails(data.playerDetails);

                // Calculate win ratio after setting details
                const gamesPlayed = data.playerDetails.stats.gamesPlayed;
                const wins = data.playerDetails.stats.wins;
                const ratio = gamesPlayed === 0 ? 0 : wins / gamesPlayed;
                const roundedRatio = parseFloat(ratio.toFixed(2))*100; // Round to two decimal places
                setWinRatio(roundedRatio);
            } catch (error) {
                console.error(error);
            }
        }
        fetchdetails();
    }, []);

    return (
        <div className="sidebar-container">
            <Fileupload />
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
                        <div>No of games Played</div>
                        <div>{details.stats.gamesPlayed}</div>
                    </div>
                    <div className="sidebar-info">
                        <div>Win Chances</div>
                        <div>{winRatio}</div>
                    </div>
                    <div className="sidebar-info">View Friends</div>
                    <div className="sidebar-info" onClick={()=>{navigate('/gamedetails')}}>Game History</div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
