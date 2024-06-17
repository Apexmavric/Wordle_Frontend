import { useEffect, useState, forwardRef } from "react";

const LiveLeaderBoard = forwardRef(({ users, guessedPeople, text }, ref) => {
  return (
    <div className={`live-leaderboard-container`} ref={ref} style={ref !== null ? {top : '50px'} : null}>
      <table className="leaderboard">
        <thead className="leaderboard-head">
          <div className="leaderboard-title" style={{ display: "flex", justifyContent: "center" }}>
            <div>{text}</div>
          </div>
          <tr className="leaderboard-hr">
            <th className="leaderboard-hc">Name</th>
            <th className="leaderboard-hc">Score</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {Array.isArray(users) && guessedPeople &&  users.map((data,i) => {
              if(ref!=null)
              {
                if(data.playerName === localStorage.getItem('name'))
                {
                  localStorage.setItem('pos', i+1);
                }
              }
              const isGuessed = guessedPeople.includes(data.playerName);
              return (
                <tr className={`table-body-row ${isGuessed ? 'guessed' : ''}`} key={data.playerName}>
                  <td className="table-data">{data.playerName}</td>
                  <td className="table-data">{data.score}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
});

export default LiveLeaderBoard;
