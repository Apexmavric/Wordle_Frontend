import Dropdown from "./Dropdown";
const GameParameters = ({setTime, setRounds})=>{
    const gameRoundOptions = [2,5,10,15];
    const TimeOptions = [30,60, 90, 120];
    return(
        <div className="games-setting-container">
        <div className="game-parameters-container">
            <div>Game Options</div>
            <div className="game-parameter-dropdown-container">
                <Dropdown items={gameRoundOptions} text="Rounds" setf = {setRounds}> </Dropdown>
                <Dropdown items={TimeOptions} text="Time" setf = {setTime} ></Dropdown>
            </div>
        </div>
        <button value = "Start Game" className="start-game-btn">Start Game</button>
        </div>
    );
}   
export default GameParameters;