
const $form = document.querySelector('#form')

    $form.addEventListener('submit', function (event) {
       event.preventDefault()
        const formData = new FormData($form)
        const nuevaPalabra = formData.get('texto')

        if (nuevaPalabra === '') {
            alert('campo palabra obligatorio')
           return
        }

        if (/[^A-ZÑ][^a-zñ]/.test(nuevaPalabra)) {
            alert('solo letras')
           return
        }
        localStorage.setItem('lista', JSON.stringify(nuevaPalabra))
        alert(`La palabra ingresada es: ${nuevaPalabra}`)
        window.location.href='./iniciarJuego.html'
    })