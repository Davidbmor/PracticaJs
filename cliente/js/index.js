// Importar funciones necesarias del juego
import { uiDeck } from "./uiDeck.js";
import { uiDrag } from "./uiDrag.js";
import { saveGameState, loadGameState } from "./gameState.js";



// Inicializar el juego y configurar eventos
const initGame = () => { 
    uiDeck.generar(".container-t"); 
    uiDrag.init(".contenedor", ".carta"); 
    loadGameState(); // Cargar estado guardado

    // Guardar estado cuando se suelta una carta
    document.querySelectorAll(".contenedor, .carta").forEach((element) => {
        element.addEventListener("drop", saveGameState);
        element.addEventListener("dragend", saveGameState);
    });
};

// Reiniciar el juego
const resetGame = () => { //Elimina todas las cartas y reinicia el juego
    document.querySelectorAll(".contenedor").forEach((contenedor) => {
        contenedor.innerHTML = ""; 
    });
    document.querySelectorAll(".carta").forEach((carta) => {
        carta.remove();
    });
    initGame(); //Vuelve a iniciar el juego
    saveGameState(); //Guarda el estado del juego
}; 

document.getElementById("reset-button").addEventListener("click", resetGame); //Añade un evento de clic al botón de reinicio

// Iniciar el juego al cargar la página
initGame();
