import React, { useState } from "react";
import { useEffect } from 'react';
import Word from "./Word";
import Hints from "./Hints";
import Verify from "./Verify";


export default function Words(props){
    const ini = [ [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]]
    const [data,setData] = useState("");
    const [row, setRow] = useState(0);
    const [val, setVal] = useState(["","","","",""]);
    const [isGreen, setIsGreen] = useState(ini);
    const [useHint, setuseHint] = useState(false);
   
    function isAlphabetKeyCode(keyCode) {
        return (keyCode >= 65 && keyCode <= 90); 
    }
    const fword = props.word;
    useEffect(() => {
        if (props.restart) {
            setData("");
            setRow(0);
            setVal(["", "", "", "", ""]);
            setIsGreen(ini);
            props.winner(false);
            props.lost(false);
            props.fr(false);
            setuseHint(false);
        }
    
        async function handleChange(e) {
            const keyCode = e.keyCode;
            if (props.winner === true || props.lost === true) return;
            if (isAlphabetKeyCode(keyCode)) {
                const key = e.key.toUpperCase();
                const id = key.charCodeAt(0) - 'A'.charCodeAt(0);
                var ele = document.getElementById(id);
                const updatedData = data + key;
                if (data.length < 5) {
                    setData(updatedData);
                    setVal(prevVal => {
                        const newVal = [...prevVal];
                        newVal[row] = updatedData;
                        return newVal;
                    });
                }
                ele.style.backgroundColor = 'grey';
                setTimeout(() => {
                    ele.style.backgroundColor = '#333';
                }, 170);
            } else if (e.key === 'Backspace') {
                if (data.length > 0) {
                    const newData = data.slice(0, -1);
                    setData(newData);
                    setVal(prevVal => {
                        const newVal = [...prevVal];
                        newVal[row] = newData;
                        return newVal;
                    })
                }
            } else if (e.key === 'Enter' && data.length === 5) {
                try {
                    const respdata = await Verify(data, props.time, row);
                    console.log(respdata);
                    if (respdata.status === 'right') {
                        props.winner(true);
                    } else if (row === 4) {
                        if (respdata.status !== 'right') {
                            props.lost(true);
                            props.setWord(respdata.word);
                        }
                    }
                    setIsGreen(prev => {
                        const newArr = [...prev];
                        newArr[row] = respdata.arr;
                        return newArr;
                    });
                    setRow(prev => prev + 1);
                    setData("");
                } catch (error) {
                    console.error(error);
                }
            }
        }
    
        document.addEventListener('keydown', handleChange);
        return () => {
            document.removeEventListener('keydown', handleChange);
        };
    }, [data, row, val, isGreen, props.restart]);
    const words = [];
    for(let i = 0; i<5; i++)
    {   
        words.push(<Word val = {val[i]} isgreen = {isGreen[i]}></Word>);
    }
    return(
        <div className="hintandword">  
            <div className="Words">{words}</div>
            <Hints  word={fword} restart = {props.restart} func_score = {props.func_score} usehint = {setuseHint}></Hints>
        </div>
    );   
}