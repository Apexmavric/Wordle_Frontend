const DropdownItems = ({child, setf, toggle})=>{
    return(
        <div className="dropdown-item" onClick={()=>{
            setf(child);
            toggle(false);
        }}>
            {child}
        </div>

    );
}   

export default DropdownItems