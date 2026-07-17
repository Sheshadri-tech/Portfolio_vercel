import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import resumePreview from "@/assets/resume-preview-1.jpg";

const letterReveal = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.4 },
  }),
};

const About = () => {
  const heading = "Building robust full-stack solutions.";

  return (
    <section id="about" className="section-padding border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4"
          >
            About
          </motion.p>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            {heading.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : undefined }}
              >
                {char}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          <motion.p
            initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-secondary-foreground font-body leading-relaxed"
          >
            I'm a B.E. Electronics and Communication Engineering student at G M Institute of Technology, Davangere (graduating 2026).
            Previously interned as Java FullStack Development at Pentagon Space, Bangalore, where I worked on real-time project development with Spring Boot, Angular, and MySQL.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-muted-foreground font-body leading-relaxed"
          >
            Previously interned at SmartBridge as a Google Cloud GenAI Intern, building Generative AI projects with Google Cloud services.
            I hold certifications from SmartBridge – Google Cloud GenAI (2025) and NPTEL – Programming in Java (2026).
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative bg-card border border-border rounded-lg p-5 sm:p-6 flex flex-wrap items-center gap-4 hover:border-primary/40 hover:shadow-lg transition-all"
          >
            <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-foreground">Resume</p>
              <p className="text-xs text-muted-foreground font-body">
                Java Full Stack Developer · Updated 2026
              </p>
            </div>
            <div className="relative group/view">
              <button
                type="button"
                onClick={() => window.open("/resume.pdf", "_blank", "noopener,noreferrer")}
                className="inline-flex items-center gap-2 text-sm font-display text-primary hover:text-primary/80 transition-colors"
                aria-label="View resume"
              >
                <FileText className="w-4 h-4" /> View
              </button>
              <div className="pointer-events-none absolute right-0 top-full mt-3 w-[min(420px,90vw)] max-h-[520px] opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 z-30 rounded-lg overflow-hidden border border-border shadow-2xl bg-background">
                <img src={resumePreview} alt="Resume preview" className="w-full h-auto block" />
              </div>
            </div>
            <a
              href="/resume.pdf"
              download="Sheshadri_Resume.pdf"
              className="inline-flex items-center gap-2 text-sm font-display text-primary hover:text-primary/80 transition-colors"
              aria-label="Download resume"
            >
              <Download className="w-4 h-4" /> Download
            </a>


          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
