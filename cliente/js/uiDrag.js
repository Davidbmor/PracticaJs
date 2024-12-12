
export const uiDrag = {
    init: (selector1, selector2) => {
        document.querySelectorAll(selector1).forEach((contenedor) => { //Selecciona todos los elementos con la clase "contenedor" y los recorre 
            contenedor.addEventListener("drop", (event) => { //Añade un evento de soltar al contenedor 
                event.preventDefault();
                const data = JSON.parse(event.dataTransfer.getData("text")); //Obtiene los datos de la carta arrastrada
                const draggedElement = document.getElementById(data.id); //Selecciona la carta arrastrada 
                const draggedPalo = draggedElement.dataset.palo; //Obtiene el palo de la carta arrastrada mediante el atributo data-palo
                const allowedPalo = contenedor.dataset.palo;
                const draggedNumero = parseInt(draggedElement.children[0].textContent); //Obtiene el número de la carta arrastrada

                if (draggedPalo !== allowedPalo) { //Comprueba si el palo de la carta arrastrada coincide con el palo permitido en el contenedor
                    alert(`Solo puedes colocar cartas del palo ${allowedPalo} aquí.`);
                    return; 
                }

                const lastCard = contenedor.lastElementChild; //Obtiene la última carta del contenedor 
                const lastCardNumero = lastCard ? parseInt(lastCard.children[0].textContent) : 0; //Obtiene el número de la última carta del contenedor

                if (draggedNumero !== lastCardNumero + 1) { //Comprueba si el número de la carta arrastrada es el siguiente al de la última carta del contenedor
                    alert(`Solo puedes colocar la carta número ${lastCardNumero + 1} aquí.`);
                    return;
                }

                draggedElement.style.position = "absolute"; //Establece la posición absoluta de la carta arrastrada 
                draggedElement.style.left = "0px"; 
                draggedElement.style.top = `${contenedor.children.length * 10}px`; 

                contenedor.appendChild(draggedElement);
            });

            contenedor.addEventListener("dragover", (event) => { //
                event.preventDefault(); 
            });
        });
        document.querySelectorAll(selector2).forEach((item) => { //Selecciona todos los elementos con la clase "carta" y los recorre 
            item.setAttribute("draggable", "true"); //Hace que las cartas sean arrastrables 
            item.addEventListener("dragstart", (event) => {
                const sendData = {
                    id: event.target.id
                };
                event.dataTransfer.setData("text", JSON.stringify(sendData)); //Envía los datos de la carta arrastrada al soltarla 
            });
        });
    }
};
