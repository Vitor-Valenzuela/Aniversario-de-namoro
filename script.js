// --- Configurações iniciais e variáveis globais ---
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
const heartEffect = document.getElementById("heartEffect");

// --- Função: Atualiza o Timer do amor ---
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

// --- Função: Atualiza o Countdown para o próximo mêsversário ---
function updateCountdown() {
  const now = new Date();
  let next = new Date(now.getFullYear(), now.getMonth(), 4);
  if (now.getDate() >= 4) {
    next = new Date(now.getFullYear(), now.getMonth() + 1, 4);
  }

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

// --- Função: Mostra mensagem aleatória ---
function showRandomMessage() {
  const msg = messages[Math.floor(Math.random() * messages.length)];
  randomMessageEl.textContent = msg;
}

// --- Função: Cria emoji animado flutuante ---
function spawnEmoji(emoji, className) {
  const elem = document.createElement("div");
  elem.className = className;
  elem.textContent = emoji;
  elem.style.left = Math.random() * 100 + "vw";
  elem.style.top = Math.random() * 100 + "vh";
  document.body.appendChild(elem);
  setTimeout(() => elem.remove(), 2000);
}

// --- Função: Gera estrelas para efeito noturno ---
function generateStars() {
  for (let i = 0; i < 60; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    document.body.appendChild(star);
  }
}

// --- Função: Traduz texto usando API funtranslations ---
function traduzir(texto, idioma) {
  if (!texto.trim()) {
    document.getElementById("translatedMessage").textContent = "Por favor, digite uma frase para traduzir.";
    return;
  }

  const url = `https://api.funtranslations.com/translate/${idioma}.json?text=${encodeURIComponent(texto)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro na tradução, talvez limite de requisições grátis.");
      }
      return response.json();
    })
    .then(data => {
      const traduzido = data.contents.translated;
      document.getElementById("translatedMessage").textContent = traduzido;
    })
    .catch(error => {
      console.error(error);
      document.getElementById("translatedMessage").textContent = "Ops! Não consegui traduzir. Talvez tenha atingido o limite grátis.";
    });
}

// --- Inicializações e event listeners ---

// Atualiza timers a cada segundo
setInterval(updateTimer, 1000);
updateTimer();

setInterval(updateCountdown, 1000);
updateCountdown();

// Botões mensagens aleatórias e emojis
document.getElementById("newMessageBtn").addEventListener("click", showRandomMessage);
document.getElementById("sendKissBtn").addEventListener("click", () => spawnEmoji("😘", "kiss"));
document.getElementById("sendHugBtn").addEventListener("click", () => spawnEmoji("🤗", "hug"));
mainHeart.addEventListener("click", () => spawnEmoji("💖", "hug"));

// Botões borboletas e estrelas
document.getElementById("butterflyBtn").addEventListener("click", () => {
  for (let i = 0; i < 20; i++) spawnEmoji("🦋", "butterfly");
});
document.getElementById("starsBtn").addEventListener("click", () => {
  for (let i = 0; i < 30; i++) spawnEmoji("🌟", "star");
});

// Botão mensagem secreta
secretMessageBtn.addEventListener("click", () => {
  secretMessage.classList.toggle("show");
});

// Efeito coração pulsante
heartEffect.addEventListener("click", () => {
  heartEffect.classList.toggle("active");
});

// Efeito noturno com estrelas
const hour = new Date().getHours();
if (hour >= 18 || hour <= 6) {
  document.body.classList.add("night");
  generateStars();
}

// Tradução - botões
document.getElementById("translateMinion").addEventListener("click", () => {
  const texto = document.getElementById("inputText").value;
  traduzir(texto, "minion");
});
document.getElementById("translateYoda").addEventListener("click", () => {
  const texto = document.getElementById("inputText").value;
  traduzir(texto, "yoda");
});
document.getElementById("translateElfo").addEventListener("click", () => {
  const texto = document.getElementById("inputText").value;
  traduzir(texto, "elf");
});
