/* Mantive a data inicial pedida */
const RELATION_START = new Date("2024-10-04T00:00:00");

/* elementos */
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

/* frases personalizadas */
const phrases = [
  "Você é meu motivo favorito para sorrir.",
  "Cada dia com você é meu melhor dia.",
  "Seu abraço é meu lugar seguro.",
  "A gente e o mundo, no mesmo ritmo.",
  "Sorrio só de lembrar de você."
];

/* atualiza contador de tempo juntos */
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

  loveTimerEl.textContent = `${String(days).padStart(2,'0')}d ${String(hours).padStart(2,'0')}h ${String(minutes).padStart(2,'0')}m ${String(seconds).padStart(2,'0')}s`;
}

/* calcula próximo mêsversário no dia 4 */
function updateNextCountdown(){
  const now = new Date();
  // próximo dia 4
  let year = now.getFullYear();
  let month = now.getMonth();
  let candidate = new Date(year, month, 4, 0, 0, 0);

  if (now.getDate() >= 4) {
    // já passou este mês, avança um mês
    candidate = new Date(year, month + 1, 4, 0, 0, 0);
  }

  const diff = candidate - now;
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const minutes = Math.floor((diff / (1000*60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  nextCountdownEl.textContent = `${String(days).padStart(2,'0')}d ${String(hours).padStart(2,'0')}h ${String(minutes).padStart(2,'0')}m ${String(seconds).padStart(2,'0')}s`;

  // progresso desde último dia 4
  const prev = new Date(candidate.getFullYear(), candidate.getMonth()-1, 4, 0, 0, 0);
  const total = candidate - prev;
  const elapsed = now - prev;
  let percent = Math.round((elapsed / total) * 100);
  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;
  monthProgressEl.style.width = percent + "%";
}

/* mensagens aleatórias */
randomMsgBtn.addEventListener("click", () => {
  const msg = phrases[Math.floor(Math.random()*phrases.length)];
  randomMsgEl.textContent = msg;
});

/* emoji flutuante */
function spawnFloating(emoji, count = 1){
  for (let i=0;i<count;i++){
    const el = document.createElement("div");
    el.className = "fl
