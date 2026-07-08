import { useState, useEffect, useRef } from "react";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

function LiveChart() {
    const [points, setPoints] = useState("0,18 20,15 40,16 60,10 80,12 100,6 120,8 140,4 160,6 180,2 200,5");
    const yRef = useRef(12);

    useEffect(() => {
        const interval = setInterval(() => {
            const newY = Math.max(2, Math.min(22, yRef.current + (Math.random() - 0.5) * 6));
            yRef.current = newY;
            setPoints(prev => {
                const parts = prev.split(" ");
                const shifted = parts.slice(1).map(p => {
                    const [x, y] = p.split(",");
                    return `${parseInt(x) - 20},${y}`;
                });
                const lastX = shifted.length > 0 ? parseInt(shifted[shifted.length - 1].split(",")[0]) : 0;
                shifted.push(`${lastX + 20},${newY}`);
                return shifted.join(" ");
            });
        }, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <svg width="100%" height="24" viewBox="0 0 220 24" className="opacity-40">
            <polyline points={points} stroke="#00BFFF" strokeWidth="1.5" fill="none" />
        </svg>
    );
}


export default function ContactSection() {
    const [form, setForm] = useState({
        name: "",
        message: "",
    });

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSend = async () => {
        if (!form.name || !form.message || sending) return;

        setSending(true);

        try {
            const res = await fetch(
                "https://formsubmit.co/ajax/abhishek.panda119955@gmail.com",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: form.name,
                        message: form.message,
                    }),
                }
            );

            if (res.ok) {
                setSent(true);
                setForm({ name: "", message: "" });
                setTimeout(() => setSent(false), 4000);
            }
        } catch {
            // silently fail
        } finally {
            setSending(false);
        }
    };



    return (
        <section
            className="relative w-full min-h-screen bg-[#05070A] overflow-hidden
            px-4 sm:px-8 md:px-16 lg:px-24 py-24 text-white"
        >
            {/* premium grid background */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `
                    linear-gradient(rgba(0,191,255,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,191,255,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#00BFFF]/10 blur-[140px] opacity-20" />

                <div className="absolute bottom-[-220px] right-[-120px] w-[350px] h-[350px] rounded-full bg-[#D4AF37]/5 blur-[120px]" />

                <div className="absolute top-[30%] left-[-120px] w-[300px] h-[300px] rounded-full bg-white/5 blur-[120px]" />
            </div>

            {/* Left stock elements */}
            <div className="absolute left-2 md:left-8 top-[20%] space-y-4 pointer-events-none hidden sm:block z-20">
                <div className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-mono mb-3">FIXED INCOME</div>
                {[
                    { sym: "US 10YR", val: "4.32%", chg: "-2bps" },
                    { sym: "US 2YR", val: "4.68%", chg: "+1bps" },
                    { sym: "IN 10YR", val: "6.98%", chg: "-4bps" },
                    { sym: "CORP BAA", val: "5.12%", chg: "-1bps" },
                ].map((s, i) => (
                    <div key={i} className="text-[11px] font-mono leading-tight opacity-60 hover:opacity-100 transition-opacity border-l-2 pl-3 border-[#00BFFF]/30 hover:border-[#00BFFF]">
                        <div className="text-white/60 font-semibold">{s.sym}</div>
                        <div className="text-white/80">{s.val}</div>
                        <div className={s.chg.startsWith("+") ? "text-green-400" : "text-red-400"}>{s.chg}</div>
                    </div>
                ))}
            </div>

            {/* Right stock elements */}
            <div className="absolute right-2 md:right-8 top-[20%] space-y-4 pointer-events-none hidden sm:block text-right z-20">
                <div className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-mono mb-3">COMMODITIES</div>
                {[
                    { sym: "GOLD", val: "$2,385", chg: "+0.72%" },
                    { sym: "SILVER", val: "$31.45", chg: "-0.28%" },
                    { sym: "CRUDE OIL", val: "$78.32", chg: "+1.15%" },
                    { sym: "NAT GAS", val: "$2.87", chg: "-0.94%" },
                ].map((s, i) => (
                    <div key={i} className="text-[11px] font-mono leading-tight opacity-60 hover:opacity-100 transition-opacity border-r-2 pr-3 border-[#D4AF37]/30 hover:border-[#D4AF37]">
                        <div className="text-white/60 font-semibold">{s.sym}</div>
                        <div className="text-white/80">{s.val}</div>
                        <div className={s.chg.startsWith("+") ? "text-green-400" : "text-red-400"}>{s.chg}</div>
                    </div>
                ))}
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">

                {/* heading */}
                <div className="text-center space-y-5 mb-16">

                    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-72 h-72 bg-[#00BFFF]/10 blur-[120px] rounded-full opacity-40 animate-pulse" />

                    {/* label */}
                    <div className="relative flex items-center justify-center gap-4 opacity-0 animate-[fadeSlideDown_0.8s_ease_forwards]">

                        <div className="relative overflow-hidden">
                            <div className="w-10 h-px bg-white/20" />

                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent animate-[lineMove_2s_linear_infinite]" />
                        </div>

                        <span className="text-[10px] uppercase tracking-[0.45em] text-white/35 font-mono">
                            Contact
                        </span>

                        <div className="relative overflow-hidden">
                            <div className="w-10 h-px bg-white/20" />

                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent animate-[lineMove_2s_linear_infinite]" />
                        </div>
                    </div>

                    {/* title */}
                    <div className="relative overflow-hidden">
                        <h1
                            className="font-black tracking-tight leading-none
                            drop-shadow-[0_0_25px_rgba(0,191,255,0.15)]
                            text-white opacity-0
                            animate-[headingReveal_1s_cubic-bezier(0.22,1,0.36,1)_0.15s_forwards]"
                            style={{
                                fontSize: "clamp(42px,7vw,92px)",
                            }}
                        >
                            <span
                                className="inline-block bg-gradient-to-b
                                from-white via-white to-white/45
                                bg-clip-text text-transparent"
                            >
                                Let's Connect
                            </span>
                        </h1>
                    </div>
                </div>

                {/* layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center">

                    {/* left side */}
                    <div
                        className="flex flex-col items-center lg:items-start
        text-center lg:text-left
        justify-center gap-8 opacity-0
        animate-[fadeSlideUp_0.8s_ease_0.35s_forwards]"
                    >

                        {/* heading / text */}
                        <div className="space-y-4">

                            <p
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
                                Open to strategic discussions, investment research collaborations, and executive opportunities.
                                Let's drive value together.
                            </p>

                        </div>

                        {/* social icons */}
                        <div className="flex items-center justify-center lg:justify-start gap-5 mt-2">

                            {/* linkedin */}
                            <a
                                href="https://www.linkedin.com/in/abhishek-panda01"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110
                hover:border-[#00BFFF]/40
                hover:bg-[#00BFFF]/10
                hover:shadow-[0_0_25px_rgba(0,191,255,0.12)]"
                            >
                                <FaLinkedin
                                    className="text-white/80 group-hover:text-[#00BFFF]
                    text-[18px] sm:text-[20px]
                    transition-all duration-300"
                                />

                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0
                    group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(0,191,255,0.08), transparent)",
                                    }}
                                />
                            </a>

                            {/* twitter/x */}
                            <a
                                href="https://twitter.com/abhishekpanda"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110
                hover:border-white/40
                hover:bg-white/10
                hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]"
                            >
                                <FaTwitter
                                    className="text-white/80 group-hover:text-white
                    text-[18px] sm:text-[20px]
                    transition-all duration-300"
                                />

                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0
                    group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(255,255,255,0.08), transparent)",
                                    }}
                                />
                            </a>

                            {/* email */}
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=abhishek.panda119955@gmail.com&su=Inquiry%20from%20Portfolio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110
                hover:border-[#D4AF37]/40
                hover:bg-[#D4AF37]/10
                hover:shadow-[0_0_25px_rgba(212,175,55,0.12)]"
                            >
                                <FaEnvelope
                                    className="text-white/80 group-hover:text-[#D4AF37]
                    text-[18px] sm:text-[20px]
                    transition-all duration-300"
                                />

                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0
                    group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(212,175,55,0.08), transparent)",
                                    }}
                                />
                            </a>

                            {/* github */}
                            <a
                                href="https://github.com/Abhishek007943"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110
                hover:border-white/40
                hover:bg-white/10
                hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]"
                            >
                                <FaGithub
                                    className="text-white/80 group-hover:text-white
                    text-[18px] sm:text-[20px]
                    transition-all duration-300"
                                />
                            </a>
                        </div>
                    </div>

                    {/* contact card */}
                    <div
                        className="relative rounded-[32px]
                        overflow-hidden opacity-0
                        animate-[cardReveal_1s_ease_0.4s_forwards,floatCard_6s_ease-in-out_infinite]"
                    >

                        <motion.div
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();

                                setPosition({
                                    x: e.clientX - rect.left,
                                    y: e.clientY - rect.top,
                                });
                            }}
                            whileHover={{
                                rotateX: 4,
                                rotateY: -4,
                                scale: 1.01,
                            }}
                            transition={{
                                duration: 0.4,
                            }}
                            className="relative bg-black border border-white/15 rounded-[32px]
                            backdrop-blur-xl
                            shadow-[0_20px_80px_rgba(0,191,255,0.06)]
                            overflow-hidden group"
                        >

                            {/* animated border */}
                            <div className="absolute inset-0 rounded-[32px] overflow-hidden">
                                <div
                                    className="absolute inset-[-200%]
                                    animate-[spinGlow_10s_linear_infinite]"
                                    style={{
                                        background:
                                            "conic-gradient(from 0deg, transparent, rgba(0,191,255,0.18), transparent 30%)",
                                    }}
                                />
                            </div>

                            {/* glow */}
                            <div
                                className="absolute w-72 h-72 rounded-full pointer-events-none
                                blur-[90px] opacity-20 transition-all duration-200"
                                style={{
                                    left: position.x - 140,
                                    top: position.y - 140,
                                    background:
                                        "radial-gradient(circle, rgba(0,191,255,0.18), transparent 70%)",
                                }}
                            />

                            {/* top gradient */}
                            <div
                                className="absolute inset-0 opacity-30"
                                style={{
                                    background:
                                        "radial-gradient(circle at 50% 0%, rgba(0,191,255,0.1), transparent 70%)",
                                }}
                            />

                            {/* top line */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/40 to-transparent opacity-60" />

                            {/* extra glow */}
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#00BFFF]/5 blur-[100px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

                            <div className="relative z-10 p-6 sm:p-7 space-y-6">

                                {/* top */}
                                <div className="space-y-3">
                                    <div className="flex items-baseline gap-3">
                                        <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                                            Send Message
                                        </h2>

                                        <span className="text-xs uppercase tracking-widest text-white/25 font-mono">
                                            Direct
                                        </span>
                                    </div>

                                    <p className="text-sm text-white/35 leading-relaxed">
                                        Reach out directly — I'll respond within 24 hours.
                                    </p>
                                </div>

                                {/* form */}
                                <div className="space-y-4">

                                    {/* input */}
                                    <div className="relative group/input">
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            className="w-full h-14 px-6 rounded-[16px]
                                            bg-white/[0.03] backdrop-blur-2xl
                                            shadow-[inset_0_1px_1px_rgba(0,191,255,0.04)]
                                            hover:shadow-[0_0_20px_rgba(0,191,255,0.05)]
                                            border border-white/10
                                            group-hover/input:border-white/20
                                            text-white placeholder:text-white/20
                                            outline-none transition-all duration-300
                                            focus:border-[#00BFFF]/30
                                            focus:shadow-[0_0_20px_rgba(0,191,255,0.05)]
                                            font-medium"
                                        />
                                    </div>

                                    {/* textarea */}
                                    <div className="relative group/textarea">
                                        <textarea
                                            rows={4}
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Write your message..."
                                            className="w-full p-5 rounded-[16px] resize-none
                                            bg-white/[0.03] backdrop-blur-2xl
                                            shadow-[inset_0_1px_1px_rgba(0,191,255,0.04)]
                                            hover:shadow-[0_0_20px_rgba(0,191,255,0.05)]
                                            border border-white/10
                                            group-hover/textarea:border-white/20
                                            text-white placeholder:text-white/20
                                            outline-none transition-all duration-300
                                            focus:border-[#00BFFF]/30
                                            focus:shadow-[0_0_20px_rgba(0,191,255,0.05)]
                                            font-medium leading-relaxed"
                                        />
                                    </div>

                                    {/* button */}
                                    <button
                                        onClick={handleSend}
                                        disabled={!form.name || !form.message}
                                        className="group/btn relative overflow-hidden
                                        w-full h-12 rounded-[16px] mt-6
                                        bg-gradient-to-r from-[#00BFFF] to-[#37D5FF]
                                        text-black font-bold tracking-wide text-sm uppercase
                                        transition-all duration-400
                                        hover:shadow-[0_12px_40px_rgba(0,191,255,0.25)]
                                        hover:scale-[1.02]
                                        active:scale-[0.97]
                                        disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {sent ? (
                                                <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16126562 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99621575 L3.03521743,10.4371852 C3.03521743,10.5942826 3.19218622,10.75138 3.50612381,10.75138 L16.6915026,11.5368670 C16.6915026,11.5368670 17.1624089,11.5368670 17.1624089,12.0081591 C17.1624089,12.4794512 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
                                                </svg>
                                            )}

                                            {sending ? "Sending..." : sent ? "Sent!" : "Send Message"}
                                        </span>

                                        {/* button shine */}
                                        <div
                                            className="absolute inset-0 opacity-0
                                            group-hover/btn:opacity-100 transition-opacity duration-500"
                                            style={{
                                                background:
                                                    "linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent)",
                                                animation:
                                                    "premiumShine 2s linear infinite",
                                            }}
                                        />
                                    </button>

                                    {/* status */}
                                    <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                                        <div className="w-2 h-2 rounded-full bg-[#00BFFF] animate-pulse" />

                                        <p className="text-xs text-white/30 font-mono">
                                            Usually replies within a few hours
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeSlideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(24px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes shine {
    0% {
        background-position: 200% center;
    }
    100% {
        background-position: -200% center;
    }
}

                @keyframes headingReveal {
                    from {
                        opacity: 0;
                        transform: translateY(80px) scale(0.92);
                        filter: blur(12px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                        filter: blur(0px);
                    }
                }

                @keyframes lineMove {
                    from {
                        transform: translateX(-120%);
                    }

                    to {
                        transform: translateX(120%);
                    }
                }

                @keyframes cardReveal {
                    from {
                        opacity: 0;
                        transform: translateY(50px) scale(0.96);
                        filter: blur(10px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                        filter: blur(0px);
                    }
                }

                @keyframes premiumShine {
                    from {
                        transform: translateX(-200%);
                    }

                    to {
                        transform: translateX(200%);
                    }
                }

                @keyframes spinGlow {
                    from {
                        transform: rotate(0deg);
                    }

                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes floatCard {
                    0% {
                        transform: translateY(0px);
                    }

                    50% {
                        transform: translateY(-10px);
                    }

                    100% {
                        transform: translateY(0px);
                    }
                }
            `}</style>

            {/* ─── FOOTER ─── */}
            <div className="relative z-10 mt-24 pt-16 pb-8 border-t border-white/10">
                {/* Stock market decorative line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/20 to-transparent" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold tracking-tight text-white">
                            <span className="text-[#00BFFF]">ABHISHEK</span> PANDA
                        </h3>
                        <p className="text-xs text-white/40 leading-relaxed max-w-xs">
                            MBA (Finance) · Business Strategist ·
                            Driving financial strategy through data-driven investment research.
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-white/30">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Available for opportunities
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-[0.3em] text-white/50 font-semibold">Navigation</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: "Home", id: "Home" },
                                { label: "Education", id: "education" },
                                { label: "Strategy", id: "strategy" },
                                { label: "Portfolio", id: "showcase" },
                                { label: "Contact", id: "contact" },
                                { label: "About", path: "/about" },
                            ].map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => {
                                        if (link.id) {
                                            document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
                                        } else if (link.path) {
                                            window.location.href = link.path;
                                        }
                                    }}
                                    className="text-left text-xs text-white/40 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Market Stats */}
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-[0.3em] text-white/50 font-semibold">Market Snapshot</h4>
                        <div className="space-y-2 text-[11px] font-mono">
                            {[
                                { sym: "NIFTY 50", val: "23,487.65", chg: "+0.82%" },
                                { sym: "SENSEX", val: "76,543.21", chg: "+0.67%" },
                                { sym: "USD/INR", val: "83.45", chg: "-0.12%" },
                                { sym: "BTC/USD", val: "$67,234", chg: "+2.15%" },
                            ].map((m) => (
                                <div key={m.sym} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                                    <span className="text-white/50">{m.sym}</span>
                                    <span className="text-white/70">{m.val}</span>
                                    <span className={m.chg.startsWith("+") ? "text-green-400" : "text-red-400"}>{m.chg}</span>
                                </div>
                            ))}
                        </div>
                        {/* Live running chart */}
                        <LiveChart />
                    </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] tracking-[0.15em] text-white/30 font-mono">
                        © {new Date().getFullYear()} ABHISHEK PANDA. All rights reserved.
                    </p>

                </div>
            </div>
        </section>
    );
}
