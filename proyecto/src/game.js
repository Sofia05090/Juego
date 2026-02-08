export function startGame(mode, backToMenu) {
  const app = document.querySelector("#app");

  let score = 0;
  let timeLeft = 30;
  let speed = mode === "hard" ? 700 : 1000;
  let gameInterval;

  app.innerHTML = `
    <div class="game">
      <div class="top-bar">
        <span>Puntos: <strong id="score">0</strong></span>
        <span>Tiempo: <strong id="time">30</strong></span>
      </div>
      <div class="game-area" id="gameArea"></div>
    </div>
  `;

  const scoreDisplay = document.getElementById("score");
  const timeDisplay = document.getElementById("time");
  const gameArea = document.getElementById("gameArea");

  function createTarget() {
    const target = document.createElement("div");
    target.classList.add("target");

    const isGood = Math.random() > 0.3;
    target.classList.add(isGood ? "good" : "bad");

    const size = 60;
    const x = Math.random() * (gameArea.clientWidth - size);
    const y = Math.random() * (gameArea.clientHeight - size);

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.addEventListener("click", () => {
      if (isGood) {
        score += 10;
      } else {
        score -= 5;
      }
      scoreDisplay.textContent = score;
      target.remove();
    });

    gameArea.appendChild(target);

    setTimeout(() => {
      target.remove();
    }, speed);
  }

  gameInterval = setInterval(createTarget, speed);

  const timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(timer);
      endGame();
    }
  }, 1000);

  function endGame() {
    const record = localStorage.getItem("record") || 0;

    if (score > record) {
      localStorage.setItem("record", score);
    }

    app.innerHTML = `
      <div class="menu">
        <h2>Juego terminado</h2>
        <p>Puntuación final: ${score}</p>
        <button id="menu">Volver al menú</button>
      </div>
    `;

    document.getElementById("menu").addEventListener("click", backToMenu);
  }
}
