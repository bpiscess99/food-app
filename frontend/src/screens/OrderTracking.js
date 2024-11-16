import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import "./orderTracking.css"

const socket = io("http://localhost:5000");
  

const OrderTracking = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        // Listen for Order Status updates
      socket.on("chatMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

    //   clean up on component unmount
    return() => {
        socket.off("chatMessage")
    }
    }, []);

    const handleSendMessage = () => {
        socket.emit("chatMessage", {message: newMessage})
        setNewMessage("")
    };    

  return (
    <div className="order-container">
        <div className='order-header'>
        <h2 style={{fontSize: "25px"}}>How May I Help You</h2>
        </div>
        <div className='order-messages'>
            {messages.map((msg, index) => (
                <p key={index} className='message'>{msg.message}</p>
            ))}
        </div>
        <div className='order-input'>
        <input
        type='text'
        value={newMessage}
        placeholder='Text Here!'
        onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
        </div>
    </div>
  )
}

export default OrderTracking