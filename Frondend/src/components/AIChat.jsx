import bot from "../assets/bot.png";
import { useState, useEffect, useRef } from "react";
import api from "../services/api";

function AIChat() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("aiMessages");
    return saved ? JSON.parse(saved) : [];
  });

  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("aiMessages", JSON.stringify(messages));

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const getTime = () => {
    return new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const askAI = async () => {
    if (!question.trim()) return;

    const userText = question;

    const userMsg = {
      type: "user",
      text: userText,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setTyping(true);

    try {
      const res = await api.post("/ai/chat", {
        question: userText,
      });

      const aiMsg = {
        type: "ai",
        text: res.data.answer,
        time: getTime(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "AI sedang tidak tersedia.",
          time: getTime(),
        },
      ]);
    }

    setTyping(false);
  };

  return (
    <>
      <div className="ai-float-btn" onClick={() => setOpen(!open)}>
        <img src={bot} alt="Bot" className="bot-icon" />
      </div>

      {open && (
        <div className="ai-chat-box">
          <h3>Kicau AI Assistant</h3>

          <div className="chat-area">
            {messages.map((msg, index) => (
              <div key={index}>
                <div
                  className={
                    msg.type === "user"
                      ? "chat-bubble user-bubble"
                      : "chat-bubble ai-bubble"
                  }
                >
                  {msg.text}
                </div>

                <small className="chat-time">{msg.time}</small>
              </div>
            ))}

            {typing && <div className="typing-box">AI sedang mengetik...</div>}

            <div ref={chatEndRef}></div>
          </div>

          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Tekan Enter untuk kirim pesan..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askAI();
                }
              }}
            />

            <button onClick={askAI}>Kirim</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChat;
