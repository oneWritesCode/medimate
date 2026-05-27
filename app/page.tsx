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
  Check,
  X,
  Database,
  Globe,
  Stethoscope as TriageIcon,
} from "lucide-react";
import { getStreak } from "@/lib/historyUtils";
import Lines from "@/components/Lines";
import { motion, useMotionValue, useTransform, animate, useInView, useReducedMotion } from "framer-motion";
import Footer from "@/components/Footer";

const CountUp = ({ to, duration = 1.5 }: { to: number | string, duration?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      const target = typeof to === "string" ? parseFloat(to.replace(/[^0-9.]/g, "")) : to;
      const controls = animate(count, target, {
        duration,
        ease: "easeOut",
      });
      return controls.stop;
    } else if (shouldReduceMotion) {
      const timer = setTimeout(() => setDisplayValue(to.toString()), 0);
      return () => clearTimeout(timer);
    }
  }, [isInView, to, count, duration, shouldReduceMotion]);

  useEffect(() => {
    if (!shouldReduceMotion) {
      return rounded.on("change", (latest) => {
        if (typeof to === "string" && to.includes("L+")) {
          setDisplayValue(`${latest}L+`);
        } else if (typeof to === "string" && to.includes("%")) {
          setDisplayValue(`${latest}%`);
        } else {
          setDisplayValue(latest.toString());
        }
      });
    }
  }, [rounded, to, shouldReduceMotion]);

  return <span ref={ref}>{displayValue}</span>;
};

