"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import PageLoader from "./PageLoader";
import NavBar from "./NavBar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      // Use a small timeout to avoid cascading renders warning
      const timer = setTimeout(() => setIsLoading(false), 0);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader key="loader" />}
      </AnimatePresence>
      
      <NavBar />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, transition: { duration: 0.2 } }}
          transition={{ 
            duration: isLoading ? 0 : (shouldReduceMotion ? 0 : 0.3),
          }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
