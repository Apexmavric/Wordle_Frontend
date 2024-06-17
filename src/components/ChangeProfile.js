import Fileupload from "./Fileupload";
import '../styles/ProfilePage.css';
import ProfilePic from "./ProfilePic";
import ChangeUsername from "./ChangeUsername";
// import Fileupload from "./Fileupload";
const ChangeProfile =()=>{
     
    return(
        <div className="profile-page-containers c-profile">
            <div className="container-heading">Edit Personal Info</div>
            <div className="container-body">
                <div className="container-elements">
                    <ProfilePic/>
                </div>
                <div className="container-elements">
                    {localStorage.getItem('name')}
                </div>
            </div>
            <div className="change-options-container">
               <div className="change-options-body">
                    <Fileupload/>
               </div>
               <div className="change-options-body">
                      <ChangeUsername/>   
                    {/* <div className="">Change Username</div> */}
               </div>
            </div>
        </div>
    );
}


export default ChangeProfile;