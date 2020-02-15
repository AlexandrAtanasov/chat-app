import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = ( {location} ) => {
    const [users, setUsers] = useState('');
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // const ENDPOINT = 'localhost:5000';
    const ENDPOINT = 'https://chat-application-on-react.herokuapp.com/';

    useEffect( () => {
        // get from URL name and room prop
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);


        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        }); 
    }, [ENDPOINT, location.search]);


    useEffect( () => {
        socket.on('message', (message) => {
            // adding a new message to messages arr
            setMessages([...messages, message]);
        });

        socket.on('roomData', ( {users} ) => {
            setUsers(users);
        });
        
        // when user has left the chat - closing the channel
        return () => {
            socket.emit('disconnect');
            socket.off();
        };
        
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        };
    };

    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room={room} users={users}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

export default Chat