import React  from "react";
import { useNavigate } from "react-router";
const Buttons=()=>{
    const navigate = useNavigate();
    return(
        <div className="play-buttons">
            <button className="play-buttons-btn" onClick={()=>{navigate('/single')}}>Play Alone!</button>
            <button className="play-buttons-btn"onClick={()=>{navigate('/multi')}}>Join Room</button>
            <button className="play-buttons-btn"onClick={()=>{navigate('/multi')}}>Create Room</button>
        </div>
    );
}
export default Buttons;