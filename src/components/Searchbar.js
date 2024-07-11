import React, { useState , useContext}  from "react";
import { IoPersonAdd } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { IoPersonRemove } from "react-icons/io5";
import Popup from "./Popup";
import BlurContext from '../context/Playercontext';
const SearchBar=({showpopup, setShowpopup})=>{
    const [val, setVal] = useState("");
    const [results, setResults] = useState([]);
    const token = localStorage.getItem('token');
    const [message, setMessage] = useState(null);
    const [col, setCol] = useState(2);
    const {isblur} = useContext(BlurContext);
    const handleChange = async(e)=>{
        e.preventDefault(); 
        setVal(e.target.value);
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/v1/player/search", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(
                        {
                         name: e.target.value
                        }
                )
            });
            let data = await response.json();
            // console.log(data);
            setResults(data.playerDetails);
            
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit = (e)=>{
        setVal('');
    }
    const handleaddFriend = async(name)=>{
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/v1/player/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(
                    {
                        name: name
                    }
                )
            });
            let data = await response.json();
             setMessage(data.msg);
             if(response.status === 200){
                setCol(1);
             }
             else{
                setCol(0);
             }
        } catch (error) {
            console.error(error);
        }
    }
    const handlremoveFriend = async(id)=>{
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/v1/player/delete", {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(
                    {
                        id: id
                    }
                )
            });
            let data = await response.json();
            setMessage(data.msg);
             if(response.status === 200){
                setCol(1);
             }
             else{
                setCol(0);
             }
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <div className={`friends-page-container ${isblur ? 'blur' : ''}`}>
        <div className="search-bar">
            <div className="search-message-container">
                 { message && <Popup col={col} setAnimation={true} setMessage={setMessage} message={message}/>}
            </div>
            <div className="search-heading">Search Players</div>
            <form onSubmit={handleSubmit} className="search-form">
                <input type="string" value={val} onChange={handleChange} placeholder="search for friends.." className="search-input"/>
            </form>
                <div className="search-results-container">
                {
                    results && results.map(e=>{
                        return (
                        <div className="search-results">
                            <RxAvatar />
                            <div className="search-results-name">{e.playerName}</div>
                            <IoPersonAdd className="search-results-add" onClick={()=>{handleaddFriend(e.playerName)}} />
                            <IoPersonRemove className="search-results-remove" onClick={()=>{handlremoveFriend(e.playerId)}}/>
                        </div>)
                    })               
                }
                </div>
        </div>
        </div>
    );
}
export default SearchBar;