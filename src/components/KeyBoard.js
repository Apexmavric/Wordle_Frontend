import React from "react";
import Key from "./Keys";

const rows = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm'
  ];
export default function KeyBoard(){
    return(
        <div className="keyboard">
        {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="keyboard-row">
                {row.split('').map((char, charIndex) => (
                    <Key id={char.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)} name={char.toUpperCase()} />
                ))}
            </div>
        ))}
    </div>
    );
}