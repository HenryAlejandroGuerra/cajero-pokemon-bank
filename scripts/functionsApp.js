// Variable que guardará la información del usuario que inicie sesión
var infoUsuario;

$(document).ready(function () {

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
                console.log(data.usuarios);
                // Aquí puedes realizar la comparación con los datos del archivo JSON
                data.usuarios.forEach(usuario => {
                    console.log(usuario);
                    if (usuario.pin === contrasenia) {
                        // El PIN ingresado coincide con el usuario en el archivo JSON
                        infoUsuario = usuario;
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

    // Evento para ingresar al cajero
    document.getElementById('login').addEventListener('submit', validarPin);

});
