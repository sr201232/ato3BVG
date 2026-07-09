const ALLOWED_ORIGINS = new Set([
  "https://bvg.kr",
  "http://bvg.kr",
  "https://sr201232.github.io",
]);

const BVG_SYSTEM_PROMPT = [
  "You are the official customer support chatbot for BVG Aviation, a fictional airline in the ATO3 game.",
  "Answer in Korean by default. Keep answers concise, friendly, and in-universe.",
  "BVG Aviation is based in Berlin.",
  "The BVG Aviation slogan is: BVG\\ub294 \\ud589\\ubcf5\\uc744 \\uc2e3\\uace0.",
  "Current destinations in Korean: \\uad11\\uc800\\uc6b0, \\ub274\\uc695, \\ub3c4\\ucfc4, \\ub7f0\\ub358, \\ub85c\\ub9c8, \\ub9c8\\ub4dc\\ub9ac\\ub4dc, \\ubaa8\\uc2a4\\ud06c\\ubc14, \\ubc14\\ub974\\uc140\\ub85c\\ub098, \\uc0cc\\ud504\\ub780\\uc2dc\\uc2a4\\ucf54(\\ub274\\uc695 \\uacbd\\uc720), \\uc11c\\uc6b8, \\uc2dc\\uce74\\uace0, \\uc554\\uc2a4\\ud14c\\ub974\\ub2f4, \\uc774\\uc2a4\\ud0c4\\ubd88, \\uce74\\uc774\\ub85c, \\ucfe0\\uc6e8\\uc774\\ud2b8, \\ud30c\\ub9ac, \\ud64d\\ucf69.",
  "Current fleet: Boeing 707-320B 6 aircraft, Boeing 727-100 6 aircraft.",
  "If the user asks for real ticketing, payment, refunds, or real-world flight operation, clearly say this is an ATO3 fictional airline site.",
].join("\\n");

function corsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://bvg.kr";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

async function fetchGroqWithFallback(env, messages) {
  const preferredModels = env.GROQ_MODEL
    ? [env.GROQ_MODEL, "llama-3.3-70b-versatile", "llama-3.1-8b-instant"]
    : ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"];
  const models = [...new Set(preferredModels)];
  let lastResult = null;

  for (const model of models) {
    const upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.4,
        max_tokens: 500,
      }),
    });

    const payload = await upstream.json().catch(() => ({}));
    lastResult = { model, upstream, payload };

    if (upstream.ok) {
      return lastResult;
    }
  }

  return lastResult;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "POST only" }, 405, origin);
    }

    if (!env.GROQ_API_KEY) {
      return jsonResponse({ error: "GROQ_API_KEY is not configured" }, 500, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      return jsonResponse({ error: "Invalid JSON" }, 400, origin);
    }

    const message = String(body.message || "").trim();
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];

    if (!message) {
      return jsonResponse({ error: "Message is required" }, 400, origin);
    }

    if (message.length > 1000) {
      return jsonResponse({ error: "Message is too long" }, 400, origin);
    }

    const messages = [
      { role: "system", content: BVG_SYSTEM_PROMPT },
      ...history
        .filter((item) => item && (item.role === "user" || item.role === "assistant"))
        .map((item) => ({
          role: item.role,
          content: String(item.content || "").slice(0, 1000),
        })),
      { role: "user", content: message },
    ];

    const { model, upstream, payload } = await fetchGroqWithFallback(env, messages);

    if (!upstream.ok) {
      return jsonResponse({
        error: payload.error?.message || `Groq API request failed with ${model}`,
      }, upstream.status, origin);
    }

    return jsonResponse({
      reply: payload.choices?.[0]?.message?.content || "답변을 만들지 못했습니다.",
      model,
    }, 200, origin);
  },
};
