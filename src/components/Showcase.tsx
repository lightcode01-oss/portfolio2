import { useRef, useEffect } from "react";

const financeExpertise = [
  { name: "Financial Modeling", icon: "/icons/microsoftoffice.svg", color: "#D83B01" },
  { name: "Excel Analytics", icon: "/icons/microsoftexcel.svg", color: "#217346" },
  { name: "Power BI", icon: "/icons/powerbi.svg", color: "#F2C811" },
  { name: "SQL", icon: "/icons/postgresql.svg", color: "#4169E1" },
  { name: "Python", icon: "/icons/python.svg", color: "#3776AB" },
  { name: "Tableau", icon: "/icons/tableau.svg", color: "#E97627" },
  { name: "Risk Analysis", icon: "/icons/apachespark.svg", color: "#E25A1C" },
  { name: "Portfolio Mgmt", icon: "/icons/chartdotjs.svg", color: "#00BFFF" },
  { name: "Market Research", icon: "/icons/googleanalytics.svg", color: "#E37400" },
  { name: "VBA Macros", icon: "/icons/visualstudio.svg", color: "#5C2D91" },
  { name: "Data Analysis", icon: "/icons/numpy.svg", color: "#013243" },
  { name: "Strategic Plan", icon: "/icons/googlesheets.svg", color: "#FF5A5F" },
  { name: "Leadership", icon: "/icons/notion.svg", color: "#1E8CBE" },
  { name: "Communication", icon: "/icons/googleslides.svg", color: "#00897B" },
];

const caseStudies = [
  {
    title: "Market Entry Strategy for Fintech Startup",
    problem: "A fintech startup needed to evaluate market entry into India's digital payments sector with a $5M seed fund.",
    approach: "Conducted PESTEL analysis, Porter's Five Forces, and competitive landscape assessment. Built DCF valuation model with Monte Carlo simulation.",
    analysis: "Identified 3 high-growth sub-segments with CAGR >25%. Assessed regulatory risks and partnership opportunities.",
    impact: "Recommended B2B BNPL segment. Projected 3-year ROI of 180% with risk-adjusted IRR of 22%.",
    metrics: ["Market Size: $2.1T", "CAGR: 28%", "ROI: 180%", "IRR: 22%"],
  },
  {
    title: "Portfolio Optimization for HNI Client",
    problem: "A high-net-worth client with $50M portfolio needed rebalancing during market volatility.",
    approach: "Applied Modern Portfolio Theory with Black-Litterman model. Stress-tested against 2008 and 2020 scenarios.",
    analysis: "Current allocation had 70% equity risk. Identified correlation shifts in emerging markets and real assets.",
    impact: "Rebalanced to 40% equity, 30% fixed income, 20% alternatives, 10% cash. Reduced drawdown risk by 35%.",
    metrics: ["AUM: $50M", "Risk Reduction: 35%", "Sharpe Ratio: 1.8", "Alpha: 3.2%"],
  },
  {
    title: "Capital Structure Advisory for PE Exit",
    problem: "A mid-market PE firm required exit strategy optimization for their $120M manufacturing portfolio company.",
    approach: "Built leveraged buyout model with sensitivity analysis. Evaluated IPO vs strategic sale vs secondary buyout.",
    analysis: "Strategic sale to a larger competitor yielded highest enterprise value. Tax implications modeled across 4 jurisdictions.",
    impact: "Executed sale at 8.2x EBITDA. Generated 2.8x MOIC for limited partners within 4.5-year hold period.",
    metrics: ["EV: $245M", "EBITDA: 8.2x", "MOIC: 2.8x", "Hold: 4.5 yrs"],
  },
];

const credentials = [
  { title: "CFA Level I Candidate", issuer: "CFA Institute", year: "2024" },
  { title: "Executive MBA (Finance)", issuer: "Top B-School", year: "2025" },
  { title: "Financial Modeling & Valuation", issuer: "Wall Street Prep", year: "2024" },
];

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

