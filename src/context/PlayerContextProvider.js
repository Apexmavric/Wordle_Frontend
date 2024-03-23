import { useState } from "react";
import PlayerContext from "./Playercontext.js"


const PlayerContextProvider = ({children}) => {
    const [token, setToken] = useState("");
    const [playerId, setPlayerId] = useState("");
    const [playerName, setPlayername] = useState("");
    return (
        <PlayerContext.Provider value={{token, setToken, playerId, setPlayerId, playerName, setPlayername}}>
            {children}
        </PlayerContext.Provider>
    );
}

export default  PlayerContextProvider;