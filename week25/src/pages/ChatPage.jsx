// src/pages/ChatPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" +
  API_KEY;

async function generateContent(prompt) {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status} ${response.statusText} ${errText}`);
    }

    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ??
      "응답 없음"
    );
  } catch (err) {
    console.error(err);
    return "오류가 발생했습니다.";
  }
}

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt) return;

    const userMsg = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const text = await generateContent(prompt);
    const aiMsg = { role: "assistant", content: text };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <PageWrapper>
      <ChatCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }} // y값 애니메이션 수정
        transition={{ duration: 0.6 }}
      >
        <Header />
        <Messages>
          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} content={m.content} />
          ))}
          {loading && <Loader />}
        </Messages>
        <ChatInput value={input} onChange={setInput} onSend={handleSend} />
      </ChatCard>
    </PageWrapper>
  );
};

export default ChatPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

const ChatCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: min(92vw, 720px);
  height: min(80vh, 820px);
  margin: 0 auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const Messages = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: #fafafa;
  overscroll-behavior: contain;
`;