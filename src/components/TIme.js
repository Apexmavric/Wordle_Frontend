import { useEffect, useRef } from "react";

const Time = ({ time = 30, initialTime = 30 }) => {
    const lineRef = useRef();

    useEffect(() => {
        if (time >= 0 && initialTime) {
            const widthPercentage = (time / initialTime) * 100;
            let color;

            if (widthPercentage > 50) {
                
                const yellowRatio = (100 - widthPercentage) / 50;
                color = `rgb(255, 255, ${255 * (1 - yellowRatio)})`;
            } else {
                const redRatio = widthPercentage / 50;
                color = `rgb(255, ${255 * redRatio}, 0)`;
            }

            if (lineRef.current) {
                lineRef.current.style.width = `${widthPercentage}%`;
                lineRef.current.style.backgroundColor = color;
            }
        }
    }, [time, initialTime]);

    return (
        <div className="time-container" >
            <div ref={lineRef} className="time-line"></div>
            <span style={{ top: '10px', position: 'absolute' }}>Score : {time}</span>
        </div>
    );
};

export default Time;
