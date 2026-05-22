"use client";

import { useState, useEffect } from "react";
import {
  History,
  Trash2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Home,
  ChevronRight,
  ClipboardList,
  Flame,
  Star,
  Heart,
  BarChart,
  Lightbulb,
  ArrowRight,
  Plus,
  X,
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

// Feeling Score Visual Configuration - Emojis fully replaced by premium icons and glows
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

// Advice Icon Mapper
const ADVICE_ICONS: Record<string, any> = {
  hospital: HeartPulse,
  strength: Dumbbell,
  water: Droplets,
  protein: GlassWater,
  diet: Salad,
  star: Sparkles,
  sleep: Moon,
};

// Radial Progress Circular indicator (matching Bitcoin / Litecoin visual in reference image 1)
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
  const safePercentage = isNaN(percentage)
    ? 0
    : Math.max(0, Math.min(100, percentage));
  const strokeDashoffset =
    circumference - (safePercentage / 100) * circumference;

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
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          transform="rotate(-90 24 24)"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* absolutely centered label */}
      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white tracking-tighter">
        {safePercentage}%
      </span>
    </div>
  );
};

export default function HistoryPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);
  const [timeRange, setTimeRange] = useState<"14" | "30" | "all">("14");
  const [expandedLogs, setExpandedLogs] = useState<string[]>([]);
  const [advice, setAdvice] = useState<any[]>([]);

  // Seed mock data if history is empty to make the dashboard look beautiful right away
  const seedMockLogs = () => {
    const mockData = [
      {
        id: "mock-1",
        date: new Date(Date.now() - 4 * 86400000).toISOString().split("T")[0],
        condition: "Acidity & GERD",
        symptoms: ["Heartburn", "Bloating"],
        medicines: ["Pan 40", "Digene"],
        severity: "moderate",
        feelingScore: 3,
        timestamp: new Date(Date.now() - 4 * 86400000).toISOString(),
        notes:
          "Felt some severe chest burning after dinner. Taking antacids helped mitigate the symptom.",
      },
      {
        id: "mock-2",
        date: new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0],
        condition: "Dehydration Headache",
        symptoms: ["Fatigue", "Dizziness"],
        medicines: ["Crocin 650"],
        severity: "mild",
        feelingScore: 4,
        timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
        notes:
          "Mild headache from staring at the screen for too long. Rehydrating and taking a short nap resolved it.",
      },
      {
        id: "mock-3",
        date: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
        condition: "Migraine Attack",
        symptoms: ["Severe Headache", "Nausea", "Light Sensitivity"],
        medicines: ["Naproxen"],
        severity: "severe",
        feelingScore: 1,
        timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
        notes:
          "Severe migraine attack. Rested in a dark, quiet room all afternoon. Avoided screens completely.",
      },
      {
        id: "mock-4",
        date: new Date(Date.now() - 1 * 86400000).toISOString().split("T")[0],
        condition: "Post-Migraine Recovery",
        symptoms: ["Mild Fatigue"],
        medicines: [],
        severity: "mild",
        feelingScore: 4,
        timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
        notes:
          "Migraine subsided. Felt slightly exhausted but much better than yesterday. Drank plenty of fluids.",
      },
      {
        id: "mock-5",
        date: new Date().toISOString().split("T")[0],
        condition: "Excellent Fitness Day",
        symptoms: [],
        medicines: ["Multivitamin"],
        severity: "mild",
        feelingScore: 5,
        timestamp: new Date().toISOString(),
        notes:
          "Felt very energetic and active today. Did a 30-minute cardio workout. Clean diet and great hydration.",
      },
    ];

    localStorage.setItem("medimate_symptoms", JSON.stringify(mockData));
  };

  useEffect(() => {
    let data = getSymptomLogs();
    if (data.length === 0) {
      seedMockLogs();
      data = getSymptomLogs();
    }
    setLogs(data);
    setChartData(getLast14Days());
    setStreak(getStreak());
  }, []);

  useEffect(() => {
    if (logs.length > 0) {
      setAdvice(generateAdvice(logs));
    }
  }, [logs]);

  const avgFeeling =
    logs.length > 0
      ? (
          logs.reduce((acc, log) => acc + log.feelingScore, 0) / logs.length
        ).toFixed(1)
      : "0";

  const mostCommonCondition = () => {
    if (logs.length === 0) return "None";
    const counts: Record<string, number> = {};
    logs.forEach((log) => {
      if (log.condition)
        counts[log.condition] = (counts[log.condition] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";
  };

  const getConditionFrequencyData = () => {
    const counts: Record<string, { count: number; severity: string }> = {};
    logs.forEach((log) => {
      if (log.condition) {
        if (!counts[log.condition]) {
          counts[log.condition] = { count: 0, severity: log.severity };
        }
        counts[log.condition].count++;
      }
    });
    return Object.entries(counts)
      .map(([name, data]) => ({
        name,
        count: data.count,
        severity: data.severity,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  // Generate Personalized Health Guidance - Emojis completely replaced
  const generateAdvice = (currentLogs: any[]) => {
    const adviceList = [];
    const avg = parseFloat(avgFeeling);

    const allSymptoms = currentLogs.flatMap((l) =>
      (l.symptoms || []).map((s: string) => s.toLowerCase()),
    );
    const allConditions = currentLogs.map((l) =>
      (l.condition || "").toLowerCase(),
    );

    if (avg < 3) {
      adviceList.push({
        icon: "hospital",
        priority: "high",
        title: "Consider seeing a doctor",
        detail:
          "Your average health score has been low. A medical checkup is recommended.",
      });
    }

    if (allSymptoms.includes("fatigue") || allSymptoms.includes("weakness")) {
      adviceList.push({
        icon: "strength",
        priority: "medium",
        title: "Start strength training",
        detail:
          "Frequent fatigue suggests you may benefit from regular exercise. Start with 20 min walks and light gym sessions.",
      });
    }

    if (allSymptoms.includes("headache") || allSymptoms.includes("dizziness")) {
      adviceList.push({
        icon: "water",
        priority: "medium",
        title: "Increase water intake",
        detail:
          "Frequent headaches often indicate dehydration. Aim for 3 litres of water daily.",
      });
    }

    if (allConditions.includes("anemia") || allSymptoms.includes("fatigue")) {
      adviceList.push({
        icon: "protein",
        priority: "medium",
        title: "Increase protein and iron",
        detail: "Add milk, eggs, lentils, and spinach to your daily diet.",
      });
    }

    if (allConditions.includes("acidity") || allConditions.includes("gerd")) {
      adviceList.push({
        icon: "diet",
        priority: "medium",
        title: "Switch to a low-acid diet",
        detail:
          "Reduce spicy and oily food. Eat smaller meals every 3-4 hours.",
      });
    }

    if (avg >= 4) {
      adviceList.push({
        icon: "star",
        priority: "low",
        title: "You're doing great!",
        detail:
          "Your health scores are consistently good. Keep up your current routine.",
      });
    }

    adviceList.push({
      icon: "sleep",
      priority: "low",
      title: "Maintain 7-8 hours of sleep",
      detail:
        "Good sleep is the foundation of all health. Sleep and wake at the same time daily.",
    });

    return adviceList;
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

  const toggleExpand = (id: string) => {
    setExpandedLogs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const score = data.feelingScore;
      if (!data.logged) return null;

      const borderColor =
        score >= 4
          ? "border-emerald-500"
          : score === 3
            ? "border-amber-500"
            : "border-red-500";
      const config = FEELING_ICONS[score] || FEELING_ICONS[3];
      const IconComp = config.icon;

      return (
        <div
          className={`bg-[#0d0d0d]/95 backdrop-blur-md p-4 shadow-2xl rounded-2xl border border-white/10 border-l-4 ${borderColor} animate-in fade-in zoom-in-95 duration-200 min-w-[200px]`}
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">
            {data.label}
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.bg} ${config.color}`}
              >
                <IconComp size={16} />
              </div>
              <span className="text-sm font-black text-white">
                Score: {score}/5
              </span>
            </div>
            <p className="text-xs font-black uppercase italic text-white/80">
              {data.condition || "Health Check"}
            </p>
            {data.symptoms.length > 0 && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">
                  Symptoms
                </p>
                <p className="text-[10px] text-white/60 leading-tight italic">
                  {data.symptoms.join(", ")}
                </p>
              </div>
            )}
            {data.medicines && data.medicines.length > 0 && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">
                  Medicines
                </p>
                <p className="text-[10px] text-blue-400 leading-tight italic">
                  {data.medicines.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload, value } = props;
    if (payload.logged) {
      const config = FEELING_ICONS[value] || FEELING_ICONS[3];
      return (
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill={config.stroke}
          stroke="#000"
          strokeWidth={2}
          className="filter drop-shadow-sm transition-all hover:scale-125 cursor-pointer"
        />
      );
    }
    return (
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill="transparent"
        stroke="#1e293b"
        strokeWidth={1}
      />
    );
  };

  return (
    <div className="min-h-screen bg-black pt-18 pb-6 selection:bg-white selection:text-black">
      {/* Breadcrumbs */}
      <div className="mx-auto px-6 md:px-12 mb-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Home size={12} /> Home
          </Link>
          <ChevronRight size={10} />
          <span className="text-white/60 italic">Health History</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest">
              <Activity size={12} className="animate-pulse" />
              Real-time Analytics
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter flex items-center justify-center md:justify-start gap-3">
              <BarChart className="text-white" size={32} />
              Health History
            </h1>
            <p className="text-white/60 font-bold text-sm uppercase tracking-widest">
              Your personal health journey tracked over time
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* <div className="text-center md:text-right px-8 py-4 bg-white/5 rounded-3xl border border-white/10 flex flex-col justify-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">
                Today's Date
              </p>
              <p className="text-sm font-black text-white italic leading-tight">
                {new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div> */}

            <div className="flex gap-2">
              <Link
                href="/chat"
                className="bg-white text-black px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-white/5 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} strokeWidth={3} /> chat
              </Link>

              <button
                onClick={() => {
                  if (
                    confirm(
                      "Reset health history data? This will clear all logged symptoms.",
                    )
                  ) {
                    localStorage.removeItem("medimate_symptoms");
                    setLogs([]);
                    setChartData(getLast14Days());
                    setStreak(0);
                  }
                }}
                className="px-4 py-2 bg-white/10 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-red-400 transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <RefreshCw size={10} /> Reset Data
              </button>
            </div>
          </div>
        </div>

        {/* Premium Stat Cards (styled precisely matching the LTC/BTC/BNB cards in reference image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {[
            {
              label: "Total Check-ins",
              value: logs.length,
              period: "Active",
              percentage: Math.min(100, Math.round((logs.length / 20) * 100)),
              icon: ClipboardList,
              color: "text-blue-400",
              bg: "bg-blue-500/5 border-blue-500/10",
              radialColor: "#3b82f6",
            },
            {
              label: "Current Streak",
              value: `${streak} Days`,
              period: "Daily Target",
              percentage: Math.min(100, Math.round((streak / 7) * 100)),
              icon: Flame,
              color: "text-orange-400",
              bg: "bg-orange-500/5 border-orange-500/10",
              radialColor: "#f97316",
            },
            {
              label: "Average Score",
              value: `${avgFeeling}/5`,
              period: "General Feeling",
              percentage: Math.round((parseFloat(avgFeeling) / 5) * 100),
              icon: Star,
              color: "text-amber-400",
              bg: "bg-amber-500/5 border-amber-500/10",
              radialColor: "#f59e0b",
            },
            {
              label: "Clinical Health",
              value:
                mostCommonCondition() === "None"
                  ? "Stable"
                  : mostCommonCondition(),
              period: "Most Logged Condition",
              percentage:
                logs.length > 0
                  ? Math.round(
                      (logs.filter((l) => l.severity !== "severe").length /
                        logs.length) *
                        100,
                    )
                  : 100,
              icon: Heart,
              color: "text-emerald-400",
              bg: "bg-emerald-500/5 border-emerald-500/10",
              radialColor: "#10b981",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#080808] border border-white/10 rounded-3xl p-3 shadow-2xl flex items-center justify-between group hover:border-white/10 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Left side: Icon round envelope */}
                <div
                  className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center border shrink-0 group-hover:scale-105 transition-transform`}
                >
                  <stat.icon size={20} strokeWidth={2.5} />
                </div>

                {/* Center text: Label & Large Value */}
                <div className="space-y-1 min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/60 truncate">
                    {stat.label}
                  </p>
                  <p className="text-xl font-black text-white tracking-tight uppercase italic leading-none truncate">
                    {stat.value}
                  </p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-white/60 truncate">
                    {stat.period}
                  </p>
                </div>
              </div>

              {/* Right side: Radial Percentage meter */}
              <div className="shrink-0 pl-2">
                <RadialProgress
                  percentage={stat.percentage}
                  color={stat.radialColor}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-1 md:px-2 space-y-4">
        {/* Feeling Score Chart (Inspired by Bitcoin Line Chart in reference image 1) */}
        <section className="p-2 md:px-6 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                Feeling Score — Index Curve
              </h2>
              <div className="flex flex-wrap items-center gap-6">
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />{" "}
                  Good (4-5)
                </span>
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />{" "}
                  Fair (3)
                </span>
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />{" "}
                  Poor (1-2)
                </span>
              </div>
            </div>

            {/* Minimalist selection tabs (styled matching reference image 1) */}
            <div className="flex bg-black p-1 rounded-2xl border border-white/10">
              {(["14", "30", "all"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                    timeRange === r
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {r === "all" ? "All" : `${r}D`}
                </button>
              ))}
            </div>
          </div>

          {/* Smooth custom Area chart curve with cyan gradient (matching Sales Overview BTC chart) */}
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ffffff"
                  strokeOpacity={0.02}
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  tick={{ fill: "#475569", fontSize: 10, fontWeight: 900 }}
                  interval={0}
                />
                <YAxis
                  domain={[1, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#475569", fontSize: 10, fontWeight: 900 }}
                  tickFormatter={(val) => {
                    const labels: any = {
                      5: "EXC",
                      4: "GOOD",
                      3: "FAIR",
                      2: "POOR",
                      1: "BAD",
                    };
                    return labels[val] || val;
                  }}
                />
                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="feelingScore"
                  fill="url(#colorScore)"
                  stroke="none"
                  connectNulls
                />

                <Line
                  type="monotone"
                  dataKey="feelingScore"
                  stroke="#06b6d4"
                  strokeWidth={4}
                  dot={<CustomDot />}
                  activeDot={{ r: 8, fill: "#06b6d4", strokeWidth: 0 }}
                  connectNulls
                  animationDuration={2000}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Condition Frequency Bar Chart */}
          <section className="bg-[#080808] rounded-[2.5rem] p-6 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-left-8 duration-700 delay-400">
            <h2 className="text-xl font-black text-white uppercase italic tracking-tighter mb-6 flex items-center gap-3">
              <Activity className="text-red-500 animate-pulse" size={20} />
              Conditions Tracked
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart
                  data={getConditionFrequencyData()}
                  margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
                >
                  <YAxis type="number" hide />
                  <XAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#ffffff",
                      fontSize: 10,
                      fontWeight: 900,
                      fillOpacity: 0.4,
                    }}
                    height={40}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                    contentStyle={{
                      backgroundColor: "#0d0d0d",
                      borderRadius: "16px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                    }}
                    itemStyle={{
                      color: "#ffffff",
                      fontSize: "10px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={32}>
                    {getConditionFrequencyData().map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.severity === "severe"
                            ? "#ef4444"
                            : entry.severity === "moderate"
                              ? "#f59e0b"
                              : "#10b981"
                        }
                        fillOpacity={0.8}
                      />
                    ))}
                  </Bar>
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Personalized Health Guidance (Designed with Folder tabs styling from reference image 3) */}
          <section className="rounded-[2.5rem] p-6 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-700 delay-400">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                <Lightbulb className="text-amber-400" size={20} />
                Personalised Advice
              </h2>
              <p className="text-white/60 font-black text-[10px] uppercase tracking-widest">
                Based on your clinical history & patterns
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
              {advice.length > 0 ? (
                advice.map((adv, i) => {
                  const IconComponent = ADVICE_ICONS[adv.icon] || Lightbulb;
                  return (
                    <div key={i} className="bg-[#0c0c0c] border border-white/10 rounded-3xl p-4 shadow-2xl min-h-[140px] flex flex-col justify-between hover:border-white/10 transition-colors mt-6">
                      <div className="space-y-2">
                        <div className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 mb-2 ${
                            adv.priority === "high"
                              ? "text-rose-500"
                              : adv.priority === "medium"
                                ? "text-amber-500"
                                : "text-emerald-500"
                          }`}>
                          <IconComponent size={14} />
                          <span>{adv.priority} priority</span>
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-tight leading-tight">
                          {adv.title}
                        </h3>
                        <p className="text-[12px] text-white/70 leading-relaxed font-medium capitalize">
                          {adv.detail}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
                        <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">
                          CLINICAL WELLNESS MODULE
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/60">
                    <BarChart3 size={32} />
                  </div>
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest italic">
                    Insufficient data for clinical advice.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* History Log List (Styled with thick accent severity vertical indicator lines from reference image 2) */}
        <section className="space-y-4 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
              <History className="text-white/60" />
              History Log List
            </h2>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
              {logs.length} Total entries
            </span>
          </div>

          {logs.length > 0 ? (
            <div className="space-y-6">
              {logs.map((log) => {
                const config =
                  FEELING_ICONS[log.feelingScore] || FEELING_ICONS[3];
                const IconComponent = config.icon;
                return (
                  <div
                    key={log.id}
                    className="bg-[#080808] rounded-[2rem] shadow-2xl border border-white/10 hover:border-white/10 transition-all group relative overflow-hidden flex"
                  >
                    {/* The thick vertical severity/status indicator bar on the left (matching schedule cards in reference image 2) */}
                    <div
                      className={`w-1 shrink-0 ${
                        log.severity === "severe"
                          ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                          : log.severity === "moderate"
                            ? "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                            : "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                      }`}
                    />

                    {/* Card Content body */}
                    <div className="flex-1 p-6 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                          {/* Replaced emoji by circular icon coin container matching bitcoin / litecoin design */}
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-500 group-hover:scale-105 ${config.glow}`}
                          >
                            <IconComponent size={20} />
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-3">
                              <p className="text-[10px] text-white font-black uppercase tracking-widest flex items-center gap-1.5">
                                <Calendar size={12} className="text-white/60" />
                                {new Date(log.date).toLocaleDateString(
                                  "en-IN",
                                  {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  },
                                )}
                              </p>
                              {log.isAutoCaptured && (
                                <span className="text-[7px] font-black uppercase tracking-[0.25em] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/10">
                                  Auto-captured
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-lg font-black text-white uppercase italic tracking-tight leading-tight">
                                {log.condition || "Health Check-in"}
                              </h3>
                              <span
                                className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                                  log.severity === "severe"
                                    ? "text-red-400 border-red-500/20 bg-red-500/5"
                                    : log.severity === "moderate"
                                      ? "text-amber-400 border-amber-500/20 bg-amber-500/5"
                                      : "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
                                }`}
                              >
                                {log.severity}
                              </span>
                              <span
                                className={`text-[10px] font-black px-3 py-0.5 rounded-full border border-white/10 ${config.color} bg-white/5`}
                              >
                                Score: {log.feelingScore}/5
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteLog(log.id)}
                          className="absolute md:relative top-8 right-8 p-3 text-white/60 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100 active:scale-95 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {log.symptoms.map((s: string) => (
                          <span
                            key={s}
                            className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white/60 transition-colors"
                          >
                            {s}
                          </span>
                        ))}
                        {log.medicines?.map((m: string) => (
                          <span
                            key={m}
                            className="px-4 py-1.5 bg-blue-500/5 border border-blue-500/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-400"
                          >
                            {m}
                          </span>
                        ))}
                      </div>

                      <div className="border-t border-white/5 pt-4">
                        <button
                          onClick={() => toggleExpand(log.id)}
                          className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          {expandedLogs.includes(log.id) ? (
                            <>
                              <ChevronUp size={14} /> Close Details
                            </>
                          ) : (
                            <>
                              <ChevronDown size={14} /> Full Log Data
                            </>
                          )}
                        </button>
                        {expandedLogs.includes(log.id) && (
                          <div className="space-y-2 animate-in slide-in-from-top-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div className="bg-black p-4 rounded-2xl border border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                                  Sync Timestamp
                                </p>
                                <p className="text-xs text-white/60 font-black italic">
                                  {new Date(
                                    log.timestamp || log.date,
                                  ).toLocaleString()}
                                </p>
                              </div>
                              {log.notes && (
                                <div className="bg-black p-6 rounded-2xl border border-white/5">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-3">
                                    Clinical Notes
                                  </p>
                                  <p className="text-xs text-white/60 font-medium leading-relaxed">
                                    {log.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-32 flex flex-col items-center justify-center text-center space-y-10 bg-[#080808] rounded-[3rem] border-2 border-white/5 border-dashed animate-in fade-in duration-1000">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-white/60 border border-white/10">
                <BarChart3 size={36} />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                  Your health journey starts here
                </h3>
                <p className="text-white/60 text-xs font-black uppercase tracking-widest max-w-sm mx-auto leading-relaxed px-6">
                  Start a clinical checkup in the chat to automatically generate
                  your health history.
                </p>
              </div>
              <Link
                href="/chat"
                className="bg-white text-black px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-white/5 hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
              >
                Start Health Chat <ArrowRight size={20} strokeWidth={3} />
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
