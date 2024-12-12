// URL del servidor
const SERVER_URL = "http://localhost:3000";
// Función para guardar el estado actual del juego
export const saveGameState = async () => {
    const gameState = []; //Crea un array vacío en el que se almacenará el estado del juego
    document.querySelectorAll(".contenedor").forEach((contenedor) => { //Selecciona todos los elementos con la clase "contenedor" y los recorre
        Array.from(contenedor.children).forEach((card) => { //Convierte los elementos hijos de cada contenedor en un array y los recorre
            gameState.push({ //Añade un objeto al array gameState con la información de la carta
                id: card.id,
                contenedorId: contenedor.id,
                posX: card.style.left || "0px",
                posY: card.style.top || "0px",
            });
        });
    });
    try {
        const response = await fetch(`${SERVER_URL}/game-state`, { //Envía una petición POST al servidor con el estado del juego
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ state: gameState }), //Convierte el array gameState a formato JSON
        });

        const result = await response.json(); //Espera la respuesta del servidor y la convierte a JSON
        console.log(result.message); 
    } catch (error) {
        console.error("Error al guardar el estado del juego:", error);
    }
};

// Función para recuperar el estado del juego desde el servidor
export const loadGameState = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/game-state`); //Envía una petición GET al servidor para obtener el estado del juego
        const gameState = await response.json(); // Espera la respuesta del servidor y la convierte a JSON

        gameState.forEach(({ id, contenedorId, posX, posY }) => { //Recorre el array gameState y coloca las cartas en sus posiciones guardadas
            const card = document.getElementById(id);
            const contenedor = document.getElementById(contenedorId);

            if (card && contenedor) { //Verifica que la carta y el contenedor existan
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
