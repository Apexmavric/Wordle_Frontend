import React, { useEffect, useState } from "react";
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


export default function CreateRoom() {
    const keysToKeep = ['name', 'token', 'room', 'prev-page'];
    for (let key in localStorage) {
        if (!keysToKeep.includes(key)) {
            localStorage.removeItem(key);
        }
    }
    const [socket, setSocket] = useState('');
    const [room, setRoom] = useState(localStorage.getItem('room'));
    const [froom, setFroom] = useState(localStorage.getItem('room'));
    const [users, setUsers] = useState({players : [], admin : ""});
    const [time, setTime] = useState(localStorage.getItem('time') || 30);
    const [rounds, setRounds] = useState(localStorage.getItem('rounds') || 2);
    const [start, setStart] = useState(localStorage.getItem('start') || false);
    const [inviteFriends, setInvitefriends] = useState(false);
    const [copied, setCopied] = useState(false);
    const [requestPopup, setRequestpopup] = useState(false);
    const [admin, setAdmin] = useState();
    const [fetchedToken, setFetchedtoken] = useState();
    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');
    useEffect(()=>{
        const verify_token = async()=>{
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/v1/verify/verify_token", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                let data = await response.json();
                console.log(data);
                if(data.msg === 'Authentication Invalid')
                {
                    localStorage.clear();
                    alert('Your session has expired try logging in again !!');
                    navigate('/');
                }   
            } catch (error) {
                console.error(error);
            } 
        }
        verify_token();
    }, [])
   useEffect(() => {
    const newSocket = io(process.env.REACT_APP_BACKEND_URL,{
        auth:{
            token : token
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
        newSocket.on('start-game-signal',()=>{
            localStorage.setItem('start', true);
            localStorage.removeItem('hasended');
            localStorage.setItem('prev-page', 'join');
            navigate('/multi');
            console.log('start-game-signal is called');
        })
        newSocket.on('invite-request', (fetchedToken, adminName)=>{
            setRequestpopup(true);
            setAdmin(adminName);
            setFetchedtoken(fetchedToken);
            setTimeout(()=>{
                setRequestpopup(false);
            },10000);
        })
    });
    return (()=>{
        
        if(!isNaN(localStorage.getItem('start')))
        {   
            console.log("return function is being called");
            newSocket.emit('leave-room' , localStorage.getItem('room'), name);
            setUsers("");
            localStorage.removeItem('room');
            localStorage.removeItem('rounds');
            localStorage.removeItem('time');
        }
        if(!isNaN(localStorage.getItem('start')))
        newSocket.off('invite-request');
        newSocket.off('start-game-signal');
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

    useEffect(()=>{
        if(socket)
        {
            socket.on('users', (e)=>{
                setUsers(e);
            })
            setRoom(localStorage.getItem('room'));
        }
    }, [requestPopup])
    useEffect(()=>{
        if(socket && time && start)
        {   
            socket.emit('start-game', localStorage.getItem('room'), name, rounds, time);
            console.log('start-game-signal is called');
        }
        return(()=>{
            if(socket)
            {
                socket.off('start-game');
            }
        })
    },[start])

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
            setFroom("");
            socket.disconnect();
        }
    }
    const handleKick = (playerName)=>{
        if(socket)
        {   
            socket.emit('kick-out', localStorage.getItem('room'), playerName, users.admin);
            socket.on('users' , (e)=>{
                setUsers(e);
                setFroom(localStorage.getItem('room'));
            })
        }
    }
    const handleCopy = async()=>{
        try{
            await navigator.clipboard.writeText(room);
            setCopied(true);
        }
        catch(err)
        {
            console.log(err);
        }
    }

    const handleInvite = (e)=>{
        e.preventDefault();
        console.log('I am being clicked');
        setInvitefriends(true);
        console.log(inviteFriends);
    }

    const handleStart = (e)=>{
        e.preventDefault();
        localStorage.getItem('start', true);
        setStart(true);
    }

    return (
       <div></div>
    );
}
