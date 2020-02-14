import React from 'react';

import './TextContainer.css';

import onlineIcon from '../../icons/onlineIcon.png';

const TextContainer = ( {users} ) => {
    return (
        <div className="textContainer">
            <div>
                <h1>Chat Application</h1>
                <h2>Created with ReactJS, NodeJS, ExpressJS, Socket.IO</h2>
            </div>
            { users ? (
                <div>
                    <h1>Online users:</h1>
                    <div className="activeContainer">
                        <h2>
                            {users.map(({name}) => (
                                <div key={name} className="activeItem">
                                    <img alt="Online Icon" src={onlineIcon}/>
                                    {name}
                                </div>
                            ))}
                        </h2>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default TextContainer