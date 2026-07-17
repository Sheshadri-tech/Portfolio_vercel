import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, X, Download } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Certifications", href: "#certifications" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/sheshadri-b-t-2099a42a5/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/_____sheshadri_bt_____/", label: "Instagram" },
  { icon: Github, href: "https://github.com/Sheshadri-tech", label: "GitHub" },
  { icon: Mail, href: "mailto:sheshadribt089@gmail.com", label: "Email" },
];

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.4 },
  }),
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--nav)/0.9)] backdrop-blur-xl border-b border-border"
    >
      <div className="flex items-center justify-between px-3 md:px-6 lg:px-12 h-16">
        {/* Left: Logo + Nav Links */}
        <div className="flex items-center gap-8">
          <motion.a
            href="#"
            className="flex items-center gap-2 font-display font-bold text-lg text-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={profileImg}
              alt="Sheshadri BT"
              onClick={(e) => {
                e.preventDefault();
                setPhotoOpen(true);
              }}
              className="w-8 h-8 rounded-full object-cover border border-primary/30 cursor-pointer hover:ring-2 hover:ring-primary/50 transition"
            />
            SBT<span className="text-primary">.</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="show"
                whileHover={{ y: -2, color: "hsl(var(--foreground))" }}
                className="text-sm font-display text-muted-foreground transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="hidden md:flex items-center gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <div key={label} className="relative group">
              <motion.button
                onClick={() => {
                  if (href.startsWith("mailto")) {
                    window.location.href = href;
                  } else {
                    window.open(href, "_blank");
                  }
                }}
                whileHover={{ scale: 1.2, color: "hsl(var(--primary))" }}
                whileTap={{ scale: 0.9 }}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </motion.button>
              <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded-md bg-popover text-popover-foreground text-xs font-display border border-border shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          <div className="space-y-1.5">
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-foreground"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-foreground"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-foreground"
            />
          </div>
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background border-b border-border px-6 pb-6 space-y-4 overflow-hidden"
        >
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="block text-sm font-display text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
          <div className="flex gap-4 pt-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <button
                key={label}
                onClick={() => {
                  if (href.startsWith("mailto")) {
                    window.location.href = href;
                  } else {
                    window.open(href, "_blank");
                  }
                }}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {photoOpen && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setPhotoOpen(false)}
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setPhotoOpen(false)}
            className="absolute top-6 right-6 text-foreground hover:text-primary transition"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-5"
          >
            <img
              src={profileImg}
              alt="Sheshadri BT"
              className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-2xl shadow-2xl border border-primary/30 object-cover"
            />
            <a
              href={profileImg}
              download="Sheshadri_BT_Profile.jpg"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition shadow-md"
            >
              <Download className="w-4 h-4" />
              Download Photo
            </a>
          </motion.div>
        </motion.div>,
        document.body
      )}
    </motion.nav>
  );
};

export default Navbar;
