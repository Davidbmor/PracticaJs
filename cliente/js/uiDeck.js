
export const uiDeck = {
    init: () => {
        const cards = [];
        ['oros', 'copas', 'espadas', 'bastos'].forEach((palo) => {
            for (let i = 1; i <= 12; i++) {
                cards.push({
                    palo: palo,
                    numero: i
                });
            }
        });
        return cards;
    },

    generar: (contenedorSelector) => {
        const baseContainer = document.querySelector(contenedorSelector);
        if (!baseContainer) {
            console.error("Contenedor base no encontrado.");
            return;
        }

        const cards = uiDeck.init();
        const cartasWrapper = document.createElement("div"); 
        cartasWrapper.id = "cartas-wrapper"; 
        cartasWrapper.style.display = "flex";
        cartasWrapper.style.flexWrap = "wrap"; 

        cards.forEach((card, index) => {
            const clonedContainer = baseContainer.cloneNode(true);
            clonedContainer.id = `carta-${index}`;
            clonedContainer.classList.add("carta");
            clonedContainer.setAttribute("draggable", "true");
            clonedContainer.dataset.palo = card.palo; 
            clonedContainer.style.display = "flex"; 
            if (clonedContainer.children.length >= 3) {
                clonedContainer.children[0].textContent = card.numero; 
                clonedContainer.children[1].textContent = card.palo;   
                clonedContainer.children[2].textContent = card.numero; 
            }
            cartasWrapper.appendChild(clonedContainer);
        });

   
        const existingWrapper = document.getElementById("cartas-wrapper");
        if (existingWrapper) {
            existingWrapper.remove();
        }
        document.body.appendChild(cartasWrapper);
    }
};