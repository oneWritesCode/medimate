"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  MessageSquare,
  Pill,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Activity,
  Stethoscope,
  ShieldAlert,
  ClipboardList,
  Flame,
  BarChart,
} from "lucide-react";
import { getStreak } from "@/lib/historyUtils";
import Lines from "@/components/Lines";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [streak, setStreak] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStreak(getStreak());
  }, []);

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
    <>
      <div className="w-full h-full fixed z-0 opacity-70 scale-150 bg-black">
        <Lines />
      </div>
      <main className="min-h-screen flex flex-col items-center justify-between text-white selection:bg-white selection:text-black z-50">
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
              medimate
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
            <Link
              href="/medicine"
              className="hover:text-white transition-colors"
            >
              Medicine Analyzer
            </Link>
            <Link
              href="/firstaid"
              className="hover:text-white transition-colors"
            >
              First Aid Guide
            </Link>
          </nav>

          <Link
            href="/chat"
            className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-gray-200 transition-all active:scale-95 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
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
              <span>medimate v1.2</span>
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
            <p className="text-white/60 text-base md:text-sm font-medium max-w-xl mx-auto leading-relaxed capitalize">
              Describe symptoms safely under clinically guided vectors or
              analyze medications from a pitch-dark, highly-precise encyclopedia
              dashboard.
            </p>
          </div>

          {/* Social Proof Group Avatars */}
          <div className="flex items-center gap-3 text-white/60 text-[10px] font-black uppercase tracking-widest">
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

        {/* Section 1: Problem Stats */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-16">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
              The Problem
            </h2>
            <p className="text-3xl font-black uppercase italic tracking-tight text-white">
              Indians are getting healthcare wrong
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-[#030303] border border-white/10 rounded-lg p-6 flex flex-col items-center text-center justify-between">
              <div className="text-[3rem] font-bold text-white leading-none mb-4">
                75%
              </div>
              <p className="text-white/80 text-sm mb-4">
                of Indians self-medicate without proper diagnosis
              </p>
              <p className="text-white/50 text-[10px] uppercase tracking-widest mt-auto">
                WHO India Health Report
              </p>
            </div>
            <div className="bg-[#030303] border border-white/10 rounded-lg p-6 flex flex-col items-center text-center justify-between">
              <div className="text-[3rem] font-bold text-white leading-none mb-4">
                62%
              </div>
              <p className="text-white/80 text-sm mb-4">
                delay visiting a doctor hoping symptoms go away
              </p>
              <p className="text-white/50 text-[10px] uppercase tracking-widest mt-auto">
                ICMR Survey 2023
              </p>
            </div>
            <div className="bg-[#030303] border border-white/10 rounded-lg p-6 flex flex-col items-center text-center justify-between">
              <div className="text-[3rem] font-bold text-white leading-none mb-4">
                5L+
              </div>
              <p className="text-white/80 text-sm mb-4">
                adverse drug reactions annually from wrong medicines
              </p>
              <p className="text-white/50 text-[10px] uppercase tracking-widest mt-auto">
                Pharmacy Council of India
              </p>
            </div>
          </div>

          <div className="bg-[#030303] border border-white/10 border-l-[3px] border-l-white rounded-lg p-6 text-white font-medium text-lg leading-relaxed">
            Simple conditions become serious. Money wasted on wrong medicines.
            Doctors visited too late &mdash; or not at all.
          </div>
        </div>

        {/* Section 2: Solution */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 text-center">
          <div className="mb-10 space-y-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
              The Solution
            </h2>
            <p className="text-3xl font-black uppercase italic tracking-tight text-white">
              One platform. Every health decision.
            </p>
            <p className="text-white/60 text-sm max-w-2xl mx-auto mt-4">
              From your first symptom to the right medicine to the right doctor
              &mdash; Medimate guides every step, completely free.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-[#030303] border border-white/10 rounded-lg p-4 w-full md:w-auto min-w-[120px]">
              <p className="text-[10px] text-white/50 mb-1">01</p>
              <p className="text-white font-bold text-sm">Symptoms</p>
            </div>
            <div className="text-white/50 font-bold hidden md:block">
              &rarr;
            </div>
            <div className="text-white/50 font-bold md:hidden">&darr;</div>

            <div className="bg-[#030303] border border-white/10 rounded-lg p-4 w-full md:w-auto min-w-[120px]">
              <p className="text-[10px] text-white/50 mb-1">02</p>
              <p className="text-white font-bold text-sm">AI Diagnosis</p>
            </div>
            <div className="text-white/50 font-bold hidden md:block">
              &rarr;
            </div>
            <div className="text-white/50 font-bold md:hidden">&darr;</div>

            <div className="bg-[#030303] border border-white/10 rounded-lg p-4 w-full md:w-auto min-w-[120px]">
              <p className="text-[10px] text-white/50 mb-1">03</p>
              <p className="text-white font-bold text-sm">Medicine</p>
            </div>
            <div className="text-white/50 font-bold hidden md:block">
              &rarr;
            </div>
            <div className="text-white/50 font-bold md:hidden">&darr;</div>

            <div className="bg-[#030303] border border-white/10 rounded-lg p-4 w-full md:w-auto min-w-[120px]">
              <p className="text-[10px] text-white/50 mb-1">04</p>
              <p className="text-white font-bold text-sm">Doctor</p>
            </div>
            <div className="text-white/50 font-bold hidden md:block">
              &rarr;
            </div>
            <div className="text-white/50 font-bold md:hidden">&darr;</div>

            <div className="bg-[#030303] border border-white/10 rounded-lg p-4 w-full md:w-auto min-w-[120px]">
              <p className="text-[10px] text-white/50 mb-1">05</p>
              <p className="text-white font-bold text-sm">Recovery</p>
            </div>
          </div>
        </div>

        {/* Section 3: Feature Sections */}
        <div
          id="features"
          ref={featuresRef}
          className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-24"
        >
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
              Engine Features
            </h2>
          </div>

          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="bg-[#030303] border border-white/10 rounded-lg p-6">
                <div className="bg-[#222222] rounded-lg p-3 text-white/90 text-sm w-fit mb-4">
                  How long have you had the fever?
                </div>
                <div className="flex flex-col gap-2">
                  <button className="bg-[#030303] border border-white/10 rounded-lg p-3 text-white text-sm text-left hover:bg-white/5 transition-colors">
                    1 Day
                  </button>
                  <button className="bg-white text-black border border-white rounded-lg p-3 text-sm text-left font-bold transition-colors">
                    2-3 Days
                  </button>
                  <button className="bg-[#030303] border border-white/10 rounded-lg p-3 text-white text-sm text-left hover:bg-white/5 transition-colors">
                    More than a week
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
                Symptom Checker
              </h2>
              <h3 className="text-3xl font-black uppercase italic text-white leading-tight">
                Stop guessing.
                <br />
                Start knowing.
              </h3>

              <div className="bg-[#030303] border border-white/10 border-l-[3px] border-l-red-500 rounded-lg p-5">
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-2">
                  The Problem
                </p>
                <p className="text-white/80 text-sm">
                  Google returns 10 possible diseases for any symptom. You end
                  up more confused and anxious than before.
                </p>
              </div>

              <div className="bg-[#030303] border border-white/10 border-l-[3px] border-l-white rounded-lg p-5">
                <p className="text-[10px] text-white font-bold uppercase tracking-widest mb-2">
                  The Solution
                </p>
                <p className="text-white/80 text-sm">
                  Medimate asks targeted questions like a real doctor intake
                  form. Narrows your condition through conversation. One clear
                  answer with actionable next steps.
                </p>
              </div>

              <div className="space-y-3 text-white/80 text-sm">
                <p>&mdash; Covers 100+ diseases and conditions</p>
                <p>&mdash; Suggests correct medicines with dosage</p>
                <p>&mdash; Tells you exactly when to see a doctor</p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="bg-[#030303] border border-white/10 rounded-lg p-6 space-y-4">
                <p className="text-white font-bold text-xl uppercase">
                  PARACETAMOL 650MG
                </p>
                <p className="text-white/60 text-sm">
                  After food &middot; Every 6 hours
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#222222] border border-white/10 text-white text-xs px-3 py-1 rounded-full">
                    Fever
                  </span>
                  <span className="bg-[#222222] border border-white/10 text-white text-xs px-3 py-1 rounded-full">
                    Headache
                  </span>
                  <span className="bg-[#222222] border border-white/10 text-white text-xs px-3 py-1 rounded-full">
                    Pain Relief
                  </span>
                </div>
                <p className="text-red-500 text-xs">
                  Do not exceed 4 tablets per day
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <button className="bg-[#030303] border border-white/10 rounded-lg p-3 text-white text-xs font-bold text-center hover:bg-white/5 transition-colors">
                    1MG
                  </button>
                  <button className="bg-[#030303] border border-white/10 rounded-lg p-3 text-white text-xs font-bold text-center hover:bg-white/5 transition-colors">
                    PHARMEASY
                  </button>
                  <button className="bg-[#030303] border border-white/10 rounded-lg p-3 text-white text-xs font-bold text-center hover:bg-white/5 transition-colors">
                    NETMEDS
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
                Medicine Analyzer
              </h2>
              <h3 className="text-3xl font-black uppercase italic text-white leading-tight">
                Know what you&apos;re
                <br />
                putting in your body.
              </h3>

              <div className="bg-[#030303] border border-white/10 border-l-[3px] border-l-red-500 rounded-lg p-5">
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-2">
                  The Problem
                </p>
                <p className="text-white/80 text-sm">
                  5 lakh adverse drug reactions happen annually in India from
                  wrong or misused medicines.
                </p>
              </div>

              <div className="bg-[#030303] border border-white/10 border-l-[3px] border-l-white rounded-lg p-5">
                <p className="text-[10px] text-white font-bold uppercase tracking-widest mb-2">
                  The Solution
                </p>
                <p className="text-white/80 text-sm">
                  Search any medicine. Get dosage, timing, side effects, and
                  direct links to buy from trusted Indian pharmacies.
                </p>
              </div>

              <div className="space-y-3 text-white/80 text-sm">
                <p>&mdash; Adult and child dosage breakdown</p>
                <p>&mdash; Side effects and critical warnings</p>
                <p>&mdash; Order directly from 1mg, PharmEasy, Netmeds</p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="bg-[#030303] border border-white/10 rounded-lg p-6 space-y-6">
                <p className="text-white text-xs font-bold uppercase tracking-widest">
                  Health Score &mdash; Last 14 Days
                </p>
                <div className="h-32 w-full flex items-end justify-between border-b border-white/10 pb-2">
                  <div className="w-[10%] bg-white/20 h-[40%] rounded-t-sm"></div>
                  <div className="w-[10%] bg-white/30 h-[50%] rounded-t-sm"></div>
                  <div className="w-[10%] bg-white/40 h-[30%] rounded-t-sm"></div>
                  <div className="w-[10%] bg-white/50 h-[60%] rounded-t-sm"></div>
                  <div className="w-[10%] bg-white/60 h-[80%] rounded-t-sm"></div>
                  <div className="w-[10%] bg-white/80 h-[70%] rounded-t-sm"></div>
                  <div className="w-[10%] bg-white h-[90%] rounded-t-sm"></div>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>&mdash; Start morning walks</p>
                  <p>&mdash; Increase water intake</p>
                  <p>&mdash; Add protein to daily diet</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
                Health History
              </h2>
              <h3 className="text-3xl font-black uppercase italic text-white leading-tight">
                Track your health
                <br />
                like you track fitness.
              </h3>

              <div className="bg-[#030303] border border-white/10 border-l-[3px] border-l-red-500 rounded-lg p-5">
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-2">
                  The Problem
                </p>
                <p className="text-white/80 text-sm">
                  You forget what symptoms you had last week. Doctors ask for
                  history you cannot recall. You have no way to know if you are
                  actually recovering.
                </p>
              </div>

              <div className="bg-[#030303] border border-white/10 border-l-[3px] border-l-white rounded-lg p-5">
                <p className="text-[10px] text-white font-bold uppercase tracking-widest mb-2">
                  The Solution
                </p>
                <p className="text-white/80 text-sm">
                  Every chat diagnosis is automatically saved. Builds a visual
                  health timeline and generates personalised health advice based
                  on your patterns.
                </p>
              </div>

              <div className="space-y-3 text-white/80 text-sm">
                <p>&mdash; Auto-saved from every chat session</p>
                <p>&mdash; Visual 14-day health score graph</p>
                <p>&mdash; AI-generated personalised health advice</p>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="bg-[#030303] border border-white/10 border-l-[4px] border-l-red-500 rounded-lg p-6 space-y-4">
                <p className="text-white font-bold text-2xl uppercase">
                  HEART ATTACK
                </p>
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">
                  IMMEDIATE ACTION REQUIRED
                </p>
                <div className="space-y-3 text-white/90 text-sm">
                  <p>
                    <span className="text-white/50 mr-2">01</span> Call for
                    emergency medical help immediately.
                  </p>
                  <p>
                    <span className="text-white/50 mr-2">02</span> Have the
                    person sit down, rest, and try to keep calm.
                  </p>
                  <p>
                    <span className="text-white/50 mr-2">03</span> Loosen any
                    tight clothing.
                  </p>
                </div>
                <button className="bg-white text-black font-bold text-sm w-full py-3 rounded-lg mt-2 hover:bg-gray-200 transition-colors">
                  CALL 108
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
                First Aid Guide
              </h2>
              <h3 className="text-3xl font-black uppercase italic text-white leading-tight">
                Know what to do when
                <br />
                seconds matter.
              </h3>

              <div className="bg-[#030303] border border-white/10 border-l-[3px] border-l-red-500 rounded-lg p-5">
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-2">
                  The Problem
                </p>
                <p className="text-white/80 text-sm">
                  80% of deaths from cardiac arrest, choking and severe allergic
                  reactions in India are preventable with correct immediate
                  first aid.
                </p>
              </div>

              <div className="bg-[#030303] border border-white/10 border-l-[3px] border-l-white rounded-lg p-5">
                <p className="text-[10px] text-white font-bold uppercase tracking-widest mb-2">
                  The Solution
                </p>
                <p className="text-white/80 text-sm">
                  Step-by-step emergency guides for 8 critical situations. Works
                  without internet. One tap to call emergency services.
                </p>
              </div>

              <div className="space-y-3 text-white/80 text-sm">
                <p>&mdash; Heart attack, stroke, choking, burns and more</p>
                <p>&mdash; Clear DO and DO NOT instructions</p>
                <p>&mdash; Direct emergency call button</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Medimate vs ChatGPT */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
              Why Medimate
            </h2>
            <p className="text-3xl font-black uppercase italic tracking-tight text-white">
              Not just another chatbot.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto pb-4">
            <table className="w-full text-left min-w-[600px] border-collapse">
              <thead>
                <tr>
                  <th className="bg-[#1b1b1b] text-white font-medium p-4 border border-white/10 rounded-tl-lg">
                    Feature
                  </th>
                  <th className="bg-[#1b1b1b] text-white font-medium p-4 border border-white/10 text-center">
                    ChatGPT
                  </th>
                  <th className="bg-[#1b1b1b] text-white font-medium p-4 border border-white/10 text-center rounded-tr-lg">
                    Medimate
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Symptom triage",
                    "Generic text",
                    "Structured MCQ diagnosis",
                  ],
                  [
                    "Medicine suggestions",
                    "Hallucinated",
                    "Curated India database",
                  ],
                  ["Buy medicines", "No", "Direct pharmacy links"],
                  ["Health tracking", "No memory", "14-day history"],
                  ["First Aid", "Text only", "Step-by-step guide"],
                  ["India-specific", "No", "Indian medicines and hospitals"],
                  ["Price", "Paid", "Free"],
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="bg-[#030303] text-white/80 p-4 border border-white/10">
                      {row[0]}
                    </td>
                    <td className="bg-[#000000] text-white/50 p-4 border border-white/10 text-center">
                      {row[1]}
                    </td>
                    <td className="bg-[#1b1b1b] text-white p-4 border border-white/10 text-center font-medium">
                      {row[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-white italic max-w-2xl mx-auto mt-8 font-medium">
            &quot;Medimate is not a replacement for a doctor. It is the
            knowledgeable friend who helps you understand your health, make
            better decisions, and know when professional help is needed.&quot;
          </p>
        </div>

        {/* Section 5: How It Works */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
              How It Works
            </h2>
            <p className="text-3xl font-black uppercase italic tracking-tight text-white">
              Three steps to better
              <br />
              health decisions.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full border-t border-dashed border-white/20 -z-10 transform -translate-y-1/2"></div>

            <div className="bg-[#030303] border border-white/10 rounded-lg p-8 flex-1 text-center relative z-10">
              <div className="text-4xl font-bold text-white/20 mb-4">01</div>
              <h3 className="text-white font-bold uppercase mb-3">
                Describe your symptoms
              </h3>
              <p className="text-white/60 text-sm">
                Answer quick targeted questions about how you feel. No medical
                knowledge required.
              </p>
            </div>

            <div className="bg-[#030303] border border-white/10 rounded-lg p-8 flex-1 text-center relative z-10">
              <div className="text-4xl font-bold text-white/20 mb-4">02</div>
              <h3 className="text-white font-bold uppercase mb-3">
                Get AI guidance
              </h3>
              <p className="text-white/60 text-sm">
                Medimate analyses symptoms against 100+ diseases and gives clear
                actionable advice.
              </p>
            </div>

            <div className="bg-[#030303] border border-white/10 rounded-lg p-8 flex-1 text-center relative z-10">
              <div className="text-4xl font-bold text-white/20 mb-4">03</div>
              <h3 className="text-white font-bold uppercase mb-3">
                Take action
              </h3>
              <p className="text-white/60 text-sm">
                Order medicines, find doctors, or follow first aid steps without
                leaving the app.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Final CTA */}
        <div className="w-full bg-[#040404] border-t border-white/10 py-20 px-6 mt-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white tracking-tight">
              Your health cannot wait.
            </h2>
            <p className="text-white/60">
              No signup. No subscription. No cost.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/chat"
                className="bg-white text-black font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-95 uppercase tracking-widest text-xs shadow-lg shadow-white/5 w-full sm:w-auto"
              >
                Start Symptom Check <ArrowRight size={14} strokeWidth={3} />
              </Link>
              <Link
                href="/medicine"
                className="bg-[#0c0c0c] border border-white/20 text-white font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all active:scale-95 uppercase tracking-widest text-xs w-full sm:w-auto"
              >
                Explore Medicine Finder
              </Link>
            </div>

            <p className="text-white/50 text-xs max-w-sm mx-auto">
              Your data stays on your device.
              <br />
              We never store personal health information.
            </p>
          </div>
        </div>

        {/* 5. Minimalist Footer Disclaimer */}
        {/* <footer className="w-full max-w-5xl mx-auto px-6 py-12 text-center border-t border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 leading-relaxed max-w-2xl mx-auto">
            Medical Disclaimer: medimate is a diagnostic triage tool and not a
            substitute for professional medical advice, diagnosis, or treatment.
            Always seek the advice of your physician with any questions
            regarding a medical condition.
          </p>
        </footer> */}

        {/* Floating Scoreboard Button */}
        <Link
          href="/history"
          className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-5 duration-700"
        >
          <div className="bg-[#0d0d0d] rounded-2xl p-4 shadow-2xl flex items-center gap-4 group hover:scale-105 transition-all cursor-pointer active:scale-95">
            <div className="w-12 h-12 bg-white/5 text-white rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
              <BarChart size={20} strokeWidth={2.5} />
            </div>
            <div className="pr-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-white">
                View Health Score
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-1 mt-0.5">
                <Flame size={10} className="animate-pulse" /> {streak} day
                streak
              </p>
            </div>
            <div className="absolute -top-1 -right-1">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            </div>
          </div>
        </Link>
        <Footer />

      </main>
    </>
  );
}
