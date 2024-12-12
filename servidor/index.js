const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

// Simula una base de datos en memoria
let gameState = [];

// Ruta para obtener el estado actual del juego
app.get('/game-state', (req, res) => {
    res.json(gameState);
});

// Ruta para guardar el estado actual del juego
app.post('/game-state', (req, res) => {
    const { state } = req.body;

    if (!state || !Array.isArray(state)) {
        return res.status(400).json({ message: 'Formato de datos inválido.' });
    }
    gameState = state;
    res.json({ message: 'Estado del juego guardado correctamente.' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
