
export const uiDeck = {
    init: () => { //Genera un mazo de cartas con palos y números
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

    generar: (contenedorSelector) => { //Genera las cartas en el contenedor base
        const baseContainer = document.querySelector(contenedorSelector); 
        if (!baseContainer) {
            console.error("Contenedor base no encontrado.");
            return;
        }
        const cards = uiDeck.init(); //Genera un mazo de cartas
        const cartasWrapper = document.createElement("div"); //Crea un contenedor para las cartas con estilo flex
        cartasWrapper.id = "cartas-wrapper"; 
        cartasWrapper.style.display = "flex";
        cartasWrapper.style.flexWrap = "wrap"; 
        cards.forEach((card, index) => { //Crea un contenedor para cada carta y lo añade al contenedor base
            const clonedContainer = baseContainer.cloneNode(true); //Clona el contenedor base
            clonedContainer.id = `carta-${index}`; //Asigna un id único ala carta clonada 
            clonedContainer.classList.add("carta"); 
            clonedContainer.setAttribute("draggable", "true"); //Hace que la carta sea arrastrable con la propiedad draggable 
            clonedContainer.dataset.palo = card.palo; 
            clonedContainer.style.display = "flex"; 
            if (clonedContainer.children.length >= 3) { //Asigna el número y el palo de la carta a los elementos hijos del contenedor
                clonedContainer.children[0].textContent = card.numero; 
                clonedContainer.children[1].textContent = card.palo;   
                clonedContainer.children[2].textContent = card.numero; 
            }
            cartasWrapper.appendChild(clonedContainer);
        });

        const existingWrapper = document.getElementById("cartas-wrapper"); //Elimina el contenedor de cartas existente y añade el nuevo contenedor
        if (existingWrapper) {
            existingWrapper.remove(); 
        }
        document.body.appendChild(cartasWrapper);
    }
};