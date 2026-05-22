'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Phone, 
  AlertCircle, 
  X, 
  ChevronRight, 
  Home, 
  Heart, 
  Brain, 
  Flame, 
  Bone, 
  AlertTriangle, 
  Droplets, 
  Zap,
  Info,
  CheckCircle2,
  PhoneCall,
  Activity,
  ArrowRight,
  Shield,
  ShieldAlert,
  FlaskConical,
  ListChecks,
  AlertOctagon,
  ShieldX
} from 'lucide-react';
import { firstAidGuide } from '@/lib/firstAidData';

// Dynamic emergency protocol icon mapper (replacing all emojis from firstAidData)
const getEmergencyIcon = (id: string, size = 28) => {
  switch (id) {
    case 'heart-attack': return <Heart className="text-red-500" size={size} />;
    case 'choking': return <Activity className="text-orange-500 animate-pulse" size={size} />;
    case 'burns': return <Flame className="text-orange-500" size={size} />;
    case 'stroke': return <Brain className="text-red-400" size={size} />;
    case 'fracture': return <Bone className="text-blue-400" size={size} />;
    case 'allergic-reaction': return <AlertCircle className="text-red-500 animate-bounce" size={size} />;
    case 'seizure': return <Zap className="text-purple-400 animate-pulse" size={size} />;
    case 'drowning': return <Droplets className="text-blue-500" size={size} />;
    default: return <AlertTriangle className="text-amber-500" size={size} />;
  }
};

const CATEGORIES = ['All', 'Cardiac', 'Trauma', 'Respiratory', 'Anaphylaxis & Poison'];

