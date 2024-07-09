import GameParameters from "./GameParameters";
import BlurContext from "../context/Playercontext";
import { useContext } from "react";
const GameContainer = ({users, name , time, rounds , setRounds, setStart, setTime})=>{
    const {isblur} = useContext(BlurContext);
    return(
        <div className={`game-container ${isblur ? 'blur' : ''}`}>
            <div className="game-details-text">
                <div> Rounds : {rounds}</div>
                <div>Time : {time}</div>
            </div>
            {
                users && (users.admin === name) && <GameParameters setRounds = {setRounds} setTime = {setTime} setStart={setStart}/>
            } 
        </div>
    );
}

export default GameContainer;