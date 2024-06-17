import '../App.css';
import KeyBoard from '../components/KeyBoard';
import NavBar from '../components/NavBar';
import Words from '../components/Words';
import { useState } from 'react';
import { useEffect } from 'react';
import randomwordapi from '../components/Reset';
import Timer from '../components/Timer';
import {useNavigate} from 'react-router';
function UserPage() {
  const [iswinner, setisWinner] = useState(false);
  const [hasLost,sethasLost] = useState(false);
  const [restart,setRestart] = useState(false);
  const [word,setWord] = useState("");
  const [time, setTime] = useState(0);
  const token = localStorage.getItem('token');
  const navigate = useNavigate(null);
  useEffect(()=>{
    const verify_token = async()=>{
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/v1/verify/verify_token", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            let data = await response.json();
            console.log(data);
            if(data.msg === 'Authentication Invalid')
            {
                localStorage.clear();
                alert('Your session has expired try logging in again !!');
                navigate('/');

            }   
        } catch (error) {
            console.error(error);
        } 
    }
    verify_token();
}, [])
  function handleRestart(){
    setRestart(true);
  }
  return (
    token && (<div className="UserPage">
       <NavBar score = {time}/>
      <div className='wordle-body'>
          <Words winner = {setisWinner} lost = {sethasLost} restart = {restart} fr = {setRestart} setWord = {setWord} time={time}/>
          <Timer fr = {setRestart} restart = {restart} setTime={setTime} time={time} hasLost={hasLost}  sethasLost = {sethasLost} iswinner={iswinner} setWord = {setWord}/>
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
    )
  );
}

export default UserPage;
