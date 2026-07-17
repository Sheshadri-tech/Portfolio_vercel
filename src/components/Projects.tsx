import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import attendanceImg from "@/assets/project-attendance.jpg";
import healthImg from "@/assets/project-health.jpg";
import pethubImg from "@/assets/project-pethub.jpg";
import robotImg from "@/assets/project-robot.jpg";

const projectGroups = [
  {
    category: "Java Fullstack Projects",
    projects: [
      {
        title: "Real-Time Attendance Monitoring Platform",
        description:
          "Full-stack attendance management system with live marking by teachers, instant WebSocket-based updates for students, JWT authentication, role-based login, and monthly attendance analytics.",
        tags: ["Spring Boot", "Angular", "WebSocket", "JWT", "MySQL"],
        period: "Oct 2025 – Dec 2025",
        image: attendanceImg,
        code: "https://github.com/",
      },
      {
        title: "Health Management System",
        description:
          "Comprehensive health management platform for tracking patient vitals, managing prescriptions, and generating health reports. Includes role-based access for doctors, nurses, and administrators with real-time dashboard analytics.",
        tags: ["Java", "Spring Boot", "React.js", "MySQL", "REST API"],
        period: "Jan 2026 – Mar 2026",
        link: "https://healthmanagementsystem-eyhd.onrender.com",
        image: healthImg,
        code: "https://github.com/",
      },
      {
        title: "Pet-Hub",
        description:
          "Community-driven pet adoption and care platform connecting pet owners with veterinarians, shelters, and pet services. Features pet profile management, appointment scheduling, and a real-time chat system.",
        tags: ["Core Java", "JSP", "Servlets", "JDBC", "HTML", "CSS", "JavaScript"],
        period: "Jan 2026 – Apr 2026",
        link: "https://pet-hub-4tgs.onrender.com",
        image: pethubImg,
        code: "https://github.com/",
      },
    ],
  },
  {
    category: "Hardware Projects",
    projects: [
      {
        title: "Smart AI Multifunctional Robot",
        description:
          "Engineered an AI-powered robot with facial expression detection, weather prediction, and daily routine guidance. Features an AI chatbot with voice recognition to assist users with various tasks.",
        tags: ["Python", "OpenCV", "TensorFlow", "Raspberry Pi", "ESP32"],
        period: "Feb 2025 – Jun 2025",
        image: robotImg,
        code: "https://github.com/",
      },
    ],
  },
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeGroup = projectGroups[activeTab];

  return (
    <section id="projects" className="section-padding border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4">Work</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Projects</h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Work where intent leads the build, and the stack simply makes it possible.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-card border border-border rounded-full shadow-sm max-w-full">
            {projectGroups.map((group, i) => (
              <button
                key={group.category}
                onClick={() => setActiveTab(i)}
                className={`relative px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 text-xs sm:text-sm font-display tracking-wide rounded-full transition-colors whitespace-nowrap ${
                  activeTab === i ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === i && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-primary rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{group.category}</span>
              </button>
            ))}
          </div>
        </div>


        {/* Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <Carousel
              opts={{ align: "start", loop: activeGroup.projects.length > 3 }}
              className="px-8 sm:px-10 md:px-12"
            >
              <CarouselContent className="-ml-4">

                {activeGroup.projects.map((project) => (
                  <CarouselItem
                    key={project.title}
                    className="pl-4 sm:basis-1/2 lg:basis-1/3"
                  >
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-card border border-border rounded-2xl overflow-hidden flex flex-col h-full hover:border-primary/40 hover:shadow-[0_15px_40px_hsl(var(--primary)/0.12)] transition-all"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <img
                          src={project.image}
                          alt={project.title}
                          width={800}
                          height={512}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-start justify-between mb-2 gap-3">
                          <h3 className="text-lg md:text-xl font-display font-semibold text-foreground">
                            {project.title}
                          </h3>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Visit ${project.title}`}
                              className="flex-shrink-0 mt-1"
                            >
                              <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                            </a>
                          )}
                        </div>
                        <p className="text-primary/70 font-display text-xs tracking-wider uppercase mb-3">
                          {project.period}
                        </p>
                        <p className="text-muted-foreground font-body text-sm mb-5 flex-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-display tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {project.code && (
                          <a
                            href={project.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary font-display text-sm font-medium hover:underline mt-auto"
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 bg-card border-border shadow-md" />
              <CarouselNext className="right-0 bg-card border-border shadow-md" />
            </Carousel>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
