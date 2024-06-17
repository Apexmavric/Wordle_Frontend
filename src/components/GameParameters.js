import { useNavigate } from "react-router";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
const GameParameters = ({setTime, setRounds, setStart})=>{
    const gameRoundOptions = [2,5,10,15];
    const TimeOptions = [10,30,60, 90, 120, 400];
    
    return(
        <div className="games-setting-container">
        <div className="game-parameters-container">
            <div>Game Options</div>
            <div className="game-parameter-dropdown-container">
                <Dropdown items={gameRoundOptions} text="Rounds" setf = {setRounds}> </Dropdown>
                <Dropdown items={TimeOptions} text="Time" setf = {setTime} ></Dropdown>
            </div>
        </div>
        </div>
    );
}   
export default GameParameters;