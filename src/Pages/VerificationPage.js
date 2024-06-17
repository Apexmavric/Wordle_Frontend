import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../components/Spinner";
import { head } from "lodash";
import '../styles/VerificationPage.css';
import {ReactComponent as ErrorSVG} from '../SvgIcons/381599_error_icon.svg'
import {ReactComponent as CorrectSVG} from '../SvgIcons/1930264_check_complete_done_green_success_icon.svg'
import Popup from "../components/Popup";

const VerificationPage = ()=>{
    const [col, setCol] = useState(1);
    const [message, setMessage] = useState(null);
    const {token} = useParams();
    const [isLoading, setisLoading] = useState(true);
    console.log(token);
    const verifyLink = async()=>{
        try{
               const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/verify-link`, {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token}) 
            });
            const data = await response.json();
            setMessage(data.msg);
            if(response.status === 200) setCol(1);
            else setCol(0);
            setisLoading(false);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    useEffect(()=>{
        verifyLink();
    },[]);
    const style = {
        // outline: '1px solid red',
        color : 'aliceblue',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        height : '200px',
        width : '50%',
        flexDirection: 'column',
        // backgroundColor : col == 1 ? 'green' : '#FD3B3B',
    }
    return(
        <div className="Login-Page">
            {
                isLoading && <Spinner/>
            }
            {
                !isLoading && (
                    <div className="verify-link-container">
                        <Popup  col={col} message={message} setMessage={setMessage} setAnimation={false}/>
                    </div>
                )
            }
        </div>
    );
}

export default VerificationPage;