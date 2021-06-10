const cartas = document.querySelectorAll(".memoria-card");
console.log(cartas);

let tableroBloqueado = false;
let arrancaste = false;
let primeraCarta, segundaCarta;

function girar() {
  if (tableroBloqueado) return;

  // Si la primera carta, es igual a la que estoy apretando (segunda), que salga de la funcion
  // Puedo saber cual es la segunda carta aunque todavía no la haya guardado
  if (this === primeraCarta) return;

  this.classList.add("girar");

  if (!arrancaste) {
    arrancaste = true;
    primeraCarta = this;

    return;
  }

  arrancaste = false;
  segundaCarta = this;

  comprobarCoincidencia();
}

// Funcion para reseTEAR LAS BAREAVLES

function resetearBareavle() {
  primeraCarta = null;
  segundaCarta = null;
  // tableroBloqueado = false;
  // arrancaste = false;
}

function comprobarCoincidencia() {
  let coincidencia =
    primeraCarta.dataset.participante === segundaCarta.dataset.participante;

  coincidencia ? deshabilitarCartas() : devolverCartas();
}

function deshabilitarCartas() {
  primeraCarta.removeEventListener("click", girar);
  segundaCarta.removeEventListener("click", girar);
  console.log("acerte");
  visorAciertos.textContent = Number(visorAciertos.textContent) + 1;
  resetearBareavle();
  if (Number(visorAciertos.textContent) == Number(6)) {
    setTimeout(() => {
      ganar();
    }, 800);
  }
}

function devolverCartas() {
  tableroBloqueado = true;
  setTimeout(() => {
    primeraCarta.classList.remove("girar");
    segundaCarta.classList.remove("girar");
    tableroBloqueado = false;
    resetearBareavle();
    restarMovimientos();
  }, 700);
}

function cartasClickeables() {
  cartas.forEach((carta) => carta.addEventListener("click", girar));
  mezclarCartas();
}

cartasClickeables();

// Hacer el random

function mezclarCartas() {
  // Recorrer todas las cartas
  // Por cada carta:
  // Quiero generar un numero random
  // Y aplicarselo al style.order

  cartas.forEach((carta) => {
    let numeritoRandomico = Math.floor(Math.random() * 12);
    carta.style.order = numeritoRandomico;
  });
}

const botonreset = document.getElementById("reset");
botonreset.addEventListener("click", restart);
const visorMovimientos = document.getElementById("visorMovimientos");
const visorAciertos = document.getElementById("visorAciertos");
let limite = 12;
let aciertos = Number(0);
visorMovimientos.textContent = limite;
visorAciertos.textContent = aciertos;

function restart() {
  visorMovimientos.textContent = limite;
  visorAciertos.textContent = aciertos;

  cartas.forEach((carta) => carta.classList.remove("girar"));
  cartasClickeables();
}

function restarMovimientos() {
  visorMovimientos.textContent = visorMovimientos.textContent - 1;
  if (visorMovimientos.textContent == 0) {
    alert("Perdiste Rey");
    restart();
  }
}

function ganar() {
  alert("Ganaste Corazon!");
  restart();
}

// TAREA
// leer que es this en los addEventListener
// Agregarle algun boton de Reset (dar vuelta todas las cartas, volver a mezclarlas, volver a agregarle los event listener... todo de nuevo)
// Contador de movimientos || un limite de movimientos (maximo de 12 movimientos y por cada !acierto, que reste uno, y cuando llega a 0, chau picho)
// Algun innerHtml que me diga: ganasTE PERRRIIIIIIIIIIII

// Sacado de contexto (miren la clase para entender xD)
// piedra = 0
// papel = 2
// tijera = 1

// const array = [[empato, gano, perdio], [gano, empato, perdio], [perdio, gano, empato]]

// array[0][1] = gano
