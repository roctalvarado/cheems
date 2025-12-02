document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("btn-save").addEventListener("click", saveWinner);

    const randomNumber = Math.floor(Math.random() * 14) + 1;

    const imagenes = document.querySelectorAll(".cheems-card img")

    // TODO: Eliminar antes de publicar el juego
    console.debug("Número random " + randomNumber);

    const clickCards = new Set();

    imagenes.forEach((img, index) => {
        const id = index + 1;
        img.dataset.id = id;

        img.addEventListener("click", () => {

            if(!clickCards.has(id)) {
            clickCards.add(id);

            if(id == randomNumber) {
                img.src = window.IMG_BAD

                imagenes.forEach((img) => {
                    if (img.dataset.id != randomNumber) {
                        img.src = window.IMG_OK
                    }
                })
                // alert("Perdiste")
            } else {
                img.src = window.IMG_OK;
                // alert("Ganaste")

                if(clickCards.size == 14) {
                    const modal = new bootstrap.Modal(document.getElementById("modal-winner"));
                    modal.show();
                }
            }
        }
        })
    })

    function saveWinner() {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phrase = document.getElementById("phrase").value.trim();


        // Operador OR ||
        if(!name || !email || !phrase) {
            alert("Por favor completa todos los campos");
            return;
        }

        fetch("/winner", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phrase: phrase,
            })
        })

        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                return Promise.reject();
            }
        })

        .then(result => {
            if(result.success) {
                alert("El registro fue guardado correctamente");
            } else {
                alert("No se pudo guardar. Intenta más tarde");
            }
        })

        .catch(error => {
            console.error("Error: ", error);
            alert("Error en la conexión");
        })

    }

});