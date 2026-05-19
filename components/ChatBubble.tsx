import { useState } from 'react';
import { User, Bot, ShoppingCart, MapPin, Navigation, Info, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Medicine {
  name: string;
  description: string;
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
}

const ChatBubble = ({ role, content, parsed, onOptionSelect, isLast }: ChatBubbleProps) => {
  const isUser = role === 'user';
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearchingDoctors, setIsSearchingDoctors] = useState(false);

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
    <div className={`flex w-full mb-10 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[95%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-4`}>
        <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-white/10 ${
          isUser ? 'bg-white text-black' : 'bg-[#111] text-white'
        }`}>
          {isUser ? <User size={18} strokeWidth={2.5} /> : <Bot size={18} strokeWidth={2.5} />}
        </div>
        
        <div className="flex flex-col gap-5 flex-1 min-w-0">
          {/* Main Content Bubble */}
          <div
            className={`px-6 py-4 rounded-3xl text-[15px] leading-relaxed shadow-2xl transition-all ${
              isUser
                ? 'bg-white text-black rounded-tr-none'
                : 'bg-[#111] text-gray-200 border border-white/5 rounded-tl-none'
            }`}
          >
            {isUser ? content : (
              <div className="prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-strong:text-white prose-ul:list-disc prose-h3:text-white prose-h3:mt-4 prose-h3:mb-2 prose-h3:text-base prose-h3:font-bold">
                <ReactMarkdown>{parsed?.message || content}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* MCQ Options */}
          {!isUser && parsed?.type === 'question' && parsed.options && !submitted && isLast && (
            <div className="flex flex-wrap gap-2.5 ml-1">
              {parsed.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`px-6 py-3 rounded-full text-sm font-bold border transition-all duration-300 transform active:scale-95 ${
                    selectedOptions.includes(option)
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Medicine Recommendations */}
          {!isUser && parsed?.medicines && parsed.medicines.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-1">
              {parsed.medicines.map((med, idx) => (
                <div key={idx} className="bg-white text-black rounded-2xl p-5 shadow-2xl flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-base tracking-tight uppercase italic">{med.name}</span>
                      <ShoppingCart size={16} className="text-black/20 group-hover:text-black transition-colors" />
                    </div>
                    <p className="text-[11px] font-medium leading-normal text-black/60 mb-6">{med.description}</p>
                  </div>
                  <div className="flex gap-2">
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
                        className="flex-1 bg-black text-white text-[9px] font-black uppercase tracking-widest py-2.5 rounded-lg text-center hover:bg-gray-800 transition-all active:scale-95"
                      >
                        {store.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Doctor Finder Section */}
          {!isUser && parsed?.recommendDoctor && (
            <div className="ml-1 flex flex-col gap-3">
              {!hasSearched ? (
                <button
                  onClick={findNearbyDoctors}
                  disabled={isSearchingDoctors}
                  className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-50 w-full md:w-auto"
                >
                  <MapPin size={18} strokeWidth={3} />
                  {isSearchingDoctors ? 'Scanning Map...' : `Find ${parsed.specialty || 'Doctors'} Near Me`}
                </button>
              ) : doctors.length > 0 ? (
                <>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <Info size={12} />
                    Clinics found via OpenStreetMap
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide -ml-1 pl-1">
                    {doctors.map((doc, idx) => (
                      <div key={idx} className="shrink-0 w-[280px] bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col gap-4 shadow-2xl hover:border-white/20 transition-all">
                        <div className="flex flex-col gap-1">
                          <h4 className="text-[15px] font-bold text-white line-clamp-1">{doc.name}</h4>
                        </div>
                        <p className="text-[12px] leading-relaxed text-white/40 line-clamp-2 min-h-[3rem] font-medium">{doc.address}</p>
                        <a
                          href={doc.directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95"
                        >
                          <Navigation size={14} strokeWidth={3} />
                          Navigate
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col gap-4">
                  <p className="text-sm text-white/60 font-medium">
                    No clinics found nearby. Try searching on Practo or Google Maps for more options.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href="https://www.practo.com/search/doctors"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 py-3 rounded-xl text-xs font-bold hover:bg-white/10 transition-all"
                    >
                      Practo <ExternalLink size={12} />
                    </a>
                    <a
                      href="https://www.google.com/maps/search/doctors+near+me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all"
                    >
                      Google Maps <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
