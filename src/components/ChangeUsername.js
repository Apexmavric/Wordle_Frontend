import { useState, useCallback, useEffect } from 'react';
import '../styles/ProfilePage.css';
import InputBar from './InputBar';
import { debounce } from 'lodash';

const ChangeUsername = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const [col, setCol] = useState(2);

  const checkWordAvailability = async (word) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/player/checkuser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ new_name: word }) // Use the parameter 'word' instead of 'username'
      });
      if(response.status === 200)
        {   
            setCol(1);
            setIsAvailable(true);
        }
        else 
        {   
            setCol(0);
            setIsAvailable(false);
        }
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  const debouncedCheck = useCallback(
    debounce(async (username) => {
      setLoading(true);
      console.log('Checking username:', username);
      const available = await checkWordAvailability(username);
      setLoading(false);
    }, 300),
    [] 
  );

  useEffect(() => {
    if (username) {
      debouncedCheck(username);
    } else {
      setIsAvailable(null);
    }
    return () => {
      debouncedCheck.cancel();
    };
  }, [username, debouncedCheck]); 
  const handleClick = async()=>{
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/player/update_username`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ new_name: username }) 
        });
        if(response.status === 200)
        {   
             localStorage.setItem('name', username);
        }
        return await response.json();
      } catch (err) {
        console.log(err);
      }
  }
  const style={
    cursor: isAvailable ? 'pointer' :  'not-allowed',
    opacity: isAvailable ? 1 : 0.5
  }
  return (
    <>
    <div className="upload-btns">
      <InputBar placeholder="Check for username" val={username} setVal={setUsername}  col={col} setCol={setCol}/>
      <InputBar placeholder="Confirm Password" val={password} setVal={setPassword} col={col} setCol={setCol}/>
    </div>
    <div className='update-btns-container'>
      {loading ? <p className='check-text'>Checking availability...</p> : isAvailable !== null && (
          isAvailable ? <p className='check-text' style={{ color: 'green' }}>Username is available!</p> : <p className='check-text' style={{ color: 'red' }}>Username is not available</p>
        )}
        <button className='update-btn' onClick={handleClick} disabled={!isAvailable} style={style}>Update Username</button>
    </div>
    </>
  );
}

export default ChangeUsername;
