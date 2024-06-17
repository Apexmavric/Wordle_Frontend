import React, { useState, useEffect, useCallback } from "react";
import Word from "../components/Word";
import MultiHints from "./MultiHints";
import Verify from "../components/Verify";

const ini = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

export default function MultiWords(props) {


    const [data, setData] = useState("");
    const [row, setRow] = useState(0);
    const [val, setVal] = useState(["", "", "", "", ""]);
    const [isGreen, setIsGreen] = useState(ini);
    const [useHint, setUseHint] = useState(false);

    useEffect(()=>{
        if(localStorage){
            const initialVal = JSON.parse(localStorage.getItem('val'));
            const initialIsGreen = JSON.parse(localStorage.getItem('isGreen'));
            const initialRow = parseInt(localStorage.getItem('row'));
            const initialUseHint = localStorage.getItem('useHint');
            if(initialIsGreen)
            {
                setIsGreen(initialIsGreen);
            }
            if(initialVal)
            {
                setVal(initialVal);
            }
            if(initialUseHint)
            {
                setUseHint(initialUseHint);
            }
            if(initialRow)
            {
                setRow(initialRow);
            }
        }
    }, [])

    function isAlphabetKeyCode(keyCode) {
        return (keyCode >= 65 && keyCode <= 90);
    }
    const fword = props.word;
    useEffect(()=>{
        if(props.hasended)
        {   
            setData("");
            setVal(["", "", "", "", ""]);
            localStorage.getItem('row', 0);
            setIsGreen(ini);
            setUseHint("");
            setRow(0);
            props.sethasended(false);
            props.winner(false);
            props.lost(false);
        }
    }, [props.hasended]);
    const addAnimations = ()=>{
        if(row < 5)
        {   
            const newArr = [];
            for(let i = 0; i<5; i++)
            {   const id = row*5 + i;
                newArr.push(`Block${id}`);
            }
            newArr.forEach((id, index) => {
                const ele = document.getElementById(id);
                if (ele) {
                    const delay = index * 0.3; 
                    ele.classList.add('animated');
                    ele.style.animationDelay = `${delay}s`;
                    ele.addEventListener('animationend', () => {
                        ele.classList.remove('animated');
                    });
                }
            });
        }
    }

    useEffect(() => {
        const handleChange = async(e) => {
            const hasended = JSON.parse(localStorage.getItem('hasended'));
            const won = JSON.parse(localStorage.getItem('winner'));
            const lost = JSON.parse(localStorage.getItem('lost'));
            if(row >= 5 || won || hasended || lost ) return;
            const keyCode = e.keyCode;
            if (props.winner === true || props.lost === true) return;
            if (isAlphabetKeyCode(keyCode)) {
                const key = e.key.toUpperCase();
                const id = key.charCodeAt(0) - 'A'.charCodeAt(0);
                var ele = document.getElementById(id);
                if(ele === null) return;
                const updatedData = data + key;
                if (data.length < 5) {
                    setData(prev=>prev+key);
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
            } 
            else if (e.key === 'Enter' && data.length === 5) {
                try {
                    const { socket } = props;
                    if (socket) {
                        socket.emit('verify-word', localStorage.getItem('room'), localStorage.getItem('name'), data);
                        socket.on('verify-response', (respdata) => {
                            // console.log(row, respdata)

                            if(respdata.status === 'right')
                            {
                                props.winner(true);
                                localStorage.setItem('winner', true);
                            }
                            else if(row === 4)
                            {
                                if (respdata.status !== 'right') {
                                    props.lost(true);
                                    localStorage.setItem('lost', true);
                                }
                            }
                            setIsGreen(prev=>{
                                // return {...prev,[row]:respdata.arr};
                                const newArr = [...prev];
                                newArr[row] =[...respdata.arr];
                                return newArr;
                              })
                            addAnimations();
                            setData("");
                            setRow(row + 1);
                        });
                    }
                    
                } catch (error) {
                    console.error(error);
                }
            }
        };
        document.addEventListener('keydown', handleChange);
        return () => {
            document.removeEventListener('keydown', handleChange);
            const { socket } = props;
            if(socket){
                socket.off('verify-response');
            }
        };
    }, [data, props, row]);
    
    useEffect(()=>{
        localStorage.setItem('isGreen', JSON.stringify(isGreen));
        localStorage.setItem('row', row)
    }, [isGreen, row])
    useEffect(() => {
        // console.log(isGreen);
        localStorage.setItem('val', JSON.stringify(val));
        localStorage.setItem('useHint', useHint.toString());
    }, [val, useHint]);

    const words = val.map((value, index) => (
        <Word key={`Word${index}`} val={value} isgreen={isGreen[index]} idx = {index} />
    ));

    return (
        <div className="hintandword">
            <div className="Words">{words}</div>
            <MultiHints socket={props.socket}/>
        </div>
    );
}
