const DropdownContent = ({content, open})=>{
    return(
        <div className={`dropdown-content ${open ? 'content-open' : null}`}>
            {content}
        </div>
    )
}

export default DropdownContent