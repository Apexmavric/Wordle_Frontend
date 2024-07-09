import { useEffect, useState } from "react";
import { FaRankingStar } from "react-icons/fa6";
import Spinner from "./Spinner";


const LeaderBoard = () => {
    const [playerdetails, setPlayerdetails] = useState([]);
    const [showfriends, setShowfriends] = useState(false);
    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/v1/player", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setPlayerdetails(data.playerDetails);
            setIsLoading(false);
        }
        
        fetchDetails();
    }, [])
    useEffect(()=>{
        const fetchFriends = async()=>{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/v1/player/friends", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setFriends(data.playerFriends);
        }
        fetchFriends();
    },[])
    const handleFriends = ()=>{
        setShowfriends(prev => !prev);
    }
    return (
        <div className={`leaderboard-container ${isLoading ? 'blur' : ''}`}>
        {
            isLoading && <Spinner/>
        }
        <table className="leaderboard">
                <thead className="leaderboard-head">
                    <div className="leaderboard-title">
                        <div style={{display:'flex', justifyContent:'space-between' ,width:'140px', alignItems:'center'}}>
                            <FaRankingStar />
                            <div>Global Rankings</div>
                        </div>
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
                                if(friends.includes(data.playerName))
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
