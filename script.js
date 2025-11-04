document.addEventListener("DOMContentLoaded", () => {
  const START = new Date("2024-10-04T00:00:00");

  const loveTimerEl = document.getElementById("loveTimer");
  const nextCountdownEl = document.getElementById("nextCountdown");
  const monthProgressEl = document.getElementById("monthProgress");
  const randomMsgEl = document.getElementById("randomMsg");
  const randomMsgBtn = document.getElementById("randomMsgBtn");
  const kissBtn = document.getElementById("kissBtn");
  const hugBtn = document.getElementById("hugBtn");
  const heartsBtn = document.getElementById("heartsBtn");
  const gallery = document.getElementById("gallery");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const modalClose = document.getElementById("modalClose");
  const themeToggle = document.getElementById("themeToggle");

  const phrases = [
    "Você é meu motivo favorito para sorrir.",
    "Cada dia com você é um presente.",
    "Seu abraço é meu lugar seguro.",
    "A gente e o mundo, no mesmo ritmo.",
    "Sorrio só de lembrar de você.",
    "Meu amor cresce um pouco mais a cada dia.",
    "Nosso tempo juntos é meu lugar favorito."
  ];

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  // Tempo total juntos (em dias corridos + relógio)
  function updateLoveTimer() {
    const now = new Date();
    const diff = now - START;

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    loveTimerEl.textContent = `${totalDays} dias juntos • ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  // Próximo dia 4
  function nextDay4Reference(now) {
    let year = now.getFullYear();
    let month = now.getMonth();
    let candidate = new Date(year, month, 4, 0, 0, 0);
    if (now.getDate() >= 4) {
      candidate = new Date(year, month + 1, 4, 0, 0, 0);
    }
    return candidate;
  }

  // Contagem até o próximo dia 4
  function updateNextCountdown() {
    const now = new Date();
    const candidate = nextDay4Reference(now);
    const diff = candidate - now;

    if (diff <= 0) {
      nextCountdownEl.textContent = "Hoje é dia 4 💘 Feliz mêsversário!";
      monthProgressEl.style.width = "100%";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    nextCountdownEl.textContent = `Próximo dia 4 em ${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;

    const prev = new Date(candidate.getFullYear(), candidate.getMonth() - 1, 4, 0, 0, 0);
    const total = candidate - prev;
    const elapsed = now - prev;
    let percent = Math.round((elapsed / total) * 100);
    if (!isFinite(percent) || percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    monthProgressEl.style.width = percent + "%";
  }

  // Mensagens aleatórias
  randomMsgBtn.addEventListener("click", () => {
    randomMsgEl.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  });

  // Efeitos flutuantes
  function spawnFloating(symbol, count = 1) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "float-thing";
      el.textContent = symbol;
      el.style.left = (10 + Math.random() * 80) + "vw";
      el.style.top = (65 + Math.random() * 20) + "vh";
      el.style.fontSize = (16 + Math.random() * 18) + "px";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2200 + Math.random() * 900);
    }
  }

  kissBtn.addEventListener("click", () => spawnFloating("😘", 3));
  hugBtn.addEventListener("click", () => spawnFloating("🤗", 3));
  heartsBtn.addEventListener("click", () => spawnFloating("💘", 15));

  // Galeria de fotos
  gallery.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;
    modalImg.src = img.src;
    modalCaption.textContent = img.dataset.caption || "";
    modal.setAttribute("aria-hidden", "false");
  });

  modalClose.addEventListener("click", () => modal.setAttribute("aria-hidden", "true"));
  modal.addEventListener("click", (ev) => {
    if (ev.target === modal) modal.setAttribute("aria-hidden", "true");
  });

  // Tema escuro/claro
  function applyTheme(saved) {
    if (saved === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }

  const saved = localStorage.getItem("vs_theme");
  applyTheme(saved);

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("vs_theme", isDark ? "dark" : "light");
  });

  // Inicialização
  updateLoveTimer();
  updateNextCountdown();
  setInterval(updateLoveTimer, 1000);
  setInterval(updateNextCountdown, 1000);
});
