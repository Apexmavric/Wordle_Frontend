import './App.css';
import KeyBoard from './components/KeyBoard';
import NavBar from './components/NavBar';
import Words from './components/Words';
import { useState } from 'react';
import { useEffect } from 'react';
import randomwordapi from './components/Randomwordapi';

function App() {
  const [iswinner, setisWinner] = useState(false);
  const [hasLost,sethasLost] = useState(false);
  const [restart,setRestart] = useState(false);
  const [word,setWord] = useState("");
  useEffect(()=>{
    async function fetchWord(){
      let resp = await randomwordapi();
      setWord(resp[0].toUpperCase());
    }
    fetchWord();
  },[restart])
  function handleRestart(){
    setRestart(true);
  }
  return (
    <div className="App">
      <NavBar/>
      <div className='wordle-body'>
          <Words winner = {setisWinner} lost = {sethasLost} restart = {restart} fr = {setRestart} word = {word}/>
           {(!iswinner && !hasLost)&& <KeyBoard/> }
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
    </div>
  );
}

export default App;
