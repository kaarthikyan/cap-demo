'use client';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8000'; // Change if your API runs on a different port

export default function Chat() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [user] = useState('User' + Math.floor(Math.random() * 1000));
  const socketRef = useRef<Socket | null>(null);
  const [isChatVisible, setIsChatVisible] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on('chat', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && socketRef.current) {
      socketRef.current.emit('chat', { user, text: input });
      setInput('');
    }
  };

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <button 
        onClick={toggleChat} 
        style={{ 
          position: 'absolute', 
          top: '-40px', 
          right: '0', 
          padding: '10px', 
          backgroundColor: 'green', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {isChatVisible ? '🗨️ Hide Chat' : '🗨️ Show Chat'}
      </button>
      {isChatVisible && (
        <div style={{ border: '1px solid #ccc', padding: 16, maxWidth: 400, backgroundColor: 'white' }}>
          <h3>Chat Room</h3>
          <div style={{ minHeight: 120, marginBottom: 8, maxHeight: 300, overflowY: 'auto' }}>
            {messages.map((msg, idx) => (
              <div key={idx}><b>{msg.user}:</b> {msg.text}</div>
            ))}
          </div>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            style={{ 
              width: '70%', 
              border: '2px solid green',
              borderRadius: '4px',
              padding: '5px'
            }}
          />
          <button 
            onClick={sendMessage} 
            style={{ 
              width: '28%', 
              marginLeft: 4, 
              border: '2px solid green',
              borderRadius: '4px',
              padding: '5px',
              backgroundColor: 'white',
              color: 'green'
            }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}