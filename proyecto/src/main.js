import "./style.css";
import { startGame } from "./game.js";

const app = document.querySelector("#app");

function renderMenu() {
  const record = localStorage.getItem("record") || 0;

  app.innerHTML = `
    <div class="menu">
      <h1>🚀 Reflejos Espaciales</h1>
      <p class="record">🏆 Récord: ${record}</p>
      
      <button id="normal">Modo Normal</button>
      <button id="hard">Modo Difícil</button>
    </div>
  `;

  document.getElementById("normal").addEventListener("click", () => {
    startGame("normal", renderMenu);
  });

  document.getElementById("hard").addEventListener("click", () => {
    startGame("hard", renderMenu);
  });
}

renderMenu();
