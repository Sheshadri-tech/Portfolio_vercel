// Portfolio AI chatbot - powered by Lovable AI Gateway
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are "SBT Assistant", a friendly, knowledgeable AI assistant living on Sheshadri B T's portfolio website.
You can answer ANY question on ANY topic — programming, science, math, history, careers, daily life, creative writing, advice, you name it. Be accurate, helpful, and concise (use markdown when useful).

You also know everything about the portfolio owner and should answer questions about him whenever asked:

PORTFOLIO OWNER:
- Name: Sheshadri B T (SBT) — Java Fullstack Developer
- Education: B.E. Electronics and Communication Engineering, G M Institute of Technology, Davangere (graduating 2026)
- Currently: Java Full Stack Intern at Pentagon Space, Bengaluru (Spring Boot, Angular, MySQL).
- Past: Google Cloud GenAI Intern at SmartBridge.
- Certifications: SmartBridge – Google Cloud GenAI (2025); NPTEL – Programming in Java (2026).
- Skills: Java, C, C++, JavaScript, Python, HTML/CSS, Spring Boot, Angular, React.js, REST APIs, MySQL, SQL, Git/GitHub, Google Cloud, JWT, WebSocket, OpenCV, Raspberry Pi.
- Projects:
  1. Modern Healthcare Portal — full-stack healthcare portal with appointments, records, and real-time WebSocket updates.
  2. Health Management System — role-based platform with real-time analytics (Java, Spring Boot, React, MySQL).
  3. Pet-Hub — pet adoption & care platform with profiles, scheduling, real-time chat (React, Node, MongoDB, WebSocket).
- Contact:
  • Email: sheshadribt089@gmail.com
  • LinkedIn: https://www.linkedin.com/in/sheshadri-b-t-2099a42a5/
  • GitHub: https://github.com/Sheshadri-tech
  • Instagram: https://www.instagram.com/_____sheshadri_bt_____/

If you don't know something, say so honestly. Keep replies tight unless the user asks for detail.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { messages } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!res.ok) {
      if (res.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (res.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await res.text();
      return new Response(JSON.stringify({ error: text }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(res.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
