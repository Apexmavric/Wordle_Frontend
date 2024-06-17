import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion'; // Correct import statement

const Confetti = () => {
    const [dimensions, setDimensions] = useState({ height: window.innerHeight, width: window.innerWidth });

    const changeDimensions = () => {
        setDimensions({ height: window.innerHeight, width: window.innerWidth });
    };

    useEffect(() => {
        window.addEventListener('resize', changeDimensions); // Changed 'document' to 'window'
        return () => {
            window.removeEventListener('resize', changeDimensions); // Changed 'document' to 'window'
        };
    }, [dimensions]);

    return <ConfettiExplosion width={dimensions.width} height={dimensions.height} tweenDuration={1000} particleCount={300} duration={3000} />; // Passed dimensions as props
};

export default Confetti;
