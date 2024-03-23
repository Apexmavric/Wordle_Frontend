import React from "react";
import AccountDetails from "../components/AccountDetails";
import LeaderBoard from "../components/Leaderboard";
import Buttons from "../components/Buttons";
import SearchBar from "../components/Searchbar";
// import Lead
export default function Menu(){
    return(
        <div className="MenuPage">
            <div className="menu-navbar">
                <div className="menu-title">Wordle</div>
                <AccountDetails/>
            </div>
            <Buttons/>  
            <div className="leader-search-container">
             <LeaderBoard/>
             <SearchBar/>
            </div>       
        </div>
    );
}