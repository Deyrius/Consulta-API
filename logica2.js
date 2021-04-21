var tabla = document.getElementById('tabla');
var celda = document.getElementById('datos');
var cargando = document.getElementById('cargando');

function inicializar_XHR() {
    if (window.XMLHttpRequest) {
        peticionHTTP = new XMLHttpRequest();
    } else {
        peticionHTTP = new ActiveXObject();
    }
}

function cerrarSesion() {
    window.location.href = "login.html";
}

function realizarPeticion(url, metodo, funcionA) {

    peticionHTTP.onreadystatechange = funcionA;
    peticionHTTP.open(metodo, url, true);
    peticionHTTP.send(null);

}

function descargarArchivo() {
    personaje = document.getElementById('idPersonaje').value;

    if (personaje != "") {
        inicializar_XHR();
        realizarPeticion('https://rickandmortyapi.com/api/character/' + personaje, 'GET', funcActuadora2);
    } else {
        document.getElementById("error").innerHTML = "";
    }
}

function funcActuadora2() {
    if (peticionHTTP.readyState == 4) {

        cargando.style.display = 'none';

        if (peticionHTTP.status == 200) {

            document.getElementById('error').innerHTML = "";
            tabla.style.display = 'table';
            const respuesta = this.response;
            var personaje = JSON.parse(respuesta);

            celda[0].innerHTML = personaje.id;
            celda[1].innerHTML = personaje.name;
            celda[2].innerHTML = personaje.status;
            celda[3].innerHTML = personaje.species;
            celda[4].innerHTML = personaje.type;
            celda[5].innerHTML = personaje.gender;

        } else {
            borrar();
            document.getElementById('error').innerHTML = 'Id no encontrado.'
        }
    } else {
        tabla.style.display = 'none';
        cargando.style.display = "block";
    }
}

function borrar() {
    for (i = 0; i < celda.length; i++) {
        celda[i].innerHTML = "";
    }
}