// ================================
// CONFIGURAÇÕES INICIAIS
// ================================
const startDate = new Date("2024-10-04T00:00:00");

const messages = [
  "Você é meu motivo favorito pra sorrir. 😊",
  "Amar você é viver no paraíso. 🌈",
  "Você é meu lugar seguro. 🏡",
  "Cada segundo com você é mágico. ✨",
  "Minha felicidade tem seu nome. 💖",
  "Te amo mais que tudo nesse mundo. 🌍"
];

const timerEl = document.getElementById("timer");
const countdownEl = document.getElementById("countdown");
const progressEl = document.getElementById("progress");
const randomMessageEl = document.getElementById("randomMessage");
const mainHeart = document.getElementById("mainHeart");
const secretMessageBtn = document.getElementById("secretMessageBtn");
const secretMessage = document.getElementById("secretMessage");
const themeBtn = document.getElementById("toggleThemeBtn");

// ================================
// FUNÇÕES DE TEMPO
// ================================
function updateTimer() {
  const now = new Date();
  const diff = now - startDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  timerEl.innerHTML = `
    <span>${days}</span><span class="label">d</span> 
    <span>${hours}</span><span class="label">h</span> 
    <span>${minutes}</span><span class="label">m</span> 
    <span>${seconds}</span><span class="label">s</span> 
    de puro amor 💞
  `;
}

function updateCountdown() {
  const now = new Date();
  let next = new Date(now.getFullYear(), now.getMonth(), 4);
  if (now.getDate() >= 4) next = new Date(now.getFullYear(), now.getMonth() + 1, 4);

  const diff = next - now;
  const totalPeriod = next - new Date(now.getFullYear(), now.getMonth() - 1, 4);
  const elapsed = now - new Date(now.getFullYear(), now.getMonth() - 1, 4);
  const progressPercent = Math.min(100, Math.max(0, (elapsed / totalPeriod) * 100));

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.innerHTML = `
    <span>${days}</span><span class="label">d</span> 
    <span>${hours}</span><span class="label">h</span> 
    <span>${minutes}</span><span class="label">m</span> 
    <span>${seconds}</span><span class="label">s</span> 
    para nosso mêsversário 💘
  `;

  progressEl.style.width = progressPercent + "%";
}

// ================================
// MENSAGENS E EFEITOS
// ================================
function showRandomMessage() {
  const msg = messages[Math.floor(Math.random() * messages.length)];
  randomMessageEl.textContent = msg;
  randomMessageEl.classList.add("pulse");
  setTimeout(() => randomMessageEl.classList.remove("pulse"), 700);
}

function spawnEmoji(emoji, className) {
  const elem = document.createElement("div");
  elem.className = className;
  elem.textContent = emoji;
  elem.style.left = Math.random() * 100 + "vw";
  elem.style.animationDuration = 1.5 + Math.random() + "s";
  document.body.appendChild(elem);
  setTimeout(() => elem.remove(), 2500);
}

function generateStars() {
  for (let i = 0; i < 60; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    document.body.appendChild(star);
  }
}

// ================================
// TRADUTOR FOFO
// ================================
function traduzir(texto, idioma) {
  const saida = document.getElementById("translatedMessage");

  if (!texto.trim()) {
    saida.textContent = "Digite uma frase primeiro 💌";
    return;
  }

  const url = `https://api.funtranslations.com/translate/${idioma}.json?text=${encodeURIComponent(texto)}`;

  fetch(url)
    .then(r => {
      if (!r.ok) throw new Error("Erro na tradução");
      return r.json();
    })
    .then(data => {
      saida.textContent = data.contents.translated;
    })
    .catch(() => {
      saida.textContent = "Limite da tradução atingido 😅";
    });
}

// ================================
// EVENTOS
// ================================
setInterval(updateTimer, 1000);
updateTimer();
setInterval(updateCountdown, 1000);
updateCountdown();

document.getElementById("newMessageBtn").addEventListener("click", showRandomMessage);
document.getElementById("sendKissBtn").addEventListener("click", () => spawnEmoji("😘", "kiss"));
document.getElementById("sendHugBtn").addEventListener("click", () => spawnEmoji("🤗", "hug"));
mainHeart.addEventListener("click", () => spawnEmoji("💖", "hug"));

document.getElementById("butterflyBtn").addEventListener("click", () => {
  for (let i = 0; i < 20; i++) spawnEmoji("🦋", "butterfly");
});

document.getElementById("starsBtn").addEventListener("click", () => {
  for (let i = 0; i < 30; i++) spawnEmoji("🌟", "star");
});

secretMessageBtn.addEventListener("click", () => {
  secretMessage.classList.toggle("show");
});

document.getElementById("translateMinion").addEventListener("click", () => {
  traduzir(document.getElementById("inputText").value, "minion");
});
document.getElementById("translateYoda").addEventListener("click", () => {
  traduzir(document.getElementById("inputText").value, "yoda");
});
document.getElementById("translateElfo").addEventListener("click", () => {
  traduzir(document.getElementById("inputText").value, "elf");
});

// ================================
// MODO NOTURNO AUTOMÁTICO + BOTÃO DE TEMA
// ================================
if (new Date().getHours() >= 18 || new Date().getHours() <= 6) {
  document.body.classList.add("night");
  generateStars();
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("night");
  if (document.body.classList.contains("night")) {
    generateStars();
  } else {
    document.querySelectorAll(".star").forEach(e => e.remove());
  }
});
