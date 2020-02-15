import React, { useState } from 'react';


import TextContainer from '../TextContainer/TextContainer';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

import './InfoBar.css';

const InfoBar = ( {room, users} ) => {
    
    const [isInfoActive, setIsInfoActive] = useState(false);

    const setInfoHandler = () => {
        setIsInfoActive(!isInfoActive);
    }

    return (
        <div className='infoBar'>
            <div className='leftInnerContainer'>
                <img className='onlineIcon' src={onlineIcon} alt='online'/>
                <h3>{room}</h3>
            </div>
            <div className='centerInnerContainer'>
                <button  
                    className='showInfoButton'
                    onClick={setInfoHandler}
                >
                    {!isInfoActive ? 'Show info' : 'Close info'}
                </button>
            </div>
            <div className='rightInnerContainer'>
                <a href='/'><img src={closeIcon} alt='close'/></a>
            </div>
            {isInfoActive ? (
                <div className='informationBar'>
                    <TextContainer users={users} /> 
                </div>
            ) : null}
        </div>
    );
};

export default InfoBar