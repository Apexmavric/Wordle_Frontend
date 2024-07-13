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
      {users && profilePics && users.players.map((data, index) => {
        const bg = users.admin === data.playerName ? 'lightblue' : 'aliceblue';
        const playerImage = profilePics.get(data.playerName);
        console.log(typeof(playerImage));
        console.log(data.playerName,  playerImage);
        if (users.admin === name) {
          return (
            <div className="room-players-data admin" key={index}>
                <span style={{position:'absolute', left:'10%'}}>{index + 1}</span>
                <div style={{ color: bg }}>{data.playerName}</div>
              <IoMdRemoveCircleOutline className="remove-btn-admin" onClick={() => handleKick(data.playerName)} />
            </div>
          );
        } else {
          return (
             <div className="room-players-data admin" key={index}>
               <span style={{position:'absolute', left:'10%'}}>{index + 1}</span>
                  <div style={{ color: bg }}>{data.playerName}</div>
              </div>

          );
        }
      })}
    </div>
  );
};

export default RoomPlayers;
