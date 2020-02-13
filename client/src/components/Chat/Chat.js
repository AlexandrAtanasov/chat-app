import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ( {location} ) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect( () => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);


        socket.emit('join', { name, room }, () => {
        }); 

        // when user has left the chat - closing the channel
        return () => {
            socket.emit('disconnect');
            socket.off();
        };
        
    }, [ENDPOINT, location.search]);


    useEffect( () => {
        socket.on('message', (message) => {
            // adding a new message to messages arr
            setMessages([...messages, message]);
        })
    }, [messages]);

    return (
        <h1>Chat</h1>
    )
}

export default Chat