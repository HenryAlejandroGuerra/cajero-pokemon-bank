$(document).ready(function () {

    // Inicializamos la pantalla
    const jsonInicial = {
        "usuarios": [
            {
                "id": "1",
                "nombre": "Ash",
                "apellido": "Ketchum",
                "pin": "1234",
                "cuenta": "0987654321",
                "saldo": 500.00
            },
            {
                "id": "2",
                "nombre": "Henry",
                "apellido": "Martinez",
                "pin": "5678",
                "cuenta": "1011121314",
                "saldo": 100.00
            }
        ]
    };

    // Función que verifica si el usuario existe
    function validarPin(event) {
        event.preventDefault();
        const inputContrasenia= document.getElementById('pinUser');
        const contrasenia = inputContrasenia.value;

        // Se obtiene el archivo json con la información de los usuarios registrados
        //const json = JSON.parse(jsonInicial);

        // Aquí se realiza la comparación con los datos del JSON
        jsonInicial.usuarios.forEach(usuario => {
            // El PIN ingresado coincide con el usuario en el archivo JSON
            if (usuario.pin === contrasenia) {
                //document.cookie = "idUsuario="+usuario.id;
                localStorage.setItem('idUsuario', usuario.id);
                localStorage.setItem('nombre', usuario.nombre);
                localStorage.setItem('apellido', usuario.apellido);
                localStorage.setItem('pin', usuario.pin);
                localStorage.setItem('cuenta', usuario.cuenta);
                localStorage.setItem('saldo', usuario.saldo);
                window.location.href = "./home-pokemon-bank.html";
            } else {
                swal("PIN Incorrecto", "Inténtelo de nuevo", "error");
            }
        });
    }

    // Función para obtener la cookie que necesitemos
    function obtenerCookie(nombreCookie){
        let cookie= {};
        document.cookie.split(';').forEach(el => {
            let [key, value] = el.split('=');
            cookie[key.trim()] = value;
        });

        return cookie[nombreCookie];
    }

    // Evento para ingresar al cajero
    if (document.getElementById('formLogin')) {
        document.getElementById('formLogin').addEventListener('submit', validarPin);
    }
    
});
