const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let hearts = [];
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();
function createHeart(x = Math.random() * canvas.width, y = -20, size = 10 + Math.random() * 20, speed = 1 + Math.random() * 3) {
  return { x, y, size, speed, alpha: 0.5 + Math.random() * 0.5 };
}
function drawHeart(x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 30, size / 30);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -5, -15, -15, -15);
  ctx.bezierCurveTo(-35, -15, -35, 10, -35, 10);
  ctx.bezierCurveTo(-35, 25, -20, 40, 0, 50);
  ctx.bezierCurveTo(20, 40, 35, 25, 35, 10);
  ctx.bezierCurveTo(35, 10, 35, -15, 15, -15);
  ctx.bezierCurveTo(5, -15, 0, -3, 0, 0);
  ctx.closePath();
  ctx.fillStyle = `rgba(255, 105, 180, ${alpha})`;
  ctx.fill();
  ctx.restore();
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.3) hearts.push(createHeart());
  hearts.forEach((heart, i) => {
    heart.y += heart.speed;
    drawHeart(heart.x, heart.y, heart.size, heart.alpha);
    if (heart.y > canvas.height) hearts.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();
function togglePhoto() {
  const photo = document.getElementById("photo");
  photo.src = photo.src.includes("pretoebranco.jpg")
    ? "https://i.postimg.cc/s11zJ6Sv/colorida.jpg"
    : "https://i.postimg.cc/HVxrX9W2/pretoebranco.jpg";
}
const playBtn = document.getElementById("playBtn");
const audio = document.getElementById("myAudio");
const lyricsEl = document.getElementById("lyrics");
const lyrics = [
  "You are my destiny",
  "You are what you are to me",
  "You are my happiness",
  "That's what you are",
  "You have my sweet caress",
  "You share my loneliness",
  "You are my dream come true",
  "That's what you are..."
];
let currentLine = 0;
let interval;
function showLyrics() {
  lyricsEl.textContent = "";
  currentLine = 0;
  clearInterval(interval);
  interval = setInterval(() => {
    if (currentLine < lyrics.length) {
      lyricsEl.textContent += lyrics[currentLine] + "\n";
      currentLine++;
    } else {
      clearInterval(interval);
    }
  }, 4000);
}
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️ Pausar Música";
    showLyrics();
  } else {
    audio.pause();
    playBtn.textContent = "▶️ Tocar Música";
    clearInterval(interval);
  }
});
