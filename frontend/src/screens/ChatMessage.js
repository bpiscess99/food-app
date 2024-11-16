import axios from 'axios';
import React, { useState } from 'react';
import "./chatMessage.css"
import Navbar from '../components/Navbar';

const ChatMessage = () => {
   const [messages, setMessages] = useState([])
   const [input, setInput] = useState("")
   const [isTyping, setIsTyping] = useState(false)

   const handleSendMessage = async () => {
        if(!input.trim()) return;

        const userMessage = {role: "user", content: input};
        setMessages([...messages, userMessage]);
        setInput("");
        setIsTyping(true);


        // api call 
        try {
            // send user message to backend
            const response = await axios.post("http://localhost:5000/api/chats/ai-chat",{
                userMessage: input,
            });
            const aiMessage = {role: "ai", content: response.data.message};
            setMessages([...messages, userMessage, aiMessage]);
        } catch (error) {
            console.log("Error fetching AI response:", error)
        }
   };
   

  return (
    <div>
      <Navbar/>
    <div className='chat-container'>
    <div className='chat-messages'>
        {messages.map((msg, index) => (
         <div key={index} className={`message ${msg.role}`}>
           {msg.content}
         </div>
        ))}
        {isTyping && <div className='message ai'>AI is typing...</div>}
    </div>
    <div className='chat-input'>
        <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Type a message...'
        />
        <button onClick={handleSendMessage}>Send</button>
    </div>
    </div>
    </div>
  )
}

export default ChatMessage