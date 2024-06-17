// src/PassSvg.js
import React from 'react';

const PassSvg = ({ color = 'black', width = '24px', height = '24px' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={width}
            height={height}
            fill={color}
            className="svg-icon"
        >
            <path d="M 12 1 C 8.636 1 6 3.636 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.636 15.364 1 12 1 z M 12 3 C 14.243 3 16 4.757 16 7 L 16 8 L 8 8 L 8 7 C 8 4.757 9.757 3 12 3 z M 6 10 L 18 10 L 18 20 L 6 20 L 6 10 z M 8 14 A 1 1 0 0 0 7 15 A 1 1 0 0 0 8 16 A 1 1 0 0 0 9 15 A 1 1 0 0 0 8 14 z M 12 14 A 1 1 0 0 0 11 15 A 1 1 0 0 0 12 16 A 1 1 0 0 0 13 15 A 1 1 0 0 0 12 14 z M 16 14 A 1 1 0 0 0 15 15 A 1 1 0 0 0 16 16 A 1 1 0 0 0 17 15 A 1 1 0 0 0 16 14 z" />
        </svg>
    );
};

export default PassSvg;
