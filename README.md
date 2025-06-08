<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Você é meu destino 💖</title>
  <style>
    * {
      box-sizing: border-box;
    }
    <!-- Player Spotify embutido -->
    <iframe src="https://open.spotify.com/track/36Jxpbk3PlcDo9hSGiAsfU?si=ccx2n4X-S-irXpLovhB1IA" width="100%" height="380" frameborder="0" allow="encrypted-media"></iframe>

    body {
      margin: 0;
      background: black;
      font-family: 'Segoe UI', sans-serif;
      overflow: hidden;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      min-height: 100vh;
    }

    canvas {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .polaroid {
      background: white;
      padding: 20px 20px 60px;
      border-radius: 15px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
      margin-bottom: 20px;
      cursor: pointer;
      transition: transform 0.3s;
    }

    .polaroid:hover {
      transform: scale(1.03);
    }

    .polaroid img {
      width: 100%;
      border-radius: 10px;
    }

    .caption {
      margin-top: 15px;
      font-size: 16px;
      color: #333;
      font-weight: bold;
    }

    .text {
      font-size: 20px;
      padding: 20px;
      max-width: 800px;
      line-height: 1.6;
    }

    #playButton {
      margin-top: 15px;
      background: #ff69b4;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 30px;
      font-size: 18px;
      cursor: pointer;
      transition: background 0.3s;
    }

    #playButton:hover {
      background: #e85ca3;
    }

    #lyrics {
      white-space: pre-line;
      margin-top: 25px;
      font-size: 18px;
      max-width: 600px;
      line-height: 1.6;
    }
  </style>
</head>
<body>

<canvas id="heartCanvas"></canvas>

<div class="polaroid" onclick="togglePhoto()">
  <img id="photo" src="https://i.postimg.cc/HVxrX9W2/pretoebranco.jpg" alt="Foto do casal">
  <div class="caption">Clique na foto e veja a mágica ✨</div>
</div>

<div class="text">
  você na minha vida é tão especial assim como o impala é especial para o Dean, você chegou na minha vida e a mudou por completo, meus dias passaram a ter mais cor e a minha vida passou a ser mais feliz, não pude comprar um presente mas fiz isso para você. saiba que eu te amo muito meu amor da minha vida 🩷✨️
</div>

<button id="playButton">Tocar Música 🎵</button>
<div id="lyrics"></div>
<audio id="music" src="You Are My Destiny.mp3"></audio>

<script>
  // FOTO
  let isColor = false;
  function togglePhoto() {
    const photo = document.getElementById("photo");
    photo.src = isColor
      ? "https://i.postimg.cc/HVxrX9W2/pretoebranco.jpg"
      : "https://i.postimg.cc/s11zJ6Sv/colorida.jpg";
    isColor = !isColor;
  }

  // MÚSICA + LETRA
  const music = document.getElementById("music");
  const playButton = document.getElementById("playButton");
  const lyricsDiv = document.getElementById("lyrics");

  const lyricsLines = [
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
  let lyricsInterval;

  function showLyrics() {
    lyricsDiv.textContent = "";
    currentLine = 0;
    clearInterval(lyricsInterval);
    lyricsInterval = setInterval(() => {
      if (currentLine < lyricsLines.length) {
        lyricsDiv.textContent += lyricsLines[currentLine] + "\n";
        currentLine++;
      } else {
        clearInterval(lyricsInterval);
      }
    }, 4000); // Ajuste conforme o ritmo da música
  }

  playButton.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      playButton.textContent = "Pausar Música ⏸️";
      showLyrics();
    } else {
      music.pause();
      playButton.textContent = "Tocar Música 🎵";
      clearInterval(lyricsInterval);
    }
  });

  // CHUVA DE CORAÇÕES
  const canvas = document.getElementById('heartCanvas');
  const ctx = canvas.getContext('2d');
  let hearts = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  function createHeart() {
    return {
      x: Math.random() * canvas.width,
      y: -20,
      size: 10 + Math.random() * 20,
      speed: 1 + Math.random() * 3,
      alpha: 0.5 + Math.random() * 0.5
    };
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
    if (Math.random() < 0.3) {
      hearts.push(createHeart());
    }
    hearts.forEach((heart, i) => {
      heart.y += heart.speed;
      drawHeart(heart.x, heart.y, heart.size, heart.alpha);
      if (heart.y > canvas.height) hearts.splice(i, 1);
    });
    requestAnimationFrame(animate);
  }

  animate();
</script>
</body>
</html>
