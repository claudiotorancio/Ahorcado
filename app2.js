

function guardar(){
              
    var nuevaPalabra = document.getElementById("entrada").value
    localStorage.setItem("lista",JSON.stringify(nuevaPalabra));
    alert("la palabra ingresada es: " + nuevaPalabra) 
    
}
