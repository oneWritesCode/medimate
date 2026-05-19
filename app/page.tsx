"use client";

import { useState, useRef, useEffect } from "react";
import {
  Trash2,
  ShieldCheck,
  ArrowUp,
  Thermometer,
  Brain,
  Wind,
  Activity,
  Zap,
  Sparkles,
} from "lucide-react";
import ChatBubble from "@/components/ChatBubble";
import TypingIndicator from "@/components/TypingIndicator";

interface Message {
  role: "user" | "assistant";
  content: string;
  parsed?: {
    type: "question" | "answer";
    message: string;
    options?: string[];
    multiSelect?: boolean;
  };
}

const CATEGORIES = [
  { label: "Fever", icon: Thermometer, color: "text-orange-500" },
  { label: "Headache", icon: Brain, color: "text-purple-500" },
  { label: "Cough & Cold", icon: Wind, color: "text-blue-500" },
  { label: "Stomach Pain", icon: Activity, color: "text-green-500" },
  { label: "Skin Issues", icon: Sparkles, color: "text-pink-500" },
  { label: "Fatigue", icon: Zap, color: "text-yellow-500" },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: JSON.stringify({
        type: "answer",
        message:
          "Hello. I'm MediMate 👋 How are you feeling today? Please describe your symptoms.",
      }),
      parsed: {
        type: "answer",
        message:
          "Hello. I'm MediMate 👋 How are you feeling today? Please describe your symptoms.",
      },
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (forcedInput?: string) => {
    const messageContent = forcedInput || input;
    if (!messageContent.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: messageContent };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!forcedInput) setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content:
              m.role === "assistant" && m.parsed
                ? JSON.stringify(m.parsed)
                : m.content,
          })),
        }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: JSON.stringify(data.reply),
            parsed: data.reply,
          },
        ]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      const errorMsg =
        error.message ||
        "I'm sorry, I'm having trouble connecting right now. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: JSON.stringify({ type: "answer", message: errorMsg }),
          parsed: { type: "answer", message: errorMsg },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (selectedOptions: string[]) => {
    const answerText = `My answer: ${selectedOptions.join(", ")}`;
    handleSend(answerText);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: JSON.stringify({
          type: "answer",
          message:
            "Hello. I'm MediMate 👋 How are you feeling today? Please describe your symptoms.",
        }),
        parsed: {
          type: "answer",
          message:
            "Hello. I'm MediMate 👋 How are you feeling today? Please describe your symptoms.",
        },
      },
    ]);
  };

  return (
    <main className="flex flex-col h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Modern Minimalist Header - Dark Mode */}
      <header className="flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/10">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold tracking-tighter uppercase italic text-white">
            MediMate
          </h1>
          <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">
            Precision Triage
          </span>
        </div>

        <button
          onClick={clearChat}
          className="group p-2.5 rounded-full hover:bg-white transition-all duration-300"
          title="Reset Session"
        >
          <Trash2
            size={18}
            className="text-gray-600 group-hover:text-black transition-colors"
          />
        </button>
      </header>

      {/* Premium Chat Area - Dark Mode */}
      <div className="flex-1 overflow-y-auto px-4 py-10 md:px-0 scrollbar-hide">
        <div className="max-w-2xl mx-auto w-full flex flex-col">
          {messages.map((msg, index) => (
            <ChatBubble
              key={index}
              role={msg.role}
              content={msg.content}
              parsed={msg.parsed}
              onOptionSelect={handleOptionSelect}
              isLast={index === messages.length - 1}
            />
          ))}

          {/* Symptom Category Selector */}
          {messages.length === 1 && !isLoading && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 transition-all duration-700">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() =>
                    handleSend(
                      `I'm feeling like I have ${cat.label.toLowerCase()}`,
                    )
                  }
                  className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-[#111] border border-white/5 hover:border-white/20 hover:bg-[#181818] transition-all duration-300 group"
                >
                  <cat.icon
                    size={24}
                    className={`${cat.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                  />
                  <span className="text-[13px] font-medium text-gray-400 group-hover:text-white transition-colors">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="flex justify-start mb-6">
              <div className="flex items-start gap-3">
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-[#111] text-white">
                  <span className="text-[10px] font-bold">AI</span>
                </div>
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-10" />
        </div>
      </div>

      {/* Floating Modern Input Area - Dark Mode */}
      <div className="p-4 bg-linear-to-t from-black via-black to-transparent">
        <div className="max-w-2xl mx-auto">
          <div className="relative group shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] rounded-4xl overflow-hidden bg-[#111] border border-white/10 transition-all duration-500 focus-within:border-white/30 focus-within:ring-1 focus-within:ring-white/5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Describe your symptoms with precision..."
              className="w-full bg-transparent px-8 py-4 pr-20 focus:outline-none text-[15px] text-white placeholder:text-gray-600 transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
                  !input.trim() || isLoading
                    ? "bg-white/5 text-gray-700"
                    : "bg-white text-black hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
                }`}
              >
                <ArrowUp size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
          <p className="text-center mt-4 text-[10px] text-gray-400 font-medium tracking-wide uppercase">
            <span>
              Artificial Intelligence • Not Medical Advice • Consult a
              Professional
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
