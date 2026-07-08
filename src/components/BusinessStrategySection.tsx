import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const BandCard = lazy(() => import("./BandCard"));

export default function BusinessStrategySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const cardRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [goAbout, setGoAbout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.animation = "shake 3s ease-in-out infinite";
    }
  }, [mounted]);

  useEffect(() => {
    if (goAbout) {
      const t = setTimeout(() => {
        navigate("/about");
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [goAbout, navigate]);

  return (
    <motion.section
      ref={ref}
      id="strategy"
      initial={{
        x: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
      }}
      animate={
        goAbout
          ? {
            x: "-40vw",
            scale: 0.92,
            opacity: 0,
            filter: "blur(8px)",
          }
          : {
            x: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
          }
      }
      transition={{
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative w-full min-h-screen bg-[#05070A] text-white overflow-hidden flex items-start px-6 md:px-20 pt-16 md:pt-28 select-none"
    >
      {/* Financial grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,191,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,191,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-[#00BFFF]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-[300px] h-[300px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Left stock decorations */}
      <div className="absolute left-2 md:left-8 top-1/4 space-y-4 pointer-events-none hidden sm:block">
        <div className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-mono mb-3">METRICS</div>
        {[
          { sym: "ROI", val: "22.4%", chg: "+3.2%" },
          { sym: "BETA", val: "1.24", chg: "-0.08" },
          { sym: "ALPHA", val: "3.82", chg: "+0.45" },
        ].map((s, i) => (
          <div key={i} className="text-[11px] font-mono leading-tight opacity-60 hover:opacity-100 transition-opacity border-l-2 pl-3 border-[#00BFFF]/30 hover:border-[#00BFFF]">
            <div className="text-white/60 font-semibold">{s.sym}</div>
            <div className="text-white/80">{s.val}</div>
            <div className={s.chg.startsWith("+") ? "text-green-400" : "text-red-400"}>{s.chg}</div>
          </div>
        ))}
      </div>

      {/* Right stock decorations */}
      <div className="absolute right-2 md:right-8 top-1/4 space-y-4 pointer-events-none hidden sm:block text-right">
        <div className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-mono mb-3">RISK</div>
        <div className="p-3 rounded-lg border border-white/10 bg-white/[0.03] mb-4">
          <svg width="80" height="50" viewBox="0 0 80 50" className="ml-auto opacity-70">
            <polyline points="0,38 7,32 14,35 21,22 28,28 35,14 42,18 49,8 56,12 63,6 70,10 77,4" stroke="#00BFFF" strokeWidth="1.5" fill="none" />
            <polyline points="0,42 7,38 14,40 21,30 28,36 35,22 42,26 49,16 56,20 63,12 70,16 77,10" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.6" />
          </svg>
        </div>
        {[
          { sym: "SHARPE", val: "1.86", chg: "+0.12" },
          { sym: "VOLATILITY", val: "14.2%", chg: "-1.3%" },
          { sym: "DRAWDOWN", val: "-8.3%", chg: "+0.5%" },
        ].map((s, i) => (
          <div key={i} className="text-[11px] font-mono leading-tight opacity-60 hover:opacity-100 transition-opacity border-r-2 pr-3 border-[#D4AF37]/30 hover:border-[#D4AF37]">
            <div className="text-white/60 font-semibold">{s.sym}</div>
            <div className="text-white/80">{s.val}</div>
            <div className={s.chg.startsWith("+") ? "text-green-400" : "text-red-400"}>{s.chg}</div>
          </div>
        ))}
      </div>

      {/* TEXT */}
      <div className="relative z-10 max-w-2xl">
        <motion.div className="flex items-center mb-6">
          <motion.span
            animate={{
              width: ["0ch", "28ch", "28ch", "0ch"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.3, 0.8, 1],
            }}
            className="inline-block overflow-hidden whitespace-nowrap text-[11px] tracking-[0.3em] uppercase text-[#00BFFF]/80 font-mono"
          >
            ✦MBA · Finance
          </motion.span>

          <motion.span
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
            }}
            className="text-[#00BFFF]/80 font-mono ml-[2px]"
          >
            |
          </motion.span>
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold leading-[1.05] tracking-tight text-white text-[clamp(56px,9vw,120px)]"
          >
            Business
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, x: -80, rotate: -4 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -80, rotate: -4 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold leading-[1.05] tracking-tight text-[#D4AF37] text-[clamp(56px,9vw,120px)] mb-6"
          >
            Strategy
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative text-sm sm:text-base lg:text-xl
    leading-relaxed max-w-md
    font-[Poppins] font-medium
    tracking-wide
    text-transparent bg-clip-text
    bg-[length:200%_auto]
    bg-gradient-to-r
    from-white via-white/60 to-white
    animate-[shine_4s_linear_infinite]"
        >
          Driving financial strategy through data-driven analysis, investment research, and strategic leadership.
          Transforming complex markets into actionable insights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 flex flex-wrap gap-4"
        >
          {["Financial Modeling", "Excel & Power BI", "Python", "Portfolio Management", "Project Management"].map((skill) => (
            <div
              key={skill}
              className="
        relative group px-5 py-2.5 rounded-2xl
        text-sm font-medium text-white/90
        bg-white/5 backdrop-blur-xl
        border border-white/10
        overflow-hidden
        transition-all duration-300
      "
            >
              <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 bg-gradient-to-r from-[#00BFFF]/20 via-[#37D5FF]/10 to-transparent"></span>
              <span className="absolute inset-0 rounded-2xl border border-[#00BFFF]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">{skill}</span>
            </div>
          ))}
        </motion.div>

        <div className="mt-8 flex flex-col [@media(min-width:540px)]:flex-row items-start md:items-center gap-4">
          <motion.button
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 1.4 }}
            onClick={() => setGoAbout(true)}
            className="inline-flex items-center gap-2 border border-[#D4AF37]/50 text-[#D4AF37] px-6 py-3 text-xs uppercase font-bold hover:bg-[#D4AF37] hover:text-[#05070A] rounded-full transition"
          >
            About Me
          </motion.button>
        </div>
      </div>

      {mounted && (
        <div
          ref={cardRef}
          className="absolute inset-0 z-[5] pointer-events-none"
        >
          <Suspense fallback={null}>
            <BandCard />
          </Suspense>
        </div>
      )}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-2px) rotate(-0.3deg); }
          20% { transform: translateX(2px) rotate(0.3deg); }
          30% { transform: translateX(-1px) rotate(-0.2deg); }
          40% { transform: translateX(1px) rotate(0.2deg); }
          50% { transform: translateX(0); }
        }
      `}</style>
    </motion.section>
  );
}
