import React, { useState }  from "react";
import { IoPersonAdd } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { IoPersonRemove } from "react-icons/io5";
// import { useNavigate } from "react-router";
const SearchBar=()=>{
    const [val, setVal] = useState("");
    const [results, setResults] = useState([]);
    const token = localStorage.getItem('token');
    const handleChange = async(e)=>{
        e.preventDefault(); 
        setVal(e.target.value);
        console.log(e.target.value);
        try {
            const response = await fetch("http://localhost:5000/api/v1/player/search", {
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
            console.log(data);
            setResults(data.playerDetails);
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit = (e)=>{
        // e.preventdefault();
        setVal('');
    }
    const handleaddFriend = (id)=>{
        
    }
    const handlremoveFriend = ()=>{

    }
    return(
        <div className="search-bar">
            <form onSubmit={handleSubmit} className="search-form">
                <input type="string" value={val} onChange={handleChange} placeholder="search for friends.." className="search-input"/>
                <button type = "submit" className="search-btn">Search</button>
            </form>
                <div className="search-results-container">
                {
                    results && results.map(e=>{
                        return (
                        <div className="search-results">
                            <RxAvatar />
                            <div className="search-results-name">{e.playerName}</div>
                            <IoPersonAdd className="search-results-add" onClick={()=>{handleaddFriend(e.playerId)}} />
                            <IoPersonRemove className="search-results-remove" onClick={()=>{handlremoveFriend(e.playerId)}}/>
                        </div>)
                    })               
                }
                </div>
        </div>
    );
}
export default SearchBar;