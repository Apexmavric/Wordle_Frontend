import React from "react";

export default function NavBar({score}){
    return(
        <div className="navbar">
        <span className="title">Wordle</span>
        <span className="score">Score : {score}</span>
        </div>
    );
}