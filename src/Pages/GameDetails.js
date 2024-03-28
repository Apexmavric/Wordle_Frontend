import React from "react";
import AccountDetails from "../components/AccountDetails";
import LeaderBoard from "../components/Leaderboard";
import Buttons from "../components/Buttons";
import SearchBar from "../components/Searchbar";
import Games from "../components/Games";
import Sidebar from "../components/SideBar";
export default function GameDetails(){
    
    return(
            <div className="MenuPage">
            <div className="menu-navbar">
                <div className="menu-title">Wordle</div>
                <AccountDetails/>
            </div>
            <Sidebar></Sidebar>
            <div className="leader-search-container">
                <Games/>
            </div>       
        </div>  
    );
}