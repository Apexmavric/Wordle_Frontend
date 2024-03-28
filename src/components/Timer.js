import { useEffect, useState } from "react";
import Fetchtime from "./Fetchtime";
import Reset from "./Reset";
import Verify from "./Verify";

const Timer = ({ fr, restart, setTime, time, hasLost, iswinner, sethasLost, setWord }) => {
    const totalTime = 200;
    const token = localStorage.getItem('token');

    useEffect(() => {
        const func = async () => {
            const fetchedTime = await Fetchtime(); // Renamed time variable here
            setTime(fetchedTime);
            await Reset();
        }
        func();
    }, [restart])

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => {
                const newTime = prevTime - 1;
                if (hasLost || iswinner) {
                    return prevTime;
                }
                else if (newTime <= 0) {
                    clearInterval(timer);
                    sethasLost(true);
                    const verify = async()=>{
                        const respdata = await Verify("", 0, 4);
                        console.log(respdata);
                        setWord(respdata.word);
                    }
                    verify();
                    return 0;
                }
                else return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [restart, iswinner, hasLost]);

    return (
        <div className="timer">{time}</div>
    );
}

export default Timer;
