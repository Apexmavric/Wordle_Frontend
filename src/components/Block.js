import React from "react";

export default function Block(props){
    let bg = "#333";
    if(props.isgreen === 1) bg = "green";
    else if(props.isgreen === 2) bg = "lightgray";
    else if(props.isgreen === 3) bg = "yellow";
    return (
        <div id = {props.id} className="block" style={{ backgroundColor: bg }}>{props.name}</div>
    );
    
}