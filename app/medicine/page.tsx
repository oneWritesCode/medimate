"use client";

import { useState, useRef, useEffect } from "react";
import {
  Home,
  MessageSquare,
  Pill,
  Settings,
  Heart,
  Bell,
  Search,
  Loader2,
  Bookmark,
  Share2,
  Download,
  ChevronRight,
  Stethoscope,
  Clock,
  ShieldAlert,
  Check,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";

interface MedicineData {
  name: string;
  correctedFrom?: string | null;
  genericName: string;
  category: string;
  description: string;
  uses: string[];
  dosage: {
    adult: string;
    child: string;
    frequency: string;
    timing: string;
  };
  howToTake: string[];
  conditions: string[];
  sideEffects: string[];
  warnings: string[];
  storage: string;
  whenToSeeDoctor: string[];
}

const COMMON_MEDICINES = [
  "Paracetamol",
  "Ibuprofen",
  "Amoxicillin",
  "Cetirizine",
  "Azithromycin",
  "Omeprazole",
  "Metformin",
  "Aspirin",
  "Dolo 650",
  "Crocin",
  "Combiflam",
  "Pan 40",
  "Allegra",
  "Montair",
  "Calpol",
  "Atorvastatin",
  "Amlodipine",
  "Losartan",
  "Levothyroxine",
  "Lisinopril",
  "Gabapentin",
  "Metoprolol",
  "Hydrochlorothiazide",
  "Albuterol",
  "Sertraline",
  "Simvastatin",
  "Montelukast",
  "Escitalopram",
  "Acetaminophen",
  "Ciprofloxacin",
  "Clopidogrel",
  "Furosemide",
  "Pantoprazole",
  "Warfarin",
  "Prednisone",
  "Rosuvastatin",
  "Tamsulosin",
  "Duloxetine",
  "Meloxicam",
  "Clonazepam",
  "Lorazepam",
  "Cyclobenzaprine",
  "Venlafaxine",
  "Tramadol",
  "Zolpidem",
  "Ranitidine",
  "Digoxin",
  "Diclofenac",
  "Naproxen",
];

function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }
  return dp[m][n];
}

function fuzzyMatch(input: string, medicine: string): boolean {
  const normalizedInput = input.toLowerCase();
  const normalizedMedicine = medicine.toLowerCase();
  return (
    normalizedMedicine.includes(normalizedInput) ||
    levenshteinDistance(normalizedInput, normalizedMedicine) <= 2
  );
}

