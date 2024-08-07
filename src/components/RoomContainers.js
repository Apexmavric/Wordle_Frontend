import RoomPlayers from "./RoomPlayers";
import { FaRegCopy, FaCopy } from "react-icons/fa6";
import BlurContext from "../context/Playercontext";
import { useContext } from "react";
const RoomContainer = ({room, handleCopy, copied, users, name, socket, setUsers, profilePics})=>{
    const {isblur} = useContext(BlurContext);
    return(
        <div className={`room-players-container ${isblur ? 'blur' : ''}`}>
        <div className="room-players-title"> 
            <div className="room-players-title-text">Room {room}</div>
            <div style={{position : 'absolute', left : '50px'}}>Admin : {users.admin}</div>
            <div className="copy-btn">
                    {!copied ? <FaRegCopy onClick={handleCopy}/> :  <FaCopy/>}
                    {copied ? <div>Copied!</div> : null}
            </div>
        </div>
            <RoomPlayers users = {users} name={name} socket={socket} setUsers={setUsers} profilePics={profilePics}/>
    </div>
    );
}

export default RoomContainer;