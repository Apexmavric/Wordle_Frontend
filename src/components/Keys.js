import React from "react";

export default function Key(props){
    return(
        <div id = {props.id} className="alphabet-keys">{props.name} </div>
    );
}