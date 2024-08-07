import '../styles/Room.css'
import React, { useEffect, useState } from "react";
import NavBar from '../components/NavBar';
import { io } from "socket.io-client";
import { useNavigate } from "react-router";
import InviteFrineds from "../components/InviteFriends";
import MultiplayerButtons from "../multiplayer/Multiplayerbuttons";
import GameContainer from "../components/GameContainer";
import RoomContainer from '../components/RoomContainers';
import RequestPopup from '../components/RequestPopup';

export default function CreateRoom() {
    // localStorage.setItem('profile-pics', null);
    const keysToKeep = ['name', 'token', 'room', 'prev-page', 'profile-pics'];
    Object.keys(localStorage).forEach(key => {
        if (!keysToKeep.includes(key)) {
            localStorage.removeItem(key);
        }
    });
    const [isblur, setisBlur] = useState(false);
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
    const [requestPopup, setRequestpopup] = useState(false);
    const [playerName, setPlayerName] = useState(null);
    const [message, setMessage] = useState(null);
    const [fetchedToken, setFetchedtoken] = useState();
    const [profilePics, setProfilePics] = useState(new Map(JSON.parse(localStorage.getItem('profile-pics'))));
    const handleClick = (e) => {
        e.preventDefault();
        localStorage.setItem('start', true);
        setStart(true);
    };


    useEffect(() => {
        
            const arr = Array.from(profilePics);
            const mapString = JSON.stringify(arr);
            localStorage.setItem('profile-pics', mapString);
      }, [profilePics]);

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
        // console.log(e);
        const profilePicsMap = profilePics;
        e.forEach(player => {
          const { contentType, data: imageData } = player;
          const blob = new Blob([new Uint8Array(imageData)], { type: contentType });
          const imageUrl = URL.createObjectURL(blob);
          profilePicsMap.set(player.player, imageUrl);
        });
        setProfilePics(profilePics);
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
             
            } else {
                setRoom(localStorage.getItem('room'));
                newSocket.emit('join-room', localStorage.getItem('room'), name);
            }
            newSocket.on('users', (e) => {
                console.log('users ', e);
                setUsers(e);
            });
            newSocket.on('users-updated', (e) => {
                console.log('users ', e);
                setUsers(e);
            });
            newSocket.emit('refresh-ids', name);
            newSocket.on('new-player', (data) => {
                // console.log('Someones profile data is being fetched!');
                 handleNewPlayer(data);
              });
              newSocket.on('join-request-player', (fetchedToken, playerName)=>{
                setRequestpopup(true);
                setPlayerName(playerName);
                // console.log(fetchedToken);
                setFetchedtoken(fetchedToken);
                setMessage(`${playerName} has requested to join the game!`);
                setTimeout(()=>{
                    setRequestpopup(false);
                },10000);
            })
        });

        return () => {
            console.log(`Cleaning up socket listeners`);
            newSocket.off('new-player');
            newSocket.off('connect');
            newSocket.off('room-created');
            newSocket.off('users');
            newSocket.off('refresh-ids');
            newSocket.disconnect();
        };
    }, [name, token]);

    useEffect(() => {
        if (socket && start) {
            // console.log('start game signal');
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
                if (users && users.admin === name) socket.emit('game-infos', room, rounds, time);
            }
        }
    }, [rounds, time, socket, room, users, name]);

    const handleLeave = (e) => {
        if (socket) {
            if (localStorage.getItem('room')) {
                socket.emit('leave-room', localStorage.getItem('room'), name);
                setUsers("");
                // localStorage.removeItem('profile-pics');
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

        setInvitefriends(true);
    };

    return (
            <div className={`MenuPage ${isblur ? ' ' : ' '}`} onClick={() => {    
            }}>
            {inviteFriends && <InviteFrineds setInviteFriends={setInvitefriends} socket={socket} />}
            <NavBar setisBlur={setisBlur} val={0} wantNavbar={0}/> 
            <MultiplayerButtons admin={users.admin} handleClick={handleClick} handleInvite={handleInvite} handleLeave={handleLeave}/>
            {
                <div className='pop-up-container'>
                   { requestPopup && <RequestPopup message={message} setRequestpopup={setRequestpopup} fetchedToken={fetchedToken} socket={socket} setRoom={setRoom} emitEvent="admin-request-accept" listenEvent="admin-request-authenticated" setFetchedToken={setFetchedtoken}/>}
                </div>
            }
            <div className="room-gamedetails-container">
                <RoomContainer room={room} handleCopy={handleCopy} copied={copied} users={users} name={name} socket={socket} setUsers={setUsers} profilePics={profilePics} />
                <GameContainer users={users} name={name} setRounds={setRounds} setTime={setTime} time={time} rounds={rounds} setStart={setStart} />
            </div>
            </div>
    );
}
