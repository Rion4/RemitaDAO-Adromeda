import React, { useState, useEffect } from "react";
import { SYSTEM_INSTRUCTIONS, WELCOME_MESSAGE } from "../systemInstructions";

const ChatBot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "model",
      parts: [
        {
          text: WELCOME_MESSAGE,
        },
      ],
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const chatHistoryDiv = document.getElementById("chat-history");
    if (chatHistoryDiv) {
      chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight;
    }
  }, [chatHistory]);

  const callGeminiApi = async (prompt, currentChatHistory) => {
    const updatedChatHistory = [
      ...currentChatHistory,
      { role: "user", parts: [{ text: prompt }] },
    ];
    setChatHistory(updatedChatHistory);

    // Use system instructions from separate file

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    const payload = {
      contents: updatedChatHistory,
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTIONS }],
      },
    };
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { role: "model", parts: [{ text: text }] },
        ]);
        return text;
      } else {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          {
            role: "model",
            parts: [{ text: "Sorry, I couldn't generate a response." }],
          },
        ]);
        return "Error";
      }
    } catch (error) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "model",
          parts: [{ text: "Connection error. Please try again." }],
        },
      ]);
      return "Error";
    }
  };

  const sendMessage = async () => {
    const message = userInput.trim();
    if (!message) return;

    setUserInput("");
    setIsLoading(true);

    try {
      await callGeminiApi(message, chatHistory);
    } catch (error) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "model",
          parts: [{ text: "Error occurred. Please try again." }],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 border border-white/20 backdrop-blur-sm"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>

      {isVisible && (
        <div className="fixed right-6 top-20 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 z-40 w-96 h-[600px]">
          <div className="flex flex-col h-full">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  🤖
                </div>
                <h3 className="font-semibold text-lg">RemitaDAO Assistant</h3>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-white hover:text-gray-200 transition-colors p-1 hover:bg-white/10 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div
              id="chat-history"
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-black/20"
            >
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md"
                        : "bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-bl-md"
                    }`}
                  >
                    {msg.parts[0].text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 backdrop-blur-sm text-white max-w-xs px-4 py-3 rounded-2xl rounded-bl-md border border-white/20 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-black/20 border-t border-white/10 rounded-b-xl">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <textarea
                    placeholder="Ask me about RemitaDAO..."
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-white placeholder-gray-300"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    rows="1"
                    style={{
                      minHeight: "48px",
                      maxHeight: "120px",
                      lineHeight: "1.5",
                    }}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-md flex-shrink-0 flex items-center justify-center border border-white/20"
                  disabled={isLoading || !userInput.trim()}
                  style={{
                    height: "48px",
                    width: "48px",
                    padding: "0",
                    minHeight: "48px",
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
