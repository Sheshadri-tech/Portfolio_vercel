import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, X } from "lucide-react";

type Certification = {
  title: string;
  issuer: string;
  year: string;
  description: string;
  link?: string;
};

const certifications: Certification[] = [
  {
    title: "Google Cloud GenAI",
    issuer: "SmartBridge",
    year: "2025",
    description:
      "Hands-on certification in Generative AI with Google Cloud — built GenAI projects using Vertex AI, Gemini APIs, and cloud-native services.",
    link: "https://www.linkedin.com/posts/activity-7390451707459252224-Zxlb?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEmmwikBeJeZolgXgPmchMoVFJy92uX5ZTk",
  },
  {
    title: "Programming in Java",
    issuer: "NPTEL",
    year: "2026",
    description:
      "In-depth NPTEL certification covering core Java, OOP principles, collections, multithreading, and JDBC — completed with proctored exam.",
    link: "https://www.linkedin.com/posts/share-7462157019370790912-2BiR?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEmmwikBeJeZolgXgPmchMoVFJy92uX5ZTk",
  },
  {
    title: "Internship Completion Certificate",
    issuer: "Pentagon Space",
    year: "2026",
    description:
      "Completed a professional internship at Pentagon Space, gaining hands-on experience in software development, team collaboration, and real-world project delivery.",
    link: "https://www.linkedin.com/posts/share-7455566589887897600-BBQT?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEmmwikBeJeZolgXgPmchMoVFJy92uX5ZTk",
  },
];

const Certifications = () => {
  const [active, setActive] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="section-padding border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4"
          >
            Certifications
          </motion.p>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Credentials & achievements.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {certifications.map((cert, i) => (
            <motion.button
              key={cert.title}
              type="button"
              onClick={() => setActive(cert)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-left bg-card border border-border rounded-lg p-6 flex flex-col flex-1 w-full transition-all duration-300 hover:shadow-xl hover:border-primary/40"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs font-display tracking-widest uppercase text-muted-foreground">
                  {cert.year}
                </span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-1">{cert.title}</h3>
              <p className="text-sm text-muted-foreground font-body mb-4">{cert.issuer}</p>
              <span className="mt-auto inline-flex items-center gap-2 text-sm text-primary font-display">
                View details <ExternalLink className="w-4 h-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-card border border-border rounded-xl p-8 max-w-lg w-full shadow-2xl"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold">{active.title}</h3>
                <p className="text-sm text-muted-foreground font-body">
                  {active.issuer} · {active.year}
                </p>
              </div>
            </div>
            <p className="text-secondary-foreground font-body leading-relaxed mb-6">
              {active.description}
            </p>
            {active.link && (
              <a
                href={active.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-display text-primary hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                View credential on LinkedIn
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Certifications;
