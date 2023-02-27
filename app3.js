(function () {

    var palabras = [
        "PERRO",
        "GATO",
        "COTORRA",
        "RATON"
    ];
    
    var nuevaPalabra = JSON.parse(localStorage.getItem("lista"));
    if (nuevaPalabra !== null) {
       
        nuevaPalabra = nuevaPalabra.toUpperCase() 
        palabras.push(nuevaPalabra);
        localStorage.removeItem('lista') 
    }
   

   //variable para almacenar configuracion actual
    var juego = null
    // variable para ver si hay alerta
    var finalizado = false

    var $html = {
        hombre: document.getElementById("hombre"),
        adivinado: document.querySelector(".adivinado"),
        errado: document.querySelector(".errado"),
        keyboard: document.querySelector(".keyboard"),
       
    }

    

    function dibujar(juego) {
        //actualizar la imagen del hombre
       
        var $elem = $html.hombre
        var estado = juego.estado
        if(estado===8){
            estado = juego.previo
        }

        $elem.src = './imagenes/0' + estado + '.png'
        //creamos las letras adivinadas

        var palabra = juego.palabra
        var adivinado = juego.adiviando
        $elem = $html.adivinado
        //borramos los elementos anteriores
        $elem.innerHTML = ''
        for (let letra of palabra) {
            $span = document.createElement('span')
            $txt = document.createTextNode('')
            if (adivinado.indexOf(letra) >= 0) {
                $txt.nodeValue = letra
               
            }
            $span.setAttribute("class", "letra adivinada")
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
        //creamos las sletras erradas
        var errado = juego.errado
        $elem = $html.errado
         //borramos los elementos anteriores
         $elem.innerHTML = ''
        for (let letra of errado) {
            $span = document.createElement('span')
            $txt = document.createTextNode(letra)
            $span.setAttribute("class", "letra errada")
            $span.appendChild($txt)
            $elem.appendChild($span)
        }

        //creamos el teclado y los eventos de las teclas

        var keyboard = juego.keyboard
        $elem = $html.keyboard
        $elem.innerHTML = ''
        for (let letra of keyboard) {
            $btn = document.createElement('button')
            $btn.setAttribute("class", "letra teclado")
            $btn.innerHTML = letra;
            $elem.appendChild($btn)
            $btn.addEventListener("click", (event) => {
                var boton = event.target
                if (boton.tagName === 'BUTTON') {
                    boton.texContent
                }
                adivinar(juego, letra);
                var estado = juego.estado
                if(estado === 8 && !finalizado) {
                    setTimeout(alertaGanado, 200)
                    finalizado = true
                }else if(estado === 1 && !finalizado) {
                    let palabra = juego.palabra
                let adiviando = juego.adiviando
                let fn = alertaPerdido.bind(undefined, palabra)
                setTimeout(fn, 0)
                finalizado = true
                for(let le of palabra){
                    if( le != juego.adiviando){
                      adiviando.push(le)
                    }
                }
                }
                dibujar(juego);

            })
        }
    }

    function adivinar(juego, letra) {
        var estado = juego.estado
        //si ya se ha perdido o ganado, no hacer nada
        if(estado === 1 || estado === 8) {
            return
        }
        //si ya hemos adivinado o errado la letra, tampoco hacer nada
        var adiviando = juego.adiviando
        var errado = juego.errado
        if(adiviando.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0){
            return
        }
        var palabra = juego.palabra
        // Si es letra de la palabra
        if(palabra.indexOf(letra) >= 0){
        var ganado = true
        // Debemos ver si llegamos al estado ganado
        for(let l of palabra){
            if (adiviando.indexOf(l) < 0 && l != letra ){
                ganado = false
                juego.previo = juego.estado
                break
            }
        }
        // si ya se ha ganado, debemos indicarlo
        if(ganado){
            juego.estado = 8
        }
        adiviando.push(letra)
     } else {
        // si no es letra de la palabra, se acerca un paso mas a la horca
        juego.estado--
        // agragamos la letra a la lista de letras erradas
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
            var estado = juego.estado
            if(estado === 8 && !finalizado) {
                setTimeout(alertaGanado, 200)
                finalizado = true
            }else if(estado === 1 && !finalizado) {
                let palabra = juego.palabra
                let adiviando = juego.adiviando
                let fn = alertaPerdido.bind(undefined, palabra)
                setTimeout(fn, 0)
                finalizado = true
                for(let le of palabra){
                    if( le != juego.adiviando){
                      adiviando.push(le)
                    }
                }
            }
            dibujar(juego)
           
        }
        window.nuevoJuego = function nuevoJuego(){
            
            var palabra = palabraAleatoria()
            juego = {}
            juego.palabra = palabra
            juego.estado = 7
            juego.adiviando = []
            juego.errado = []
            
            finalizado = false
            juego.keyboard = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
          
            dibujar(juego)

        }

        function palabraAleatoria() {     
            var index = ~~(Math.random() * palabras.length)
            return palabras[index]
        }

        function alertaGanado() {
            alert('Felicidades ganaste')
        }

        function alertaPerdido(palabra) {
            alert('Lo siento perdiste.. la palabra era: ' + palabra)
           
        }
        nuevoJuego()
console.log(palabras)
console.log(juego.palabra)
}())