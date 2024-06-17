import GameParameters from "./GameParameters";
const GameContainer = ({users, name , time, rounds , setRounds, setStart, setTime})=>{
    return(
        <div className="game-container">
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