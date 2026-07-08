import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import favicon from "/favicon.jpeg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import WelcomeScreen from "@/components/WelcomeScreen";
import BusinessStrategySection from "@/components/BusinessStrategySection";
import Showcase from "./components/Showcase";
import ContactSection from "@/components/ContactSection";
import ScrollCanvas from "@/components/ScrollCanvas";
import type { ScrollCanvasApi } from "@/components/ScrollCanvas";
import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./pages/About";

gsap.registerPlugin(ScrollTrigger);


const logos = [
  "NIFTY 50 ▼ -1.28%",
  "SENSEX ▲ +842.35",
  "NASDAQ ▼ -0.94%",

  "BANK NIFTY ▲ +2.05%",

  "BITCOIN $118,240 ▲ +2.84%"
];

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [time, setTime] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const canvasApiRef = useRef<ScrollCanvasApi | null>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const pandaRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const text = "Abhishek";
  const [displayed, setDisplayed] = useState("");
  const [colorMode, setColorMode] = useState(0);
  const [hoveredLetter, setHoveredLetter] = useState<{ index: number; source: string } | null>(null);

  const nameMeanings = ["Ambitious", "Brilliant", "Honest", "Innovative", "Strategic", "Hardworking", "Excellent", "Knowledgeable"];
  const pandaMeanings = ["Passionate", "Analytical", "Noble", "Determined", "Adaptive"];

  const colors = [
    "text-white",
    "text-[#00BFFF]",
    "text-[#D4AF37]",
    "text-[#37D5FF]",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showWelcome || mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showWelcome, mobileMenu]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    function type() {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i < text.length) setTimeout(type, 200);
    }
    type();
  }, []);

  function smoothstep(t: number, e0: number, e1: number): number {
    const x = Math.max(0, Math.min(1, (t - e0) / (e1 - e0)));
    return x * x * (3 - 2 * x);
  }

  const navigate = useNavigate();

  function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  // GSAP ScrollTrigger: pin hero + drive canvas + text reveals
  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;

    // Set initial text states
    if (pandaRef.current) {
      pandaRef.current.style.opacity = "0";
      pandaRef.current.style.transform = "translateX(30px)";
    }
    if (descRef.current) {
      descRef.current.style.opacity = "0";
      descRef.current.style.transform = "translateY(20px)";
    }
    if (ctaRef.current) {
      ctaRef.current.style.opacity = "0";
      ctaRef.current.style.transform = "translateY(20px)";
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=600vh",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;

        // canvas
        if (canvasApiRef.current) {
          canvasApiRef.current.updateFrame(p);
        }

        // "PANDA" slides in from right (0.05 – 0.18)
        const sp = smoothstep(p, 0.05, 0.18);
        if (pandaRef.current) {
          pandaRef.current.style.opacity = String(sp);
          pandaRef.current.style.transform = `translateX(${30 * (1 - sp)}px)`;
        }

        // Description fades in (0.45 – 0.60)
        const sd = smoothstep(p, 0.45, 0.60);
        if (descRef.current) {
          descRef.current.style.opacity = String(sd);
          descRef.current.style.transform = `translateY(${20 * (1 - sd)}px)`;
        }

        // Buttons slide up (0.55 – 0.75)
        const sc = smoothstep(p, 0.55, 0.75);
        if (ctaRef.current) {
          ctaRef.current.style.opacity = String(sc);
          ctaRef.current.style.transform = `translateY(${20 * (1 - sc)}px)`;
        }
      },
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-[#05070A] text-white overflow-x-hidden">
          <AnimatePresence>{showWelcome && <WelcomeScreen />}</AnimatePresence>

          <nav className="fixed top-5 right-5 md:right-8 z-50 flex items-center gap-4 md:gap-8 px-4 md:px-8 py-2 md:py-3 rounded-full backdrop-blur-xl bg-[#05070A]/20 border border-white/10 shadow-lg">
            <img src={favicon} alt="Logo" className="w-7 h-7 rounded-full object-cover hidden md:block" />
            <ul className="hidden md:flex items-center gap-8 text-xs tracking-widest text-white/70 uppercase">
              <li
                onClick={() =>
                  document.getElementById("Home")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </li>

              <li
                onClick={() => navigate("/about")}
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </li>

              <li
                onClick={() =>
                  document.getElementById("education")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Education
              </li>

              <li
                onClick={() =>
                  document.getElementById("strategy")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Strategy
              </li>

              <li
                onClick={() =>
                  document.getElementById("showcase")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Portfolio
              </li>

              <li
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact
              </li>
            </ul>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-white"
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>


          {mobileMenu && (
            <div className="fixed inset-0 z-40 bg-[#05070A]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 text-white uppercase tracking-[0.3em] text-sm md:hidden">

              <div className="absolute top-30 text-center">
                <p className="text-[10px] text-white/40 tracking-[0.3em] mb-2">
                  TIME
                </p>

                <h2 className="text-2xl tracking-widest font-semibold">
                  {time}
                </h2>
              </div>

              <button
                onClick={() => {
                  document.getElementById("Home")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                Home
              </button>

              <button
                onClick={() => {
                  navigate("/about");
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                About
              </button>

              <button
                onClick={() => {
                  document.getElementById("education")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                Education
              </button>

              <button
                onClick={() => {
                  document.getElementById("strategy")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                Strategy
              </button>

              <button
                onClick={() => {
                  document.getElementById("showcase")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                Portfolio
              </button>

              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                Contact
              </button>
            </div>
          )}

          <section
            ref={heroRef}
            id="Home"
            className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#05070A]"
          >
            <ScrollCanvas apiRef={canvasApiRef} />
            {/* Financial background */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,191,255,0.08) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,191,255,0.08) 1px, transparent 1px),
                  radial-gradient(circle at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 50%)
                `,
                backgroundSize: "80px 80px, 80px 80px, 100% 100%",
              }}
            />
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00BFFF]/8 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/5 blur-[140px] rounded-full pointer-events-none" />

            {/* Bloomberg-style data lines */}
            <div className="absolute top-20 right-10 opacity-[0.06] pointer-events-none">
              <svg width="200" height="100" viewBox="0 0 200 100">
                <polyline points="0,80 30,60 50,70 80,30 110,40 140,10 170,25 200,15" stroke="#00BFFF" strokeWidth="1.5" fill="none" />
                <polyline points="0,90 30,75 50,85 80,50 110,60 140,30 170,45 200,35" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.5" />
              </svg>
            </div>
            <div className="absolute bottom-20 left-10 opacity-[0.04] pointer-events-none">
              <svg width="160" height="80" viewBox="0 0 160 80">
                <polyline points="0,60 20,45 40,55 60,20 80,35 100,10 120,25 140,15 160,5" stroke="#37D5FF" strokeWidth="1.5" fill="none" />
              </svg>
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 pt-24 pb-10">

              <div className="flex justify-between items-start w-full">
                <div className="relative">
                  <h1
                    ref={nameRef}
                    onClick={() => setColorMode((prev) => (prev + 1) % colors.length)}
                    className={`font-display uppercase leading-[0.85] tracking-[-0.03em] text-[14vw] sm:text-[16vw] md:text-[10vw] lg:text-[10rem] cursor-pointer transition-all duration-300 ${colors[colorMode]}`}
                  >
                    {[...(displayed || "\u00A0")].map((ch, i) => (
                      <span
                        key={i}
                        className="relative inline-block hover:scale-110 transition-transform duration-200"
                        onMouseEnter={() => setHoveredLetter({ index: i, source: "name" })}
                        onMouseLeave={() => setHoveredLetter(null)}
                      >
                        {ch === "\u00A0" ? ch : ch}
                        {hoveredLetter?.source === "name" && hoveredLetter?.index === i && nameMeanings[i] && ch !== "\u00A0" && (
                          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[9px] whitespace-nowrap px-2 py-1 rounded-md bg-[#00BFFF]/20 backdrop-blur-xl border border-[#00BFFF]/30 text-[#00BFFF] font-sans font-semibold uppercase tracking-wider animate-fadeIn z-50">
                            {nameMeanings[i]}
                          </span>
                        )}
                      </span>
                    ))}
                  </h1>
                </div>
                <h1
                  ref={pandaRef}
className={`font-display uppercase leading-[0.85] tracking-[-0.03em] text-[14vw] 
sm:text-[16vw] md:text-[10vw] lg:text-[10rem] transition-all duration-300 -ml-16 sm:-ml-24 md:-ml-160 ${colors[colorMode]}`}
                >
                  {"PANDA".split("").map((ch, i) => (
                    <span
                      key={i}
                      className="relative inline-block hover:scale-110 transition-transform duration-200"
                      onMouseEnter={() => setHoveredLetter({ index: i, source: "panda" })}
                      onMouseLeave={() => setHoveredLetter(null)}
                    >
                      {ch}
                      {hoveredLetter?.source === "panda" && hoveredLetter?.index === i && pandaMeanings[i] && (
                        <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[9px] whitespace-nowrap px-2 py-1 rounded-md bg-[#D4AF37]/20 backdrop-blur-xl border border-[#D4AF37]/30 text-[#D4AF37] font-sans font-semibold uppercase tracking-wider animate-fadeIn z-50">
                          {pandaMeanings[i]}
                        </span>
                      )}
                    </span>
                  ))}
                </h1>
              </div>

              <div ref={ctaRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-auto">
                <p ref={descRef} className="relative text-base sm:text-lg lg:text-2xl
    leading-relaxed max-w-lg
    font-[Poppins] font-semibold
    tracking-wide
    text-white drop-shadow-[0_0_15px_rgba(0,191,255,0.3)]">
                  Building Empires. {" "} <br />
                  <em className="not-italic text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                    Creating Legacies.
                  </em>
                </p>

                <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <a
                    href="https://www.linkedin.com/in/abhishek-panda01"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="inline-flex items-center gap-3 border border-[#D4AF37]/30 text-[#D4AF37] px-6 py-3 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#D4AF37] hover:text-[#05070A] transition-all duration-300 rounded-full">
                      Let's Connect
                      <ArrowUpRight size={16} />
                    </button>
                  </a>
                  <a href="assets/Resume2.0.pdf" download="assets/Resume2.0.pdf">
                    <button className="inline-flex items-center gap-3 border border-white/20 text-white px-6 py-3 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white hover:text-black transition-all duration-300 rounded-full">
                      Download Resume
                      <Download size={16} />
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ─── STOCK TICKER MARQUEE ─── */}
          <div className="bg-[#07111F] border-t border-[#00BFFF]/10 py-5 overflow-hidden">
            <div className="flex items-center gap-16 animate-marquee whitespace-nowrap will-change-transform">
              {[...logos, ...logos, ...logos].map((logo, i) => (
                <span key={i} className="inline-flex items-center gap-4 text-xs tracking-[0.3em] uppercase font-medium">
                  <span className="text-white/40">{logo}</span>
                  <span className="text-white/20">|</span>
                </span>
              ))}
              {[
                { sym: "NIFTY", val: "23,487.65", chg: "+0.82%" },
                { sym: "SENSEX", val: "76,543.21", chg: "+0.67%" },
                { sym: "AAPL", val: "$198.43", chg: "+1.23%" },
                { sym: "MSFT", val: "$425.12", chg: "-0.34%" },
                { sym: "GOOGL", val: "$176.89", chg: "+0.91%" },
                { sym: "BTC", val: "$67,234", chg: "+2.15%" },
                { sym: "VIX", val: "14.32", chg: "-3.21%" },
                { sym: "₹/₮", val: "83.45", chg: "-0.12%" },
              ].map((t, i) => (
                <span key={`ticker-${i}`} className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-mono">
                  <span className="text-white/60">{t.sym}</span>
                  <span className="text-white/80">{t.val}</span>
                  <span className={t.chg.startsWith("+") ? "text-green-400" : "text-red-400"}>{t.chg}</span>
                  <span className="text-white/20 mx-3">|</span>
                </span>
              ))}
            </div>
          </div>

          {/* ─── EDUCATION SECTION ─── */}
          <section id="education" className="relative w-full min-h-screen bg-[#05070A] text-white overflow-hidden px-6 md:px-20 py-20 md:py-28">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
              backgroundImage: `linear-gradient(rgba(0,191,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.06) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }} />
            <div className="absolute top-40 left-10 w-[400px] h-[400px] bg-[#00BFFF]/5 blur-[150px] rounded-full pointer-events-none" />

            {/* Left side stock elements */}
            <div className="absolute left-2 md:left-8 top-[12%] space-y-4 pointer-events-none hidden sm:block">
              <div className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-mono mb-3">MARKET WATCH</div>
              {[
                { sym: "NIFTY 50", val: "23,487.65", chg: "+0.82%" },
                { sym: "SENSEX", val: "76,543.21", chg: "+0.67%" },
                { sym: "BANK NIFTY", val: "48,912.30", chg: "-0.23%" },
              ].map((s, i) => (
                <div key={i} className="text-[11px] font-mono leading-tight opacity-60 hover:opacity-100 transition-opacity border-l-2 pl-3 border-[#00BFFF]/30 hover:border-[#00BFFF]">
                  <div className="text-white/60 font-semibold">{s.sym}</div>
                  <div className="text-white/80">{s.val}</div>
                  <div className={s.chg.startsWith("+") ? "text-green-400" : "text-red-400"}>{s.chg}</div>
                </div>
              ))}
              {/* Candlestick chart */}
              <div className="mt-6 p-3 rounded-lg border border-white/10 bg-white/[0.03]">
                <div className="text-[8px] uppercase tracking-[0.2em] text-white/30 font-mono mb-2">VOLUME</div>
                <svg width="90" height="50" viewBox="0 0 90 50" className="opacity-70">
                  {[18, 25, 12, 35, 22, 40, 28, 45, 32, 48, 38, 50, 30, 42, 36].map((h, i) => (
                    <rect key={i} x={i * 6} y={50 - h} width="3" height={h} fill={i % 2 === 0 ? "#00BFFF" : "#D4AF37"} rx="0.5" opacity="0.6" />
                  ))}
                </svg>
              </div>
            </div>

            {/* Right side stock elements */}
            <div className="absolute right-2 md:right-8 top-[12%] space-y-4 pointer-events-none hidden sm:block text-right">
              <div className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-mono mb-3">GLOBAL MARKETS</div>
              {[
                { sym: "AAPL", val: "$198.43", chg: "+1.23%" },
                { sym: "MSFT", val: "$425.12", chg: "-0.34%" },
                { sym: "GOOGL", val: "$176.89", chg: "+0.91%" },
              ].map((s, i) => (
                <div key={i} className="text-[11px] font-mono leading-tight opacity-60 hover:opacity-100 transition-opacity border-r-2 pr-3 border-[#D4AF37]/30 hover:border-[#D4AF37]">
                  <div className="text-white/60 font-semibold">{s.sym}</div>
                  <div className="text-white/80">{s.val}</div>
                  <div className={s.chg.startsWith("+") ? "text-green-400" : "text-red-400"}>{s.chg}</div>
                </div>
              ))}
              {/* Line chart */}
              <div className="mt-6 p-3 rounded-lg border border-white/10 bg-white/[0.03]">
                <div className="text-[8px] uppercase tracking-[0.2em] text-white/30 font-mono mb-2 text-right">TREND</div>
                <svg width="90" height="50" viewBox="0 0 90 50" className="ml-auto opacity-70">
                  <polyline points="0,38 10,32 20,35 30,22 40,28 50,14 60,18 70,8 80,12 90,6" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
                  <polyline points="0,42 10,38 20,40 30,30 40,35 50,22 60,26 70,16 80,20 90,14" stroke="#00BFFF" strokeWidth="1" fill="none" opacity="0.7" />
                </svg>
              </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-10 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-mono">Academic Portfolio</span>
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-16">
                Education<span className="text-[#00BFFF]">.</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Executive MBA */}
                <div className="group relative rounded-2xl border border-white/15 overflow-hidden bg-white/[0.06] hover:border-[#00BFFF]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#00BFFF]/10 backdrop-blur-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00BFFF]/20 to-transparent border border-[#00BFFF]/20 flex items-center justify-center text-[#00BFFF] text-lg font-bold">MFA</div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-green-400 px-2 py-1 rounded-full bg-green-400/10 border border-green-400/20">Completed</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">MBA in Financial & Analytic</h3>
                  <p className="text-sm text-white/60 mb-3">Centurion University of Technology and Management(CUTM) · 2024 – 2026</p>
                  <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                    <span className="flex items-center gap-1">📊 CGPA: 8.5/10</span>
                    <span className="flex items-center gap-1">🏆 Dean's List</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Corporate Finance", "Investment Mgmt", "Strategic Leadership", "Mergers & Acquisitions"].map(s => (
                      <span key={s} className="text-[10px] px-2.5 py-1 rounded-full border border-[#00BFFF]/20 text-[#00BFFF] bg-[#00BFFF]/5">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Bachelor of Commerce */}
                <div className="group relative rounded-2xl border border-white/15 overflow-hidden bg-white/[0.06] hover:border-[#D4AF37]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#D4AF37]/10 backdrop-blur-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-lg font-bold">BC</div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-green-400 px-2 py-1 rounded-full bg-green-400/10 border border-green-400/20">Completed</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Bachelor of Commerce (Accountancy)</h3>
                  <p className="text-sm text-white/60 mb-3">Jupiter Degree College · 2020 – 2023</p>
                  <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                    <span className="flex items-center gap-1">📊 GPA: 7.99/10</span>
                    <span className="flex items-center gap-1">🎓 Distinction</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Financial Accounting", "Corporate Finance", "Economics", "Quantitative Methods"].map(s => (
                      <span key={s} className="text-[10px] px-2.5 py-1 rounded-full border border-[#D4AF37]/20 text-[#D4AF37] bg-[#D4AF37]/5">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="group relative rounded-2xl border border-white/15 overflow-hidden bg-white/[0.06] hover:border-[#37D5FF]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#37D5FF]/10 backdrop-blur-md p-6 md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#37D5FF]/20 to-transparent border border-[#37D5FF]/20 flex items-center justify-center text-[#37D5FF] text-sm font-bold">📜</div>
                    <h3 className="text-lg font-bold text-white">Certifications & Skills</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { title: "Internship in Finance", issuer: "Autoliv Ltd", year: "2025" },
                      { title: "IFRS", issuer: "Udemy", year: "2026" },
                      { title: "US GAAP", issuer: "Udemy", year: "2026" },
                    ].map((cert, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all">
                        <p className="text-sm font-semibold text-white mb-1">{cert.title}</p>
                        <p className="text-xs text-white/50">{cert.issuer} · {cert.year}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { title: "Internship in Finance", issuer: "Autoliv Ltd", year: "2025" },
                      { title: "Digital ", issuer: "Udemy", year: "2026" },
                      { title: "US GAAP", issuer: "Udemy", year: "2026" },
                    ].map((cert, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all">
                        <p className="text-sm font-semibold text-white mb-1">{cert.title}</p>
                        <p className="text-xs text-white/50">{cert.issuer} · {cert.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Courses Completed", value: "24+" },
                    { label: "Avg. GPA", value: "9.7" },
                    { label: "Certifications", value: "6" },
                    { label: "Finance Projects", value: "12+" },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                      <p className="text-2xl font-bold text-[#00BFFF] mb-1">{stat.value}</p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>


          <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease forwards;
        }
      `}</style>

          <section id="strategy">
            <BusinessStrategySection />
          </section>
          <section id="showcase">
            <Showcase />
          </section>
          <section id="contact">
            <ContactSection />
          </section>
        </div>
      }
      />

      <Route path="/about" element={<About />} />
    </Routes>

  );
}
