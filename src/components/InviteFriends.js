import { useEffect, useRef, useState, forwardRef } from "react";
import { FcInvite } from "react-icons/fc";

const InviteFriends = ({ setInviteFriends, socket }) => {
  const inviteRef = useRef(null);
  const [friends,setFriends] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(()=>{
    const fetchFriends = async()=>{
      const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/v1/player/friends", {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
          }
      });
      const data = await response.json();
      setFriends(data.playerFriends); 
    }
    fetchFriends();
    return ()=>{
      // socket.off('invite');
    }
  },[])
  const handleInvite =(name)=>{
    if(socket){
      socket.emit('invite', name);
    }
  }
  return (
    <div className="search-bar invite-friends" ref={inviteRef}>
      <div className="search-heading">Invite Friends</div>
      <div className="search-results-container">
        {friends && friends.map(player => (
          <div className="search-results" key={player}>
            <div className="search-results-name" style={{ height: '20px' }}>{player}</div>
            <FcInvite className="search-results-remove" onClick={() => handleInvite(player)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default InviteFriends;
