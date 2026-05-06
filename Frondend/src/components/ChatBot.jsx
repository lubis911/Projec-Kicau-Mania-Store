import { useState } from "react";
import api from "../services/api";

function ChatBot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    const res = await api.post("/ai/chat", {
      question,
    });

    setAnswer(res.data.answer);
  };

  return (
    <div className="chat-box">
      <h3>AI Chat</h3>

      <input
        type="text"
        placeholder="Tanya stok, produk, rekomendasi..."
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={askAI}>Kirim</button>

      <p>{answer}</p>
    </div>
  );
}

export default ChatBot;
