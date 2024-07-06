import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;

    // Append the user message and a placeholder for the AI message
    const userMessage = { text: input, user: 'user' };
    const aiMessage = { text: '', user: 'ai' };
    const newMessages = [...messages, userMessage, aiMessage];
    setMessages(newMessages);
    setInput('');

    const eventSource = new EventSource(`http://localhost:5000/api/chat?prompt=${input}`);

    eventSource.onmessage = (event) => {
      const updatedMessages = [...newMessages];
      updatedMessages[updatedMessages.length - 1].text += event.data; // Append streamed data to the AI message
      setMessages(updatedMessages);
    };

    eventSource.onerror = (error) => {
      console.error('Error receiving stream:', error);
      eventSource.close();
    };

    eventSource.addEventListener('end', () => {
      eventSource.close();
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Codebox AI</h1>
      </header>
      <div className="chat-container">
        <ChatWindow messages={messages} />
        <ChatInput 
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

const ChatWindow = ({ messages }) => (
  <div className="chat-window">
    {messages.map((message, index) => (
      <div key={index} className={`message ${message.user}`}>
        {message.text}
      </div>
    ))}
  </div>
);

const ChatInput = ({ input, setInput, sendMessage }) => (
  <div className="chat-input">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      placeholder="Type a message..."
    />
    <button onClick={sendMessage}>Send</button>
  </div>
);

export default App;