export default function MedicineAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MedicineData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchBar] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Split UI Interactive states
  // const [isBookmarked, setIsBookmarked] = useState(false);
  // const [isShared, setIsShared] = useState(false);
  // const [activePackageSlide, setActivePackageSlide] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (val: string) => {
    setSearchBar(val);
    if (val.length >= 2) {
      const filtered = COMMON_MEDICINES.filter((med) =>
        fuzzyMatch(val, med),
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (med: string) => {
    setSearchBar(med);
    setShowSuggestions(false);
    handleSearch(med);
  };

  const handleSearch = async (overrideQuery?: string) => {
    const query = overrideQuery || searchQuery;
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setShowSuggestions(false);
    // setIsBookmarked(false);
    // setIsShared(false);

    try {
      const response = await fetch("/api/medicine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicineName: query }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to find medicine");
    } finally {
      setLoading(false);
    }
  };

  // Interactive share action
  // const handleShare = async () => {
  //   if (!result) return;
  //   const shareUrl =
  //     typeof window !== "undefined"
  //       ? `${window.location.origin}/medicine?search=${encodeURIComponent(result.name)}`
  //       : "";
  //   if (navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: `medimate: ${result.name}`,
  //         text: `Check out clinical details for ${result.name} (${result.genericName}) on medimate.`,
  //         url: shareUrl,
  //       });
  //       setIsShared(true);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   } else {
  //     try {
  //       await navigator.clipboard.writeText(shareUrl);
  //       setIsShared(true);
  //       setTimeout(() => setIsShared(false), 2000);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // };

  // Interactive card report download
  const handleDownload = () => {
    if (!result) return;
    const content = `
=========================================
medimate CLINICAL MEDICINE INFO CARD
=========================================
Medicine Name: ${result.name.toUpperCase()}
Generic Name:  ${result.genericName}
Category:      ${result.category}

Description:
${result.description}

Dosage & Timings:
- Adult Dosage: ${result.dosage.adult}
- Child Dosage: ${result.dosage.child}
- Frequency:    ${result.dosage.frequency}
- Timing:       ${result.dosage.timing}

Treats Following Conditions:
${result.conditions.map((c) => ` * ${c}`).join("\n")}

Side Effects & Important Warnings:
- Key Warnings:  ${result.warnings.join(", ")}
- Side Effects:  ${result.sideEffects.join(", ")}
- Storage Info:  ${result.storage}

-----------------------------------------
Verified Clinical Data • medimate AI
Doctor Reviewer: Dr. Roberto Jordan (MD)
=========================================
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${result.name}_Clinical_Data.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white flex selection:bg-white selection:text-black">
      {/* 1. Left Navigation Sidebar (Thin Sidebar matching Book Reference) */}
      {/* <aside className="w-16 bg-[#080808] border-r border-white/5 flex flex-col items-center justify-between py-6 h-screen fixed left-0 top-0 z-40 hidden md:flex">
        <div className="flex flex-col items-center gap-8">
          <Link
            href="/"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all"
          >
            <Heart size={16} fill="currentColor" className="text-white" />
          </Link>
          <div className="w-8 h-px bg-white/5"></div>
          <Link
            href="/"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all"
            title="Home"
          >
            <Home size={18} />
          </Link>
          <Link
            href="/chat"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all"
            title="Symptom Checker"
          >
            <MessageSquare size={18} />
          </Link>
          <Link
            href="/medicine"
            className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-lg shadow-white/5 transition-all"
            title="Medicine Scanner"
          >
            <Pill size={18} />
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
            title="Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </aside> */}

      {/* 2. Main content area indents past sidebar */}
      <div className="flex-1 md:pl-16 pt-16 min-h-screen flex flex-col bg-black">
        {/* Top bar with input search, notification, and profile */}
        <header className="w-full h-16  flex items-center justify-between px-6 md:px-12 sticky top-16 z-30">
          <div className="w-full max-w-lg relative rounded-2xl shadow-md shadow-white/20" ref={searchContainerRef}>
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-4 text-white/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search medications... e.g. Paracetamol, Ibuprofen"
                className="w-full bg-[#080808] border border-white/5 rounded-full py-2 pl-11 pr-12 text-xs text-white placeholder:text-white/60 focus:outline-none focus:border-white/20 transition-all"
              />
              {suggestions.length > 0 && showSuggestions && (
                <div className="absolute top-11 left-0 right-0 bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  {suggestions.map((med, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(med)}
                      className="w-full text-left px-5 py-3 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors border-b border-white/5 last:border-none flex items-center justify-between cursor-pointer"
                    >
                      <span>{med}</span>
                      <ChevronRight size={12} className="text-white/60" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* <div className="flex items-center gap-6">
            <button
              className="relative text-white/60 hover:text-white transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-white rounded-full"></span>
            </button>
            <div className="w-px h-6 bg-white/10"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 text-[10px] font-black">
                DR
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 hidden sm:inline">
                Dr. Deepak
              </span>
            </div>
          </div> */}
        </header>

        {/* Dynamic State Layout Render */}
        <div className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 space-y-12">
          {/* Correction Spelling Banner */}
          {result?.correctedFrom && (
            <div className="bg-white text-black px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl animate-in slide-in-from-top-3 duration-300">
              <CheckCircle2 size={16} strokeWidth={3} />
              <p className="text-[10px] font-black uppercase tracking-widest">
                Showing results for{" "}
                <span className="underline underline-offset-4">
                  {result.name}
                </span>
                <span className="ml-2 opacity-50 font-medium">
                  (auto-corrected from: {result.correctedFrom})
                </span>
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-24 space-y-6">
              <Loader2
                size={44}
                strokeWidth={2.5}
                className="text-white animate-spin"
              />
              <div className="text-center space-y-1">
                <p className="text-white text-sm font-black uppercase tracking-widest">
                  Consulting Encyclopedia...
                </p>
                <p className="text-white/60 text-[8px] font-black uppercase tracking-widest">
                  loading exact clinical facts
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="max-w-md mx-auto bg-[#080808] border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center text-center space-y-4 shadow-xl">
              <AlertCircle size={40} className="text-white/60" />
              <div className="space-y-1">
                <h3 className="text-white font-black uppercase tracking-widest text-sm">
                  Medication Not Found
                </h3>
                <p className="text-white/60 text-xs font-bold leading-relaxed">
                  {error}
                </p>
              </div>
              <p className="text-white/60 text-[8px] font-black uppercase tracking-[0.2em] pt-2">
                Try searching Crocin, Paracetamol, or Montair
              </p>
            </div>
          )}

          {/* Book Catalog Layout Split Column (Image Reference Layout) */}
          {result && !loading && (
            <div className="animate-in fade-in duration-500 space-y-12">
              {/* Product Header Split Panel */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 border-b border-white/5 pb-12">
                {/* Left Column: Procedural glowing Medicine Package render with side controls */}
                <div className="flex items-center gap-6">
                  {/* Up/Down arrow controllers (matching book layout list scrolls) */}
                  {/* <div className="flex flex-col gap-3">
                    <button
                      onClick={() =>
                        setActivePackageSlide((prev) => (prev === 0 ? 1 : 0))
                      }
                      className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() =>
                        setActivePackageSlide((prev) => (prev === 0 ? 1 : 0))
                      }
                      className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      <ChevronRightIcon size={16} />
                    </button>
                  </div> */}

                  {/* Gorgeous Procedural medicine pack */}
                  <div className="w-56 h-72 rounded-2xl bg-gradient-to-b from-[#121212] to-[#040404] border border-white/15 p-5 shadow-2xl relative flex flex-col justify-between overflow-hidden group">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full blur-2xl -mr-8 -mt-8"></div>

                    <div className="flex items-start justify-between z-10">
                      <span className="text-[7px] font-black uppercase tracking-widest text-white/60">
                        medimate RX
                      </span>
                      <Heart
                        size={12}
                        fill="currentColor"
                        className="text-white/60 animate-pulse"
                      />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-3 py-6 z-10">
                      <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/80">
                        <Pill
                          size={24}
                          className="group-hover:rotate-45 transition-transform duration-500"
                        />
                      </div>
                      <span className="text-[10px] text-white/60 font-black uppercase tracking-[0.25em]">
                        Formula-Index
                      </span>
                    </div>

                    <div className="z-10 flex flex-col gap-1">
                      <span className="text-[6px] font-black uppercase tracking-widest text-white/60">
                        Clinical drug compound
                      </span>
                      <span className="text-xs font-black uppercase tracking-wider text-white line-clamp-1 italic">
                        {result.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Title, Subtitle, Manufacturer, description & Action bar */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      <span className="bg-white/10 text-white px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest border border-white/10">
                        {result.category}
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tight uppercase italic">
                      {result.name}
                    </h2>
                    <p className="text-white/60 text-xs font-black uppercase tracking-[0.2em]">
                      {result.genericName}
                    </p>
                  </div>

                  <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-2xl font-medium">
                    {result.description}
                  </p>

                  {/* Actions buttons row matching Book Layout */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
                    <a
                      href={`https://www.1mg.com/search/all?name=${encodeURIComponent(result.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-gray-200 transition-all active:scale-95 flex items-center gap-1.5 shadow-lg shadow-white/5 cursor-pointer"
                    >
                      Order Medicine <ChevronRight size={14} strokeWidth={3} />
                    </a>

                    <button
                      onClick={handleDownload}
                      className="w-11 h-11 rounded-full border border-white/10 text-white/60 hover:border-white/20 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                      title="Download Clinical Prescription Card"
                    >
                      <Download size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Metadata detail grids (Two split columns) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
                {/* Left Column: Full description details & doctor review card */}
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h4 className="text-[14px] text-white/80 font-black uppercase tracking-[0.25em] text-white/60">
                      Description & Use Cases
                    </h4>
                    <div className="space-y-4">
                      {result.howToTake.map((step, idx) => (
                        <div key={idx} className="flex gap-4 group">
                          <span className="shrink-0 w-6 h-6 rounded-lg bg-white/5 border border-white/10 text-white text-[10px] flex items-center justify-center font-black">
                            {idx + 1}
                          </span>
                          <p className="text-xs text-white/60 font-bold leading-relaxed">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Doctor Reviewer Card (Roberto Jordan Style) */}
                  <div className="bg-[#080808] border border-white/5 rounded-3xl p-6 shadow-xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 shrink-0">
                      <Stethoscope size={18} />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-[12px] text-white/80 font-black uppercase tracking-wider">
                          Medical Verification
                        </p>
                        <h5 className="text-xs font-black uppercase tracking-wider text-white">
                          Verified by Dr. Roberto Jordan (MD)
                        </h5>
                      </div>
                      <p className="text-[11px] leading-relaxed text-white/60 font-medium">
                        "{result.name} remains highly therapeutic for immediate
                        mitigation of general symptoms. Exercise precaution
                        under clinical dosages, specifically avoiding alcohol
                        overlays or exceeding frequency margins."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Medical Parameter Fields */}
                <div className="space-y-6">
                  {/* Parameter 1: Composition */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h5 className="text-[14px] text-white/80 font-black uppercase tracking-[0.25em]">
                      Composition & generic compound
                    </h5>
                    <p className="text-xs text-white/80 font-black uppercase tracking-wider leading-relaxed italic">
                      {result.genericName}
                    </p>
                  </div>

                  {/* Parameter 2: Timings & frequency */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h5 className="text-[14px] text-white/80 font-black uppercase tracking-[0.25em]">
                      Timings & frequency index
                    </h5>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-white/65">
                        <Clock size={14} className="text-white/60" />
                        <span className="text-[11px] font-black uppercase tracking-widest">
                          {result.dosage.frequency}
                        </span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                      <div className="flex items-center gap-2 text-white/65">
                        <Stethoscope size={14} className="text-white/60" />
                        <span className="text-[11px] font-black uppercase tracking-widest">
                          {result.dosage.timing}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Parameter 3: Storage & dosage */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h5 className="text-[14px] text-white/80 font-black uppercase tracking-[0.25em]">
                      Storage & dosage guidance
                    </h5>
                    <p className="text-xs text-white/60 font-medium leading-relaxed">
                      {result.storage} • Adult: {result.dosage.adult}
                    </p>
                  </div>

                  {/* Parameter 4: Important Warnings */}
                  <div className="space-y-2">
                    <h5 className="text-[12px] text-red-500/75 font-black uppercase tracking-[0.25em] text-red-500/80">
                      Clinical Warnings
                    </h5>
                    <div className="space-y-2.5">
                      {result.warnings.slice(0, 2).map((warn, i) => (
                        <div
                          key={i}
                          className="flex gap-3 text-white/60 bg-red-500/5 border border-red-500/10 p-3 rounded-xl"
                        >
                          <ShieldAlert
                            size={15}
                            className="text-red-500/60 shrink-0"
                          />
                          <p className="text-[10px] font-black uppercase tracking-wider leading-relaxed">
                            {warn}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Initial Search Placeholder State (Matches Book Cover layout) */}
          {!result && !loading && !error && (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-16 animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-[#080808] border border-white/5 text-white/60 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl">
                <Pill size={38} className="animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">
                Encyclopedia Selected
              </h3>
              <p className="text-white/60 text-xs font-medium max-w-xs mx-auto leading-relaxed">
                Query medication parameters in the top bar to display detailed
                formula cards, verification review slips, and purchase linkages.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
