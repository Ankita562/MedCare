import React, { useState } from "react";
import "./ChatbotPage.css";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botMsg = {
        sender: "bot",
        text: "I'm MedCare AI 🤖! How can I help you today?",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 700);

    setInput("");
  };

  return (
    <div className="chatbot-page">
      <div className="chat-window">
        <h2>MedCare Assistant 🤖</h2>

        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input-box">
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
