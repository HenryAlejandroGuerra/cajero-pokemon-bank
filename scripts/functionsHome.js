$(document).ready(function () {

    //Inicializamos la pantalla
    var infoUSuario;
    var cuentasUsuario = [];
    var cierraSesion = false;

    validarUsuario();

    // Función para obtener información del usuario que inicio sesión
    function validarUsuario() {
        let idUsuario = obtenerCookie('idUsuario');
        console.log('Usuario: '+idUsuario);

        // Se valida que la cookie traiga información
        if (idUsuario != undefined && idUsuario != null && cierraSesion == false){
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

            // Cargar información de cuentas del usuario
            fetch('./resources/data/cuentas.json',
            {
                method: 'GET',
                headers: new Headers({ 'Content-type': 'application/json'}),
                mode: 'no-cors'
            })
            .then(response => response.json())
            .then(data => {
                data.cuentas.forEach(cuentas => {
                    if (cuentas.idUsuario === infoUSuario.id) {
                        cuentasUsuario.push(cuentas);
                    }
                });
                console.log('Cuentas asociadas:');
                console.log(cuentasUsuario);
                // Se agregan las opciones para realizar las diferentes validaciones
                agregarCuentasFormularios();
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });

        } else {
            swal("Sesión caducada", "Vuelva ingresar su PIN", "info");
            setTimeout(function() {
                window.location.href = "./index.html";
            }, 3000);
        }

    }

    // Función para agregar las cuentas del usuario a los formularios
    function agregarCuentasFormularios() {
        // Se obtiene la referencia de los select
        var selectDepositos = document.getElementById('seleccionCuentaDepositos');
        var selectRetiros = document.getElementById('seleccionCuentaRetiros');

        // Establece el valor y el texto de la opción para Depósitos
        cuentasUsuario.forEach(cuenta => {
            // Crea una nueva opción
            var option = document.createElement('option');

            option.value = cuenta.numeroCuenta;
            option.textContent = 'Cuenta No. - '+cuenta.numeroCuenta;

            // Agrega la opción al elemento select
            selectDepositos.appendChild(option);
        });

        // Establece el valor y el texto de la opción para Retiros
        cuentasUsuario.forEach(cuenta => {
            // Crea una nueva opción
            var option = document.createElement('option');

            option.value = cuenta.numeroCuenta;
            option.textContent = 'Cuenta No. - '+cuenta.numeroCuenta;

            // Agrega la opción al elemento select
            selectRetiros.appendChild(option);
        });

    };

    // Función para realizar un depósito
    function realizarDeposito(event) {
        event.preventDefault();
        
        const selectCuentaDeposito = document.getElementById('seleccionCuentaDepositos');
        const cuentaDeposito = selectCuentaDeposito.value;

        const inputCantDeposito = document.getElementById('cantDeposito');
        const cantDeposito = inputCantDeposito.value;

        fetch('./resources/data/cuentas.json',
        {
            method: 'GET',
            headers: new Headers({ 'Content-type': 'application/json'}),
            mode: 'no-cors'
        })
        .then(response => response.json())
        .then(data => {
            data.cuentas.forEach(cuenta => {
                if (cuenta.numeroCuenta === cuentaDeposito) {
                    console.log('Numero de Cuenta');
                    console.log(cuenta.numeroCuenta);
                    var nuevoSaldo = cuenta.saldo + parseInt(cantDeposito);
                    console.log('Nuevo saldo');
                    console.log(nuevoSaldo);
                    cuenta.saldo = parseInt(nuevoSaldo);
                }

            });

            console.log('Nuevo data');
            console.log(data);
            let jsonString = JSON.stringify(data);
            // Guardar los cambios en el archivo JSON
            fs.writeFile('./resources/data/cuentas.json', jsonString, 'utf8', function(err) {
                if (err) {
                    console.log('Error al guardar el archivo JSON:', err);
                } else {
                    console.log('Archivo JSON modificado y guardado exitosamente.');
                }
            });

        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });

    };

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

    // Evento para realizar deposito
    if (document.getElementById('formDeposito')) {
        document.getElementById('formDeposito').addEventListener('submit', realizarDeposito);
    }
    
});
