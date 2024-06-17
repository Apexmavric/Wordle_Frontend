import React from "react";
import { useNavigate } from "react-router";

const ButtonsWithInfo = ({ page, val, info, entry }) => {
    const navigate = useNavigate();

    // Replace \n with <br /> for HTML rendering
    const formattedInfo = info ? info.replace(/\n/g, '<br />') : '';

    return (
        <div className={`btn-container ${entry}`}>
            <p className="btn-info" dangerouslySetInnerHTML={{ __html: formattedInfo }}></p>
            <button className="play-buttons-btn" onClick={() => navigate(`/${page}`)}>{val}</button>
        </div>
    );
}

export default ButtonsWithInfo;
