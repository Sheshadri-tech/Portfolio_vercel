import { motion } from "framer-motion";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const skillCategories = [
  {
    category: "Languages",
    icon: "💻",
    items: [
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    ],
  },
  {
    category: "Frameworks",
    icon: "⚙️",
    items: [
      { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "REST APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    ],
  },
  {
    category: "Databases & Tools",
    icon: "🗄️",
    items: [
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    ],
  },
  {
    category: "Cloud & AI",
    icon: "☁️",
    items: [
      { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Gen AI", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f46e5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 3L9.5 8.5L4 9L8 13L6.5 18.5L12 15.5L17.5 18.5L16 13L20 9L14.5 8.5L12 3Z'/%3E%3C/svg%3E" },
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "JWT Auth", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg" },
      { name: "WebSocket", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
      { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
      { name: "Raspberry Pi", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
    ],
  },
];

const iconContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const iconItem = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 15 } },
};

const SkillIcon = ({ name, icon }: { name: string; icon: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          variants={iconItem}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{
            scale: 1.2,
            y: -8,
            rotate: [0, -5, 5, 0],
            transition: { type: "spring", stiffness: 300, damping: 15 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-secondary/50 border border-border flex items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
            <img
              src={icon}
              alt={name}
              className="w-8 h-8 md:w-9 md:h-9 object-contain"
              loading="lazy"
            />
          </div>
          <span
            className={`text-xs font-body transition-all duration-200 ${
              isHovered ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {name}
          </span>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="top" className="font-display text-sm">
        {name}
      </TooltipContent>
    </Tooltip>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const Skills = () => {
  return (
    <TooltipProvider delayDuration={100}>
      <section id="skills" className="section-padding border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="text-primary font-display text-sm uppercase mb-4"
            >
              Expertise
            </motion.p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Skills & Technologies</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((group, i) => (
              <motion.div
                key={group.category}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 40px hsl(var(--primary) / 0.1)",
                  borderColor: "hsl(var(--primary) / 0.3)",
                }}
                style={{ perspective: 800 }}
                className="bg-card p-6 rounded-xl border border-border transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.span
                    className="text-2xl"
                    whileHover={{ rotate: 20, scale: 1.2 }}
                  >
                    {group.icon}
                  </motion.span>
                  <h3 className="text-foreground font-display font-bold text-lg">
                    {group.category}
                  </h3>
                </div>
                <motion.div
                  variants={iconContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false }}
                  className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-5 md:gap-6 justify-items-center"
                >
                  {group.items.map((skill) => (
                    <SkillIcon key={skill.name} name={skill.name} icon={skill.icon} />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default Skills;
