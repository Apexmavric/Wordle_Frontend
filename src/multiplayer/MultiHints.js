import { useEffect } from "react";
import { useState } from "react";
export default function MultiHints({socket}){
        const [hint, setHint] = useState(false);
        const text = "Sorry hints are not available for this word!";
        const [data, setdata] = useState(text || localStorage.getItem('hints'));

    function handleClick(){
        setHint(prev=>{
            if(socket && prev === false)
            {   
                if(!localStorage.getItem('hints'))
                {   
                    console.log('Reuesting for hints');
                    socket.emit('get-hint-request', localStorage.getItem('room'));
                    socket.on('fetch-hint', (hint)=>{
                        setdata(hint);
                        localStorage.setItem('hints', hint);
                    })
                }
            }
            return !prev;
        });
    }
    return(
        <div className = "hints">
            <button className="hint-btn" onClick={handleClick}>{hint === true ? "Back" : "Hints"}</button>
            {hint && <div className="hintData">{data}</div>} 
        </div>
    );
}