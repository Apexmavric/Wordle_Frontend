import '../styles/Room.css'
import React, { useEffect, useState } from "react";
import AccountDetails from "../components/AccountDetails";
import Sidebar from "../components/SideBar";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";
import InviteFrineds from "../components/InviteFriends";
import MultiplayerButtons from "../multiplayer/Multiplayerbuttons";
import GameContainer from "../components/GameContainer";
import RoomContainer from '../components/RoomContainers';

export default function CreateRoom() {
    const keysToKeep = ['name', 'token', 'room', 'prev-page'];
    for (let key in localStorage) {
        if (!keysToKeep.includes(key)) {
            localStorage.removeItem(key);
        }
    }
    localStorage.setItem('profile-pics', null);

    const [socket, setSocket] = useState(null);
    const [room, setRoom] = useState(localStorage.getItem('room'));
    const [users, setUsers] = useState({ players: [], admin: "" });
    const [time, setTime] = useState(30);
    const [rounds, setRounds] = useState(2);
    const [start, setStart] = useState(localStorage.getItem('start'));
    const name = localStorage.getItem('name');
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [inviteFriends, setInvitefriends] = useState(false);
    const [blurred, setBlurred] = useState(false);
    const [profilePics, setProfilePics] = useState(new Map(JSON.parse(localStorage.getItem('profile-pics'))));
    const handleClick = (e) => {
        e.preventDefault();
        localStorage.setItem('start', true);
        setStart(true);
    };

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
                if (data.msg === 'Authentication Invalid') {
                    localStorage.clear();
                    alert('Your session has expired try logging in again !!');
                    navigate('/');
                }
            } catch (error) {
                console.error(error);
            }
        };
        verify_token();
    }, [token, navigate]); 
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
        // console.log(`Image  for ${e.player}: ${imageUrl}`);
        profilePicsMap.set(e.player, imageUrl);
        console.log(profilePicsMap);
        setProfilePics(profilePicsMap);
        const arr = Array.from(profilePicsMap);
        const mapString = JSON.stringify(arr);
        localStorage.setItem('profile-pics', mapString);
      };

    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_BACKEND_URL, {
            auth: {
                token: token
            }
        });
        setSocket(newSocket);
        newSocket.on('connect', () => {
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
            newSocket.on('new-player', (data) => {
                console.log('Someones profile data is being fetched!');                handleNewPlayer(data);
              });
        });

        return () => {
            console.log(`Cleaning up socket listeners`);
            newSocket.off('new-player', handleNewPlayer);
            newSocket.off('connect');
            newSocket.off('room-created');
            newSocket.off('users');
            newSocket.off('refresh-ids');
            newSocket.disconnect();
        };
    }, [name, token]);

    useEffect(() => {
        if (socket && start) {
            console.log('start game signal');
            socket.emit('start-game', localStorage.getItem('room'), name, rounds, time);
            localStorage.removeItem('hasended');
            localStorage.setItem('prev-page', 'create');
            localStorage.removeItem('winner');
            localStorage.removeItem('lost');
            navigate("/multi");
        }

        return () => {
            if (socket) {
                socket.off('start-game');
            }
        };
    }, [start, socket, rounds, time, name, navigate]);

    useEffect(() => {
        if (socket) {
            if (localStorage.getItem('room')) {
                console.log('sending time and rounds info');
                console.log(time, rounds);
                if (users && users.admin === name) socket.emit('game-infos', room, rounds, time);
            }
        }
    }, [rounds, time, socket, room, users, name]);

    const handleLeave = (e) => {
        if (socket) {
            if (localStorage.getItem('room')) {
                socket.emit('leave-room', localStorage.getItem('room'), name);
                setUsers("");
                localStorage.removeItem('profile-pics');
                localStorage.removeItem('room');
                localStorage.removeItem('rounds');
                localStorage.removeItem('time');
            }
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(room);
            setCopied(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleInvite = (e) => {
        e.preventDefault();
        console.log('I am being clicked');
        setBlurred(true);
        setInvitefriends(true);
        console.log(inviteFriends);
    };

    return (
        <div className="create-room-page">
            {inviteFriends && <InviteFrineds setInviteFriends={setInvitefriends} socket={socket} />}
            <div className={inviteFriends ? "MenuPage blur" : "MenuPage"} onClick={() => {
                if (blurred) {
                    setInvitefriends(false);
                    setBlurred(false);
                }
            }}>
                <div className="menu-navbar">
                    <div className="menu-title">Wordle</div>
                    <AccountDetails />
                </div>
                <Sidebar />
                <MultiplayerButtons handleClick={handleClick} handleInvite={handleInvite} handleLeave={handleLeave} />
                <div className="room-gamedetails-container">
                    <RoomContainer room={room} handleCopy={handleCopy} copied={copied} users={users} name={name} socket={socket} setUsers={setUsers} profilePics={profilePics} />
                    <GameContainer users={users} name={name} setRounds={setRounds} setTime={setTime} time={time} rounds={rounds} setStart={setStart} />
                </div>
            </div>
        </div>
    );
}
