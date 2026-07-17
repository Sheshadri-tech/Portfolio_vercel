import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const cardStyle =
  "bg-card border border-border rounded-lg p-6 flex flex-col flex-1 w-full transition-all duration-300 hover:shadow-xl hover:border-primary/40 cursor-pointer";

const Card3D = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotateX: 15 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: false }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    whileHover={{
      rotateX: -6,
      rotateY: 6,
      scale: 1.04,
      boxShadow: "0 20px 40px hsl(var(--primary) / 0.15)",
      transition: { duration: 0.3 },
    }}
    whileTap={{ scale: 0.98 }}
    style={{ perspective: 800, transformStyle: "preserve-3d" }}
    className={cardStyle}
  >
    {children}
  </motion.div>
);

const sectionHeadingVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const Experience = () => {
  return (
    <section id="experience" className="section-padding border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4">Journey</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold">Experience & Education</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-stretch">
          {/* Experience */}
          <div className="flex flex-col gap-8 h-full">
            <motion.h3
              variants={sectionHeadingVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              className="text-primary font-display font-semibold text-sm tracking-wider uppercase flex items-center gap-2"
            >
              <motion.span
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Briefcase className="w-4 h-4" />
              </motion.span>
              Work Experience
            </motion.h3>

            <Card3D delay={0.1}>
              <p className="text-primary/70 font-display text-xs tracking-wider uppercase mb-2">Jan 2026 – Present</p>
              <h4 className="text-foreground font-display font-semibold text-lg mb-2">Java Full Stack Intern</h4>
              <p className="text-muted-foreground font-body text-sm mb-3">Pentagon Space · Bengaluru</p>
              <p className="text-secondary-foreground font-body text-sm leading-relaxed">
                Hands-on training in Core Java, JDBC, SQL, Spring Boot, HTML, CSS, JavaScript. Working on deployment concepts, real-time project development, and building RESTful APIs.
              </p>
            </Card3D>

            <Card3D delay={0.2}>
              <p className="text-primary/70 font-display text-xs tracking-wider uppercase mb-2">Jan 2025</p>
              <h4 className="text-foreground font-display font-semibold text-lg mb-2">Google Cloud GenAI Intern</h4>
              <p className="text-muted-foreground font-body text-sm mb-3">SmartBridge · Davangere</p>
              <p className="text-secondary-foreground font-body text-sm leading-relaxed">
                Built Generative AI projects with Google Cloud services. Gained hands-on experience with cloud-based AI tools and machine learning workflows.
              </p>
            </Card3D>
          </div>

          {/* Education */}
          <div className="flex flex-col gap-8 h-full">
            <motion.h3
              variants={sectionHeadingVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              className="text-primary font-display font-semibold text-sm tracking-wider uppercase flex items-center gap-2"
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <GraduationCap className="w-4 h-4" />
              </motion.span>
              Education
            </motion.h3>

            <Card3D delay={0.1}>
              <p className="text-primary/70 font-display text-xs tracking-wider uppercase mb-2">2022 – 2026</p>
              <h4 className="text-foreground font-display font-semibold text-lg mb-2">B.E. Electronics & Communication</h4>
              <p className="text-muted-foreground font-body text-sm mb-3">G M Institute of Technology · Davangere</p>
              <p className="text-secondary-foreground font-body text-sm leading-relaxed">
                CGPA: 7.2/10. Studying core electronics alongside software development skills and building a strong foundation in engineering principles.
              </p>
            </Card3D>

            <Card3D delay={0.2}>
              <p className="text-primary/70 font-display text-xs tracking-wider uppercase mb-2">2020 – 2022</p>
              <h4 className="text-foreground font-display font-semibold text-lg mb-2">Pre-University Course (PCMB)</h4>
              <p className="text-muted-foreground font-body text-sm mb-3">Sri GITAM · Davangere</p>
              <p className="text-secondary-foreground font-body text-sm leading-relaxed">
                Scored 79.84%. Completed Physics, Chemistry, Mathematics, and Biology curriculum with a strong academic foundation.
              </p>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
