import React, { useEffect, useState } from "react";
import AccountDetails from "../components/AccountDetails";
import Sidebar from "../components/SideBar";
import { io } from "socket.io-client";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import GameParameters from "../components/GameParameters";

export default function CreateRoom() {
    const [socket, setSocket] = useState('');
    const [room, setRoom] = useState(localStorage.getItem('room'));
    const [users, setUsers] = useState({players : [], admin : ""});
    const [time, setTime] = useState(30);
    const [rounds, setRounds] = useState(2);
    const name = localStorage.getItem('name');
    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_BACKEND_URL);
        setSocket(newSocket);
        newSocket.on('connect', () => {
            setSocket(newSocket);
            console.log(newSocket.id);
            if (!localStorage.getItem('room')) {
                newSocket.emit('create-room', name);
                newSocket.on('room-created', (id) => {
                    localStorage.setItem('room', id);
                    setRoom(id);
                }); 
                newSocket.on('users', (e) => {
                    setUsers(e);
                }); 
            } else {
                setRoom(localStorage.getItem('room'));
                newSocket.emit('join-room', localStorage.getItem('room'), name);
                newSocket.on('users', (e) => {
                    setUsers(e);
                });
            }
            newSocket.emit('refresh-ids', name);
        });
        return (()=>{
            if(localStorage.getItem('room'))
            {
                newSocket.emit('leave-room' , localStorage.getItem('room'), name);
                setUsers("");
                localStorage.removeItem('room')
            }
        })
    }, []);

    useEffect(()=>{
        if(socket)
        {   
            if(localStorage.getItem('room'))
            {   console.log('sending time and rounds info');
                if(users && users.admin === name) socket.emit('game-infos',room, rounds, time);
            }
        }
    },[rounds, time])

    const handleLeave = (e)=>{
        if(socket)
        {   
            if(localStorage.getItem('room'))
            {
                socket.emit('leave-room' , localStorage.getItem('room'), name);
                setUsers("");
                localStorage.removeItem('room');
                localStorage.removeItem('rounds');
                localStorage.removeItem('time');
            }
            
        }
    }

    const handleKick = (playerName)=>{
        if(socket)
        {
            socket.emit('kick-out', localStorage.getItem('room'), playerName, users.admin);
            socket.on('users' , (e)=>{
                setUsers(e);
            })
        }
    }
    return (
        <div className="MenuPage">
            <div className="menu-navbar">
                <div className="menu-title">Wordle</div>
                <AccountDetails />
            </div>
            <Sidebar />
            <div className="game-details-text">
                <div> Rounds : {rounds}</div>
                <div>Time : {time}</div>
            </div>
            {
               users && (users.admin === name) && <GameParameters setRounds = {setRounds} setTime = {setTime}/>
            }
            <div className="room-players-container">
                <div className="room-players-title">
                    <div className="room-players-title-text">Room {room}</div>
                </div>
                <div className="room-players-data-container">
                    {           
                                users && users.players.map((data, index) => {
                                const bg = users.admin === data.playerName ? 'lightblue' : 'aliceblue';
                                if(users.admin === name)
                                {   
                    
                                    return (<div className="room-players-data-admin">
                                                  <div className="room-players-data" style={{ color: bg }} key={index}>{data.playerName}</div>
                                                    < IoMdRemoveCircleOutline className="remove-btn-admin"  onClick={()=>{handleKick(data.playerName)}}/>
                                           </div>)
                                }
                                else return <div className="room-players-data" style={{ color: bg }} key={index}>{data.playerName}</div>;
                        })
                    }
                </div>
                <button className="leave-btn" onClick={handleLeave}>Leave Room</button>
            </div>
        </div> 
    );
}
