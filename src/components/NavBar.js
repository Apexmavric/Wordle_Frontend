import React from "react";

export default function NavBar({score}){
    return(
        <div className="navbar">
        <div className="title">Wordle</div>
        <div className="score">Score : {score}</div>
        </div>
    );
}