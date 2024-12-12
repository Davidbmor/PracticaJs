// Importar funciones necesarias del juego
import { uiDeck } from "./uiDeck.js";
import { uiDrag } from "./uiDrag.js";
import { saveGameState, loadGameState } from "./gameState.js";



// Inicializar el juego y configurar eventos
const initGame = () => {
    uiDeck.generar(".container-t"); 
    uiDrag.init(".contenedor", ".carta"); 
    loadGameState();

    // Guardar estado cuando se suelta una carta
    document.querySelectorAll(".contenedor, .carta").forEach((element) => {
        element.addEventListener("drop", saveGameState);
        element.addEventListener("dragend", saveGameState);
    });
};

// Reiniciar el juego
const resetGame = () => {
    document.querySelectorAll(".contenedor").forEach((contenedor) => {
        contenedor.innerHTML = ""; 
    });
    document.querySelectorAll(".carta").forEach((carta) => {
        carta.remove();
    });
    initGame();
    saveGameState();
};

document.getElementById("reset-button").addEventListener("click", resetGame);

// Iniciar el juego al cargar la página
initGame();
