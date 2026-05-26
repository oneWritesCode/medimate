"use client";

import { useState, useEffect, useRef } from "react";
import {
  History,
  Trash2,
  Calendar,
  Activity,
  Home,
  ChevronRight,
  ClipboardList,
  Flame,
  Star,
  Heart,
  BarChart,
  Lightbulb,
  Plus,
  Frown,
  Meh,
  Smile,
  Laugh,
  HeartPulse,
  Dumbbell,
  Droplets,
  GlassWater,
  Salad,
  Sparkles,
  Moon,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  Cell,
} from "recharts";
import { getSymptomLogs, getLast14Days, getStreak } from "@/lib/historyUtils";
import { motion, useMotionValue, useTransform, animate, useInView, useReducedMotion } from "framer-motion";

const CountUp = ({ to, duration = 1, suffix = "", isFloat = false }: { to: number | string, duration?: number, suffix?: string, isFloat?: boolean }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => isFloat ? latest.toFixed(1) : Math.round(latest).toString());
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
        setDisplayValue(latest + suffix);
      });
    }
  }, [rounded, suffix, shouldReduceMotion]);

  return <span ref={ref}>{displayValue}</span>;
};

// Feeling Score Visual Configuration
const FEELING_ICONS: Record<
  number,
  {
    icon: any;
    color: string;
    stroke: string;
    glow: string;
    label: string;
    bg: string;
  }
> = {
  1: {
    icon: Frown,
    color: "text-red-400",
    stroke: "#ef4444",
    glow: "shadow-[0_0_15px_rgba(239,68,68,0.15)] border-red-500/20 bg-red-500/5",
    label: "Bad",
    bg: "bg-red-500/10",
  },
  2: {
    icon: Frown,
    color: "text-orange-400",
    stroke: "#f97316",
    glow: "shadow-[0_0_15px_rgba(249,115,22,0.15)] border-orange-500/20 bg-orange-500/5",
    label: "Poor",
    bg: "bg-orange-500/10",
  },
  3: {
    icon: Meh,
    color: "text-amber-400",
    stroke: "#f59e0b",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)] border-amber-500/20 bg-amber-500/5",
    label: "Fair",
    bg: "bg-amber-500/10",
  },
  4: {
    icon: Smile,
    color: "text-green-400",
    stroke: "#22c55e",
    glow: "shadow-[0_0_15px_rgba(34,197,94,0.15)] border-green-500/20 bg-green-500/5",
    label: "Good",
    bg: "bg-green-500/10",
  },
  5: {
    icon: Laugh,
    color: "text-emerald-400",
    stroke: "#10b981",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)] border-emerald-500/20 bg-emerald-500/5",
    label: "Excellent",
    bg: "bg-emerald-500/10",
  },
};

const ADVICE_ICONS: Record<string, any> = {
  hospital: HeartPulse,
  strength: Dumbbell,
  water: Droplets,
  protein: GlassWater,
  diet: Salad,
  star: Sparkles,
  sleep: Moon,
};

