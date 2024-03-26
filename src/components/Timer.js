import { BorderAll } from "@mui/icons-material";
import { useEffect, useState } from "react";
const Timer = ({fr, restart})=>{
    const [time, setTime] = useState(0);
    const totalTime = 200;
    const token  = localStorage.getItem('token');
    useEffect(()=>{
        const fetchTime=async()=>{
            try {
                const response = await fetch("http://localhost:5000/api/v1/player/time", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                console.log(data);
                setTime(data.time);
                response = await fetch("http://localhost:5000/api/v1/game/reset", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                });
               data = await response.json();
            } catch (error) {
                console.error(error);
            }
        }
        fetchTime();
    },[restart])
    useEffect(() => {
        const timer = setInterval(() => {
          setTime(prevTime => {
            const newTime = prevTime - 1;
            if (newTime <= 0) {
              clearInterval(timer); 
              return 0;
            }
            return newTime;
          });
        }, 1000);
      
        return () => clearInterval(timer); 
      }, []);
      
    return (
          <div className="timer">{time}</div>
      );
}

export default Timer;