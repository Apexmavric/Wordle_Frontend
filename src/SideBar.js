
import Fileupload from "./components/Fileupload";
const Sidebar = ()=>{
    return(
        <div className="sidebar-container"> 
        <Fileupload/>
        <div className="sidebar-info-container">
            <div className="sidebar-info">Name</div>
            <div className="sidebar-info">Score</div>
            <div className="sidebar-info">MaxScore</div>
            <div className="sidebar-info">MaxStreak</div>
            <div className="sidebar-info">No of games Played</div>
            <div className="sidebar-info">Win Ratio</div>
            <div className="sidebar-info">View Friends</div>
            <div className="sidebar-info">Game History</div>
        </div>
        </div>
    );
}

export default Sidebar;