import Block from "./Block";
import { useState } from "react";

export default function Word({val,isgreen,idx}){
    const blocks = [];
    for(let i=0; i<5; i++)
    {
        const id = idx * 5 + i;
        if(i < val.length)
        {   
            const index = `Block${id}`;
            blocks.push(<Block name = {val[i]} isgreen = {isgreen[i]} id = {id} />)
        }
        else{
            blocks.push(<Block name = ""  id = {id} />)
        }   
    }
    return(
        <div className="word-row">
        {blocks}
        </div>
    );
}