
import { Link } from "react-router-dom";
const MultiplayerButtons = ({handleInvite, handleClick , handleLeave})=>{
    return(
        <div className="multiplayer-buttons">
                <button className="start-game-btn invite" onClick={handleInvite} >Invite Friends</button>
                 <Link to="/multi">
                    <button value = "Start Game" className="start-game-btn" onClick={handleClick}>Start Game</button>
                </Link> 
                <button className="leave-btn" onClick={handleLeave}>Leave Room</button>
         </div>
    );
}

export default MultiplayerButtons;