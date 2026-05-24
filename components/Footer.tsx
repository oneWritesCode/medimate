import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Section: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-bold text-lg">HealthBuddy</h3>
            <p className="text-white/60 text-sm">
              Your personal healthcare companion built for India
            </p>
            <p className="text-white/40 text-[10px] leading-relaxed mt-2">
              This app provides general health information only.
              Always consult a qualified doctor for medical advice.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">
                Home
              </Link>
              <Link href="/chat" className="text-white/60 hover:text-white text-sm transition-colors">
                Symptom Checker
              </Link>
              <Link href="/medicine" className="text-white/60 hover:text-white text-sm transition-colors">
                Medicine Analyzer
              </Link>
              <Link href="/firstaid" className="text-white/60 hover:text-white text-sm transition-colors">
                First Aid Guide
              </Link>
              <Link href="/history" className="text-white/60 hover:text-white text-sm transition-colors">
                Health History
              </Link>
            </nav>
          </div>

          {/* Column 3: Emergency Contacts */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Emergency Numbers</h3>
            <ul className="flex flex-col gap-2">
              <li className="text-sm">
                <span className="text-white/60">Ambulance: </span>
                <a href="tel:108" className="text-white hover:underline transition-all">108</a>
              </li>
              <li className="text-sm">
                <span className="text-white/60">Police: </span>
                <a href="tel:100" className="text-white hover:underline transition-all">100</a>
              </li>
              <li className="text-sm">
                <span className="text-white/60">Fire: </span>
                <a href="tel:101" className="text-white hover:underline transition-all">101</a>
              </li>
              <li className="text-sm">
                <span className="text-white/60">Women Helpline: </span>
                <a href="tel:1091" className="text-white hover:underline transition-all">1091</a>
              </li>
              <li className="text-sm">
                <span className="text-white/60">Poison Control: </span>
                <a href="tel:1800116117" className="text-white hover:underline transition-all">1800-11-6117</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-[10px]">
            &copy; 2026 HealthBuddy. All rights reserved.
          </p>
          <p className="text-white/40 text-[10px]">
            Built for Beyond Tomorrow Hackathon
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
