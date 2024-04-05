import React, { useEffect, useState } from "react";
import AccountDetails from "../components/AccountDetails";
import Sidebar from "../components/SideBar";
import { io } from "socket.io-client";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { Kitchen } from "@mui/icons-material";


export default function CreateRoom() {
    const [socket, setSocket] = useState('');
    const [room, setRoom] = useState(localStorage.getItem('room'));
    const [froom, setFroom] = useState(localStorage.getItem('room'));
    const [users, setUsers] = useState({players : [], admin : ""});
    const name = localStorage.getItem('name');
    const [showusers, setShowUsers] = useState(false);
    
   useEffect(() => {
    const newSocket = io(process.env.REACT_APP_BACKEND_URL);
    setSocket(newSocket);
    newSocket.on('connect', () => {
        console.log(newSocket.id);
        setSocket(newSocket);
        if (localStorage.getItem('room')) {
            console.log(room);
            newSocket.emit('join-room', localStorage.getItem('room'), name);
            newSocket.on('users', (e) => {
                // console.log(e);
                setUsers(e);
            });
        }
        newSocket.on('user-left', ()=>{
            console.log('user-;eft-triggered');
            localStorage.removeItem('room');
            setUsers("");
            setFroom("");
        })
        newSocket.emit('refresh-ids', name);
    });
    return (()=>{
        // console.log("page left")
        // console.log('disconnect');
        if(localStorage.getItem('room'))
        {
            newSocket.emit('leave-room' , localStorage.getItem('room'), name);
            setUsers("");
            localStorage.removeItem('room');
        }
    })
}, []);
    
    const RoomChangeHandler = (e)=>{
        e.preventDefault();
        setRoom(e.target.value);
    }
    
    const handleClick = (e)=>{
        e.preventDefault();
        localStorage.setItem('room', room);
        if(socket)
        {
            socket.emit('join-room', localStorage.getItem('room'), name);
            socket.on('users', (e) => {
                // console.log(e);
                setUsers(e);
            });
        }

    }
    const handleLeave = ()=>{
        if(socket)
        {
            socket.emit('leave-room' , localStorage.getItem('room'), name);
            setUsers("");
            localStorage.removeItem('room');
            setShowUsers(false);
        }
    }
    const handleKick = (playerName)=>{
        // console.log(localStorage.getItem('room'), playerName, users.admin);
        if(socket)
        {   
            socket.emit('kick-out', localStorage.getItem('room'), playerName, users.admin);
            socket.on('users' , (e)=>{
                setUsers(e);
            })
        }
    }
    // console.log(users);
    return (
        <div className="MenuPage">
            <div className="menu-navbar">
                <div className="menu-title">Wordle</div>
                <AccountDetails />
            </div>
            <Sidebar />
            <form className="join-room-form">
                <input type="text" value = {room} onChange={RoomChangeHandler} className="join-room-input"></input>
                <input type="submit" value="Join" onClick={handleClick}></input>
            </form>
            <div className="room-players-container">
                <div className="room-players-title">
                    <div className="room-players-title-text">Room {room}</div>
                </div>
                <div className="room-players-data-container">
                    {               
                            users && users.admin === name && users.players.map((data, index) => {
                            const bg = users.admin === data.playerName ? 'lightblue' : 'aliceblue';
                            {   
                                    return (<div className="room-players-data-admin">
                                            <div className="room-players-data" style={{ color: bg }} key={index}>{data.playerName}</div>
                                                < IoMdRemoveCircleOutline className="remove-btn-admin"  onClick={()=>{handleKick(data.playerName)}}/>
                                            </div>)
                            }
                        })
                    }
                    {
                        users && users.admin !== name && users.players.map((data, index) => {
                            const bg = users.admin === data.playerName ? 'lightblue' : 'aliceblue';
                            {   
                                    return (<div className="room-players-data-admin">
                                            <div className="room-players-data" style={{ color: bg }} key={index}>{data.playerName}</div>
                                            </div>)
                            }
                        })
                    }
                </div>
                <button className="leave-btn" onClick={handleLeave}>Leave Room</button>
            </div>
        </div>
    );
}
