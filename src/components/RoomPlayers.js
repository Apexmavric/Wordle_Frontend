import React, { useEffect, useState } from 'react';
import { IoMdRemoveCircleOutline } from "react-icons/io";

const RoomPlayers = ({ users, name, socket, setUsers, profilePics}) => {

  const handleKick = (playerName) => {
    if (socket) {
      socket.emit('kick-out', localStorage.getItem('room'), playerName, users.admin);
      socket.on('users', (e) => {
        setUsers(e);
      });
    }
  };

  return (
    <div className="room-players-data-container">
      {users && users.players.map((data, index) => {
        const bg = users.admin === data.playerName ? 'lightblue' : 'aliceblue';
        const playerImage = profilePics.get(data.playerName);
        console.log(`Player ${data.playerName} : ${playerImage}`);
        if (users.admin === name) {
          return (
            <div className="room-players-data admin" key={index}>
              <div className="room-players-data" style={{ color: bg }}>
                {playerImage && (
                  <img src={playerImage} alt={data.playerName} className="profile-image room-img" />
                )}
                <div style={{ position: 'absolute', left: '50%'}}>{data.playerName}</div>
              </div>
              <IoMdRemoveCircleOutline className="remove-btn-admin" onClick={() => handleKick(data.playerName)} />
            </div>
          );
        } else {
          return (
            <div className="room-players-data" style={{ color: bg }} key={index}>
              <div>
                {playerImage && (
                  <img src={playerImage} alt={data.playerName} className="profile-image" />
                )}
                {data.playerName}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default RoomPlayers;
