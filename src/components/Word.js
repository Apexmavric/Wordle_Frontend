import React from "react";
import Block from "./Block";

export default function Word({val,isgreen}){
    const blocks = [];
    for(let i=0; i<5; i++)
    {
        if(i < val.length)
        {
            blocks.push(<Block name = {val[i]} isgreen = {isgreen[i]}></Block>)
        }
        else{
            blocks.push(<Block name = ""></Block>)
        }   
    }
    return(
        <div className="word-row">
        {blocks}
        </div>
    );
}