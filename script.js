document.addEventListener("DOMContentLoaded", () => {
  const RELATION_START = new Date("2024-10-04T00:00:00");

  const loveTimerEl = document.getElementById("loveTimer");
  const nextCountdownEl = document.getElementById("nextCountdown");
  const monthProgressEl = document.getElementById("monthProgress");
  const randomMsgEl = document.getElementById("randomMsg");
  const randomMsgBtn = document.getElementById("randomMsgBtn");
  const kissBtn = document.getElementById("kissBtn");
  const hugBtn = document.getElementById("hugBtn");
  const butterfliesBtn = document.getElementById("butterfliesBtn");
  const gallery = document.getElementById("gallery");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const modalClose = document.getElementById("modalClose");
  const themeToggle = document.getElementById("themeToggle");

  const phrases = [
    "Você é meu motivo favorito para sorrir.",
    "Cada dia com você é meu melhor dia.",
    "Seu abraço é meu lugar seguro.",
    "A gente e o mundo, no mesmo ritmo.",
    "Sorrio só de lembrar de você."
  ];

  // format helpers
  function pad(n){ return String(n).padStart(2,"0"); }

  // update love timer
  function updateLoveTimer(){
    const now = new Date();
    let diff = now - RELATION_START;

    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days * (1000*60*60*24);

    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours * (1000*60*60);

    const minutes = Math.floor(diff / (1000*60));
    diff -= minutes * (1000*60);

    const seconds = Math.floor(diff / 1000);

    loveTimerEl.textContent = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }

  // calculate next monthversary on day 4
  function updateNextCountdown(){
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();

    // candidate is this month day 4
    let candidate = new Date(year, month, 4, 0, 0, 0);

    if (now.getDate() >= 4 && now >= candidate) {
      // move to next month
      candidate = new Date(year, month + 1, 4, 0, 0, 0);
    }

    // previous day 4
    const prev = new Date(candidate.getFullYear(), candidate.getMonth() - 1, 4, 0, 0, 0);

    const diff = candidate - now;
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    nextCountdownEl.textContent = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;

    // progress percent from prev to candidate
    const total = candidate - prev;
    const elapsed = now - prev;
    let percent = Math.round((elapsed / total) * 100);
    if (!isFinite(percent) || percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    monthProgressEl.style.width = percent + "%";
  }

  // random phrase
  randomMsgBtn.addEventListener("click", () => {
    const msg = phrases[Math.floor(Math.random()*phrases.length)];
    randomMsgEl.textContent = msg;
  });

  // floating emojis
  function spawnEmoji(symbol, count = 1){
    for (let i=0;i<count;i++){
      const el = document.createElement("div");
      el.className = "float-emoji";
      el.textContent = symbol;
      el.style.left = (10 + Math.random()*80) + "vw";
      el.style.top = (60 + Math.random()*25) + "vh";
      el.style.fontSize = (14 + Math.random()*20) + "px";
      document.body.appendChild(el);
      setTimeout(()=> el.remove(), 2000 + Math.random()*800);
    }
  }

  kissBtn.addEventListener("click", ()=> spawnEmoji("😘", 3));
  hugBtn.addEventListener("click", ()=> spawnEmoji("🤗", 3));
  butterfliesBtn.addEventListener("click", ()=> spawnEmoji("🦋", 8));

  // gallery modal
  gallery.addEventListener("click", (e)=>{
    const img = e.target.closest("img");
    if (!img) return;
    modalImg.src = img.src;
    modalImg.alt = img.alt || "";
    modalCaption.textContent = img.dataset.caption || "";
    modal.setAttribute("aria-hidden","false");
  });
  modalClose.addEventListener("click", ()=> modal.setAttribute("aria-hidden","true"));
  modal.addEventListener("click", (e)=> {
    if (e.target === modal) modal.setAttribute("aria-hidden","true");
  });

  // theme toggle with persistence
  function applyTheme(saved){
    if (saved === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }
  const savedTheme = localStorage.getItem("vs_theme");
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", ()=>{
    const nowDark = document.body.classList.toggle("dark");
    localStorage.setItem("vs_theme", nowDark ? "dark" : "light");
  });

  // init
  updateLoveTimer();
  updateNextCountdown();
  setInterval(updateLoveTimer, 1000);
  setInterval(updateNextCountdown, 1000);
});
