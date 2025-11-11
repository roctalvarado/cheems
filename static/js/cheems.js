document.addEventListener("DOMContentLoaded", () => {
    const randomNumber = Math.floor(Math.random() * 14) + 1;

    const imagenes = document.querySelectorAll(".cheems-card img")

    // TODO: Eliminar antes de publicar el juego
    console.debug("Número random " + randomNumber);

    imagenes.forEach((img, index) => {
        const id = index + 1;
        img.dataset.id = id;

        img.addEventListener("click", () => {
            if(id == randomNumber) {
                img.src = window.IMG_BAD

                imagenes.forEach((img) => {
                    if (img.dataset.id != randomNumber) {
                        img.src = window.IMG_OK
                    }
                })
                // alert("Perdiste")
            } else {
                img.src = window.IMG_OK
                // alert("Ganaste")
            }
        })
    })

});