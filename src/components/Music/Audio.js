import { useEffect, useRef } from "react";
// import NotificationSounds from "../Sounds/NotificationSounds.mp3";

const Audio = ({source}) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            // audioRef.current.muted = true;
            audioRef.current.play().catch((error) => {
                console.error('Autoplay failed:', error);
            });
        }
    }, []);

    return (
        <audio ref={audioRef} src={source} muted></audio>
    );
};

export default Audio;
