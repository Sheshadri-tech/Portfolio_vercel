import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Contact = () => {
  const contactLinks = [
    { icon: Mail, href: "mailto:sheshadribt089@gmail.com", label: "Email", value: "sheshadribt089@gmail.com" },
    { icon: Github, href: "https://github.com/Sheshadri-tech", label: "GitHub", value: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sheshadri-b-t-2099a42a5/", label: "LinkedIn", value: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/_____sheshadri_bt_____/", label: "Instagram", value: "Instagram" },
  ];

  return (
    <section id="contact" className="section-padding border-t border-border">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4"
          >
            Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-bold mb-6"
          >
            REACH ME HERE BY.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground font-body text-lg mb-12 max-w-lg mx-auto"
          >
            Open to opportunities in Java Full Stack Development. Let's connect and build something great.
          </motion.p>

          <TooltipProvider>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12 } },
              }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6"
            >
              {contactLinks.map(({ icon: Icon, href, label, value }) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <motion.button
                      variants={{
                        hidden: { opacity: 0, y: 20, scale: 0.8 },
                        show: { opacity: 1, y: 0, scale: 1 },
                      }}
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -10, 10, 0],
                        boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
                        borderColor: "hsl(var(--primary))",
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (href.startsWith("mailto")) {
                          window.location.href = href;
                        } else {
                          window.open(href, "_blank");
                        }
                      }}
                      className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{value}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </motion.div>
          </TooltipProvider>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 pt-8 border-t border-border origin-left"
        >
          <p className="text-muted-foreground font-body text-sm">
            © 2026 Sheshadri BT. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
