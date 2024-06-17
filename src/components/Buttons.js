import React, { forwardRef } from "react";
import BlurContext from "../context/Playercontext";
import { useContext } from "react";
import '../styles/PlayPage.css';
import ButtonsWithInfo from "./ButtonsWithInfo";

const Buttons = forwardRef(({}, ref) => {
    const playButtonMessage = process.env.REACT_APP_PLAY_BUTTON_MESSAGE;
    const joinButtonMessage = process.env.REACT_APP_JOIN_BUTTON_MESSAGE;
    const createButtonMessage = process.env.REACT_APP_CREATE_BUTTON_MESSAGE;
    const {isblur} = useContext(BlurContext);
    const style = {
        zIndex: isblur ? -1 : 10
    }
    return (
        <div className={`play-buttons ${isblur ? 'blur' : ''}`} ref={ref} style={style}>
            <ButtonsWithInfo val="Play Alone" entry="left" page="single" info={playButtonMessage} />
            <ButtonsWithInfo val="Create Room" entry="right" page="create" info={createButtonMessage} />
            <ButtonsWithInfo val="Join Room" entry="left" page="join" info={joinButtonMessage} />
        </div>
    );
});

export default Buttons;
