import '../App.css';
import KeyBoard from '../components/KeyBoard';
import NavBar from '../components/NavBar';
import MultiWords from './MultiWords';
import { useNavigate } from "react-router";
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import {io} from 'socket.io-client';
import LiveLeaderBoard from './LiveLeaderBoard';
import Confetti from '../components/Confetti';
import StandingsText from '../components/StandingsText';
function Multiplayer() {
  const [iswinner, setisWinner] = useState(JSON.parse(localStorage.getItem('winner')) || false);
  const [hasLost,sethasLost] = useState(JSON.parse(localStorage.getItem('lost')) || false);
  const [restart,setRestart] = useState(JSON.parse(localStorage.getItem('restart')) || false);
  const [word,setWord] = useState("");
  const [time, setTime] = useState(0);
  const [socket, setSocket] = useState('');
  const [room, setRoom] = useState(localStorage.getItem('room'));
  const [users, setUsers] = useState([]);
  const [guessedPeople, setGuessedPeople] = useState([]);
  const[nextround, setNextRound] = useState(0);
  const [hasended, sethasended] = useState(false);
  const LiveLeaderBoardAnimation = useRef(null);
  const navigate = useNavigate();
  const Pageref = useRef(null);
  const LeaderBoardref = useRef(null);
  const name = localStorage.getItem('name');
  const token = localStorage.getItem('token');
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

    useEffect(() => {
      const newSocket = io(process.env.REACT_APP_BACKEND_URL,{
        auth:{
            token : token
        }
    });
        setSocket(newSocket);
        newSocket.on('connect', () => {
            setSocket(newSocket);
            newSocket.emit('refresh-ids', name);
            console.log(newSocket.id);
            if(!localStorage.getItem('hasended'))newSocket.emit('verifyGame', room);
            newSocket.on('bad', (message)=>{
              console.log('Bad function');
              alert(message);
              navigate(`/${localStorage.getItem('prev-page')}`);
            })
            if (localStorage.getItem('room')) {
                  setRoom(localStorage.getItem('room'));
                  newSocket.emit('join-room', localStorage.getItem('room'), name);
                  newSocket.on('users-live', (e) => {
                    setUsers(e);
                  });
                  newSocket.emit('fetch-live-players-info', localStorage.getItem('room'));
                  newSocket.on('players-live-info', (e)=>{
                    setGuessedPeople(e);
                  });
                  newSocket.emit('fetch-time',room);
                  newSocket.on('get-time', ({Time})=>{
                    if(Time != NaN) setTime(Time);
                  })
                }
                newSocket.on('start-next-round', (e)=>{
                  setNextRound(prev=>prev+1);
                  sethasended(true);
                  setTime(e);
            })
            newSocket.on('Round-completed', ()=>{
              localStorage.removeItem('row');
              localStorage.removeItem('val');
              localStorage.removeItem('isGreen');
              localStorage.removeItem('useHint');
              localStorage.setItem('winner', false);
              localStorage.setItem('lost', false);
              localStorage.setItem('restart', false);
              localStorage.removeItem('hints');
            })
            newSocket.on('game-ended' ,()=>{
              sethasended(true);
              localStorage.setItem('hasended', true);
              localStorage.removeItem('start');
              
            })
            if(JSON.parse(localStorage.getItem('hasended')) === true)
            { 
              const Page = Pageref.current;
              const LeaderBoard = LeaderBoardref.current;
              if(Page)
              {   
                  Page.classList.add('back-animate');
              }
              if(LeaderBoard)
              { 
                LeaderBoard.classList.add('leaderboard-animation');
              }
            }
          });
          return()=>{
            if(Pageref)
            {
                const Page = Pageref.current;
                if(Page)
                {   
                    Page.classList.remove('back-animate');
                } 
            }
            if(LeaderBoardref)
            {
                const LeaderBoard = LeaderBoardref.current; 
                if(LeaderBoard)
                {
                  LeaderBoard.classList.remove('leaderboard-animation');
                }
              }
              newSocket.off('verifyGame');
          }
    }, [hasended]);

    
    useEffect(() => {
      const timerInterval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(timerInterval); 
          }
          return newTime;
        });
      }, 1000);
      return () => {
        clearInterval(timerInterval);
      };
    }, [nextround]); 

    const handleLeaveGame = ()=>{
      if(socket)
      {
          socket.emit('leave-game', room);
      }
      navigate(`/${localStorage.getItem('prev-page')}`);
    }
  return (
    token && (
    <div>
    <div className="UserPage" ref={Pageref}>
       <NavBar score = {time}/>
      <div className='wordle-body'>
          <MultiWords winner = {setisWinner} lost = {sethasLost} restart = {restart} fr = {setRestart} setWord = {setWord} time={time} socket = {socket} hasended = {hasended} sethasended = {sethasended}/>
          <LiveLeaderBoard users = {users} guessedPeople={guessedPeople} ref={null} text="Leaderboard"/>         
      </div>
          { iswinner === false && hasLost === false && <KeyBoard className='keyboard'/>}
          {(iswinner === true || hasLost === true)  && <div className='winner'>
              {iswinner === true && <div className='winner-text'>You have guessed the word correctly!!</div>}
              {hasLost === true && 
                <div className='loser' style={{display : "flex", flexDirection:"column", alignItems : "center"} }>
                    <div className='loser-text' style={{margin : "5px", fontSize :"30px"}}>Opps!! You ran out of moves</div>
                </div> 
              }
           </div>}  
      </div>
      {
      (JSON.parse(localStorage.getItem('hasended'))) === true && 
          <div className='final-leaderboard'>
            <Confetti/>
            <button className='request-popup-btns back' onClick={handleLeaveGame}>
              Back 
            </button>
            <LiveLeaderBoard users = {users} guessedPeople = {guessedPeople} ref={LeaderBoardref} text = "Final leaderboard"/>
            <StandingsText/>
        </div>
      }

    </div>
    )
  );
}

export default Multiplayer;