const RadialProgress = ({
  percentage,
  color,
}: {
  percentage: number;
  color: string;
}) => {
  const radius = 16;
  const strokeWidth = 3.5;
  const circumference = 2 * Math.PI * radius;
  const safePercentage = isNaN(percentage) ? 0 : Math.max(0, Math.min(100, percentage));
  const strokeDashoffset = circumference - (safePercentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <svg className="w-12 h-12" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx="24"
          cy="24"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
          fill="transparent"
          transform="rotate(-90 24 24)"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white tracking-tighter">
        {safePercentage}%
      </span>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (!data.logged) return null;
    const score = data.feelingScore;
    const config = FEELING_ICONS[score] || FEELING_ICONS[3];
    const IconComp = config.icon;
    return (
      <div className="bg-[#0d0d0d]/95 backdrop-blur-md p-4 shadow-2xl rounded-2xl border border-white/10 min-w-[200px]">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.bg} ${config.color}`}>
            <IconComp size={16} />
          </div>
          <span className="text-sm font-black text-white">Score: {score}/5</span>
        </div>
        <p className="text-xs font-black uppercase italic text-white/80 mt-2">{data.condition || "Health Check"}</p>
      </div>
    );
  }
  return null;
};

const CustomDot = (props: any) => {
  const { cx, cy, payload, value } = props;
  if (payload.logged) {
    const config = FEELING_ICONS[value] || FEELING_ICONS[3];
    return <circle cx={cx} cy={cy} r={6} fill={config.stroke} stroke="#000" strokeWidth={2} />;
  }
  return <circle cx={cx} cy={cy} r={3} fill="transparent" stroke="#1e293b" strokeWidth={1} />;
};

export default function HistoryPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);
  const [timeRange, setTimeRange] = useState<"14" | "30" | "all">("14");
  const [advice, setAdvice] = useState<any[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const generateAdvice = (currentLogs: any[]) => {
    const adviceList = [];
    const avg = logs.length > 0 ? (logs.reduce((acc, log) => acc + log.feelingScore, 0) / logs.length) : 0;
    const allSymptoms = currentLogs.flatMap((l) => (l.symptoms || []).map((s: string) => s.toLowerCase()));
    if (avg < 3) adviceList.push({ icon: "hospital", priority: "high", title: "Consider seeing a doctor", detail: "Average health score is low." });
    if (allSymptoms.includes("fatigue")) adviceList.push({ icon: "strength", priority: "medium", title: "Start strength training", detail: "Exercise may help with fatigue." });
    if (allSymptoms.includes("headache")) adviceList.push({ icon: "water", priority: "medium", title: "Increase water intake", detail: "Aim for 3 litres daily." });
    if (avg >= 4) adviceList.push({ icon: "star", priority: "low", title: "You're doing great!", detail: "Keep up the routine." });
    adviceList.push({ icon: "sleep", priority: "low", title: "Maintain 7-8 hours of sleep", detail: "foundation of health." });
    return adviceList;
  };

  const seedMockLogs = () => {
    const mockData = [
      { id: "mock-1", date: new Date(Date.now() - 4 * 86400000).toISOString().split("T")[0], condition: "Acidity & GERD", symptoms: ["Heartburn", "Bloating"], medicines: ["Pan 40", "Digene"], severity: "moderate", feelingScore: 3, timestamp: new Date(Date.now() - 4 * 86400000).toISOString(), notes: "Felt some severe chest burning after dinner." },
      { id: "mock-2", date: new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0], condition: "Dehydration Headache", symptoms: ["Fatigue", "Dizziness"], medicines: ["Crocin 650"], severity: "mild", feelingScore: 4, timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), notes: "Mild headache resolved with rest." },
      { id: "mock-3", date: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0], condition: "Migraine Attack", symptoms: ["Severe Headache", "Nausea"], medicines: ["Naproxen"], severity: "severe", feelingScore: 1, timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), notes: "Severe migraine attack." },
      { id: "mock-4", date: new Date(Date.now() - 1 * 86400000).toISOString().split("T")[0], condition: "Post-Migraine Recovery", symptoms: ["Mild Fatigue"], medicines: [], severity: "mild", feelingScore: 4, timestamp: new Date(Date.now() - 1 * 86400000).toISOString(), notes: "Feeling much better." },
      { id: "mock-5", date: new Date().toISOString().split("T")[0], condition: "Excellent Fitness Day", symptoms: [], medicines: ["Multivitamin"], severity: "mild", feelingScore: 5, timestamp: new Date().toISOString(), notes: "Energetic and active." }
    ];
    localStorage.setItem("medimate_symptoms", JSON.stringify(mockData));
  };

  useEffect(() => {
    let data = getSymptomLogs();
    if (data.length === 0) {
      seedMockLogs();
      data = getSymptomLogs();
    }
    const timer = setTimeout(() => {
      setLogs(data);
      setChartData(getLast14Days());
      setStreak(getStreak());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (logs.length > 0) {
      const timer = setTimeout(() => setAdvice(generateAdvice(logs)), 0);
      return () => clearTimeout(timer);
    }
  }, [logs]);

  const avgFeeling = logs.length > 0 ? (logs.reduce((acc, log) => acc + log.feelingScore, 0) / logs.length).toFixed(1) : "0";

  const mostCommonCondition = () => {
    if (logs.length === 0) return "None";
    const counts: Record<string, number> = {};
    logs.forEach((log) => { if (log.condition) counts[log.condition] = (counts[log.condition] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";
  };

  const handleDeleteLog = (id: string) => {
    if (confirm("Are you sure you want to delete this log?")) {
      const updated = logs.filter((l) => l.id !== id);
      setLogs(updated);
      localStorage.setItem("medimate_symptoms", JSON.stringify(updated));
      setChartData(getLast14Days());
      setStreak(getStreak());
    }
  };

  return (
    <div className="min-h-screen bg-black pt-18 pb-6 selection:bg-white selection:text-black">
      <div className="mx-auto px-6 md:px-12 mb-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
          <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
            <Home size={12} /> Home
          </Link>
          <ChevronRight size={10} />
          <span className="text-white/60 italic">Health History</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter flex items-center justify-center md:justify-start gap-3">
              <BarChart className="text-white" size={32} />
              Health History
            </h1>
          </div>
          <div className="flex gap-2">
            <Link href="/chat" className="bg-white text-black px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              <Plus size={16} strokeWidth={3} /> chat
            </Link>
          </div>
        </div>

        {/* 4 Cards row staggered fade in + slide up */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6"
        >
          {[
            { label: "Total Check-ins", value: logs.length, icon: ClipboardList, color: "text-blue-400", bg: "bg-blue-500/5", radialColor: "#3b82f6", percentage: Math.min(100, Math.round((logs.length / 20) * 100)) },
            { label: "Current Streak", value: streak, suffix: " Days", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/5", radialColor: "#f97316", percentage: Math.min(100, Math.round((streak / 7) * 100)) },
            { label: "Average Score", value: avgFeeling, suffix: "/5", isFloat: true, icon: Star, color: "text-amber-400", bg: "bg-amber-500/5", radialColor: "#f59e0b", percentage: Math.round((parseFloat(avgFeeling) / 5) * 100) },
            { label: "Clinical Health", value: mostCommonCondition() === "None" ? "Stable" : mostCommonCondition(), icon: Heart, color: "text-emerald-400", bg: "bg-emerald-500/5", radialColor: "#10b981", percentage: logs.length > 0 ? 100 : 0 }
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 }
              }}
              className="bg-[#080808] border border-white/10 rounded-3xl p-3 shadow-2xl flex items-center justify-between group hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center border border-white/5`}>
                  <stat.icon size={20} strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/60 truncate">{stat.label}</p>
                  <p className="text-xl font-black text-white tracking-tight uppercase italic leading-none truncate">
                    {typeof stat.value === 'number' || (typeof stat.value === 'string' && !isNaN(parseFloat(stat.value))) ? (
                      <CountUp to={stat.value} suffix={stat.suffix} isFloat={stat.isFloat} />
                    ) : stat.value}
                  </p>
                </div>
              </div>
              <RadialProgress percentage={stat.percentage} color={stat.radialColor} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-8">
        {/* Chart Card */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#080808] border border-white/10 rounded-[2.5rem] p-6 shadow-2xl"
        >
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8">Feeling Score — Index Curve</h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.02} vertical={false} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 10, fontWeight: 900 }} />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 10, fontWeight: 900 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="feelingScore" fill="url(#colorScore)" stroke="none" />
                <Line type="monotone" dataKey="feelingScore" stroke="#06b6d4" strokeWidth={4} dot={<CustomDot />} isAnimationActive={!shouldReduceMotion} animationDuration={1200} animationEasing="ease-out" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Health Advice staggered cards */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
              <Lightbulb className="text-amber-400" size={20} /> Personalised Advice
            </h2>
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{ animate: { transition: { staggerChildren: 0.12 } } }}
              className="space-y-4"
            >
              {advice.map((adv, i) => {
                const IconComponent = ADVICE_ICONS[adv.icon] || Lightbulb;
                return (
                  <motion.div 
                    key={i} 
                    variants={{ initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 } }}
                    whileHover={shouldReduceMotion ? {} : { y: -3, boxShadow: "0 10px 30px -10px rgba(255,255,255,0.1)" }}
                    className="bg-[#0c0c0c] border border-white/10 rounded-3xl p-4 transition-all"
                  >
                    <div className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 mb-2 ${adv.priority === "high" ? "text-rose-500" : "text-amber-500"}`}>
                      <IconComponent size={14} /> <span>{adv.priority} priority</span>
                    </div>
                    <h3 className="text-sm font-black text-white uppercase">{adv.title}</h3>
                    <p className="text-[12px] text-white/70 font-medium">{adv.detail}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* History Log sequential fade in */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
              <History className="text-white/60" /> History Log
            </h2>
            <div className="space-y-4">
              {logs.map((log) => {
                const config = FEELING_ICONS[log.feelingScore] || FEELING_ICONS[3];
                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#080808] rounded-3xl shadow-2xl border border-white/10 flex overflow-hidden group hover:border-white/20 transition-all"
                  >
                    <div className={`w-1 shrink-0 group-hover:brightness-125 transition-all ${log.severity === "severe" ? "bg-red-500" : "bg-emerald-500"}`} />
                    <div className="flex-1 p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${config.glow}`}><config.icon size={20} /></div>
                          <div>
                            <p className="text-[10px] text-white/60 font-black uppercase tracking-widest">{new Date(log.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
                            <h3 className="text-lg font-black text-white uppercase italic tracking-tight">{log.condition}</h3>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteLog(log.id)} className="p-2 text-white/40 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
