document.addEventListener("DOMContentLoaded", () => {

    const imagenes = document.querySelectorAll(".cheems-card img");

    const IMG_QUESTION = imagenes[0].src;

    let randomNumber = 0;

    const clickCards = new Set();

    let attempts = 1;

    document.getElementById("btn-save").addEventListener("click", saveWinner);

    const btnReset = document.getElementById("btn-reset");

    if (btnReset) {
        btnReset.addEventListener("click", resetBoard)
    }

    initBoard();
    
    imagenes.forEach((img, index) => {
        const id = index + 1;
        img.dataset.id = id;

        img.addEventListener("click", () => {

            if(!clickCards.has(id)) {
                clickCards.add(id);

                if(id == randomNumber) {
                    img.src = window.IMG_BAD;

                    const card = img.closest('.cheems-card');

                    if (card) {
                        card.classList.add("shaking");
                    }

                    imagenes.forEach((img) => {
                        if (img.dataset.id != randomNumber) {
                            img.src = window.IMG_OK;
                        }
                    })
                    // Perder
                } else {
                    img.src = window.IMG_OK;

                    // Ganar
                    if(clickCards.size == 14) {
                        const modal = new bootstrap.Modal(document.getElementById("modal-winner"));
                        modal.show();
                        confetti({
                            particleCount: 150,
                            spread: 70,
                            origin: { y: 0.6 },
                            zIndex: 2000
                        });
                    }
                }
            }
        });
    });

    function initBoard() {
        randomNumber = Math.floor(Math.random() * 14) + 1;
        console.debug("Nuevo intento. Cheems está en: " + randomNumber);

        // Limpiar cartas volteadas
        clickCards.clear();

        imagenes.forEach(img => {
            img.src = IMG_QUESTION;
        });
    }

    function resetBoard() {
        // Sumar 1
        attempts++
        console.debug("Tablero reiniciado. Intento número: " + attempts);

        initBoard();
    }
    

    function saveWinner() {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phrase = document.getElementById("phrase").value.trim();

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
                attempts: attempts
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

                attempts = 1;
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