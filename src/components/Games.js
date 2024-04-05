import { useEffect, useState } from "react";
import { IoGameControllerOutline } from "react-icons/io5";

const Games = () => {
    const [gamedetails, setGamedetails] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchdetails = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/v1/game/details", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                console.log(data);
                setGamedetails(data.gameDetails);
            } catch (error) {
                console.error(error);
            }
        }
        fetchdetails();
    }, []);

    return (
        <div className="leaderboard-container">
            <table className="leaderboard">
                <thead className="leaderboard-head">
                    <div className="leaderboard-title">
                        <IoGameControllerOutline />
                        <div>Game History</div>
                        <label className="show-friends-btn"></label>
                    </div>
                    <tr className="leaderboard-hr">
                        <th className="leaderboard-hc">Date</th>
                        <th className="leaderboard-hc">Mode</th>
                        <th className="leaderboard-hc">Score</th>
                    </tr>
                </thead>
                <div className="table-body-container">
                    <tbody className="table-body">
                        {gamedetails && gamedetails.map((data, i) => (
                            <tr className="table-body-row" key={i}>
                                <td className="table-data">{data.date}</td>
                                <td className="table-data">{data.mode}</td>
                                <td className="table-data" style={{ color: data.score > 0 ? 'green' : 'rgb(152, 152, 152)' }}>
                                    {data.score}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </div>
            </table>
        </div>
    );
}

export default Games;
