import AccountDetails from "../components/AccountDetails";
import ChangeEmail from "../components/ChangeEmail";
import ChangeProfile from "../components/ChangeProfile";
import ChangeUsername from "../components/ChangeUsername";
import Sidebar from "../components/SideBar";
const ProfilePage = ()=>{
    return(
        <div className="MenuPage">
            <div className="menu-navbar">
                <div className="menu-title">Wordle</div>
                <AccountDetails />
              </div>
              <Sidebar></Sidebar>
              <ChangeProfile/>
              {/* <ChangeUsername/> */}
              {/* <ChangeEmail/> */}
        </div>

    );
}

export default ProfilePage;