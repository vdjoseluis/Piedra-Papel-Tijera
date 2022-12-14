// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

const nombre = document.getElementsByTagName("input")[0];
nombre.focus();
const partidas = document.getElementsByTagName("input")[1];
const jugarBtn = document.getElementsByTagName("button")[0];
const yaBtn = document.getElementsByTagName("button")[1];
const resetBtn= document.getElementsByTagName("button")[2];

const piedra = document.getElementsByTagName("img")[0];
const papel = document.getElementsByTagName("img")[1];
const tijera = document.getElementsByTagName("img")[2];

const maquina = document.getElementsByTagName("img")[3];

const actual = document.getElementById("actual");
const total = document.getElementById("total");

var opJugador=0;    // variable para jugador
var opMaquina=0;    // variable para maquina


jugarBtn.addEventListener("click", ()=>{
    // hago las comprobaciones
    if (nombre.value.length<=3 || !isNaN(nombre.value.charAt(0))){
        partidas.classList.remove("fondoRojo");
        nombre.classList.add("fondoRojo");
        alert ("Nombre no válido");
        nombre.focus();
    } else if (partidas.value<=0){
        nombre.classList.remove("fondoRojo");       
        partidas.classList.add("fondoRojo");
        alert ("Número de partidas debe ser mayor que 0");
        partidas.focus();
    } else {
        nombre.classList.remove("fondoRojo");
        partidas.classList.remove("fondoRojo");

        // desactivo los inputs
        activaDesactiva('disabled');
        yaBtn.removeAttribute('disabled');

        // asigno al span total el valor de partidas
        total.innerHTML= partidas.value;

        //asigno las img correctas
        piedra.src= 'img/piedraJugador.png';
        papel.src= 'img/papelJugador.png';
        tijera.src= 'img/tijeraJugador.png';
    }
});


function activaDesactiva(accion){
    if (accion=='disabled'){
        nombre.setAttribute('disabled','disabled');
        partidas.setAttribute('disabled','disabled');
        jugarBtn.setAttribute('disabled','disabled');
    } else {
        nombre.removeAttribute('disabled');
        partidas.removeAttribute('disabled');
        jugarBtn.removeAttribute('disabled');
    }
}

function seleccionar(elemento1,elemento2,elemento3){
    // Limpio las clases de selección y no selección
    piedra.classList.remove("noSeleccionado");
    papel.classList.remove("noSeleccionado");
    tijera.classList.remove("noSeleccionado");
    piedra.classList.remove("seleccionado");
    papel.classList.remove("seleccionado");
    tijera.classList.remove("seleccionado");

    // Clase selección y primero y los otros 2 no seleccionados.
    elemento1.classList.add("seleccionado");
    elemento2.classList.add("noSeleccionado");
    elemento3.classList.add("noSeleccionado");
}

piedra.addEventListener("click", ()=>{
    seleccionar(piedra,papel,tijera);
    opJugador= 0;
});
papel.addEventListener("click", ()=>{
    seleccionar(papel,piedra,tijera);
    opJugador= 1;
});
tijera.addEventListener("click", ()=>{
    seleccionar(tijera,piedra,papel);
    opJugador= 2;
});


yaBtn.addEventListener("click", ()=>{    
    // genero aleatorio para la máquina y muestro su imagen
    var opMaquina =Math.floor(Math.random()*3);
    maquina.src= 'img/'+ posibilidades[opMaquina]+'Ordenador.png';

    // Imprimir en el historial
    const lista= document.getElementById("historial");
    const nodo= document.createElement("li");
    const textoNodo= document.createTextNode(calculaResultado(opJugador,opMaquina));
    nodo.appendChild(textoNodo);
    lista.appendChild(nodo);

    actual.innerHTML ++;  
    // Final de la serie actual
    if (total.innerHTML=== actual.innerHTML) {
        yaBtn.setAttribute('disabled','disabled');
    } 
});

function calculaResultado(opJugador,opMaquina){    
    if (opJugador==opMaquina) { return "Empate";  
    } else if (opJugador==0 && opMaquina==(posibilidades.length)-1) { 
        return "Gana "+ nombre.value;
    } else if (opMaquina==0 && opJugador==(posibilidades.length)-1) { 
        return "Gana la máquina";
    } else if (opJugador>opMaquina) {
        return "Gana "+ nombre.value;
    } else { return "Gana la máquina"; }
    
}

resetBtn.addEventListener("click", ()=>{
    alert ("Nueva partida");
    yaBtn.setAttribute('disabled','disabled');
    
    activaDesactiva('enabled');
    partidas.focus();
    partidas.value= 0;
    actual.innerHTML=0;
    total.innerHTML=0;
    maquina.src= 'img/defecto.png';
});