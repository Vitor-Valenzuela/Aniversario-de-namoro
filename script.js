// ⏳ Data de início do namoro
const startDate = new Date("2024-10-04T00:00:00");

// Atualiza tempo de namoro
function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("timer").textContent =
    `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos 💞`;
}
setInterval(updateTimer, 1000);
updateTimer();

// 💬 Frases românticas
const messages = [
  "Você é a coisa mais linda que já me aconteceu. 🌹",
  "O seu sorriso é meu lugar favorito. 😊",
  "Você me completa de um jeito que nem sei explicar. 💕",
  "Cada segundo com você vale uma vida inteira. ⏳",
  "Amar você é a melhor parte dos meus dias. ☀️",
  "Você é meu lar, meu mundo, meu tudo. 🏡"
];

function showRandomMessage() {
  const msg = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById("randomMessage").textContent = msg;
}
setInterval(showRandomMessage, 8000);

// 💖 Corações caindo
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "falling-heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
  heart.textContent = "💖";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

// 🗓 Contador para o próximo mêsversário (dia 04)
function updateCountdown() {
  const now = new Date();

  let next = new Date(now.getFullYear(), now.getMonth(), 4);
  if (now.getDate() >= 4) {
    next = new Date(now.getFullYear(), now.getMonth() + 1, 4);
  }

  const diff = next - now;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  const texto = `⏳ Faltam ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos para nosso próximo mêsversário 💘`;

  document.getElementById("countdown").textContent = texto;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 🌟 Efeito e mensagem especial no dia 04
function checkSpecialDate() {
  const today = new Date();
  const isDay04 = today.getDate() === 4;

  if (isDay04) {
    document.body.classList.add("mesversario");
    const special = document.createElement("div");
    special.className = "mensagem-especial";
    special.innerHTML = "🎉 Feliz mêsversário, meu amor! Você é tudo pra mim! 💗";
    document.body.appendChild(special);

    for (let i = 0; i < 20; i++) {
      setTimeout(createHeart, i * 100);
    }
  }
}
checkSpecialDate();
