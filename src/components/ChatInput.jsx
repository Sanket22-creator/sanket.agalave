import React, { useState } from "react";

export default function ChatInput({ onSend, isLoading }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 pt-4 border-t border-white/10">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask about my skills..."
        disabled={isLoading}
        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-white/40 outline-none focus:border-blue-500/50 transition-colors disabled:opacity-50"
      />
      <button
        onClick={handleSend}
        disabled={!input.trim() || isLoading}
        className="glass rounded-2xl px-4 py-3 text-white/80 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="animate-spin inline-block">⟳</span>
        ) : (
          <span>Send</span>
        )}
      </button>
    </div>
  );
}
