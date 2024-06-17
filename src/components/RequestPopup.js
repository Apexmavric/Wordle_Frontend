import { useEffect, useRef } from "react";
import Audio from "./Music/Audio";

const RequestPopup =({admin, socket, fetchedToken, setRequestpopup, setRoom})=>{
    const audioRef = useRef(null);
    const acceptHandler = ()=>{
        if(socket)
        {   
            console.log('join-room-accept-handler');
            socket.emit('join-request-accept',fetchedToken);
            socket.on('join-room-authenticated', (roomName)=>{
                localStorage.setItem('room', roomName);
                setRoom(roomName);
            })
            setRequestpopup(false);
        }
    }
    
    // useEffect(()=>{
    //     // if(socket)new Audio(NotificationSounds).play();
    // })
    return(
        <>
        <Audio />
        <div className="request-popup-container">
            <div className="request-popup-text">{`Player ${admin} invites you to join!`}</div>
            <div className="request-popup-buttons">
                <button className="request-popup-btns accept" onClick={acceptHandler}>Accept</button>
                <button className="request-popup-btns decline" onClick={()=>{setRequestpopup(false)}}> Decline</button>
            </div>
        </div>
        </>
    );
}

export default RequestPopup;