export default function LandingPage() {
  const [streak, setStreak] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const s = getStreak();
    const timer = setTimeout(() => setStreak(s), 0);
    return () => clearTimeout(timer);
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" as const }
  };

  const staggeredContainer = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    },
    viewport: { once: true }
  };

  const staggeredItem = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" as const }
  };

  return (
    <>
      <div className="w-full h-full fixed z-0 opacity-70 scale-150 bg-black">
        <Lines />
      </div>
      <main className="min-h-screen flex flex-col items-center justify-between text-white selection:bg-white selection:text-black z-50">
        {/* 1. Header */}
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

        {/* 2. Hero Section */}
        <div className="max-w-4xl w-full text-center space-y-4 pt-18 pb-20 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative group mb-4"
          >
            <div className="w-20 h-20 bg-[#0d0d0d] rounded-[1.5rem] shadow-[0_0_40px_-5px_rgba(255,255,255,0.1)] flex items-center justify-center text-white border border-white/10 relative transition-transform duration-500 group-hover:scale-105">
              <Heart
                size={44}
                strokeWidth={2.5}
                fill="currentColor"
                className="animate-pulse"
              />
            </div>
            <div className="absolute -top-3 -right-15 bg-white text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg border border-white/10 flex items-center gap-1">
              <Sparkles size={8} fill="currentColor" />
              <span>medimate v1.2</span>
            </div>
          </motion.div>

          <div className="space-y-4 max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none uppercase italic"
            >
              Stop searching for symptoms.
              <br />
              <span className="underline underline-offset-2 decoration-white/30">
                Start getting answers.
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="text-white/60 text-base md:text-sm font-medium max-w-xl mx-auto leading-relaxed capitalize"
            >
              Describe symptoms safely under clinically guided vectors or
              analyze medications from a pitch-dark, highly-precise encyclopedia
              dashboard.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-10"
          >
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
          </motion.div>
        </div>

        {/* Section 1: Problem Stats */}
        <motion.div 
          {...fadeInUp}
          className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-16"
        >
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
              The Problem
            </h2>
            <p className="text-3xl font-black uppercase italic tracking-tight text-white">
              Indians are getting healthcare wrong
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { value: "75%", label: "of Indians self-medicate without proper diagnosis", source: "WHO India Health Report" },
              { value: "62%", label: "delay visiting a doctor hoping symptoms go away", source: "ICMR Survey 2023" },
              { value: "5L+", label: "adverse drug reactions annually from wrong medicines", source: "Pharmacy Council of India" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                {...staggeredItem}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                className="bg-[#030303] border border-white/10 rounded-lg p-6 flex flex-col items-center text-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-[3rem] font-bold text-white leading-none mb-4">
                  <CountUp to={stat.value} />
                </div>
                <p className="text-white/80 text-sm mb-4">
                  {stat.label}
                </p>
                <p className="text-white/50 text-[10px] uppercase tracking-widest mt-auto">
                  {stat.source}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#030303] border border-white/10 border-l-[3px] border-l-white rounded-lg p-6 text-white font-medium text-lg leading-relaxed">
            Simple conditions become serious. Money wasted on wrong medicines.
            Doctors visited too late &mdash; or not at all.
          </div>
        </motion.div>

        {/* Section 2: Solution */}
        <motion.div 
          {...fadeInUp}
          className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 text-center"
        >
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

          <motion.div 
            variants={staggeredContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            {[
              { num: "01", label: "Symptoms" },
              { num: "02", label: "AI Diagnosis" },
              { num: "03", label: "Medicine" },
              { num: "04", label: "Doctor" },
              { num: "05", label: "Recovery" }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-4">
                <motion.div 
                  variants={staggeredItem}
                  className="bg-[#030303] border border-white/10 rounded-lg p-4 w-full md:w-auto min-w-[120px]"
                >
                  <p className="text-[10px] text-white/50 mb-1">{step.num}</p>
                  <p className="text-white font-bold text-sm">{step.label}</p>
                </motion.div>
                {idx < 4 && (
                  <motion.div variants={staggeredItem}>
                    <div className="text-white/50 font-bold hidden md:block">&rarr;</div>
                    <div className="text-white/50 font-bold md:hidden">&darr;</div>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

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
          <motion.div {...fadeInUp} className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <motion.div 
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                className="bg-[#030303] border border-white/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
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
              </motion.div>
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
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div {...fadeInUp} className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2">
              <motion.div 
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                className="bg-[#030303] border border-white/10 rounded-lg p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow"
              >
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
              </motion.div>
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
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div {...fadeInUp} className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <motion.div 
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                className="bg-[#030303] border border-white/10 rounded-lg p-6 space-y-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-white text-xs font-bold uppercase tracking-widest">
                  Health Score &mdash; Last 14 Days
                </p>
                <div className="h-32 w-full flex items-end justify-between border-b border-white/10 pb-2">
                  {[40, 50, 30, 60, 80, 70, 90].map((height, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.8 }}
                      className="w-[10%] bg-white/20 rounded-t-sm"
                      style={{ backgroundColor: `rgba(255,255,255,${0.2 + (idx * 0.1)})` }}
                    />
                  ))}
                </div>
              </motion.div>
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
                  history you cannot recall.
                </p>
              </div>

              <div className="bg-[#030303] border border-white/10 border-l-[3px] border-l-white rounded-lg p-5">
                <p className="text-[10px] text-white font-bold uppercase tracking-widest mb-2">
                  The Solution
                </p>
                <p className="text-white/80 text-sm">
                  Every chat diagnosis is automatically saved. Builds a visual
                  health timeline.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 4: Why MediMate */}
        <section className="w-full bg-[#050505] py-24 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div 
              {...fadeInUp}
              className="text-center mb-16 space-y-4"
            >
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
                The MediMate Advantage
              </h2>
              <p className="text-3xl md:text-4xl font-black uppercase italic tracking-tight text-white leading-none">
                Why MediMate over a regular chatbot?
              </p>
              <p className="text-white/60 text-sm max-w-2xl mx-auto font-medium">
                Most AI chatbots give generic answers. MediMate is built specifically for healthcare.
              </p>
            </motion.div>

            {/* Comparison Table */}
            <motion.div 
              {...fadeInUp}
              className="overflow-x-auto rounded-3xl border border-white/10 bg-[#030303] shadow-2xl mb-24"
            >
              <table className="w-full text-left border-collapse min-w-[800px] md:min-w-0">
                <thead>
                  <tr className="bg-[#0a0a0a] border-b border-white/10">
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-white/70 w-1/4">Feature</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-white/70 w-[37.5%] bg-white/[0.02]">Regular Chatbot (GPT/Gemini)</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-white w-[37.5%] bg-blue-500/[0.05]">MediMate</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-medium">
                  {[
                    {
                      feature: "Medical Knowledge",
                      bot: "General internet knowledge, can hallucinate",
                      medimate: "Backed by a curated database of 50+ verified conditions",
                      status: [false, true]
                    },
                    {
                      feature: "Medicine Suggestions",
                      bot: "Generic or western medicines",
                      medimate: "India-specific medicines available on 1mg, PharmEasy, Netmeds",
                      status: [false, true]
                    },
                    {
                      feature: "Symptom Analysis",
                      bot: "Free text, unstructured",
                      medimate: "Guided step-by-step MCQ flow like a real doctor intake",
                      status: [false, true]
                    },
                    {
                      feature: "Response Format",
                      bot: "Long paragraphs, hard to read",
                      medimate: "Structured: condition, remedies, medicines, when to see doctor",
                      status: [false, true]
                    },
                    {
                      feature: "Medicine Information",
                      bot: "Basic description only",
                      medimate: "Dosage, timing, side effects, warnings, storage, interactions",
                      status: [false, true]
                    },
                    {
                      feature: "Emergency Guidance",
                      bot: "No dedicated emergency section",
                      medimate: "Built-in First Aid guide with step by step emergency steps",
                      status: [false, true]
                    },
                    {
                      feature: "Health Tracking",
                      bot: "No memory between sessions",
                      medimate: "Tracks your symptoms over time with visual health graph",
                      status: [false, true]
                    },
                    {
                      feature: "Doctor Referral",
                      bot: "No",
                      medimate: "Suggests nearby clinics when condition needs medical attention",
                      status: [false, true]
                    },
                    {
                      feature: "Prescription Warning",
                      bot: "Sometimes skipped",
                      medimate: "Always flags medicines that require a prescription",
                      status: [false, true]
                    },
                    {
                      feature: "Designed For",
                      bot: "Everyone, everywhere",
                      medimate: "Indians — language, medicines, emergency numbers, local context",
                      status: [false, true]
                    }
                  ].map((row, idx) => (
                    <tr key={idx} className={`border-b border-white/5 last:border-0 ${idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"}`}>
                      <td className="p-3 text-white/90 font-bold uppercase tracking-tight">{row.feature}</td>
                      <td className="p-3 text-white/70 bg-white/[0.02] flex items-start gap-3">
                        <X size={14} className="shrink-0" />
                        <span>{row.bot}</span>
                      </td>
                      <td className="p-3 text-white bg-blue-500/[0.05]">
                        <div className="flex items-start gap-3">
                          <Check size={14} className="shrink-0" />
                          <span className="font-bold">{row.medimate}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Verified Medical Database",
                  body: "Unlike general AI, MediMate references a hand-curated database of conditions, symptoms, and medicines before every response. This keeps answers grounded in real medical data.",
                  icon: Database,
                  borderColor: "border-t-blue-500"
                },
                {
                  title: "Built for India",
                  body: "MediMate suggests medicines you can actually buy — on 1mg, PharmEasy, and Netmeds. Emergency numbers, local context, and Indian brand names throughout.",
                  icon: Globe,
                  borderColor: "border-t-emerald-500"
                },
                {
                  title: "Triage, Not Guesswork",
                  body: "MediMate knows when to refer you to a doctor. For serious symptoms it never guesses — it tells you exactly which type of specialist to visit and how urgently.",
                  icon: TriageIcon,
                  borderColor: "border-t-purple-500"
                }
              ].map((card, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeInUp}
                  whileHover={shouldReduceMotion ? {} : { y: -5 }}
                  className={` rounded-[2rem] p-4 shadow-xl border-t-4 ${card.borderColor} text-white border border-white/15 flex flex-col items-start gap-4 transition-all`}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">
                    <card.icon size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl text-white uppercase italic tracking-tighter leading-none">
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-sm font-medium leading-relaxed">
                    {card.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Floating Scoreboard Button */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link href="/history">
            <motion.div 
              animate={shouldReduceMotion ? {} : { 
                scale: [1, 1.03, 1] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#000] border border-white/15 rounded-2xl p-2 shadow-2xl flex items-center gap-2 group transition-all cursor-pointer"
            >
              <div className="w-10 h-10 text-white rounded-xl flex items-center justify-center transition-colors">
                <BarChart size={20} strokeWidth={2.5} />
              </div>
              <div className="pr-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white">
                  View Health Score
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1 mt-0.5">
                  <Flame size={10} className="animate-pulse" /> {streak} day streak
                </p>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      <Footer />
      </main>
    </>
  );
}
