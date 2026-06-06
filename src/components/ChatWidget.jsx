import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const SUGGESTED_QUESTIONS = [
  "Does Sanket have procurement experience?",
  "What are Sanket's strongest skills?",
  "Why should I hire Sanket?",
  "Tell me about Sanket's experience at Infosys.",
];

const CHAT_API_URL =
  import.meta.env.VITE_CHAT_API_URL ||
  "https://sanketagalave-production.up.railway.app";

async function readErrorMessage(response) {
  try {
    const data = await response.json();
    return data?.error || data?.message || response.statusText || "Unknown API error";
  } catch {
    return response.statusText || "Unknown API error";
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! 👋 I'm Sanket's AI assistant. Ask me anything about his skills, experience, and background!",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (question) => {
    setError(null);
    
    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      text: question,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${CHAT_API_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        const apiMessage = await readErrorMessage(response);
        throw new Error(
          `API error (${response.status}): ${apiMessage}. Check the Railway backend URL, CORS, and Groq key.`
        );
      }

      const data = await response.json();
      const botMessage = {
        id: messages.length + 2,
        text: data.answer || "Sorry, I couldn't generate a response.",
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setError(err.message);
      const errorMessage = {
        id: messages.length + 2,
        text: `Sorry, I encountered an error. ${err.message}`,
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full glass flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <span className="text-2xl">✕</span>
        ) : (
          <span className="text-2xl">💬</span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className="fixed bottom-24 right-6 z-40 w-full max-w-sm md:max-w-md h-[600px] rounded-3xl glass shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/10 backdrop-blur-xl p-4 border-b border-white/10">
            <h3 className="text-white font-semibold">Ask me about Sanket</h3>
            <p className="text-white/60 text-xs mt-1">Powered by AI</p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg.text} isUser={msg.isUser} />
            ))}

            {/* Suggested Questions (shown when empty or after greeting) */}
            {messages.length === 1 && !isLoading && (
              <div className="mt-6 space-y-2">
                <p className="text-white/50 text-xs font-semibold px-2">Suggested questions:</p>
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="w-full text-left text-xs p-3 rounded-xl glass text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 line-clamp-2"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce delay-100"></span>
                  <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce delay-200"></span>
                </div>
                <span className="text-white/60 text-xs">Thinking...</span>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10">
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      )}
    </>
  );
}
