var intentos = 0;
var tabla = document.getElementById('tabla');
var celda = document.getElementById("datos").children;
var cargando = document.getElementById('cargando');

function realizarPeticion(url, metodo, funcionA) {

    peticionHTTP.onreadystatechange = funcionA;
    peticionHTTP.open(metodo, url, true);
    peticionHTTP.send(null);

}

function inicializar_XHR() {
    if (window.XMLHttpRequest) {
        peticionHTTP = new XMLHttpRequest();
    } else {
        peticionHTTP = new ActiveXObject();
    }
}

function password() {

    pass = document.getElementById('pass').value;

    if (pass != "") {
        inicializar_XHR();
        realizarPeticion('https://jsonplaceholder.typicode.com/users' + '/' + pass, 'GET', funcActuadora);
    } else {
        document.getElementById("error").innerHTML = "Verifique de llenar los campos";
    }
}


function funcActuadora() {
    if (peticionHTTP.readyState == 4) {


        if (peticionHTTP.status == 200) {

            document.getElementById('error').innerHTML = "";
            const respuesta = this.response;
            var pass = JSON.parse(respuesta);

            correo = pass.email;
            nombre = pass.name;
            if (correo == document.getElementById('usuario').value) {
                window.location.href = "principal.html" + "?" + "usuario" + "=" + nombre;
                intentos = 0;
            } else {
                intentos += 1;
                document.getElementById('error').innerHTML = "ERROR AL LOGEAR";
                if (intentos > 3) {
                    // window.location.href = "error.html" + "?" + "usuario" + "=" + correo;
                    logeo = document.getElementById("logeo");
                    logeo.style.display = 'none';
                }
            }

        } else {
            intentos += 1;
            document.getElementById('error').innerHTML = "Usuario no encontrado";
            if (intentos > 3) {
                // window.location.href = "error.html" + "?" + "correo" + "=" + document.getElementById('usuario');
                logeo = document.getElementById("logeo");
                logeo.style.display = 'none';
                document.getElementById('bloqueo').innerHTML = "DEMASIADOS INTENTOS FALLIDOS, CUENTA BLOQUEADA."
            }
        }
    } else {}
}

function Fecha() {
    fecha = new Date();
    dia = fecha.getDate();
    mes = fecha.getMonth() + 1;
    anio = fecha.getFullYear();
    document.body.innerHTML = dia + '/' + mes + '/' + anio;

}

function pasarVariable(pagina, variable) {
    pagina += "?";
    for (let i = 0; i < variable.length; i++) {
        const element = array[index];

    }

}

function cerrarSesion() {
    window.location.href = "login.html";
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
            //celda[1].innerHTML = '<a href=' + personaje.image + '>' + personaje.name;
            celda[1].innerHTML = '<button onclick= "Imagen(\'' + personaje.image + '\')">' + personaje.name + '</button>';
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

function Imagen(imagen) {
    document.getElementById("imagenPersonaje").innerHTML = "<img src=" + imagen + ">";
}


function borrar() {
    for (i = 0; i < celda.length; i++) {
        celda[i].innerHTML = "";
    }
}