$(document).ready(function () {

    // Inicializamos la pantalla
    let idUsuario;
    let nombreUsuario;
    let apellidoUsuario;
    let cuentaUsuario;
    let saldoUsuario;

    actualizarInfo();
    validarUsuario();

    // Función para obtener información del usuario que inicio sesión
    function validarUsuario() {
        console.log('Usuario: '+nombreUsuario+" "+apellidoUsuario);

        // Se valida que el usuario esté con la sesión iniciada
        if (idUsuario != undefined && idUsuario != null){
            // Se obtiene el archivo json con la información de los usuarios registrados
            document.getElementById('nombreUsuario').textContent = nombreUsuario + ' ' + apellidoUsuario;

            agregarCuentasFormularios();
        } else {
            swal("Sesión caducada", "Vuelva ingresar su PIN", "info");
            setTimeout(function() {
                window.location.href = "./index.html";
            }, 5000);
        }

    }

    // Función para agregar las cuentas del usuario a los formularios
    function agregarCuentasFormularios() {
        // Se obtiene la referencia de los select
        var selectDepositos = document.getElementById('seleccionCuentaDepositos');
        var selectRetiros = document.getElementById('seleccionCuentaRetiros');

        // Establece el valor y el texto de la opción para Depósitos
        // Crea una nueva opción
        var option = document.createElement('option');
        option.value = cuentaUsuario;
        option.textContent = 'Cuenta No. - ' + cuentaUsuario;
        // Agrega la opción al elemento select
        selectDepositos.appendChild(option);

        // Establece el valor y el texto de la opción para Retiros
        // Crea una nueva opción
        var option = document.createElement('option');
        option.value = cuentaUsuario;
        option.textContent = 'Cuenta No. - ' + cuentaUsuario;
        // Agrega la opción al elemento select
        selectRetiros.appendChild(option);
    };

    // Función para obtener los valores actualizados del LocalStorage
    function actualizarInfo() {
        idUsuario = localStorage.getItem("idUsuario");
        nombreUsuario = localStorage.getItem("nombre");
        apellidoUsuario = localStorage.getItem("apellido");
        cuentaUsuario = localStorage.getItem("cuenta");
        saldoUsuario = localStorage.getItem("saldo");
    };

    // Función para realizar un depósito
    function realizarDeposito(event) {
        event.preventDefault();
        
        const selectCuentaDeposito = document.getElementById('seleccionCuentaDepositos');
        const cuentaDeposito = selectCuentaDeposito.value;

        const inputCantDeposito = document.getElementById('cantDeposito');
        const cantDeposito = inputCantDeposito.value;

        var nuevoSaldo = parseInt(saldoUsuario) + parseInt(cantDeposito);
        console.log('Nuevo saldo:');
        console.log(nuevoSaldo);

        actualizarValor("saldo", nuevoSaldo);
        actualizarInfo();
    };

    // Función para obtener información del usuario que inicio sesión
    function cerrarSesion(event) {
        event.preventDefault();
        localStorage.clear();
        window.location.href = "./index.html";
    };

    // Función para reemplazar el valor de una data en el LocalStorage
    function actualizarValor(clave, valor) {
        localStorage.removeItem(clave);
        localStorage.setItem(clave, valor);
        console.log('Se actualizó el valor de '+clave+' por: '+valor);
    };

    // Evento para cerrar sesion
    if (document.getElementById('formMenuHome')) {
        document.getElementById('formMenuHome').addEventListener('submit', cerrarSesion);
    }

    // Evento para realizar deposito
    if (document.getElementById('formDeposito')) {
        document.getElementById('formDeposito').addEventListener('submit', realizarDeposito);
    }
    
});
