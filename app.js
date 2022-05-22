;(function(){
    var juego = {
        palabra: "ALURA",
        estado: 1,
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
        $elem.src = "./imagenes/0" + juego.estado + ".png"

        //creamos las letras a adivinar
        var palabra = juego.palabra
        var adivinado = juego.adivinado
        $elem = $html.adivinado
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
        for (let letra of errado){
            let $span = document.createElement("span")
            let $texto = document.createTextNode(letra)
            $span.setAttribute("class", "letra errada")
            $span.appendChild($texto)
            $elem.appendChild($span)
        }

    }
    console.log(juego)
    dibujar(juego)
}())