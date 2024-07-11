import { useEffect, useRef } from "react";
import Audio from "./Music/Audio";

const RequestPopup =({admin, socket, fetchedToken, setRequestpopup, setRoom, message, emitEvent, listenEvent})=>{
    // const audioRef = useRef(null);
    const acceptHandler = ()=>{
        if(socket)
        {   
            console.log('join-room-accept-handler');
            if(emitEvent)socket.emit(emitEvent,fetchedToken);
            if(listenEvent)
            {
                socket.on(listenEvent, (roomName)=>{
                localStorage.setItem('room', roomName);
                setRoom(roomName);
               })  
            }
            setRequestpopup(false);
        }
    }
    
    return(
        <>
        <div className="request-popup-container">
            <div className="request-popup-text">{message}</div>
            <div className="request-popup-buttons">
                <button className="request-popup-btns accept" onClick={acceptHandler}>Accept</button>
                <button className="request-popup-btns decline" onClick={()=>{setRequestpopup(false)}}> Decline</button>
            </div>
        </div>
        </>
    );
}

export default RequestPopup;