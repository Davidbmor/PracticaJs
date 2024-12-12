// Importar funciones necesarias del juego
import { uiDeck } from "./uiDeck.js";
import { uiDrag } from "./uiDrag.js";

// URL del servidor
const SERVER_URL = "http://localhost:3000";

// Función para guardar el estado actual del juego
const saveGameState = async () => {
    const gameState = [];

    document.querySelectorAll(".contenedor").forEach((contenedor) => {
        Array.from(contenedor.children).forEach((card) => {
            gameState.push({
                id: card.id,
                contenedorId: contenedor.id,
                posX: card.style.left || "0px",
                posY: card.style.top || "0px",
            });
        });
    });

    try {
        const response = await fetch(`${SERVER_URL}/game-state`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ state: gameState }),
        });

        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error("Error al guardar el estado del juego:", error);
    }
};

// Función para recuperar el estado del juego desde el servidor
const loadGameState = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/game-state`);
        const gameState = await response.json();

        gameState.forEach(({ id, contenedorId, posX, posY }) => {
            const card = document.getElementById(id);
            const contenedor = document.getElementById(contenedorId);

            if (card && contenedor) {
                card.style.position = "absolute";
                card.style.left = posX;
                card.style.top = posY;
                contenedor.appendChild(card);
            }
        });

        console.log("Estado del juego cargado correctamente.");
    } catch (error) {
        console.error("Error al cargar el estado del juego:", error);
    }
};

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
