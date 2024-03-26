import '../App.css';
import KeyBoard from '../components/KeyBoard';
import NavBar from '../components/NavBar';
import Words from '../components/Words';
import { useState } from 'react';
import { useEffect } from 'react';
import randomwordapi from '../components/Randomwordapi';
import Timer from '../components/Timer';

function UserPage() {
  const [iswinner, setisWinner] = useState(false);
  const [hasLost,sethasLost] = useState(false);
  const [restart,setRestart] = useState(false);
  const [word,setWord] = useState("");
  const [score, setScore] = useState(50);
  function handleRestart(){
    setRestart(true);
  }
  return (
    <div className="UserPage">
       <NavBar score = {score}/>
      <div className='wordle-body'>
          <Words winner = {setisWinner} lost = {sethasLost} restart = {restart} fr = {setRestart} setWord = {setWord} func_score = {setScore}/>
          <Timer fr = {setRestart} restart = {restart}/>
      </div>
           {(!iswinner && !hasLost) && <KeyBoard className='keyboard'/> }
           {(iswinner || hasLost) && <div className='winner'>
              {iswinner && <div className='winner-text'>You have guessed the word correctly!!</div>}
              {hasLost && 
              <div className='loser' style={{display : "flex", flexDirection:"column", alignItems : "center"} }>
                  <div className='loser-text' style={{margin : "5px"}}>Opps!! You ran out of moves</div>
                  <div style={{fontSize:"20px"}}>Correct Word was : {word}</div>
              </div> 
                }
              <button className='restart' onClick={handleRestart}>Guess Again ?</button>
           </div>}  
    </div>
  );
}

export default UserPage;
