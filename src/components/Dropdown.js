import React, { useEffect, useRef, useState } from "react";
import DropdownButton from "./DropdownButton";
import DropdownContent from "./DropDownContent";
import DropdownItems from "./DropDownItems";

const Dropdown = ({items, text, setf})=>{
    const [open, setOpen] = useState(false);
    const handleToggle = ()=>{
        setOpen((open)=>!open);
    }
    const dropdownref = useRef();
    useEffect(()=>{
        const handler = (e)=>{
            if(dropdownref.current && !dropdownref.current.contains(e.target))
            {
                setOpen(false);
            }
        }
        document.addEventListener("click", handler);
        return ()=>{
            document.removeEventListener("click", handler);
        }
    },[dropdownref])
    return (
        <div className="dropdown" ref={dropdownref}> 
            <DropdownButton txt = {text} open ={open} toggle = {handleToggle} />
            <DropdownContent content ={
                <>
                    {
                        items.map((data,i)=>{
                            // console.log(data);
                            return <DropdownItems child={data} key={i} setf={setf} toggle = {setOpen}/>
                        })
                    }
                </>
            } open = {open}/>
        </div>
    );
}

export default Dropdown;
