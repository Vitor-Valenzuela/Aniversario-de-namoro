document.addEventListener("DOMContentLoaded", () => {
  // constantes
  const START = new Date("2024-10-04T00:00:00");
  const REUNION = new Date("2026-03-05T00:00:00"); // chegada prevista

  // elementos
  const totalDaysEl = document.getElementById("totalDays");
  const detailedTimeEl = document.getElementById("detailedTime");
  const nextCountdownEl = document.getElementById("nextCountdown");
  const monthProgressEl = document.getElementById("monthProgress");
  const reunionCountdownEl = document.getElementById("reunionCountdown");
  const dailyMessageEl = document.getElementById("dailyMessage");
  const newDailyBtn = document.getElementById("newDailyBtn");
  const toggleHeartsBtn = document.getElementById("toggleHearts");
  const randomMsgBtn = document.getElementById("randomMsgBtn");
  const randomMsgEl = document.getElementById("randomMsg");
  const kissBtn = document.getElementById("kissBtn");
  const hugBtn = document.getElementById("hugBtn");
  const gallery = document.getElementById("gallery");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const modalClose = document.getElementById("modalClose");
  const themeToggle = document.getElementById("themeToggle");
  const showQRBtn = document.getElementById("showQR");
  const qrcodeEl = document.getElementById("qrcode");
  const spotifyEmbed = document.getElementById("spotifyEmbed");

  // frases e mensagens
  const phrases = [
    "Você é meu motivo favorito para sorrir.",
    "Cada dia com você é um presente.",
    "Seu abraço é meu lugar seguro.",
    "A gente e o mundo, no mesmo ritmo.",
    "Sorrio só de lembrar de você.",
    "Meu amor cresce um pouco mais a cada dia.",
    "Nosso tempo juntos é meu lugar favorito."
  ];

  const dailyPhrases = [
    "Bom dia, meu amor. Que seu dia seja doce.",
    "Hoje penso em você sempre que respiro.",
    "Sorria, você é a minha melhor lembrança.",
    "Pequenos gestos, grande amor. Tenha um ótimo dia.",
    "Que hoje sobre amor e abraços para nós."
  ];

  // helpers
  function pad(n){ return String(n).padStart(2,"0"); }

  function computeYMDHMS(from, to){
    let y = to.getFullYear() - from.getFullYear();
    let m = to.getMonth() - from.getMonth();
    let d = to.getDate() - from.getDate();
    let hh = to.getHours() - from.getHours();
    let mm = to.getMinutes() - from.getMinutes();
    let ss = to.getSeconds() - from.getSeconds();

    if (ss < 0){ ss += 60; mm -= 1; }
    if (mm < 0){ mm += 60; hh -= 1; }
    if (hh < 0){ hh += 24; d -= 1; }

    if (d < 0){
      const prevMonthDays = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
      d += prevMonthDays;
      m -= 1;
    }
    if (m < 0){ m += 12; y -= 1; }

    return { years: y, months: m, days: d, hours: hh, minutes: mm, seconds: ss };
  }

  // timers
  function updateTotalTime(){
    const now = new Date();
    const diff = now - START;
    const totalDays = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    totalDaysEl.textContent = `${totalDays} dias juntos`;
    const t = computeYMDHMS(START, now);
    detailedTimeEl.textContent = `${t.years} anos • ${t.months} meses • ${t.days} dias • ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  function nextDay4Reference(now){
    let year = now.getFullYear();
    let month = now.getMonth();
    let candidate = new Date(year, month, 4, 0,0,0);
    if (now.getDate() >= 4 && now >= candidate){
      candidate = new Date(year, month + 1, 4, 0,0,0);
    }
    return candidate;
  }

  function updateNextCountdown(){
    const now = new Date();
    const candidate = nextDay4Reference(now);
    const diff = candidate - now;
    if (diff <= 0){
      nextCountdownEl.textContent = "Hoje é dia 4 💘 Feliz mêsversário!";
      monthProgressEl.style.width = "100%";
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    nextCountdownEl.textContent = `Próximo dia 4 em ${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;

    const prev = new Date(candidate.getFullYear(), candidate.getMonth() - 1, 4, 0,0,0);
    const total = candidate - prev;
    const elapsed = now - prev;
    let percent = Math.round((elapsed / total) * 100);
    if (!isFinite(percent) || percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    monthProgressEl.style.width = percent + "%";
  }

  function updateReunionCountdown(){
    const now = new Date();
    const diff = REUNION - now;
    if (diff <= 0){
      reunionCountdownEl.textContent = "Ela chegou 💗";
      spawnManyHearts(30, 3000);
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    reunionCountdownEl.textContent = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }

  // daily message
  function getTodayKey(){
    const d = new Date();
    return d.getFullYear() + "-" + pad(d.getMonth()+1) + "-" + pad(d.getDate());
  }

  function setDailyMessage(forceNew = false){
    const key = "vs_daily_msg";
    const lastKey = localStorage.getItem(key + "_date");
    const storedIndex = parseInt(localStorage.getItem(key + "_idx") || "-1", 10);

    if (!forceNew && lastKey === getTodayKey() && storedIndex >= 0){
      dailyMessageEl.textContent = dailyPhrases[storedIndex % dailyPhrases.length];
      return;
    }

    let idx = Math.floor(Math.random() * dailyPhrases.length);
    if (storedIndex >= 0 && dailyPhrases.length > 1){
      while (idx === storedIndex) idx = Math.floor(Math.random() * dailyPhrases.length);
    }

    localStorage.setItem(key + "_idx", String(idx));
    localStorage.setItem(key + "_date", getTodayKey());
    dailyMessageEl.textContent = dailyPhrases[idx];
  }

  newDailyBtn.addEventListener("click", ()=> setDailyMessage(true));

  // random messages and actions
  randomMsgBtn.addEventListener("click", ()=> {
    randomMsgEl.textContent = phrases[Math.floor(Math.random()*phrases.length)];
  });

  function spawnFloating(symbol, count=1){
    for (let i=0;i<count;i++){
      const el = document.createElement("div");
      el.className = "float-thing";
      el.textContent = symbol;
      el.style.left = (10 + Math.random()*80) + "vw";
      el.style.top = (65 + Math.random()*20) + "vh";
      el.style.fontSize = (14 + Math.random()*18) + "px";
      document.body.appendChild(el);
      setTimeout(()=> el.remove(), 2200 + Math.random()*900);
    }
  }

  document.getElementById("randomMsg").textContent = phrases[0];
  document.getElementById("randomMsgBtn").addEventListener("click", ()=> randomMsgEl.textContent = phrases[Math.floor(Math.random()*phrases.length)]);

  document.getElementById("kissBtn").addEventListener("click", ()=> spawnFloating("😘", 3));
  document.getElementById("hugBtn").addEventListener("click", ()=> spawnFloating("🤗", 3));

  // hearts toggle
  let heartsInterval = null;
  function spawnManyHearts(count=5, lifespan=2000){
    for (let i=0;i<count;i++) spawnFloating("💘",1);
  }
  toggleHeartsBtn.addEventListener("click", ()=>{
    if (heartsInterval){
      clearInterval(heartsInterval);
      heartsInterval = null;
      toggleHeartsBtn.textContent = "💞 Amor sem fim";
    } else {
      heartsInterval = setInterval(()=> spawnFloating("💘", 1), 400);
      toggleHeartsBtn.textContent = "⏸ Parar amor";
    }
  });

  // gallery modal
  gallery.addEventListener("click", (e)=>{
    const img = e.target.closest("img");
    if(!img) return;
    modalImg.src = img.src;
    modalCaption.textContent = img.dataset.caption || "";
    modal.setAttribute("aria-hidden","false");
  });
  modalClose.addEventListener("click", ()=> modal.setAttribute("aria-hidden","true"));
  modal.addEventListener("click", (ev)=> { if (ev.target === modal) modal.setAttribute("aria-hidden","true"); });

  // theme auto/manual
  function applyTheme(saved){
    if (saved === "dark"){ document.body.classList.add("dark"); return;}
    if (saved === "light"){ document.body.classList.remove("dark"); return;}
    const h = new Date().getHours();
    if (h >= 18 || h < 6) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }
  const savedTheme = localStorage.getItem("vs_theme");
  applyTheme(savedTheme);
  themeToggle.addEventListener("click", ()=>{
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("vs_theme", isDark ? "dark" : "light");
  });

  // QR Code (Spotify)
  const spotifyLink = "https://open.spotify.com/track/3KYlOzxN5xO7eEauO1VF06?si=d28c0866cc564af4";
  function renderQR(){
    qrcodeEl.innerHTML = "";
    const isDark = document.body.classList.contains("dark");
    new QRCode(qrcodeEl, {
      text: spotifyLink,
      width: 144,
      height: 144,
      colorDark: isDark ? "#ffd7eb" : "#e91e63",
      colorLight: isDark ? "#151226" : "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }
  renderQR();
  showQRBtn.addEventListener("click", ()=> { renderQR(); qrcodeEl.scrollIntoView({behavior:"smooth",block:"center"}); });

  // rerender QR when theme changes
  const observer = new MutationObserver(()=> renderQR());
  observer.observe(document.body, {attributes:true,attributeFilter:['class']});

  // init
  function init(){
    updateTotalTime();
    updateNextCountdown();
    updateReunionCountdown();
    setDailyMessage(false);

    setInterval(()=> {
      const el = detailedTimeEl;
      el.style.transform = "scale(1.02)";
      setTimeout(()=> el.style.transform = "scale(1)", 300);
    }, 3000);

    setInterval(updateTotalTime, 1000);
    setInterval(updateNextCountdown, 1000);
    setInterval(updateReunionCountdown, 1000);
  }
  init();
});
