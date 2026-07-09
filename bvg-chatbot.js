(function () {
  const ENDPOINT = window.BVG_CHAT_ENDPOINT || "https://YOUR-WORKER-NAME.YOUR-SUBDOMAIN.workers.dev";
  const STORAGE_KEY = "bvg-chat-history-v1";
  const readyText = "\uBB34\uC5C7\uC744 \uB3C4\uC640\uB4DC\uB9B4\uAE4C\uC694? BVG Aviation \uB178\uC120, \uBCF4\uC720\uAE30\uC7AC, ATO3 \uC124\uC815\uC5D0 \uB300\uD574 \uBB3C\uC5B4\uBCF4\uC138\uC694.";
  const offlineText = "\uC9C0\uAE08\uC740 AI \uC5F0\uACB0\uC774 \uC900\uBE44\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. Cloudflare Worker \uC8FC\uC18C\uB97C \uC5F0\uACB0\uD558\uBA74 \uB2F5\uBCC0\uC774 \uC791\uB3D9\uD569\uB2C8\uB2E4.";

  const quickPrompts = [
    "\uD604\uC7AC \uCDE8\uD56D\uC9C0 \uC54C\uB824\uC918",
    "\uBCF4\uC720\uAE30\uC7AC\uB294 \uBB50\uC57C?",
    "BVG Aviation\uC740 \uC5B4\uB5A4 \uD56D\uACF5\uC0AC\uC57C?",
  ];

  const state = {
    open: false,
    busy: false,
    messages: loadHistory(),
  };

  function loadHistory() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved) && saved.length) return saved.slice(-12);
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
    }
    return [{ role: "assistant", content: readyText }];
  }

  function saveHistory() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages.slice(-12)));
  }

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([key, value]) => {
      if (key === "class") node.className = value;
      else if (key === "text") node.textContent = value;
      else node.setAttribute(key, value);
    });
    (children || []).forEach((child) => node.appendChild(child));
    return node;
  }

  function build() {
    const launcher = el("button", {
      class: "bvg-chat-launcher",
      type: "button",
      "aria-label": "BVG \uACE0\uAC1D\uC13C\uD130 \uCC57\uBD07 \uC5F4\uAE30",
    });
    launcher.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9.4L4 21v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm1 3v7h2v2.1l2.8-2.1H19V7H5Z"/></svg>';

    const close = el("button", { class: "bvg-chat-close", type: "button", "aria-label": "\uB2EB\uAE30", text: "\u00D7" });
    const title = el("div", { class: "bvg-chat-title" }, [
      el("strong", { text: "BVG \uACE0\uAC1D\uC13C\uD130" }),
      el("span", { text: "ATO3 \uAC00\uC0C1 \uD56D\uACF5\uC0AC \uC548\uB0B4" }),
    ]);
    const header = el("div", { class: "bvg-chat-header" }, [title, close]);
    const messages = el("div", { class: "bvg-chat-messages", role: "log", "aria-live": "polite" });
    const quick = el("div", { class: "bvg-chat-quick" });
    quickPrompts.forEach((prompt) => {
      quick.appendChild(el("button", { type: "button", text: prompt, "data-prompt": prompt }));
    });

    const input = el("input", {
      class: "bvg-chat-input",
      name: "message",
      autocomplete: "off",
      placeholder: "\uC9C8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694",
    });
    const send = el("button", { class: "bvg-chat-send", type: "submit", text: "\uC804\uC1A1" });
    const note = el("div", { class: "bvg-chat-note", text: "AI \uB2F5\uBCC0\uC740 BVG Aviation \uC138\uACC4\uAD00\uC744 \uAE30\uBC18\uC73C\uB85C \uC548\uB0B4\uD569\uB2C8\uB2E4." });
    const form = el("form", { class: "bvg-chat-form" }, [input, send, note]);
    const panel = el("section", { class: "bvg-chat-panel", "aria-label": "BVG \uCC57\uBD07" }, [header, messages, quick, form]);

    document.body.appendChild(panel);
    document.body.appendChild(launcher);

    launcher.addEventListener("click", () => setOpen(!state.open));
    close.addEventListener("click", () => setOpen(false));
    quick.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-prompt]");
      if (button) submit(button.dataset.prompt);
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      submit(input.value.trim());
    });

    function setOpen(open) {
      state.open = open;
      panel.classList.toggle("is-open", open);
      launcher.setAttribute("aria-expanded", String(open));
      if (open) input.focus();
    }

    function render() {
      messages.innerHTML = "";
      state.messages.forEach((message) => {
        messages.appendChild(el("div", {
          class: "bvg-chat-message " + (message.role === "user" ? "user" : "bot"),
          text: message.content,
        }));
      });
      input.disabled = state.busy;
      send.disabled = state.busy;
      messages.scrollTop = messages.scrollHeight;
    }

    async function submit(text) {
      if (!text || state.busy) return;
      state.messages.push({ role: "user", content: text });
      input.value = "";
      state.busy = true;
      render();
      saveHistory();

      try {
        if (ENDPOINT.includes("YOUR-WORKER-NAME")) {
          throw new Error("Worker endpoint is not configured.");
        }
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history: state.messages.slice(-8) }),
        });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Chat request failed.");
        state.messages.push({ role: "assistant", content: payload.reply || offlineText });
      } catch (error) {
        state.messages.push({ role: "assistant", content: offlineText });
      } finally {
        state.busy = false;
        render();
        saveHistory();
      }
    }

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
