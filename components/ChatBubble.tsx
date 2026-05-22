'use client';

import { useState } from 'react';
import { 
  ShoppingCart, 
  MapPin, 
  Navigation, 
  Info, 
  ExternalLink,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RotateCw,
  Volume2,
  VolumeX,
  Edit3
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Medicine {
  name: string;
  genericName: string;
  use: string;
}

interface Doctor {
  name: string;
  address: string;
  directionsUrl: string;
}

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  parsed?: {
    type: 'question' | 'answer';
    message: string;
    options?: string[];
    multiSelect?: boolean;
    medicines?: Medicine[];
    recommendDoctor?: boolean;
    specialty?: string;
  };
  onOptionSelect?: (options: string[]) => void;
  isLast?: boolean;
  onEdit?: (text: string) => void;
  onRegenerate?: () => void;
}

const ChatBubble = ({ 
  role, 
  content, 
  parsed, 
  onOptionSelect, 
  isLast, 
  onEdit, 
  onRegenerate 
}: ChatBubbleProps) => {
  const isUser = role === 'user';
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearchingDoctors, setIsSearchingDoctors] = useState(false);

  // Micro-action states
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleOptionClick = (option: string) => {
    if (submitted || !isLast) return;
    if (parsed?.multiSelect) {
      setSelectedOptions(prev => prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]);
    } else {
      setSelectedOptions([option]);
      setSubmitted(true);
      onOptionSelect?.([option]);
    }
  };

  const handleCopy = async () => {
    const rawText = parsed?.message || content;
    let cleanText = rawText;
    try {
      const parsedObj = JSON.parse(rawText);
      cleanText = parsedObj.message || cleanText;
    } catch (e) {}

    try {
      await navigator.clipboard.writeText(cleanText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSpeak = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const rawText = parsed?.message || content;
        let cleanText = rawText;
        try {
          const parsedObj = JSON.parse(rawText);
          cleanText = parsedObj.message || cleanText;
        } catch (e) {}

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const findNearbyDoctors = () => {
    if (isSearchingDoctors) return;
    setIsSearchingDoctors(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setIsSearchingDoctors(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        try {
          const query = `data=[out:json];(node["amenity"="hospital"](around:3000,${lat},${lng});node["amenity"="clinic"](around:3000,${lat},${lng});node["healthcare"="doctor"](around:3000,${lat},${lng}););out body;`;
          
          const response = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: query
          });

          const data = await response.json();
          const results = (data.elements || []).slice(0, 5).map((el: any) => ({
            name: el.tags?.name || "Unnamed Medical Center",
            address: el.tags?.["addr:full"] || el.tags?.["addr:street"] || "Address available via maps",
            directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${el.lat},${el.lon}`
          }));

          setDoctors(results);
          setHasSearched(true);
        } catch (error) {
          console.error("Error finding doctors via Overpass:", error);
          setHasSearched(true);
        } finally {
          setIsSearchingDoctors(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsSearchingDoctors(false);
        alert("Please enable location access to find doctors.");
      }
    );
  };

  return (
    <div className={`w-full mb-8 flex flex-col group ${isUser ? 'items-end' : 'items-start'}`}>
      {/* Outer wrapper: no avatars for cleaner editorial design */}
      <div className={`max-w-[90%] md:max-w-[80%] flex flex-col gap-3 ${isUser ? 'items-end' : 'items-start'}`}>
        
        {/* Chat bubble itself */}
        {isUser ? (
          /* User Card Bubble: Subtle rounded bubble */
          <div className="bg-[#0d0d0d] border border-white/15 text-white rounded-2xl rounded-tr-none px-6 py-2 text-[15px] leading-relaxed shadow-xl max-w-full">
            {content}
          </div>
        ) : (
          /* Assistant Bubble: Minimalist, clean, plain text with premium typography spacing */
          <div className="text-white/95 text-[15px] leading-relaxed w-full">
            <div className="prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-strong:text-white prose-ul:list-disc prose-ul:pl-5  prose-h3:text-white prose-h3:mt-6 prose-h3:text-base prose-h3:font-black prose-h3:uppercase prose-h3:tracking-widest">
              <ReactMarkdown>{parsed?.message || content}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Micro-actions Row */}
        <div className={`flex items-center gap-4 text-white/60 transition-all duration-300 opacity-50 group-hover:opacity-100 ${isUser ? 'justify-end pr-1' : 'justify-start pl-1'}`}>
          {isUser ? (
            <>
              <button 
                onClick={handleCopy} 
                className="hover:text-white transition-colors cursor-pointer"
                title="Copy Message"
              >
                {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
              </button>
              <button 
                onClick={() => onEdit?.(content)}
                className="hover:text-white transition-colors cursor-pointer"
                title="Edit Message"
              >
                <Edit3 size={14} />
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleCopy} 
                className="hover:text-white transition-colors cursor-pointer"
                title="Copy Response"
              >
                {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
              </button>
              <button 
                onClick={() => setLiked(liked === true ? null : true)} 
                className={`hover:text-white transition-colors cursor-pointer ${liked === true ? 'text-white' : ''}`}
                title="Helpful"
              >
                <ThumbsUp size={14} fill={liked === true ? 'currentColor' : 'none'} />
              </button>
              <button 
                onClick={() => setLiked(liked === false ? null : false)} 
                className={`hover:text-white transition-colors cursor-pointer ${liked === false ? 'text-white' : ''}`}
                title="Not Helpful"
              >
                <ThumbsDown size={14} fill={liked === false ? 'currentColor' : 'none'} />
              </button>
              <button 
                onClick={handleSpeak}
                className={`hover:text-white transition-colors cursor-pointer ${isSpeaking ? 'text-white animate-pulse' : ''}`}
                title={isSpeaking ? 'Stop Speaking' : 'Read Aloud'}
              >
                {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              {onRegenerate && (
                <button 
                  onClick={onRegenerate}
                  className="hover:text-white transition-colors cursor-pointer"
                  title="Regenerate"
                >
                  <RotateCw size={14} />
                </button>
              )}
            </>
          )}
        </div>

        {/* MCQ Options (styled as high-end outlines turning solid on active) */}
        {!isUser && parsed?.type === 'question' && parsed.options && !submitted && isLast && (
          <div className="flex flex-wrap gap-2.5 mt-2.5">
            {parsed.options.map((option, index) => (
              <button
                key={`option-${index}-${option}`}
                disabled={submitted}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOptionClick(option);
                }}
                className={`px-3 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-all duration-300 transform active:scale-95 cursor-pointer pointer-events-auto ${
                  selectedOptions.includes(option)
                    ? 'bg-white text-black border-white shadow-lg shadow-white/10'
                    : 'border-white/10 text-white/60 bg-[#0c0c0c] hover:border-white/30 hover:text-white'
                } ${submitted ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Medicine Recommendations (styled ultra clean pitch dark) */}
        {!isUser && parsed?.medicines && parsed.medicines.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 w-full">
            {parsed.medicines.map((med, idx) => {
              // Style each card differently based on index
              const accents = [
                'border-blue-500/30 group-hover:border-blue-500/50 shadow-blue-500/5',
                'border-green-500/30 group-hover:border-green-500/50 shadow-green-500/5',
                'border-purple-500/30 group-hover:border-purple-500/50 shadow-purple-500/5'
              ];
              const accentClass = accents[idx % accents.length];
              
              return (
                <div key={idx} className={`bg-[#0c0c0c] border text-white rounded-2xl p-6 shadow-2xl flex flex-col justify-between group transition-all ${accentClass}`}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-col">
                        <span className="font-black text-sm tracking-tight uppercase italic text-white">{med.name}</span>
                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-0.5">{med.genericName}</span>
                      </div>
                      <ShoppingCart size={15} className="text-white/60 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-[12px] font-medium leading-relaxed text-white/60 mb-6">{med.use}</p>
                  </div>
                  <div className="flex gap-2.5">
                    {[
                      { name: '1mg', url: `https://www.1mg.com/search/all?name=${encodeURIComponent(med.name)}` },
                      { name: 'PharmEasy', url: `https://pharmeasy.in/search/all?name=${encodeURIComponent(med.name)}` },
                      { name: 'Netmeds', url: `https://www.netmeds.com/catalogsearch/result/${encodeURIComponent(med.name)}` }
                    ].map(store => (
                      <a
                        key={store.name}
                        href={store.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-white text-black text-[10px] font-black uppercase tracking-widest py-3 rounded-lg text-center hover:bg-gray-200 transition-all active:scale-95 shadow-sm cursor-pointer"
                      >
                        {store.name}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Doctor Finder Section */}
        {!isUser && parsed?.recommendDoctor && (
          <div className="flex flex-col gap-3 mt-2 w-full">
            {!hasSearched ? (
              <button
                onClick={findNearbyDoctors}
                disabled={isSearchingDoctors}
                className="flex items-center justify-center gap-3 bg-white text-black px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-50 w-full md:w-auto shadow-md cursor-pointer"
              >
                <MapPin size={15} strokeWidth={3} />
                {isSearchingDoctors ? 'Scanning Map...' : `Find ${parsed.specialty || 'Doctors'} Near Me`}
              </button>
            ) : doctors.length > 0 ? (
              <>
                <div className="flex items-center gap-2 text-[10px] font-bold text-white/60 uppercase tracking-widest">
                  <Info size={11} />
                  Clinics found via OpenStreetMap
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {doctors.map((doc, idx) => (
                    <div key={idx} className="shrink-0 w-[260px] bg-[#0c0c0c] border border-white/5 rounded-2xl p-5 flex flex-col gap-4 shadow-2xl hover:border-white/20 transition-all">
                      <div>
                        <h4 className="text-sm font-black text-white line-clamp-1 uppercase italic">{doc.name}</h4>
                      </div>
                      <p className="text-[11px] leading-relaxed text-white/60 line-clamp-2 min-h-[2.5rem] font-medium">{doc.address}</p>
                      <a
                        href={doc.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95 cursor-pointer"
                      >
                        <Navigation size={12} strokeWidth={3} />
                        Navigate
                      </a>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-5 flex flex-col gap-4 shadow-2xl">
                <p className="text-xs text-white/60 font-medium">
                  No clinics found nearby. Try searching on Practo or Google Maps for more options.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://www.practo.com/search/doctors"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 py-2.5 rounded-lg text-[10px] font-bold hover:bg-white/10 transition-all cursor-pointer"
                  >
                    Practo <ExternalLink size={10} />
                  </a>
                  <a
                    href="https://www.google.com/maps/search/doctors+near+me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-lg text-[10px] font-bold hover:bg-gray-200 transition-all cursor-pointer"
                  >
                    Google Maps <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatBubble;
