import React, { useEffect, useState, useContext } from "react";
import AccountDetails from "../components/AccountDetails";
import Sidebar from "../components/SideBar";
import { io } from "socket.io-client";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import GameParameters from "../components/GameParameters";
import { useNavigate } from "react-router";
import { FaRegCopy, FaCopy } from "react-icons/fa6";
import InviteFrineds from "../components/InviteFriends";
import { Link } from "react-router-dom";
import RequestPopup from "../components/RequestPopup";
import BlurContext from "../context/Playercontext";
import NavBar from "../components/NavBar";
import MultiplayerButtons from "../multiplayer/Multiplayerbuttons";
import RoomContainer from "../components/RoomContainers";
import ProfilePic from "../components/ProfilePic";
import GameContainer from "../components/GameContainer";
import InputBar from "../components/InputBar";
import ButtonsWithInfo from "../components/ButtonsWithInfo";
import Popup from "../components/Popup";

export default function CreateRoom() {
    const keysToKeep = ['name', 'token', 'room', 'prev-page'];
    for (let key in localStorage) {
        if (!keysToKeep.includes(key)) {
            localStorage.removeItem(key);
        }
    }
    const { isblur, setisBlur } = useContext(BlurContext);
    const [socket, setSocket] = useState(null);
    const [col, setCol] = useState('');
    const [temproom, setTempRoom] = useState(null);
    const [room, setRoom] = useState(localStorage.getItem('room'));
    const [requestMessage, setRequestmessage] = useState(null);
    const [users, setUsers] = useState({ players: [], admin: "" });
    const [time, setTime] = useState(localStorage.getItem('time') || 30);
    const [rounds, setRounds] = useState(localStorage.getItem('rounds') || 2);
    const [start, setStart] = useState(localStorage.getItem('start') || false);
    const [profilePics, setProfilePics] = useState(new Map(JSON.parse(localStorage.getItem('profile-pics'))));
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState(null);
    localStorage.setItem('profile-pics', null);
    const [inviteFriends, setInvitefriends] = useState(false);
    const [copied, setCopied] = useState(false);
    const [requestPopup, setRequestpopup] = useState(false);
    const [admin, setAdmin] = useState();
    const [fetchedToken, setFetchedtoken] = useState();
    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const verify_token = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/v1/verify/verify_token", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                let data = await response.json();
                console.log(data);
                if (data.msg === 'Authentication Invalid') {
                    localStorage.clear();
                    alert('Your session has expired try logging in again !!');
                    navigate('/');
                }
            } catch (error) {
                console.error(error);
            }
        }
        verify_token();
    }, []);
    
    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_BACKEND_URL, {
            auth: {
                token: token
            }
        });
        setSocket(newSocket);
        newSocket.on('connect', () => {
            console.log(newSocket.id);
            setSocket(newSocket);
            if (localStorage.getItem('room')) {
                console.log(room);
                newSocket.emit('join-room', localStorage.getItem('room'), name);
                newSocket.on('users', (e) => {
                    setUsers(e);
                });
            }
            if (users && users.admin !== name) {
                newSocket.on('get-game-info', (e) => {
                    const { Time, Rounds } = e;
                    localStorage.setItem('time', Time);
                    localStorage.setItem('rounds', Rounds);
                    setTime(Time);
                    setRounds(Rounds);
                });
            }
            newSocket.on('user-left', () => {
                localStorage.removeItem('room');
                setUsers("");
                // setFroom("");
                setRoom("");
            });
            newSocket.emit('refresh-ids', name);
            newSocket.on('start-game-signal', () => {
                localStorage.setItem('start', true);
                localStorage.removeItem('hasended');
                localStorage.setItem('prev-page', 'join');
                navigate('/multi');
                console.log('start-game-signal is called');
            });
            newSocket.on('invite-request', (fetchedToken, adminName) => {
                console.log(fetchedToken, adminName);
                setRequestmessage(`${adminName} is inviting you to play!`);
                setFetchedtoken(fetchedToken);
                setRequestpopup(true);
                setTimeout(()=>{
                    setRequestpopup(false);
                }, 10000);
            });
            newSocket.on('join-room-authenticated', (roomName) => {
                console.log(roomName);
                setRoom(roomName);
                localStorage.setItem('room', roomName);
            });
        });
        return () => {
            if (!isNaN(localStorage.getItem('start'))) {
                console.log("return function is being called");
                newSocket.emit('leave-room', localStorage.getItem('room'), name);
                setUsers("");
                localStorage.removeItem('room');
                localStorage.removeItem('rounds');
                localStorage.removeItem('time');
                setRoom(null);
            }
            if (!isNaN(localStorage.getItem('start')))
                newSocket.off('invite-request');
                newSocket.off('start-game-signal');
        }
    }, []);

    useEffect(() => {
        if (socket) {
            if (localStorage.getItem('room')) {
                console.log('sending time and rounds info');
                if (users && users.admin === name) socket.emit('game-infos', room, rounds, time);
            }
        }
    }, [rounds, time]);

    useEffect(() => {
        if (socket) {
            socket.on('users', (e) => {
                setUsers(e);
            })
            setRoom(localStorage.getItem('room'));
        }
    }, [requestPopup]);

    useEffect(() => {
        if (socket && time && start) {
            socket.emit('start-game', localStorage.getItem('room'), name, rounds, time);
            console.log('start-game-signal is called');
        }
        return () => {
            if (socket) {
                socket.off('start-game');
            }
        }
    }, [start]);

    const RoomChangeHandler = (e) => {
        e.preventDefault();
        setRoom(e.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (socket) {
            console.log(`Room wit a : ${temproom}`);
            socket.emit('join-request', temproom);
            setMessage("Request sent successfully");
            setCol(1);
        }
    }

    const handleLeave = () => {
        if (socket) {
            socket.emit('leave-room', localStorage.getItem('room'), name);
            setUsers({ players: [], admin: "" });
            localStorage.removeItem('room');
            setRoom(null);
            socket.disconnect();
        }
    }

    const handleKick = (playerName) => {
        if (socket) {
            socket.emit('kick-out', localStorage.getItem('room'), playerName, users.admin);
            socket.on('users', (e) => {
                setUsers(e);
                // setFroom(localStorage.getItem('room'));
            });
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(room);
            setCopied(true);
        } catch (err) {
            console.log(err);
        }
    }

    const handleInvite = (e) => {
        e.preventDefault();
        setInvitefriends(true);
        console.log(inviteFriends);
    }

    const handleStart = (e) => {
        e.preventDefault();
        localStorage.setItem('start', true);
        setStart(true);
    }

    const handleNewPlayer = (e) => {
        let profilePicsMap;
        if (localStorage.getItem('profile-pics') === null) {
            profilePicsMap = new Map();
        } else {
            const storedArr = localStorage.getItem('profile-pics');
            const parsedArr = JSON.parse(storedArr);
            profilePicsMap = new Map(parsedArr);
        }
        const { contentType, data: imageData } = e;
        const blob = new Blob([new Uint8Array(imageData)], { type: contentType });
        const imageUrl = URL.createObjectURL(blob);
        profilePicsMap.set(e.player, imageUrl);
        console.log(profilePicsMap);
        setProfilePics(profilePicsMap);
        const arr = Array.from(profilePicsMap);
        const mapString = JSON.stringify(arr);
        localStorage.setItem('profile-pics', mapString);
    };

    return (
        <div className={`MenuPage ${isblur ? ' ' : ' '}`} onClick={() => { }}>
            {inviteFriends && <InviteFrineds setInviteFriends={setInvitefriends} socket={socket} />}
            <NavBar setisBlur={setisBlur} val={0} wantNavbar={0} />
            {!room && <div className="room-input-container">
                <InputBar placeholder="Enter your room id!" val={temproom} setVal={setTempRoom} col={2} setCol={setCol} />
                <button className="join-room-button" onClick={handleClick}>Join Room</button>
                <small style={{position: 'absolute' , bottom : '-100px'}}>
                   A request would be sent to the admin of the room!
                   <br></br>
                   Once the admin accepts the request, you automatically enter the room
                </small>
                <div className="search-message-container">
                    {message && !requestPopup && <Popup col={col} setAnimation={true} setMessage={setMessage} message={message} />}
                </div>
            </div>}
                <div className='pop-up-container'>
                        {requestPopup && requestMessage && <RequestPopup message={requestMessage} admin={admin} setRequestpopup={setRequestpopup}  setFetchedToken={setFetchedtoken} fetchedToken={fetchedToken} socket={socket} setRoom={setRoom} emitEvent="join-request-accept" listenEvent="join-room-authenticated"/>}
                </div>
            {
                room && (
                    <>
                        <MultiplayerButtons admin={users.admin} handleClick={handleClick} handleInvite={handleInvite} handleLeave={handleLeave} />
                        <div className="room-gamedetails-container">
                            <RoomContainer room={room} handleCopy={handleCopy} copied={copied} users={users} name={name} socket={socket} setUsers={setUsers} profilePics={profilePics} />
                            <GameContainer users={users} name={name} setRounds={setRounds} setTime={setTime} time={time} rounds={rounds} setStart={setStart} />
                        </div>
                    </>
                )
            }
        </div>
    );
}
