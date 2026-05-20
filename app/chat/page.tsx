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
  Home,
  ChevronRight,
  Mic,
  MicOff,
  Sliders,
  Sparkle,
  X,
  Info,
} from "lucide-react";
import Link from "next/link";
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
  {
    label: "Fever",
    icon: Thermometer,
    text: "I'm feeling like I have a fever",
  },
  { label: "Headache", icon: Brain, text: "I have a severe headache" },
  {
    label: "Cough & Cold",
    icon: Wind,
    text: "I have a persistent cough and cold",
  },
  {
    label: "Stomach Pain",
    icon: Activity,
    text: "I'm having sharp stomach pain",
  },
  {
    label: "Skin Issues",
    icon: Sparkles,
    text: "I've developed some skin rashes",
  },
  {
    label: "Fatigue",
    icon: Zap,
    text: "I'm feeling extremely fatigued lately",
  },
];

// const QUICK_PROMPTS = [
//   {
//     label: "Check Fever",
//     icon: Thermometer,
//     text: "I have a mild fever. How should I manage it?",
//     color: "border-orange-500/10 text-orange-400/80 hover:border-orange-500/30",
//   },
//   {
//     label: "Dry Cough",
//     icon: Wind,
//     text: "I have a persistent dry cough and sore throat.",
//     color: "border-blue-500/10 text-blue-400/80 hover:border-blue-500/30",
//   },
//   {
//     label: "Stomach Pain",
//     icon: Activity,
//     text: "My stomach is hurting after eating dinner last night.",
//     color:
//       "border-emerald-500/10 text-emerald-400/80 hover:border-emerald-500/30",
//   },
//   {
//     label: "Fatigue",
//     icon: Zap,
//     text: "I feel extremely fatigued with a dull headache.",
//     color: "border-purple-500/10 text-purple-400/80 hover:border-purple-500/30",
//   },
// ];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: JSON.stringify({
        type: "answer",
        message:
          "Hello. I'm HealthBuddy 👋 How are you feeling today? Please describe your symptoms in detail so I can assist you.",
      }),
      parsed: {
        type: "answer",
        message:
          "Hello. I'm HealthBuddy 👋 How are you feeling today? Please describe your symptoms in detail so I can assist you.",
      },
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tooltip & Voice states
  const [showTriageInfo, setShowTriageInfo] = useState(false);
  const [showModelInfo, setShowModelInfo] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Set up voice speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onstart = () => {
          setIsListening(true);
        };

        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput((prev) => prev + (prev ? " " : "") + transcript);
          inputRef.current?.focus();
        };

        rec.onend = () => {
          setIsListening(false);
        };

        rec.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Voice Speech Recognition is not supported on this browser or OS.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

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
            "Hello. I'm HealthBuddy 👋 How are you feeling today? Please describe your symptoms in detail so I can assist you.",
        }),
        parsed: {
          type: "answer",
          message:
            "Hello. I'm HealthBuddy 👋 How are you feeling today? Please describe your symptoms in detail so I can assist you.",
        },
      },
    ]);
  };

  // Edit Message: Load into input box & focus
  const handleEdit = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  // Regenerate last assistant response
  const handleRegenerate = async (msgIndex: number) => {
    if (isLoading) return;

    // Slices messages to just before the target assistant bubble
    const slicedMessages = messages.slice(0, msgIndex);
    setMessages(slicedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: slicedMessages.map((m) => ({
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
        throw new Error(data.error || "Failed to regenerate");
      }
    } catch (error: any) {
      console.error("Error regenerating message:", error);
      const errorMsg =
        error.message ||
        "I'm sorry, I encountered an error during regeneration. Please try again.";
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

  return (
    <main className="relative flex flex-col min-h-screen bg-black pt-16 selection:bg-white selection:text-black">
      {/* Modern Top Header (Voxa Concept) */}
      <header className="fixed w-full flex justify-between px-6 md:px-12 z-30">
        {/* Breadcrumbs */}
        <div className="flex flex-col items-start justify-start">
          <div className="bg-[#050505] flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/70">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Home size={10} /> Home
            </Link>
            <ChevronRight size={10} />
            <span className="text-white/75">Symptom Checker</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-lg font-black tracking-tight uppercase italic text-white">
              HealthBuddy Chat Assistant
            </h1>
            {/* <span className="bg-white/10 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border border-white/10 shadow-sm">
            AI Triage
          </span> */}
          </div>
        </div>

        <button
          onClick={clearChat}
          className="group p-2.5 rounded-xl bg-[#0c0c0c] hover:bg-white hover:text-black transition-all border border-white/5 text-white/40 flex items-center gap-2 cursor-pointer"
          title="Reset Conversation"
        >
          <Trash2
            size={15}
            className="group-hover:text-black transition-colors"
          />
          <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest">
            Reset
          </span>
        </button>
      </header>

      {/* Main Chat Stream */}
      <div className="flex-1 overflow-y-auto px-4 py-8 mb-20 md:px-0 bg-black">
        <div className="max-w-2xl mx-auto w-full flex flex-col">
          {messages.map((msg, index) => (
            <ChatBubble
              key={index}
              role={msg.role}
              content={msg.content}
              parsed={msg.parsed}
              onOptionSelect={handleOptionSelect}
              isLast={index === messages.length - 1}
              onEdit={handleEdit}
              onRegenerate={
                index > 0 && msg.role === "assistant"
                  ? () => handleRegenerate(index)
                  : undefined
              }
            />
          ))}

          {/* Initial Clean Grid Category Selector */}
          {messages.length === 1 && !isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => handleSend(cat.text)}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-[#080808] border border-white/5 shadow-md hover:border-white/20 hover:bg-[#0c0c0c] transition-all group text-left cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors shrink-0">
                    <cat.icon
                      size={18}
                      className="text-white opacity-40 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-[11px] font-black text-white/70 group-hover:text-white uppercase tracking-widest">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Standard Left-Aligned Typing dots (no generic heavy box) */}
          {isLoading && (
            <div className="flex justify-start mb-6">
              <TypingIndicator />
            </div>
          )}
          <div ref={messagesEndRef} className="h-10" />
        </div>
      </div>

      {/* Input Console & Actions (inspired by Image 1 & Image 2) */}
      <div className="fixed bottom-0 w-full">
        <div className="max-w-2xl mx-auto flex flex-col gap-4 relative bg-black rounded-t-3xl">
          {/* Settings Explanations/Tooltip Sheets inside layout */}
          {showTriageInfo && (
            <div className="absolute bottom-28 left-4 right-4 bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 shadow-2xl z-50 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                  <Sparkle size={12} className="text-white" />
                  Clinical Triage Protocol
                </span>
                <button
                  onClick={() => setShowTriageInfo(false)}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                HealthBuddy leverages advanced safety scoring and guidelines to
                cross-examine reported symptoms. It analyzes severity levels and
                systematically generates safe care pathway recommendations
                (e.g., self-care, clinical visits, or immediate ER directions).
              </p>
            </div>
          )}

          {showModelInfo && (
            <div className="absolute bottom-28 left-4 right-4 bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 shadow-2xl z-50 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                  <Sliders size={12} className="text-white" />
                  HealthBuddy AI Engine
                </span>
                <button
                  onClick={() => setShowModelInfo(false)}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                Our model utilizes specialized healthcare vectors and drug
                databases to execute fuzzy-name matching for medicines and
                cross-reference patient inquiries against validated medical
                encyclopedias for robust accuracy.
              </p>
            </div>
          )}

          {/* Helper Capsules above input bar (matches Image 1) */}
          {/* {messages.length > 1 && !isLoading && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => handleSend(prompt.text)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest bg-[#080808] transition-all active:scale-95 cursor-pointer ${prompt.color}`}
                >
                  <prompt.icon size={12} />
                  {prompt.label}
                </button>
              ))}
            </div>
          )} */}

          {/* Clean Input Console Box (matches Image 2 and Image 1 combo) */}
          <div className="relative shadow-2xl shadow-white/5 rounded-3xl overflow-hidden bg-[#080808] border border-white/10 transition-all duration-300 focus-within:border-white/35 focus-within:bg-[#0c0c0c]">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={
                isListening
                  ? "Listening closely... speak now"
                  : "Describe your symptoms in detail..."
              }
              className={`w-full bg-transparent px-6 py-5 pb-16 focus:outline-none text-[14px] text-white placeholder:text-white/20 transition-all ${isListening ? "text-white/50 italic animate-pulse" : ""}`}
            />

            {/* Bottom bar controls inside input container */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/35 text-[9px] font-black uppercase tracking-widest">
                <button
                  onClick={() => {
                    setShowTriageInfo(!showTriageInfo);
                    setShowModelInfo(false);
                  }}
                  className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md border border-white/5 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="View Triage Protocol"
                >
                  <Sparkle size={10} className="text-white/60" />
                  <span>Clinical Triage</span>
                </button>
                <button
                  onClick={() => {
                    setShowModelInfo(!showModelInfo);
                    setShowTriageInfo(false);
                  }}
                  className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md border border-white/5 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="View AI Engine Details"
                >
                  <Sliders size={10} className="text-white/60" />
                  <span>Engine v1.0</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 transition-colors cursor-pointer ${isListening ? "text-red-500 hover:text-red-400 animate-bounce" : "text-white/30 hover:text-white"}`}
                  title={isListening ? "Stop Voice Input" : "Start Voice Input"}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
                    !input.trim() || isLoading
                      ? "bg-white/5 text-white/20"
                      : "bg-white text-black hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  }`}
                  title="Send Message"
                >
                  <ArrowUp size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-[8px] text-white/50 font-black uppercase tracking-[0.25em] flex items-center justify-center gap-2 mb-2">
            <ShieldCheck size={12} className="text-white/50" />
            <span>Encrypted • Private Triage • Not Medical Advice</span>
          </p>
        </div>
      </div>
    </main>
  );
}
