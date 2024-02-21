import { useEffect } from "react";
import { useState } from "react";
export default function Hints({word, restart, usehint}){
        const [hint, setHint] = useState(0);
        const [data, setdata] = useState(null);
        useEffect(()=>{
        if(restart){
            setHint(0);
            setdata(null);
        }
        if(word!=null)
        {
            async function fetchHint()
            {
                const endpoint = `https://api.api-ninjas.com/v1/dictionary?word=${word}`;
                const apiKey = 'ileVzLK6EHWk1NWu9XzKOw==VRmV6Ss2Mbc6fiL1';
                console.log(word);
                const headers = new Headers();
                headers.append('X-Api-Key', apiKey);
                const resp = await fetch(endpoint, {
                method: 'GET', 
                headers: headers
                })
                if(resp.ok)
                {
                    const data = await resp.json();
                    setdata(data.definition);
                }
            }
            fetchHint();
        }
        
    },[word,restart])

    function handleClick(){
        setHint(prevhint=>prevhint+1);
        if(data)usehint(true);
    }
    return(
        <div className = "hints">
            <button className="hint-btn" onClick={handleClick}>{hint === 1 ? "Back" : "Hints"}</button>
            {hint ===  1 && data && <div className="hintData">{data}</div>}
            {hint ===  1 && !data && <div className="hintData">Sorry hints for this word are not available 
            </div>}
        </div>
    );
}