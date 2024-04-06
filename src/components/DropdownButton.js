import {FaChevronDown, FaChevronUp} from "react-icons/fa"; 
 const DropdownButton = ({txt, open, toggle})=>{
    return( 
        <div className={`dropdown-btn ${open ? 'button-open' : null}`} onClick={toggle}>
            {txt}
            <span className="toggle-icon"> 
                {
                    open ? <FaChevronUp/> : <FaChevronDown/>                
                }
            </span>
        </div>
    );
}

export default DropdownButton;