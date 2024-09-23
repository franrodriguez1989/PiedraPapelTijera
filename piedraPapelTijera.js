// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"]
//    //

//Seleccionamos todos los botones e input para después darles las funciones
var botones = document.getElementsByTagName("button")
var entradas = document.getElementsByTagName("input")
var nombreinput = entradas[0]
var partidas = entradas[1]
//Creamos la funcion para comprobar nombre
function nombreValido(validezNombre) {
  if (validezNombre.length > 3 && isNaN(validezNombre[0])) {
    return true
  } else {
    return false
  }
}
//Comprobar numero de partidas válido
function partidasInvalidas(partidasdeseadas) {
  if (partidasdeseadas <= 0) {
    return true
  } else {
    return false
  }
}
//Asignar al botón ¡JUGAR! el evento que permita realizar las comprobaciones del comienzo de la partida.
botones[0].onclick = comprobacioncomienzo

//Creamos una variable para guardar el nombre que pondremos en historial
var nombreHistorial = ""

//Creamos la funcion comprobacion de comienzo
function comprobacioncomienzo() {
  nombreinput = entradas[0]
  partidas = entradas[1]
  if (!nombreValido(nombreinput.value)) {
    nombreinput.classList.add("fondoRojo")
    if (partidasInvalidas(partidas.value)) {
      partidas.classList.add("fondoRojo")
    } else {
      partidas.classList.remove("fondoRojo")
    }
  } else if (partidasInvalidas(partidas.value)) {
    nombreinput.classList.remove("fondoRojo")
    partidas.classList.add("fondoRojo")
  } else {
    nombreinput.classList.remove("fondoRojo")
    partidas.classList.remove("fondoRojo")
    nombreHistorial = nombreinput.value
    total.innerHTML = partidas.value
    nombreinput.disabled = true
    partidas.disabled = true
  }
}

/*Asignamos las imagenes que corresponden y el evento que permita seleccionar la opcion del jugador, utilizaremos el array proporcionado "posibilidades"
indicamos que es de tipo "Jugador" y asignamos una variable donde guardamos la ultima imagen que es la de maquina     */

var imagenes = document.getElementsByTagName("img")
for (var i = 0; i < imagenes.length - 1; i++) {
  imagenes[i].id = posibilidades[i]
  imagenes[i].src = "img/" + posibilidades[i] + "Jugador.png"
  imagenes[i].onclick = selecciondeJugador
}

var imagmaquina = document.getElementsByTagName("img")[imagenes.length - 1]
//Creamos las variables donde guardaremos la seleccion de jugador y maquina, que mas tarde daran el resultado del ganador
var seljugador = ""
var selmaquina = ""

//Creamos la funcion para seleccionar la imagen que usara el jugador en la partida y cambiamos la apariencia de las no seleccionadas.
function selecciondeJugador(imagsel) {
  imagsel.target.classList.add("seleccionado")
  imagsel.target.classList.remove("noSeleccionado")
  seljugador = imagsel.target.id
  for (var i = 0; i < imagenes.length - 1; i++) {
    if (imagenes[i] != imagsel.target) {
      imagenes[i].classList.remove("seleccionado")
      imagenes[i].classList.add("noSeleccionado")
    }
  }
}

//Creamos la funcion que dara la elección aleatoria de la maquina
function generarselrandom(rposibilidades) {
  let aleatorio = Math.floor(Math.random() * rposibilidades.length)
  return rposibilidades[aleatorio]
}
//Asignamos al boton ¡ya! la funcion de generar la jugada aleatoria de maquina y el resultado final llamando a otra funcion.
botones[1].onclick = jugadamaquina
function jugadamaquina() {
  if (actual.innerHTML < total.innerHTML) {
    jugamaquina = generarselrandom(posibilidades)
    imagmaquina.src = "img/" + jugamaquina + "Ordenador.png"
    imagmaquina.id = jugamaquina
    actual.innerHTML = parseInt(actual.innerHTML) + 1
    selmaquina = imagmaquina.id
    resultadopartida(jugamaquina)
  }
}
function agregarResultadoAlHistorial(mensaje) {
  // Crear un nuevo elemento <li>
  const nuevoElemento = document.createElement("li")

  // Establecer el contenido del nuevo elemento
  nuevoElemento.textContent = mensaje

  // Agregar el nuevo elemento al historial
  historial.appendChild(nuevoElemento)
}

//Creamos la funcion que dara el veredicto de quien gana y lo imprime en el historial
function resultadopartida() {
  let jugadorIndice = posibilidades.indexOf(seljugador)
  let maquinaIndice = posibilidades.indexOf(selmaquina)

  // Cambiar la lógica para que el jugador gane
  if (jugadorIndice == (maquinaIndice + 1) % posibilidades.length) {
    agregarResultadoAlHistorial("Gana " + nombreHistorial)
  } else if (maquinaIndice == jugadorIndice) {
    agregarResultadoAlHistorial("Empate")
  } else {
    agregarResultadoAlHistorial("Gana la máquina")
  }
}
//Asignamos al boton reset la funcion que hara que haya partida nueva, restableciendo todo al principio menos el historia que se guarda como esta y con un mensaje "Nueva partida"
botones[2].onclick = resetear

function resetear() {
  nombreinput.disabled = false
  partidas.disabled = false
  partidas.value = 0
  total.innerHTML = "0"
  actual.innerHTML = "0"
  for (var j = 0; j < imagenes.length - 1; j++) {
    imagenes[j].classList.remove("seleccionado")
    imagenes[j].classList.remove("noSeleccionado")
  }
  imagenes[0].classList.add("seleccionado")
  imagenes[imagenes.length - 1].src = "img/defecto.png"
  agregarResultadoAlHistorial("Nueva partida")
}
