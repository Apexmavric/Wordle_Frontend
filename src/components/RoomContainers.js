import RoomPlayers from "./RoomPlayers";
import { FaRegCopy, FaCopy } from "react-icons/fa6";
const RoomContainer = ({room, handleCopy, copied, users, name, socket, setUsers, profilePics})=>{
    return(
        <div className="room-players-container">
        <div className="room-players-title"> 
            <div className="room-players-title-text">Room {room}</div>
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