import React, { useEffect, useState } from 'react';
import { ReactComponent as ErrorSVG } from '../SvgIcons/381599_error_icon.svg';
import { ReactComponent as CorrectSVG } from '../SvgIcons/1930264_check_complete_done_green_success_icon.svg';
import { toInteger } from 'lodash';

const Popup = ({ col, message, setMessage, setAnimation, time = 2000 }) => {
    const [showPopup, setShowPopup] = useState(true);
    col = toInteger(col);
    useEffect(() => {
        if (setAnimation) {
            setShowPopup(true);
            let timeout;
            if (message) {
                timeout = setTimeout(() => {
                    setShowPopup(false);
                    setMessage(null);
                }, time);
            }
            return () => {
                if (timeout) clearTimeout(timeout);
            };
        }
    }, [message, setAnimation, time]);
    return (
        <div className={`popup-container ${showPopup && setAnimation ? 'pop-up-animation' : ''}`}>
            <div className="verify-icon">
                {col === 0 && <ErrorSVG height="60%" />}
                {col === 1 && <CorrectSVG height="50%" />}
            </div>
            <div className="verify-msg" style={{ backgroundColor: col === 1 ? 'lightgreen' : 'rgba(250, 39, 0, 1)', color: 'black' }}>
                {message.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Popup;
