import { Link } from "react-router-dom";
import BlurContext from "../context/Playercontext";
import { useContext } from "react";
const MultiplayerButtons = ({admin, handleInvite, handleClick , handleLeave})=>{
    const {isblur} = useContext(BlurContext);
    const name = localStorage.getItem('name');
    console.log(admin, name);
    return(
        <div className={`multiplayer-buttons ${isblur ? 'blur' : ''}`}>
                {admin === name && 
                <>
                    <button className="start-game-btn invite" onClick={handleInvite} >Invite Friends</button>
                    <Link to="/multi">
                        <button value = "Start Game" className="start-game-btn" onClick={handleClick}>Start Game</button>
                    </Link> 
                </>
                }
                <button className="leave-btn" onClick={handleLeave}>Leave Room</button>
         </div>
    );
}

export default MultiplayerButtons;