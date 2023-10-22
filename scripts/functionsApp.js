$(document).ready(function () {

    //Inicializamos la pantalla
    var infoUSuario;
    var cierraSesion = false;

    validarUsuario();

    // Función que verifica si el usuario existe
    function validarPin(event) {
        event.preventDefault();
        const inputContrasenia= document.getElementById('pinUser');
        const contrasenia = inputContrasenia.value;

        // Se obtiene el archivo json con la información de los usuarios registrados
        fetch('./resources/data/usuarios.json',
            {
                method: 'GET',
                headers: new Headers({ 'Content-type': 'application/json'}),
                mode: 'no-cors'
            })
            .then(response => response.json())
            .then(data => {
                // Aquí se realiza la comparación con los datos del archivo JSON
                data.usuarios.forEach(usuario => {
                    if (usuario.pin === contrasenia) {
                        // El PIN ingresado coincide con el usuario en el archivo JSON
                        document.cookie = "idUsuario="+usuario.id;
                        window.location.href = "./home-pokemon-bank.html";
                    } else {
                        swal("PIN Incorrecto", "Inténtelo de nuevo", "error");
                    }
                });

            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });

    }

    // Función para obtener información del usuario que inicio sesión
    function validarUsuario() {
        let idUsuario = obtenerCookie('idUsuario');
        console.log('Usuario: '+idUsuario);

        // Se valida que la cookie traiga información
        if (idUsuario != undefined || idUsuario != null || cierraSesion == false){
            // Se obtiene el archivo json con la información de los usuarios registrados
            fetch('./resources/data/usuarios.json',
            {
                method: 'GET',
                headers: new Headers({ 'Content-type': 'application/json'}),
                mode: 'no-cors'
            })
            .then(response => response.json())
            .then(data => {
                data.usuarios.forEach(usuario => {
                    if (usuario.id === idUsuario) {
                        infoUSuario = usuario;
                    }
                });
                document.getElementById('nombreUsuario').textContent = infoUSuario.nombre + ' ' + infoUSuario.apellido;
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });
        } else {
            window.location.href = "./index.html";
            swal("Sesión caducada", "Vuelva ingresar su PIN", "info");
        }

    }

    // Función para obtener información del usuario que inicio sesión
    function cerrarSesion(event) {
        event.preventDefault();
        cierraSesion = true;
        document.cookie = "idUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "./index.html";
    };

    // Función para obtener la cookie que necesitemos
    function obtenerCookie(nombreCookie){
        let cookie= {};
        document.cookie.split(';').forEach(el => {
            let [key, value] = el.split('=');
            cookie[key.trim()] = value;
        });

        return cookie[nombreCookie];
    }

    // Evento para cerrar sesion
    if (document.getElementById('formMenuHome')) {
        document.getElementById('formMenuHome').addEventListener('submit', cerrarSesion);
    }

    // Evento para ingresar al cajero
    if (document.getElementById('formLogin')) {
        document.getElementById('formLogin').addEventListener('submit', validarPin);
    }
    
});
