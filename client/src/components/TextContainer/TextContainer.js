import React from 'react';

import './TextContainer.css';

import onlineIcon from '../../icons/onlineIcon.png';

const TextContainer = ( {users} ) => {
    return (
        <div className="textContainer">
            <div>
                <h1>Chat Application</h1>
                <p>Created with ReactJS, NodeJS, ExpressJS, Socket.IO</p>
            </div>
            { users ? (
                <div>
                    <h2>Online users:</h2>
                    <div className="activeContainer">
                        {users.map(({name}) => (
                            <h3 key={name} className="activeItem">
                                <img alt="Online Icon" src={onlineIcon}/>
                                {name}
                            </h3>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default TextContainer