import { useEffect, useRef, useState, useContext } from "react";
import { FcInvite } from "react-icons/fc";
import BlurContext from "../context/Playercontext";
import RequestPopup from "./RequestPopup";
import Popup from "./Popup";

const InviteFriends = ({ setInviteFriends, socket }) => {
  const inviteRef = useRef(null);
  const [friends, setFriends] = useState([]);
  const token = localStorage.getItem('token');
  const { setisBlur } = useContext(BlurContext);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/v1/player/friends", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setFriends(data.playerFriends);
    };
    fetchFriends();

    const handleClickOutside = (event) => {
      if (inviteRef.current && !inviteRef.current.contains(event.target)) {
        setInviteFriends(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // socket.off('invite');
    };
  }, [setInviteFriends, token]);

  const handleInvite = (name) => {
    if (socket) {
      socket.emit('invite', name);
    }
    setMessage(`Request to ${name} sent successfully!`);
  };

  useEffect(() => {
    setisBlur(true);
    return () => {
      setisBlur(false);
    };
  }, [setisBlur]);
  const st = {
      zIndex:4,
  };
  const text = friends.length > 0 ? "Invite your friends directly using this feature!" : `You don't have any friends. \n\ Add friends to use this feature!`;
  return (
    <div className="friends-page-container">
      <div className="invite-friends" ref={inviteRef} style={st}>
        <div className="search-heading">Invite Friends</div>
        <div className="search-results-container">
          {friends && friends.map(player => (
            <div className="search-results" key={player}>
              <div className="search-results-name" style={{ height: '20px' }}>{player}</div>
              <FcInvite className="search-results-remove" onClick={() => handleInvite(player)} />
            </div>
          ))}
        </div>
        <span style={{color : 'white', fontFamily:'revert', fontWeight:'10'}}>{text}</span>
        <div className="search-message-container" style={{ width : '100%'  ,bottom : '80px'}}>
            {message  && <Popup col={1} setAnimation={true} setMessage={setMessage} message={message} />}
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;