// Panic Mitigation Box Breathing Pacer (Clinical support to decrease adrenaline in emergency)
const BreathingPacer = () => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold (Full)' | 'Exhale' | 'Hold (Empty)'>('Inhale');
  const [seconds, setSeconds] = useState(4);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setPhase(p => {
            if (p === 'Inhale') return 'Hold (Full)';
            if (p === 'Hold (Full)') return 'Exhale';
            if (p === 'Exhale') return 'Hold (Empty)';
            return 'Inhale';
          });
          return 4;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="bg-[#080808] border border-white/10 rounded-[2.5rem] p-4 md:p-6 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-white/10 transition-all max-w-5xl mx-auto">
      <div className="space-y-2 max-w-lg">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] font-black uppercase tracking-widest">
          <Activity size={10} className="animate-pulse" /> Panic Mitigation
        </div>
        <h3 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tight">Emergency Calm Regulator</h3>
        <p className="text-white/60 text-xs leading-relaxed font-bold uppercase tracking-wide">
          Anxious or panicked? Follow this clinical box-breathing cycle to immediately reduce blood pressure and regain critical focus.
        </p>
        <button
          onClick={() => {
            setIsActive(!isActive);
            setSeconds(4);
            setPhase('Inhale');
          }}
          className={`px-4 py-3 mt-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
            isActive ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-white text-black hover:scale-105 active:scale-95'
          }`}
        >
          {isActive ? 'Stop Pacer' : 'Begin Box Breathing'}
        </button>
      </div>

      {/* Pulsing visual element rings */}
      <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
        <div className={`absolute inset-0 rounded-full border border-white/5 transition-all duration-[4000ms] ease-in-out ${
          !isActive ? 'scale-75' :
          phase === 'Inhale' ? 'scale-100 bg-blue-500/5 border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.15)]' :
          phase === 'Hold (Full)' ? 'scale-100 bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]' :
          phase === 'Exhale' ? 'scale-50 bg-blue-500/0 border-blue-500/5 shadow-none' :
          'scale-50 bg-amber-500/0 border-amber-500/5 shadow-none'
        }`} />
        
        <div className={`absolute w-28 h-28 rounded-full border border-white/30 flex flex-col items-center justify-center transition-all duration-[4000ms] ease-in-out ${
          !isActive ? 'scale-75' :
          phase === 'Inhale' ? 'scale-100 bg-blue-500/10 border-blue-500/30' :
          phase === 'Hold (Full)' ? 'scale-100 bg-emerald-500/10 border-emerald-500/30' :
          phase === 'Exhale' ? 'scale-75 bg-blue-500/5 border-blue-500/10' :
          'scale-75 bg-amber-500/5 border-amber-500/10'
        }`}>
          <span className="text-[12px] font-black text-white/60 uppercase tracking-widest text-center px-2 leading-none">
            {isActive ? phase : 'READY'}
          </span>
          {isActive && (
            <span className="text-2xl font-black text-white italic tracking-tighter mt-1 leading-none">
              {seconds}s
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function FirstAidPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEmergency, setSelectedEmergency] = useState<typeof firstAidGuide[0] | null>(null);
  
  // Tab management inside Emergency protocol modal
  const [modalTab, setModalTab] = useState<'sop' | 'symptoms' | 'donot'>('sop');

  // Multi-tier filtering: Search query + Selected Category chips
  const filteredGuide = firstAidGuide.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;
    
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Cardiac') return item.id === 'heart-attack' || item.id === 'stroke';
    if (selectedCategory === 'Trauma') return item.id === 'fracture' || item.id === 'burns';
    if (selectedCategory === 'Respiratory') return item.id === 'choking' || item.id === 'drowning';
    if (selectedCategory === 'Anaphylaxis & Poison') return item.id === 'allergic-reaction' || item.id === 'seizure';
    return true;
  });

  const emergencyNumbers = [
    { name: "Ambulance", number: "108", icon: ShieldAlert, color: "from-red-600 to-red-400", bg: "bg-red-500/10 text-red-500" },
    { name: "Police", number: "100", icon: Shield, color: "from-blue-600 to-blue-400", bg: "bg-blue-500/10 text-blue-400" },
    { name: "Fire", number: "101", icon: Flame, color: "from-orange-600 to-orange-400", bg: "bg-orange-500/10 text-orange-400" },
    { name: "Women Helpline", number: "1091", icon: Heart, color: "from-purple-600 to-purple-400", bg: "bg-purple-500/10 text-purple-400" },
    { name: "Poison Control", number: "1800-11-6117", icon: FlaskConical, color: "from-emerald-600 to-emerald-400", bg: "bg-emerald-500/10 text-emerald-400" },
  ];

  return (
    <div className="min-h-screen bg-black pt-12 selection:bg-white selection:text-black pb-24 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <div className="px-6 md:px-12 py-4 bg-[#080808] flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
        <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
          <Home size={12} /> Home
        </Link>
        <ChevronRight size={10} />
        <span className="text-white/60">First Aid Guide</span>
      </div>

      {/* Header Section */}
      <section className="relative overflow-hidden px-6 md:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black to-black z-0"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-2 relative z-10 animate-in fade-in slide-in-from-top-12 duration-1000">
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-red-500/10 border border-red-500/40 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            <Activity size={12} className="animate-pulse" />
            Critical Emergency Support
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none">
            First Aid <span className="text-red-600">Protocol</span>
          </h1>
          <p className="text-white/60 font-bold text-sm md:text-base uppercase tracking-widest max-w-2xl mx-auto">
            Immediate, step-by-step instructions for life-threatening emergencies when every second counts.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
            <a 
              href="tel:108"
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-red-500 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-red-600/20"
            >
              <Phone size={24} strokeWidth={3} />
              Call 108
            </a>
            <button 
              onClick={() => {
                const el = document.getElementById('guide-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
            >
              Browse Protocols <ChevronRight size={16} strokeWidth={3} />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-6 px-4 md:px-8 space-y-8">
        
        {/* Breathing Regulator Calm Card */}
        <BreathingPacer />

        {/* Search Console Station */}
        <div className="space-y-4">
          <div className="max-w-2xl mx-auto relative group animate-in fade-in duration-1000 delay-200">
            <div className="absolute inset-0 bg-red-600/5 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search emergency (e.g. Stroke, Burn, Heart...)"
              className="relative w-full bg-[#0c0c0c] border border-white/20 rounded-[1.5rem] px-4 py-3 pr-8 text-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-1 focus:ring-red-500/30 focus:border-red-500/30 shadow-2xl transition-all"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-red-500 transition-colors">
              <Search size={24} strokeWidth={3} />
            </div>
          </div>

          {/* Interactive Category filter chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto animate-in fade-in duration-1000 delay-300">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-500/20'
                    : 'bg-[#0c0c0c] text-white/60 border-white/5 hover:border-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Protocols Grid */}
        <div id="guide-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          {filteredGuide.length > 0 ? filteredGuide.map((item) => (
            <div 
              key={item.id}
              onClick={() => {
                setSelectedEmergency(item);
                setModalTab('sop'); // Reset detail tab on modal trigger
              }}
              className={`bg-[#0c0c0c] border border-white/10 rounded-[1.5rem] p-3 shadow-2xl hover:border-white/20 transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[240px] active:scale-[0.98]`}
            >
              {/* Vertical side glow borders mapping severity color (Reference Image 2 schedule cards) */}
              <div className={`absolute top-0 left-0 w-1 h-full transition-all duration-300 ${
                item.color === 'red' ? 'bg-red-600' : 
                item.color === 'orange' ? 'bg-orange-500' : 
                item.color === 'blue' ? 'bg-blue-500' : 
                'bg-purple-500'
              }`}></div>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {/* Visual coin layout replacing the raw emoji icons */}
                    <div className="w-10 h-10 bg-white/5 border border-white/5 rounded-full flex items-center justify-center shadow-inner group-hover:scale-80 scale-60 transition-all duration-500">
                      {getEmergencyIcon(item.id, 24)}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-red-500 transition-colors">{item.title}</h2>
                      <div className="flex items-center gap-2 mt-1">
                         <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                            item.color === 'red' ? 'bg-red-500/10 text-red-500 border border-red-500/10 animate-pulse' : 
                            item.color === 'orange' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/10' : 
                            'bg-blue-500/10 text-blue-400 border border-blue-500/10'
                          }`}>
                            {item.color === 'red' ? 'Critical' : 'Urgent'}
                          </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`flex items-center gap-3 px-4 text-[10px] font-black uppercase tracking-widest border ${
                  item.color === 'red' ? 'text-red-500/80 border-red-500/10' : 
                  item.color === 'orange' ? 'text-orange-400/80 border-orange-500/10' : 
                  'text-blue-400/80 border-blue-500/10'
                }`}>
                  <AlertTriangle size={12} strokeWidth={3} className="shrink-0" />
                  <span className="truncate">{item.warning}</span>
                </div>
              </div>

              <div className="ml-3 flex items-center justify-between">
                <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors flex items-center gap-2">
                  View Emergency Protocol <ArrowRight size={12} strokeWidth={3} />
                </span>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-white group-hover:text-black transition-all">
                   <ChevronRight size={18} strokeWidth={3} />
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-24 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/5 text-white/60 flex items-center justify-center mx-auto shadow-inner">
                <ShieldAlert size={28} />
              </div>
              <h3 className="text-xl font-black text-white uppercase italic">No protocols found</h3>
              <p className="text-white/60 text-xs font-medium">Try checking another filter or search term</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Quick Reference Dialers (Clean coin layouts) */}
        <section className="space-y-10 pt-4 border-t border-white/5">
          <div className="text-center">
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">Emergency Hotlines</h2>
            <p className="text-white/60 font-black text-[10px] uppercase tracking-[0.2em]">One-tap dialling for Indian emergency services</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {emergencyNumbers.map((num) => (
              <a 
                key={num.number}
                href={`tel:${num.number}`}
                className="bg-[#0c0c0c] flex border border-white/10 rounded-[1.5rem] p-2 flex items-center justify-around text-center gap-4 shadow-xl hover:border-white/20 hover:scale-[1.02] transition-all group active:scale-95 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${num.color}`}></div>
                
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-white/5 transition-transform duration-500 group-hover:scale-80 scale-60 ${num.bg}`}>
                  <num.icon size={22} strokeWidth={2.5} />
                </div>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{num.name}</p>
                  <p className="text-2xl font-black text-white italic tracking-tighter">{num.number}</p>
                </div>
                
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-white group-hover:text-black transition-all">
                  <Phone size={14} strokeWidth={3} />
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Cockpit Instrument Detail Modal (tabbed folder document structure from reference image 3) */}
      {selectedEmergency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl" 
            onClick={() => setSelectedEmergency(null)}
          />
          <div className="relative w-full max-w-4xl bg-[#080808] border border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className={`p-8 md:p-10 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden ${
              selectedEmergency.color === 'red' ? 'bg-red-500/5' : 
              selectedEmergency.color === 'orange' ? 'bg-orange-500/5' : 
              'bg-blue-500/5'
            }`}>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shadow-inner border border-white/5">
                  {getEmergencyIcon(selectedEmergency.id, 28)}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">{selectedEmergency.title}</h2>
                  <div className="flex items-center gap-2.5 mt-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                      selectedEmergency.color === 'red' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      selectedEmergency.color === 'orange' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                      'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {selectedEmergency.color === 'red' ? 'Critical Priority' : 'High Priority'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Folder tab design switch console inside Header */}
              <div className="flex bg-black p-1 rounded-2xl border border-white/10 z-10 shrink-0">
                {[
                  { id: 'sop', label: 'SOP Steps', icon: ListChecks },
                  { id: 'symptoms', label: 'Symptoms', icon: Activity },
                  { id: 'donot', label: 'Restraints', icon: ShieldX }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setModalTab(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 ${
                      modalTab === tab.id 
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <tab.icon size={12} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setSelectedEmergency(null)}
                className="absolute top-6 right-6 p-2 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
              >
                <X size={18} strokeWidth={3} />
              </button>
            </div>

            {/* Modal Content - Dynamic panes */}
            <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-8">
              
              {/* Emergency Banner Details */}
              <div className="bg-white/5 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex items-start gap-4">
                <Info className="shrink-0 text-white/60 mt-0.5" size={18} />
                <p className="text-white/80 font-bold text-[12px] uppercase tracking-wide leading-relaxed">
                  {selectedEmergency.warning}
                </p>
              </div>

              {/* SOP STEPS PROTOCOL TAB */}
              {modalTab === 'sop' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    Standard Operating Procedure
                  </h3>
                  <div className="space-y-6">
                    {selectedEmergency.steps.map((step, i) => (
                      <div key={i} className="flex gap-6 group relative">
                        {/* Timeline dotted connection line */}
                        {i < selectedEmergency.steps.length - 1 && (
                          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-white/5 group-hover:bg-white/10 transition-colors"></div>
                        )}
                        <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all shadow-xl relative z-10 ${
                          selectedEmergency.color === 'red' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.25)]' : 
                          selectedEmergency.color === 'orange' ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.25)]' : 
                          'bg-blue-500 text-black shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                        }`}>
                          {i + 1}
                        </div>
                        <div className="pt-2">
                          <p className="text-[15px] text-white font-bold leading-relaxed tracking-tight group-hover:text-red-500 transition-colors">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SYMPTOMS PROTOCOL TAB */}
              {modalTab === 'symptoms' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                    Visual Identification Checklist
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedEmergency.symptoms.map((s, i) => (
                      <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/5 p-6 rounded-[2rem] group hover:bg-white/10 transition-colors">
                        <div className="shrink-0 w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                          <CheckCircle2 size={16} strokeWidth={3} />
                        </div>
                        <p className="text-[13px] font-black uppercase text-white tracking-tight leading-tight pt-0.5">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RESTRAINTS (DO NOT) TAB */}
              {modalTab === 'donot' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                    <AlertOctagon className="text-red-600" size={14} strokeWidth={4} />
                    Critical Restraints (DO NOT)
                  </h3>
                  <div className="bg-red-600/5 border border-red-600/10 rounded-[3rem] p-8 md:p-10 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <AlertOctagon size={120} strokeWidth={3} className="text-red-600" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 relative z-10">
                      {selectedEmergency.doNot.map((item, i) => (
                        <div key={i} className="flex gap-4 items-center bg-black/40 border border-red-600/10 p-5 rounded-2xl group hover:border-red-600/30 transition-all">
                          <div className="shrink-0 w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center text-red-600">
                            <X size={12} strokeWidth={4} />
                          </div>
                          <p className="text-[12px] font-black uppercase text-red-200/60 group-hover:text-red-200 transition-colors tracking-wide leading-tight">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-8 md:p-10 border-t border-white/5 bg-[#080808] flex flex-col md:flex-row gap-4">
              <a 
                href="tel:108"
                className="flex-[2] inline-flex items-center justify-center gap-4 bg-red-600 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-red-500 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-red-600/20"
              >
                <PhoneCall size={20} strokeWidth={3} className="animate-bounce" />
                Dial 108 Now
              </a>
              <button 
                onClick={() => setSelectedEmergency(null)}
                className="flex-1 py-5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all active:scale-95 cursor-pointer"
              >
                Dismiss Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
