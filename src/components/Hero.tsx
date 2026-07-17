import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center section-padding relative overflow-hidden">
      {/* Animated floating blobs */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -25, 15, 0], y: [0, 20, -10, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-primary/3 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 15, -15, 0], y: [0, -30, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.p variants={fadeUp} className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-6">
            Java Fullstack Developer
          </motion.p>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-8 break-words">
            <motion.span
              className="text-gradient inline-block"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              SHESHADRI
            </motion.span>
            <br />
            <motion.span
              className="text-gradient inline-block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              BT
            </motion.span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-muted-foreground font-body text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-8">
            Analytical ECE undergraduate with strong Java Full Stack Intern skills.
            Experienced in web application development, database workflows, and problem-solving.
          </motion.p>


          <motion.div variants={fadeUp} className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground font-body break-all">
            {["📍 Bengaluru, India", "📧 sheshadribt089@gmail.com", "📞 +91 80888 65954"].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                whileHover={{ scale: 1.05, color: "hsl(var(--primary))" }}
                className="cursor-default"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Portfolio decorative orbit visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="hidden lg:block relative w-[400px] h-[400px]"
        >
          {/* Rotating dashed ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
          />
          {/* Counter-rotating inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute inset-10 rounded-full border border-primary/20"
          />

          {/* Center monogram - wrapper handles centering, inner handles motion */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="pointer-events-auto w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-2xl shadow-primary/30"
            >
              <span className="text-primary-foreground font-display font-bold text-3xl tracking-tight">
                {"</>"}
              </span>
            </motion.div>
          </div>

          {/* Floating tech badges */}
          {[
            { label: "React.js", top: "4%", left: "44%", delay: 0 },
            { label: "JavaScript", top: "26%", left: "88%", delay: 0.3 },
            { label: "HTML", top: "72%", left: "86%", delay: 0.6 },
            { label: "CSS", top: "92%", left: "40%", delay: 0.9 },
            { label: "Node.js", top: "68%", left: "2%", delay: 1.2 },
          ].map((b) => (
            <motion.div
              key={b.label}
              style={{ top: b.top, left: b.left }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 0.8 + b.delay, duration: 0.5 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: b.delay },
              }}
              whileHover={{ scale: 1.15 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-card border border-border shadow-md text-xs font-display font-semibold tracking-wider uppercase cursor-default text-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              {b.label}
            </motion.div>
          ))}

          {/* Corner stat cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute -bottom-2 -left-8 bg-card border border-border rounded-xl px-4 py-3 shadow-lg"
          >
            <div className="text-2xl font-display font-bold text-primary leading-none">3+</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-body mt-1">Projects</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="absolute -top-4 -right-6 bg-card border border-border rounded-xl px-4 py-3 shadow-lg"
          >
            <div className="text-2xl font-display font-bold text-primary leading-none">2+</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-body mt-1">Internships</div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-4 sm:left-6 md:left-12 lg:left-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-3 text-muted-foreground text-sm font-body"
        >
          <div className="w-8 h-px bg-muted-foreground" />
          Scroll to explore
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
