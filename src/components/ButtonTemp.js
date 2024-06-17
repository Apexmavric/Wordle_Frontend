import React from 'react';

const ButtonTemp = ({ value, height, width, color , isAvail, onClick}) => {
    const buttonStyle = {
        height: height,
        width: width,
        backgroundColor: color,
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        cursor: isAvail ? 'pointer' : 'not-allowed', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isAvail ? 1 : 0.5, // Reduce opacity when disabled
        // pointerEvents: isAvail ? 'auto' : 'none' /
    };

    return (
        <button className="button-temp" style={buttonStyle} disabled={!isAvail} onClick={onClick}>
            {value}
        </button>
    );
};

export default ButtonTemp;
