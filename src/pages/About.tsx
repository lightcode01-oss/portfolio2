import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function About() {
  const navigate = useNavigate();
  const text = "About Myself";

  const [displayedText, setDisplayedText] = useState("");
  // TYPING EFFECT
  useEffect(() => {
    let index = 0;
    let interval: ReturnType<typeof setInterval>;

    const startTyping = () => {
      setDisplayedText("");
      interval = setInterval(() => {
        index++;
        setDisplayedText(text.slice(0, index));

        if (index === text.length) {
          clearInterval(interval);
          setTimeout(() => {
            index = 0;
            startTyping();
          }, 10000);
        }
      }, 120);
    };

    startTyping();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05070A] overflow-hidden text-white px-4 sm:px-6 py-10">
      {/* Animated background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00BFFF]/5 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl opacity-20" />
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,191,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,191,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* BACK BUTTON */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate(-1)}
        className="
          fixed
          top-5
          left-5
          z-50
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          border
          border-white/15
          bg-white/8
          backdrop-blur-xl
          hover:bg-white/15
          hover:border-white/30
          transition-all
          duration-300
          shadow-lg
        "
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Back</span>
      </motion.button>

      {/* MAIN CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen gap-8">

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center"
        >
          <div
            className="
              w-[200px]
              sm:w-[280px]
              md:w-[320px]
              h-[200px]
              sm:h-[280px]
              md:h-[320px]
              rounded-2xl
              overflow-hidden
              border
              border-[#00BFFF]/20
              bg-gradient-to-br from-[#07111F] to-[#0a1525]
              flex items-center justify-center
              shadow-[0_20px_60px_rgba(0,191,255,0.1)]
              hover:border-[#00BFFF]/40
              transition-all
              duration-300
            "
          >
            <img
              src="/scroll-animation/ezgif-frame-100.png"
              alt="Abhishek Panda"
              className="w-full h-full object-cover"
            />
          </div>

          {/* DIVIDER LINE */}
          <div
            className="
              mt-6
              h-[1px]
              bg-gradient-to-r
              from-transparent
              via-[#D4AF37]/30
              to-transparent
              w-[90vw]
              sm:w-[400px]
              md:w-[500px]
            "
          />
        </motion.div>

        {/* GLASS BOX CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            w-full
            max-w-4xl
            h-[500px]
            sm:h-[550px]
            md:h-[600px]
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-3xl
            overflow-hidden
            shadow-[0_20px_70px_rgba(0,0,0,0.5)]
            group
          "
        >
          {/* GLASS EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* HEADER SECTION */}
          <div
            className="
              relative
              z-20
              flex
              items-center
              justify-center
              px-6
              py-6
              sm:py-8
              border-b
              border-white/10
              bg-black/30
              backdrop-blur-2xl
            "
          >
            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-extrabold
                tracking-tight
              "
            >
              {displayedText}
              <span className="animate-pulse ml-2">|</span>
            </h1>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div
            className="
              relative
              z-10
              h-[calc(100%-80px)]
              overflow-y-auto
              px-6
              sm:px-10
              md:px-12
              py-8
              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-white/10
              hover:scrollbar-thumb-white/20
            "
          >
            <div
              className="
                text-white/70
                text-sm
                sm:text-base
                leading-8
                tracking-wide
                space-y-6
              "
            >
              <p>
                I'm Completed my MBA with a specialization in Finance, driven by a passion for
                understanding how markets work and how strategic financial decisions shape the business world.
              </p>

              <p>
                My journey into finance began during my Bachelor's in Commerce, where I discovered that I had a natural
                aptitude for quantitative analysis and strategic thinking. What started as academic curiosity quickly
                evolved into a deep professional interest in investment research, portfolio management, and corporate finance.
              </p>

              <p>
                Today, I specialize in financial modeling, data-driven investment analysis, and business strategy.
                I enjoy building complex financial models that help uncover value, assess risk, and guide
                executive decision-making.
              </p>

              <p>
                Throughout my internships at Autoliv Limietd, I've had the
                opportunity to work on Variance Analysis & Reconciliation Analysis, and financial Budgeting & Forecasting —
                experiences that have shaped my understanding of what it takes to drive business growth.
              </p>

              <p>
                I'm particularly interested in the intersection of finance and technology, especially how data
                analytics and AI are transforming investment management and risk assessment.
              </p>

              <p>
                My aim is to step into a leadership role in investment banking
                or corporate strategy, where I can apply my skills to high-impact financial decisions and
                help organizations navigate complex market environments.
              </p>

              <p>
                I know there's still so much to learn, and that's what excites me most about this field.
                Every market movement tells a story, and I want to be someone who can read, interpret,
                and act on those stories.
              </p>

              <p>
                For me, finance is not just a career — it's a lens through which I see and understand
                the world of business, growth, and value creation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* DOWNLOAD BUTTON */}
        <motion.a
          href="/assets/Resume2.0.pdf"
          download="Abhishek_Panda_Resume.pdf"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="
            group
            relative
            overflow-hidden
            inline-flex
            items-center
            justify-center
            gap-3
            px-8
            sm:px-10
            py-3
            sm:py-4
            rounded-2xl
            border
            border-[#D4AF37]/30
            bg-[#D4AF37]/5
            backdrop-blur-xl
            hover:bg-[#D4AF37]/15
            hover:border-[#D4AF37]/60
            transition-all
            duration-300
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
            hover:shadow-[0_15px_50px_rgba(212,175,55,0.1)]
          "
        >
          <div className="flex items-center gap-3">
            <Download size={16} />
            <span className="text-xs tracking-[0.25em] uppercase font-semibold">Download Resume</span>
          </div>
        </motion.a>
      </div>
    </div>
  );
}
