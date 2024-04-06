import React, { useEffect, useState } from "react";
import AccountDetails from "../components/AccountDetails";
import Sidebar from "../components/SideBar";
import { io } from "socket.io-client";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import GameParameters from "../components/GameParameters";


export default function CreateRoom() {
    const [socket, setSocket] = useState('');
    const [room, setRoom] = useState(localStorage.getItem('room'));
    const [froom, setFroom] = useState(localStorage.getItem('room'));
    const [users, setUsers] = useState({players : [], admin : ""});
    const [time, setTime] = useState(localStorage.getItem('time') || 30);
    const [rounds, setRounds] = useState(localStorage.getItem('rounds') || 2);
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
        if(users && users.admin !== name)
        {
                newSocket.on('get-game-info',(e)=>{
                const {Time, Rounds} = e; 
                console.log(`Yeh time hai : ${Time} aur yeh rounds hai ${Rounds}`)
                localStorage.setItem('time', Time);
                localStorage.setItem('rounds', Rounds);
                setTime(Time);
                setRounds(Rounds);
            })
        }
        newSocket.on('user-left', ()=>{
            localStorage.removeItem('room');
            setUsers("");
            setFroom("");
            setRoom("");
        })
        newSocket.emit('refresh-ids', name);
    });
    return (()=>{
        if(localStorage.getItem('room'))
        {
            newSocket.emit('leave-room' , localStorage.getItem('room'), name);
            setUsers("");
            localStorage.removeItem('room');
            localStorage.removeItem('rounds');
            localStorage.removeItem('time');
        }
    })
}, []);

    useEffect(()=>{
        if(socket)
        {       
            if(localStorage.getItem('room'))
            {   
                console.log('sending time and rounds info');
                if(users && users.admin === name) socket.emit('game-infos',room, rounds, time);
            }
        }
    },[rounds, time])

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
            <form className="join-room-form">
                <input type="text" value = {room} onChange={RoomChangeHandler} className="join-room-input"></input>
                <input type="submit" value="Join" onClick={handleClick}></input>
            </form>
            {
               users && (users.admin === name) && <GameParameters setRounds = {setRounds} setTime = {setTime}/>
            }
            <div className="room-players-container">
                <div className="room-players-title">
                    <div className="room-players-title-text">Room {room}</div>
                </div>
                <div className="room-players-data-container">
                    {               
                            users && users.admin === name && users.players.map((data, index) => {
                            const bg = users.admin === data.playerName ? 'lightblue' : 'aliceblue';
                            {   
                                return (                            
                                        <div className="room-players-data-admin">
                                            <div className="room-players-data" style={{ color: bg }}>{data.playerName}</div>
                                                < IoMdRemoveCircleOutline className="remove-btn-admin"  onClick={()=>{handleKick(data.playerName)}}/>
                                        </div>
                                        )
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