function CaseStudyCard({ item }: { item: typeof caseStudies[0] }) {
  return (
    <div
      className="group relative rounded-2xl border border-white/15 overflow-hidden bg-white/[0.06] 
      hover:border-[#00BFFF]/40 transition-all duration-500 
      hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00BFFF]/10 backdrop-blur-md"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold text-white leading-tight">{item.title}</h3>
          <span className="shrink-0 text-[#00BFFF]"><ExternalLinkIcon /></span>
        </div>

        <div className="space-y-3 text-sm text-white/70">
          <div>
            <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-semibold">Problem</span>
            <p className="mt-1 leading-relaxed">{item.problem}</p>
          </div>
          <div>
            <span className="text-[#37D5FF] text-[10px] uppercase tracking-[0.2em] font-semibold">Approach</span>
            <p className="mt-1 leading-relaxed">{item.approach}</p>
          </div>
          <div>
            <span className="text-[#00BFFF] text-[10px] uppercase tracking-[0.2em] font-semibold">Analysis</span>
            <p className="mt-1 leading-relaxed">{item.analysis}</p>
          </div>
          <div>
            <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-semibold">Impact</span>
            <p className="mt-1 leading-relaxed">{item.impact}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
          {item.metrics.map((m, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-[#00BFFF]/30 text-[#00BFFF] bg-[#00BFFF]/5 font-mono">
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CredentialCard({ item }: { item: typeof credentials[0] }) {
  return (
    <div
      className="group relative rounded-2xl border border-white/15 overflow-hidden bg-white/[0.06]
      hover:border-[#D4AF37]/40 transition-all duration-500
      hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D4AF37]/10 backdrop-blur-md"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className="p-6 space-y-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-lg font-bold">
          A
        </div>
        <h3 className="text-base font-semibold text-white">{item.title}</h3>
        <div className="flex items-center gap-3 text-xs text-white/50">
          <span>{item.issuer}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>{item.year}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Globe with periodic blast ─────────────────────────────────────────────────
function ExpertiseGrid() {
  const itemEls = useRef<HTMLDivElement[]>([]);
  const flashEl = useRef<HTMLDivElement>(null);
  const rotY = useRef(0);
  const rotX = useRef(0.3);
  const blastT = useRef(0);
  const rafId = useRef<number>(0);
  const RADIUS = 130;
  const BLAST_RADIUS = 400;
  const n = financeExpertise.length;

  const globePos = useRef<{ x: number; y: number; z: number }[]>([]);
  const spreadPos = useRef<{ x: number; y: number; z: number }[]>([]);

  useEffect(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    globePos.current = Array.from({ length: n }, (_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
    spreadPos.current = Array.from({ length: n }, (_, i) => {
      const angle = (i / n) * Math.PI * 2 + i * 0.5;
      const tilt = (i / n) * Math.PI - Math.PI / 2;
      return {
        x: Math.cos(angle) * Math.cos(tilt),
        y: Math.sin(tilt),
        z: Math.sin(angle) * Math.cos(tilt),
      };
    });
  }, []);

  function project(
    pos: { x: number; y: number; z: number },
    rx: number,
    ry: number
  ) {
    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const x1 = pos.x * cosY - pos.z * sinY;
    const z1 = pos.x * sinY + pos.z * cosY;
    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const y2 = pos.y * cosX - z1 * sinX;
    const z2 = pos.y * sinX + z1 * cosX;
    return { x: x1, y: y2, z: z2 };
  }

  useEffect(() => {
    const els = itemEls.current;

    function render(time: number) {
      blastT.current += 0.006;
      const raw = Math.sin(blastT.current);
      const blastRaw = Math.max(0, raw);
      const blast = Math.pow(blastRaw, 0.55);

      if (blast < 0.02) {
        rotY.current += 0.008;
        rotX.current = 0.3 + Math.sin(time * 0.0004) * 0.12;
      }

      const projected = globePos.current.map((pos, i) => {
        const sp = spreadPos.current[i] || { x: 0, y: 0, z: 0 };
        const eased = blast;
        const blendX = pos.x + (sp.x - pos.x) * eased;
        const blendY = pos.y + (sp.y - pos.y) * eased;
        const blendZ = pos.z + (sp.z - pos.z) * eased;
        return {
          el: els[i],
          p: project(
            { x: blendX, y: blendY, z: blendZ },
            blast > 0.02 ? rotX.current * (1 - blast) : rotX.current,
            blast > 0.02 ? rotY.current * (1 - blast) : rotY.current
          ),
          blast,
        };
      });

      projected
        .slice()
        .sort((a, b) => a.p.z - b.p.z)
        .forEach(({ el, p, blast: b }, idx) => {
          if (!el) return;
          const radius = RADIUS + (BLAST_RADIUS - RADIUS) * b;
          const x = p.x * radius;
          const y = p.y * radius;
          const depth = (p.z + 1) / 2;
          const opacity = 0.3 + depth * 0.7;
          const scale = 0.5 + depth * 0.5 + b * 0.45;
          el.style.cssText =
            `position:absolute;left:${210 + x - 36}px;top:${210 + y - 36}px;` +
            `opacity:${opacity};transform:scale(${scale});z-index:${idx};` +
            `width:72px;height:72px;`;
        });

      if (flashEl.current) {
        const flashOpacity = Math.pow(blast, 2.5) * 0.5;
        flashEl.current.style.opacity = String(flashOpacity);
      }

      rafId.current = requestAnimationFrame(render);
    }

    rafId.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-3 text-white/40">
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-white/30" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-mono">
          {financeExpertise.length} competencies · expertise hub
        </span>
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-white/30" />
      </div>

      <div className="relative w-full flex items-center justify-center select-none" style={{ height: "clamp(280px, 80vw, 460px)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,191,255,0.03) 0%, transparent 70%)",
          }}
        />

        {/* Flash overlay */}
          <div
            ref={flashEl}
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              opacity: 0,
              background:
                "radial-gradient(circle at center, rgba(0,191,255,0.2) 0%, rgba(212,175,55,0.08) 40%, transparent 70%)",
            }}
          />

        <div className="relative scale-[0.6] sm:scale-100 origin-center" style={{ width: "420px", height: "420px" }}>
          {financeExpertise.map((tech, i) => (
            <div
              key={tech.name}
              ref={(el) => { if (el) itemEls.current[i] = el; }}
              style={{ position: "absolute", width: 72, height: 72 }}
            >
              <div
                className="w-full h-full rounded-[18px] flex flex-col items-center justify-center gap-1"
                style={{
                  border: "1px solid rgba(0,191,255,0.15)",
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(12px)",
                  boxShadow: `0 0 20px -8px ${tech.color}55`,
                }}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  loading="lazy"
                  style={{ width: 28, height: 28, objectFit: "contain" }}
                />
                <span
                  style={{
                    fontSize: 8,
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    textAlign: "center",
                    lineHeight: 1.2,
                  }}
                >
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{ boxShadow: "inset 0 0 80px 40px rgba(5,7,10,0.8)" }}
        />
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

type TabId = "case-studies" | "credentials" | "expertise";

const tabs: { id: TabId; label: string }[] = [
  { id: "case-studies", label: "Case Studies" },
  { id: "credentials", label: "Credentials" },
  { id: "expertise", label: "Expertise" },
];

export default function ShowcaseSection() {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-screen bg-[#05070A] overflow-hidden text-white px-4 sm:px-8 md:px-16 lg:px-24 py-0 md:py-12 -mt-16 sm:mt-0 md:mt-12">
      {/* Financial grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,191,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,191,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-[#00BFFF]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Left stock elements */}
      <div className="absolute left-2 md:left-8 top-[15%] space-y-4 pointer-events-none hidden sm:block z-20">
        <div className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-mono mb-3">HOLDINGS</div>
        {[
          { sym: "AAPL", val: "$198.43", chg: "+1.23%" },
          { sym: "MSFT", val: "$425.12", chg: "-0.34%" },
          { sym: "GOOGL", val: "$176.89", chg: "+0.91%" },
          { sym: "AMZN", val: "$189.34", chg: "+0.56%" },
        ].map((s, i) => (
          <div key={i} className="text-[11px] font-mono leading-tight opacity-60 hover:opacity-100 transition-opacity border-l-2 pl-3 border-[#00BFFF]/30 hover:border-[#00BFFF]">
            <div className="text-white/60 font-semibold">{s.sym}</div>
            <div className="text-white/80">{s.val}</div>
            <div className={s.chg.startsWith("+") ? "text-green-400" : "text-red-400"}>{s.chg}</div>
          </div>
        ))}
      </div>

      {/* Right stock elements */}
      <div className="absolute right-2 md:right-8 top-[15%] space-y-4 pointer-events-none hidden sm:block text-right z-20">
        <div className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-mono mb-3">INDICES</div>
        {[
          { sym: "S&P 500", val: "5,432.18", chg: "+0.42%" },
          { sym: "NASDAQ", val: "17,345.67", chg: "-0.18%" },
          { sym: "DOW JONES", val: "39,876.54", chg: "+0.31%" },
          { sym: "RUSSELL", val: "2,156.78", chg: "+0.65%" },
        ].map((s, i) => (
          <div key={i} className="text-[11px] font-mono leading-tight opacity-60 hover:opacity-100 transition-opacity border-r-2 pr-3 border-[#D4AF37]/30 hover:border-[#D4AF37]">
            <div className="text-white/60 font-semibold">{s.sym}</div>
            <div className="text-white/80">{s.val}</div>
            <div className={s.chg.startsWith("+") ? "text-green-400" : "text-red-400"}>{s.chg}</div>
          </div>
        ))}
        {/* Mini chart */}
        <div className="mt-6 p-3 rounded-lg border border-white/10 bg-white/[0.03]">
          <svg width="80" height="40" viewBox="0 0 80 40" className="ml-auto opacity-70">
            <polyline points="0,35 8,28 16,32 24,18 32,25 40,10 48,15 56,5 64,8 72,3 80,6" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
            <polyline points="0,38 8,34 16,36 24,24 32,30 40,16 48,22 56,12 64,16 72,10 80,14" stroke="#00BFFF" strokeWidth="1" fill="none" opacity="0.6" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto">
        {/* Label */}
        <div className="relative flex items-center justify-center gap-4 mb-5 opacity-0 animate-[fadeSlideDown_0.8s_ease_forwards]">
          <div className="relative overflow-hidden">
            <div className="w-10 h-px bg-white/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.45em] text-white/35 font-mono">
            Portfolio
          </span>
          <div className="relative overflow-hidden">
            <div className="w-10 h-px bg-white/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
        </div>

        {/* Expertise Grid */}
        <div className="opacity-0 animate-[fadeSlideUp_0.6s_ease_0.3s_forwards]">
          <ExpertiseGrid />
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineMove {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
