;(function(){
    var juego = {
        palabra: "ALURA",
        estado: 7,
        adivinado: ["A", "L"],
        errado: ["B", "J", "K", "C"],
    }

    var $html = {
        hombre: document.getElementById("hombre"),
        adivinado: document.querySelector(".adivinado"),
        errado: document.querySelector(".errado"),
    }
    function dibujar(juego) {

        //actualizar la imagen del hombre
        var $elem
        $elem = $html.hombre
        var estado = juego.estado
        if (estado === 8){
            estado = juego.previo
        }
        $elem.src = "./imagenes/0" + estado + ".png"

        //creamos las letras adivinadas
        var palabra = juego.palabra
        var adivinado = juego.adivinado
        $elem = $html.adivinado
        //borramos los elementos anteriores
        $elem.innerHTML = ""
        for(let letra of palabra){
            $span = document.createElement("span")
            $texto = document.createTextNode("")
            if(adivinado.indexOf(letra) >= 0) {
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
        for (let letra of errado){
            let $span = document.createElement("span")
            let $texto = document.createTextNode(letra)
            $span.setAttribute("class", "letra errada")
            $span.appendChild($texto)
            $elem.appendChild($span)
        }

    }

    function adivinar(juego, letra){
        let estado = juego.estado
        //si ya se ha perdido o ganado ya no se puede hacer nada
        if (estado === 1 || estado === 8) {
            return
        }

        var adivinado = juego.adivinado
        var errado = juego.errado
        // si ya hemos adivinado o errado la letra, tampoco hacer nada
        if (adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0){
            return
        }
        var palabra = juego.palabra
        // Si es letra de la palabra
        if (palabra.indexOf(letra) >= 0){
            let ganado = true
            // Debemos ver si llegamos al estado ganado
            for (let l of palabra){
                if (adivinado.indexOf(letra) < 0 && l != letra){
                    ganado = false
                    juego.previo = juego.estado
                    break
                }
            }
            // Si ya se gano, indicarlo
            if(ganado) {
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
        if(/[^A-ZÑ]/.test(letra)) {
            return
        }
        adivinar(juego, letra)
        dibujar(juego)
    }

    dibujar(juego)
}())