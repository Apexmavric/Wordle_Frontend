import { useEffect, useState } from "react";
import { FaRankingStar } from "react-icons/fa6";

const LeaderBoard = () => {
    const [playerdetails, setPlayerdetails] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch("http://localhost:5000/api/v1/player", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data);
            setPlayerdetails(data.playerDetails);
        }
        fetchDetails();
    }, [])
    console.log(playerdetails);
    return (
        <div className="leaderboard-container">
        <table className="leaderboard">
                <thead className="leaderboard-head">
                    <div className="leaderboard-title">
                       <FaRankingStar />
                        <div>Rankings</div>
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
                            return (
                                <tr className="table-body-row">
                                <td className="table-data">{Number(i)+1}</td>
                                <td className="table-data">{data.playerName}</td>
                                <td className="table-data">{data.playerScore}</td>
                            </tr>
                            );
                        })
                    }
                </tbody>
                </div>
            </table>
             </div>
    );
}

export default LeaderBoard;
