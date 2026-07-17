import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Send, X } from "lucide-react";
import chatbotLogo from "@/assets/chatbot-logo.png";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

type Msg = { role: "user" | "assistant"; content: string };

const INITIAL: Msg = {
  role: "assistant",
  content:
    "Hi! I'm SBT Assistant 👋 — your personal AI guide. Ask me anything about Sheshadri's portfolio, projects, skills, and experience, or any general topic you're curious about.",
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([INITIAL]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragConstraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const resetChat = () => {
    setMessages([INITIAL]);
    setInput("");
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/portfolio-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "");
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content:
              res.status === 429
                ? "I'm getting a lot of requests right now. Please try again in a moment."
                : res.status === 402
                ? "AI credits are exhausted. Please contact the site owner."
                : `Sorry, something went wrong. ${errText || ""}`.trim(),
          };
          return copy;
        });
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          const l = line.trim();
          if (!l.startsWith("data:")) continue;
          const data = l.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content || "";
            if (delta) {
              acc += delta;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: acc };
                return copy;
              });
            }
          } catch {
            // ignore parse errors on partial chunks
          }
        }
      }
    } catch (e) {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Network error. Please check your connection and try again.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Full-viewport drag boundary (non-blocking) */}
      <div
        ref={dragConstraintsRef}
        className="fixed inset-0 pointer-events-none z-40"
        aria-hidden="true"
      />

      {/* Draggable floating launcher + window group */}
      <motion.div
        drag
        dragConstraints={dragConstraintsRef}
        dragMomentum={false}
        dragElastic={0.05}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-20 right-6 z-50 flex flex-col items-end gap-3 cursor-grab active:cursor-grabbing"
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onPointerDownCapture={(e) => e.stopPropagation()}
              className="w-[calc(100vw-3rem)] sm:w-96 h-[32rem] max-h-[80vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden cursor-auto"
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/40">
                <img src={chatbotLogo} alt="" width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-display font-bold text-sm text-foreground leading-tight">SBT Assistant</p>
                  <p className="text-xs text-muted-foreground">Your AI guide — drag me anywhere</p>
                </div>
                <button
                  onClick={resetChat}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-secondary"
                  aria-label="Refresh chat"
                  title="Clear chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-secondary"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm font-body whitespace-pre-wrap leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-secondary text-secondary-foreground rounded-bl-sm"
                      }`}
                    >
                      {m.content || (loading && i === messages.length - 1 ? "…" : "")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="border-t border-border p-3 flex items-center gap-2 bg-background"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  disabled={loading}
                  className="flex-1 bg-secondary/50 border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 hover:scale-105 transition-transform"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 rounded-full bg-primary shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] flex items-center justify-center border-2 border-primary-foreground/20"
          aria-label={open ? "Close chatbot" : "Open chatbot"}
        >
          {open ? (
            <X className="w-6 h-6 text-primary-foreground" />
          ) : (
            <img src={chatbotLogo} alt="AI Assistant" width={40} height={40} className="w-10 h-10 rounded-full object-cover pointer-events-none" />
          )}
        </motion.button>
      </motion.div>
    </>
  );
};

export default Chatbot;
