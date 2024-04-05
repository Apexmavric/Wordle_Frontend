import { useEffect, useState } from "react";
import { FaRankingStar } from "react-icons/fa6";

const LeaderBoard = () => {
    const [playerdetails, setPlayerdetails] = useState([]);
    const [showfriends, setShowfriends] = useState(false);
    const [friends, setFriends] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/v1/player", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            // console.log(data);
            setPlayerdetails(data.playerDetails);
        }
        const fetchFriends = async()=>{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/v1/player/friends", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            // console.log(data);
            setFriends(data.playerFriends);
        }
        fetchFriends();
        fetchDetails();
    }, [])
    const handleFriends = ()=>{
        setShowfriends(prev => !prev);
    }
    return (
        <div className="leaderboard-container">
        <table className="leaderboard">
                <thead className="leaderboard-head">
                    <div className="leaderboard-title">
                       <FaRankingStar />
                        <div>Rankings</div>
                        <label className="show-friends-btn">
                        <input
                            type="checkbox"
                            name="visibility"
                            value="friends"
                            onClick={handleFriends}
                        />
                        Show Friends Only
                    </label>
                    </div>
                    <tr className="leaderboard-hr">
                        <th className="leaderboard-hc">Rank</th>
                        <th className="leaderboard-hc">Name</th>
                        <th className="leaderboard-hc">Score</th>
                    </tr>
                </thead>
                <div className="table-body-container">
                <tbody className="table-body">
                    {
                        playerdetails && playerdetails.map((data,i)=>{
                            if(showfriends)
                            {   
                                if(friends.includes(data.playerId))
                                return (
                                    <tr className="table-body-row">
                                    <td className="table-data">{Number(i)+1}</td>
                                    <td className="table-data">{data.playerName}</td>
                                    <td className="table-data">{data.playerScore}</td>
                                    </tr>
                                )
                            }
                            else{
                            return (
                                <tr className="table-body-row">
                                <td className="table-data">{Number(i)+1}</td>
                                <td className="table-data">{data.playerName}</td>
                                <td className="table-data">{data.playerScore}</td>
                            </tr>
                            );
                            }
                        })
                    }
                </tbody>
                </div>
            </table>
             </div>
    );
}

export default LeaderBoard;
