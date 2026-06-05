import React from "react";

export default function ChatMessage({ message, isUser }) {
  return (
    <div className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "glass text-white/90 rounded-bl-none"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
