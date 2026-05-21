"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Heart,
  MessageSquare,
  Pill,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Compass,
  CheckCircle,
  Users,
  Star,
  Activity,
  Stethoscope,
} from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 5000);
    }
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-between text-white selection:bg-white selection:text-black">
      {/* 1. Header (Quiet Place Style) */}
      <header className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-4 pb-2 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-white/5 text-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <Heart
              size={18}
              strokeWidth={2.5}
              fill="currentColor"
              className="text-white"
            />
          </div>
          <span className="text-lg font-black tracking-tighter italic uppercase text-white">
            HealthBuddy
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/70">
          <button
            onClick={scrollToFeatures}
            className="hover:text-white uppercase transition-colors cursor-pointer"
          >
            Features
          </button>
          <Link href="/chat" className="hover:text-white transition-colors">
            Symptom Checker
          </Link>
          <Link href="/medicine" className="hover:text-white transition-colors">
            Medicine Analyzer
          </Link>
        </nav>

        <Link
          href="/chat"
          className="bg-white text-black text-[9px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-gray-200 transition-all active:scale-95 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          Start asking <ArrowRight size={12} strokeWidth={3} />
        </Link>
      </header>

      {/* 2. Hero Section (Combined Image 2 & 3 Concepts) */}
      <div className="max-w-4xl w-full text-center space-y-4 pt-18 pb-20 flex flex-col items-center">
        {/* Interactive Pulse Brand Avatar with Floating Tag */}
        <div className="relative group mb-4">
          <div className="w-20 h-20 bg-[#0d0d0d] rounded-[1.5rem] shadow-[0_0_40px_-5px_rgba(255,255,255,0.1)] flex items-center justify-center text-white border border-white/10 relative transition-transform duration-500 group-hover:scale-105">
            <Heart
              size={44}
              strokeWidth={2.5}
              fill="currentColor"
              className="animate-pulse"
            />
          </div>
          <div className="absolute -top-3 -right-15 bg-white text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg border border-white/10 flex items-center gap-1 animate-bounce">
            <Sparkles size={8} fill="currentColor" />
            <span>HealthBuddy v1.2</span>
          </div>
        </div>

        {/* High-End Serif/Sans Typography */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none uppercase italic">
            Stop searching for symptoms.
            <br />
            <span className="underline underline-offset-2 decoration-white/30">
              Start getting answers.
            </span>
          </h1>
          <p className="text-white/40 text-base md:text-sm font-medium max-w-xl mx-auto leading-relaxed capitalize">
            Describe symptoms safely under clinically guided vectors or analyze
            medications from a pitch-dark, highly-precise encyclopedia
            dashboard.
          </p>
        </div>

        {/* Social Proof Group Avatars */}
        <div className="flex items-center gap-3 text-white/35 text-[9px] font-black uppercase tracking-widest">
          <div className="flex -space-x-2">
            {[Stethoscope, Heart, ShieldCheck].map((Icon, idx) => (
              <div
                key={idx}
                className="w-6 h-6 rounded-full flex items-center justify-center text-white/60"
              >
                <Icon size={11} />
              </div>
            ))}
          </div>
          <span>Trusted by 14,800+ health conscious users</span>
        </div>

        {/* Double Call to Actions (Image 1 layout) */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-10">
          <Link
            href="/chat"
            className="bg-white text-black font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-95 uppercase tracking-widest text-xs shadow-lg shadow-white/5"
          >
            Start Chat <ArrowRight size={14} strokeWidth={3} />
          </Link>
          <Link
            href="/medicine"
            className="bg-[#0c0c0c] border border-white/10 text-white font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 hover:border-white/20 transition-all active:scale-95 uppercase tracking-widest text-xs"
          >
            Scan Medicine
          </Link>
        </div>
      </div>

      {/* 3. Three Features Grid Section (Image 1 & 3 layout) */}
      <div
        ref={featuresRef}
        className="w-full max-w-7xl mx-auto px-6 md:px-12 bg-[#030303]/50"
      >
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">
            Engine Features
          </h2>
          <p className="text-3xl font-black uppercase italic tracking-tight">
            Structured Healthcare Modules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {/* Card 1: Chat */}
          <div className="bg-[#080808] border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 group hover:border-white/20 transition-all">
            <div className="w-12 h-12 bg-white/5 text-white rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
              <MessageSquare size={22} strokeWidth={2.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black uppercase italic text-white">
                Symptom Checker
              </h3>
              <p className="text-white/40 text-xs font-medium leading-relaxed">
                Safely input symptomatology to trigger diagnostic
                cross-examinations, scoring guidelines, and general care
                directives.
              </p>
            </div>
            <Link
              href="/chat"
              className="text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-white flex items-center gap-2 mt-auto transition-colors"
            >
              Launch Checker <ArrowRight size={12} strokeWidth={3} />
            </Link>
          </div>

          {/* Card 2: Medicine */}
          <div className="bg-[#080808] border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 group hover:border-white/20 transition-all">
            <div className="w-12 h-12 bg-white/5 text-white rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
              <Pill size={22} strokeWidth={2.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black uppercase italic text-white">
                Medicine Scanner
              </h3>
              <p className="text-white/40 text-xs font-medium leading-relaxed">
                Query prescription drugs with instant Levenshtein fuzzy
                completion to unlock dosage indices, risk factors, and direct
                purchase channels.
              </p>
            </div>
            <Link
              href="/medicine"
              className="text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-white flex items-center gap-2 mt-auto transition-colors"
            >
              Launch Scanner <ArrowRight size={12} strokeWidth={3} />
            </Link>
          </div>

          {/* Card 3: Map */}
          <div className="bg-[#080808] border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 group hover:border-white/20 transition-all">
            <div className="w-12 h-12 bg-white/5 text-white rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
              <MapPin size={22} strokeWidth={2.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black uppercase italic text-white">
                Geolocation Radar
              </h3>
              <p className="text-white/40 text-xs font-medium leading-relaxed">
                Tap live browser coordinates to locate active primary care
                clinics, hospitals, and licensed practitioners within 3
                kilometers of your locale.
              </p>
            </div>
            <Link
              href="/chat"
              className="text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-white flex items-center gap-2 mt-auto transition-colors"
            >
              Explore Map <ArrowRight size={12} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Bottom Detailed Highlight Block (Image 3 Concept) */}
      <div className="w-full max-w-4xl mx-auto px-6 pb-18">
        <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
                Clinical Verification Engine
              </span>
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tight">
              The New Era of Personal Triage
            </h3>
            <p className="text-white/40 text-xs leading-relaxed font-medium">
              HealthBuddy combines clinical parameters with natural language,
              executing highly relevant care recommendations in under two
              seconds. Always consult a physician for prescription details.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 text-left">
              <div className="border-l-2 border-white/15 pl-4">
                <p className="text-[9px] text-white/20 font-black uppercase tracking-widest">
                  Retrieval speed
                </p>
                <p className="text-lg font-black uppercase text-white">
                  Under 2s
                </p>
              </div>
              <div className="border-l-2 border-white/15 pl-4">
                <p className="text-[9px] text-white/20 font-black uppercase tracking-widest">
                  Medical Accuracy
                </p>
                <p className="text-lg font-black uppercase text-white">
                  OSM & Vector Linked
                </p>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-56 bg-black border border-white/5 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60">
                <Activity size={14} />
              </div>
              <div>
                <p className="text-[9px] text-white/40 font-black uppercase tracking-widest leading-none">
                  Diagnostic Triage
                </p>
                <span className="text-[11px] font-black text-white uppercase italic leading-none">
                  Safe Path Guidance
                </span>
              </div>
            </div>
            <p className="text-[10px] leading-relaxed text-white/35 font-bold uppercase tracking-wider border-t border-white/5 pt-3">
              "Providing structural care suggestions before primary clinic
              visits."
            </p>
          </div>
        </div>
      </div>

      {/* 5. Minimalist Footer Disclaimer */}
      <footer className="w-full border-t border-white/5 py-8 text-center bg-black">
        <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.25em] max-w-lg mx-auto leading-relaxed">
          Not a substitute for professional medical advice. Always consult a
          licensed clinician for emergencies.
        </p>
      </footer>
    </main>
  );
}
