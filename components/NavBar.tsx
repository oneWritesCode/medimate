"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  MessageSquare,
  Pill,
  Menu,
  X,
  ClipboardList,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Don't show navbar on landing page
  if (pathname === "/") return null;

  const navItems = [
    { href: "/chat", icon: MessageSquare, name: "Chat" },
    { href: "/medicine", icon: Pill, name: "Medicine" },
    { href: "/history", icon: ClipboardList, name: "Health History" },
    { href: "/firstaid", icon: ShieldAlert, name: "First Aid" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 py-2 bg-black/80 backdrop-blur-md z-50 flex items-center justify-between px-6 md:px-12 shadow-2xl border-b border-white/5">
      {/* Left Side */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-white/5 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10">
            <Heart size={20} strokeWidth={2.5} fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tighter italic uppercase text-white">
            medimate
          </span>
        </Link>
      </div>

      {/* Right Side - Desktop */}
      <div className="hidden md:flex items-center gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.name}
              className={`flex items-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                isActive
                  ? "bg-white text-black shadow-lg shadow-white/10 px-3 "
                  : "text-white/60 border border-white/5 hover:border-white/20 hover:text-white px-1"
              }`}
            >
              <item.icon size={14} strokeWidth={isActive ? 3 : 2} />
              <span className={`${isActive ? "block" : "hidden"} transition-all duration-400`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <Link
            href="/"
            className="text-xs font-black uppercase tracking-widest text-white/60"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 p-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5"
                }`}
              >
                <item.icon size={18} strokeWidth={2.5} />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
