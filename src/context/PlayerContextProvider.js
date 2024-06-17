import { useState } from "react";
import BlurContext from "./Playercontext.js"


const BlurContextProvider = ({children}) => {
    const [isblur, setisBlur] = useState(false);
    return (
        <BlurContext.Provider value={{isblur, setisBlur}}>
            {children}
        </BlurContext.Provider>
    );
}

export default  BlurContextProvider;