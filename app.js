
; (function () {
    var palabras = [
        "ALURA",
        "PERRO",
        "AUTO",
        "LOGICA",
        "CASA",

    ]
    // ingresar la nueva palabra a la lista

    palabras.push(JSON.parse(localStorage.getItem("lista")))

    console.log(palabras)

    

    // Variable para almacenar la configuracion actual
    var juego = null
    //Para ver si se ha enviado algun alerta
    var finalizado = false


    var $html = {
        hombre: document.getElementById("hombre"),
        adivinado: document.querySelector(".adivinado"),
        errado: document.querySelector(".errado"),
        teclado: document.querySelector(".teclado")
    }


    function dibujar(juego) {
        

        //actualizar la imagen del hombre
        var $elem
        $elem = $html.hombre
        var estado = juego.estado
        if (estado === 8) {
            estado = juego.previo
        }
        $elem.src = "./imagenes/0" + estado + ".png"

        //creamos las letras adivinadas
        var palabra = juego.palabra
        var adivinado = juego.adivinado
        $elem = $html.adivinado
        //borramos los elementos anteriores
        $elem.innerHTML = ""
        for (let letra of palabra) {
            $span = document.createElement("span")
            $texto = document.createTextNode("")
            if (adivinado.indexOf(letra) >= 0) {
                $texto.nodeValue = letra
            }
            $span.setAttribute("class", "letra adivinada")
            $span.appendChild($texto)
            $elem.appendChild($span)
        }

        // creamos las letras erradas
        var errado = juego.errado
        $elem = $html.errado
        //borramos los elementos anteriores
        $elem.innerHTML = ""
        for (let letra of errado) {
            let $span = document.createElement("span")
            let $texto = document.createTextNode(letra)
            $span.setAttribute("class", "letra errada")
            $span.appendChild($texto)
            $elem.appendChild($span)
        }

    }

    function adivinar(juego, letra) {
        let estado = juego.estado
        //si ya se ha perdido o ganado ya no se puede hacer nada
        if (estado === 1 || estado === 8) {
            return
        }

        var adivinado = juego.adivinado
        var errado = juego.errado
        // si ya hemos adivinado o errado la letra, tampoco hacer nada
        if (adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0) {
            return
        }
        var palabra = juego.palabra
        // Si es letra de la palabra
        if (palabra.indexOf(letra) >= 0) {
            let ganado = true
            // Debemos ver si llegamos al estado ganado
            for (let l of palabra) {
                if (adivinado.indexOf(l) < 0 && l != letra) {
                    ganado = false
                    juego.previo = juego.estado
                    break
                }
            }
            // Si ya se gano, indicarlo
            if (ganado) {
                juego.estado = 8
            }
            //agregamos la letra a la lista de palabras adivinadas
            adivinado.push(letra)
        } else {
            // Si no es letra de la palabra
            juego.estado--
            //agregamos la letra, a la lista de letras erradas
            errado.push(letra)

        }
    }

    

    window.onkeypress = function adivinarLetra(e) {
        
        var letra = e.key
        letra = letra.toUpperCase()
        if (/[^A-ZÑ]/.test(letra)) {
            return
        }
        adivinar(juego, letra)
        var estado = juego.estado
        if (estado === 8 && !finalizado) {
            setTimeout(alertaGanado, 0)
            finalizado = true
        } else if (estado === 1 && !finalizado) {
            let palabra = juego.palabra
            let fn = alertaPerdido.bind(undefined, palabra)
            setTimeout(fn, 0)
            finalizado = true
        }

        dibujar(juego)

        
    }

    window.nuevoJuego = function nuevoJuego() {
        var palabra = palabraAleatoria()
        juego = {}
        juego.palabra = palabra
        juego.estado = 7
        juego.adivinado = []
        juego.errado = []
        finalizado = false
        dibujar(juego)

       
        
    }
    

    function palabraAleatoria() {
        var index = ~~(Math.random() * palabras.length)
        return palabras[index]
    }

    function alertaGanado() {
        alert("Felicidades, Ganaste")
    }

    function alertaPerdido(palabra) {
        alert("Sorry, perdiste... la palabra era: " + palabra)
    }



    nuevoJuego()

    let teclado_f1 = "qwertyuiop";
    let teclado_f2 = "asdfghjklñ";
    let teclado_f3 = "zxcvbnm";

    let f1 = document.querySelector(".fila1");
    for (let i = 0; i < teclado_f1.length; i++) {
        const tecla = document.createElement("button");
        tecla.classList = "tecla";
        tecla.textContent = teclado_f1[i].toUpperCase();
        tecla.id = teclado_f1[i].toString();
        tecla.addEventListener("click", function () { teclado(this, palabra); });
        f1.append(tecla);
    }

    let f2 = document.querySelector(".fila2");
    for (let i = 0; i < teclado_f2.length; i++) {
        const tecla = document.createElement("button");
        tecla.classList = "tecla";
        tecla.textContent = teclado_f2[i].toUpperCase();
        tecla.id = teclado_f2[i].toString();
        tecla.addEventListener("click", function () { teclado(this, palabra); });
        f2.append(tecla);
    }

    let f3 = document.querySelector(".fila3");
    for (let i = 0; i < teclado_f3.length; i++) {
        const tecla = document.createElement("button");
        tecla.classList = "tecla";
        tecla.textContent = teclado_f3[i].toUpperCase();
        tecla.id = teclado_f3[i].toString();
        tecla.addEventListener("click", function () { teclado(this, palabra); });
        f3.append(tecla);
    }
    return;

}())










