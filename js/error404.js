document.addEventListener("DOMContentLoaded", function() {
    const fallingImg = document.getElementById("fallingImg");
    const posicionInicial = -100; 
    const posicionFinal = 100; 


    const duracionAnimacion = 1000;

    // Función para animar el deslizamiento
    function fallingImg() {
        let posicionActual = posicionInicial;
        const velocidadDesplazamiento = (posicionFinal - posicionInicial) / duracionAnimacion;

        const animacion = setInterval(function() {
            posicionActual += velocidadDesplazamiento;
            fallingImg.style.top = posicionActual + "px";

            if (posicionActual >= posicionFinal) {
                clearInterval(animacion);
            }
        }, 10); // Intervalo de actualización de la animación
    }

    // Llamar a la función para iniciar la animación
    fallingImg();
});


