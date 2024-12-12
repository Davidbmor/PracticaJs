
export const uiDrag = {
    init: (selector1, selector2) => {
        document.querySelectorAll(selector1).forEach((contenedor) => {
            contenedor.addEventListener("drop", (event) => {
                event.preventDefault();
                const data = JSON.parse(event.dataTransfer.getData("text"));
                const draggedElement = document.getElementById(data.id);
                const draggedPalo = draggedElement.dataset.palo;
                const allowedPalo = contenedor.dataset.palo;
                const draggedNumero = parseInt(draggedElement.children[0].textContent);

                if (draggedPalo !== allowedPalo) {
                    alert(`Solo puedes colocar cartas del palo ${allowedPalo} aquí.`);
                    return; 
                }

                const lastCard = contenedor.lastElementChild;
                const lastCardNumero = lastCard ? parseInt(lastCard.children[0].textContent) : 0;

                if (draggedNumero !== lastCardNumero + 1) {
                    alert(`Solo puedes colocar la carta número ${lastCardNumero + 1} aquí.`);
                    return;
                }

                draggedElement.style.position = "absolute";
                draggedElement.style.left = "0px"; 
                draggedElement.style.top = `${contenedor.children.length * 10}px`; 

                contenedor.appendChild(draggedElement);
            });

            contenedor.addEventListener("dragover", (event) => {
                event.preventDefault(); 
            });
        });

        document.querySelectorAll(selector2).forEach((item) => {
            item.setAttribute("draggable", "true");
            item.addEventListener("dragstart", (event) => {
                const sendData = {
                    id: event.target.id
                };
                event.dataTransfer.setData("text", JSON.stringify(sendData));
            });
        });
    }
};
