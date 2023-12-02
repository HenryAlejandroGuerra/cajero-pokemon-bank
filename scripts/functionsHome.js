$(document).ready(function () {

    // Inicializamos la pantalla
    let idUsuario;
    let nombreUsuario;
    let apellidoUsuario;
    let cuentaUsuario;
    let saldoUsuario;
    let saldoFlotUsuario;
    let historialTransacciones;
    let dataInicioTable = [];

    $('#consultasSaldoTabla').DataTable({
        columns: [
            { title: 'Monto' },
            { title: 'Estado' }
        ],
        data: dataInicioTable
    });

    $('#HistorialTabla').DataTable({
        columns: [
            { title: 'Monto' },
            { title: 'Descripción' },
            { title: 'Fecha' }
        ],
        data: dataInicioTable
    });

    let cantDepositos = 0;
    let cantRetiros = 0;
    let cantServicioElectricidad = 0;
    let cantServicioAgua = 0;
    let cantServicioInternet = 0;
    let cantServicioTelefonia = 0;

    // Creando el gráfico inicial
    const ctx = document.getElementById('analisisTransacciones').getContext('2d');
    const analisisTransacciones = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Depósitos', 'Retiros', 'Pagos de Electricidad', 'Pagos de Agua Potable', 'Pagos de Internet', 'Pagos de Telefonía'],
        datasets: [{
        label: 'Número de Transacciones',
        data: [cantDepositos, cantRetiros, cantServicioElectricidad, cantServicioAgua, cantServicioInternet, cantServicioTelefonia],
        backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
    });

    actualizarInfo();
    validarUsuario();

    // Función para obtener información del usuario que inicio sesión
    function validarUsuario() {
        console.log('Usuario: '+nombreUsuario+" "+apellidoUsuario);

        // Se valida que el usuario esté con la sesión iniciada
        if (idUsuario != undefined && idUsuario != null){
            // Se obtiene el archivo json con la información de los usuarios registrados
            document.getElementById('nombreUsuario').textContent = nombreUsuario + ' ' + apellidoUsuario;
            document.getElementById('mensajeBienvenida').textContent = 'Bienvenido/a ' + nombreUsuario + ' ' + apellidoUsuario;

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
        var selectConsultas = document.getElementById('seleccionCuentaConsultas');
        var selectPagarServicio = document.getElementById('seleccionCuentaPagoServicio');
        var selectServicio = document.getElementById('seleccionServicio');

        // Establece el valor y el texto de la opción para Depósitos
        // Crea una nueva opción
        var optionDep = document.createElement('option');
        optionDep.value = cuentaUsuario;
        optionDep.textContent = 'Cuenta No. - ' + cuentaUsuario;
        // Agrega la opción al elemento select
        selectDepositos.appendChild(optionDep);

        // Establece el valor y el texto de la opción para Retiros
        // Crea una nueva opción
        var optionRe = document.createElement('option');
        optionRe.value = cuentaUsuario;
        optionRe.textContent = 'Cuenta No. - ' + cuentaUsuario;
        // Agrega la opción al elemento select
        selectRetiros.appendChild(optionRe);

        // Establece el valor y el texto de la opción para Consultas
        // Crea una nueva opción
        var optionConsul = document.createElement('option');
        optionConsul.value = cuentaUsuario;
        optionConsul.textContent = 'Cuenta No. - ' + cuentaUsuario;
        // Agrega la opción al elemento select
        selectConsultas.appendChild(optionConsul);

        // Establece el valor y el texto de la opción para Pagar Servicios
        // Crea una nueva opción
        var optionCtaServicio = document.createElement('option');
        optionCtaServicio.value = cuentaUsuario;
        optionCtaServicio.textContent = 'Cuenta No. - ' + cuentaUsuario;
        // Agrega la opción al elemento select
        selectPagarServicio.appendChild(optionCtaServicio);
        
        // Crea una nueva opción para los servicios
        var optionServicio1 = document.createElement('option');
        optionServicio1.value = 'Energía Eléctrica';
        optionServicio1.textContent = 'Servicio - Energía Eléctrica';

        var optionServicio2 = document.createElement('option');
        optionServicio2.value = 'Internet';
        optionServicio2.textContent = 'Servicio - Internet';

        var optionServicio3 = document.createElement('option');
        optionServicio3.value = 'Telefonía';
        optionServicio3.textContent = 'Servicio - Telefonía';

        var optionServicio4 = document.createElement('option');
        optionServicio4.value = 'Agua Potable';
        optionServicio4.textContent = 'Servicio - Agua Potable';
        
        // Agrega la opción al elemento select
        selectServicio.appendChild(optionServicio1);
        selectServicio.appendChild(optionServicio2);
        selectServicio.appendChild(optionServicio3);
        selectServicio.appendChild(optionServicio4);
    };

    // Función para agregar la data a la tabla consultas
    function agregarDataTablaConsulta(dataConsultas) {
        $('#consultasSaldoTabla').DataTable().destroy();
        
        $('#consultasSaldoTabla').DataTable({
            columns: [
                { title: 'Monto' },
                { title: 'Estado' }
            ],
            data: dataConsultas
        });
    };

    // Función para agregar la data a la tabla de historial de transacciones
    function agregarDataTablaHistorial(dataHistorial) {
        $('#HistorialTabla').DataTable().destroy();
        
        $('#HistorialTabla').DataTable({
            columns: [
                { title: 'Monto' },
                { title: 'Descripción' },
                { title: 'Fecha' }
            ],
            data: dataHistorial
        });
    };

    // Función para obtener los valores actualizados del LocalStorage
    function actualizarInfo() {
        idUsuario = localStorage.getItem("idUsuario");
        nombreUsuario = localStorage.getItem("nombre");
        apellidoUsuario = localStorage.getItem("apellido");
        cuentaUsuario = localStorage.getItem("cuenta");
        saldoUsuario = localStorage.getItem("saldo");
        saldoFlotUsuario = localStorage.getItem("saldoFlotante");
        historialTransacciones = JSON.parse(localStorage.getItem("historialTransacciones"));

        cantDepositos = localStorage.getItem("cantDepositos");
        cantRetiros = localStorage.getItem("cantRetiros");
        cantServicioElectricidad = localStorage.getItem("cantServicioElectricidad");
        cantServicioAgua = localStorage.getItem("cantServicioAgua");
        cantServicioInternet = localStorage.getItem("cantServicioInternet");
        cantServicioTelefonia = localStorage.getItem("cantServicioTelefonia");

        actualizarGrafico();

        const dataConsultas = [
            ['$ '+saldoUsuario, 'Disponible'],
            ['$ '+saldoFlotUsuario, 'Flotante']
        ];

        const dataHistorial = [];
        historialTransacciones.forEach(trans => {
            dataHistorial.push(['$ '+trans.monto, trans.descripcion, trans.fecha]);
        });

        agregarDataTablaConsulta(dataConsultas);
        agregarDataTablaHistorial(dataHistorial)
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

        var fechaActual = new Date();

        historialTransacciones.push({
            monto: cantDeposito,
            descripcion: "Depósito",
            fecha: fechaActual
        });

        actualizarValor("saldo", nuevoSaldo);
        actualizarValor("historialTransacciones", JSON.stringify(historialTransacciones));
        actualizarInfo();
        cantDepositos = parseInt(cantDepositos) + 1;
        actualizarValor("cantDepositos", cantDepositos);
        actualizarGrafico();

        inputCantDeposito.value = "";
        swal("Depósito con éxito", "Puede verificar su depósito en el historial de transacciones", "success");
        setTimeout(function() {
            swal.close();
        }, 5000);
    };

    // Función para realizar un retiro
    function realizarRetiro(event) {
        event.preventDefault();
        
        const selectCuentaDeposito = document.getElementById('seleccionCuentaRetiros');
        const cuentaDeposito = selectCuentaDeposito.value;

        const inputCantRetiro = document.getElementById('cantRetiro');
        const cantRetiro = inputCantRetiro.value;

        var nuevoSaldo = parseInt(saldoUsuario) - parseInt(cantRetiro);
        console.log('Nuevo saldo:');
        console.log(nuevoSaldo);

        var fechaActual = new Date();

        historialTransacciones.push({
            monto: cantRetiro,
            descripcion: "Retiro",
            fecha: fechaActual
        });

        actualizarValor("saldo", nuevoSaldo);
        actualizarValor("historialTransacciones", JSON.stringify(historialTransacciones));
        actualizarInfo();
        cantRetiros = parseInt(cantRetiros) + 1;
        actualizarValor("cantRetiros", cantRetiros);
        actualizarGrafico();

        inputCantRetiro.value = "";
        swal("Retiro con éxito", "Tome su dinero en efectivo", "success");
        setTimeout(function() {
            swal.close();
        }, 5000);
    };

    // Función para realizar un pago de servicio
    function realizarPagoServicio(event) {
        event.preventDefault();
        
        const selectServicio = document.getElementById('seleccionServicio');
        const servicio = selectServicio.value;

        const inputCantPagarServicio = document.getElementById('cantPagarServicio');
        const cantPagarServicio = inputCantPagarServicio.value;

        var nuevoSaldo = parseInt(saldoUsuario) - parseInt(cantPagarServicio);
        console.log('Nuevo saldo:');
        console.log(nuevoSaldo);

        var fechaActual = new Date();

        historialTransacciones.push({
            monto: cantPagarServicio,
            descripcion: servicio,
            fecha: fechaActual
        });

        actualizarValor("saldo", nuevoSaldo);
        actualizarValor("historialTransacciones", JSON.stringify(historialTransacciones));
        actualizarInfo();

        if (servicio == "Energía Eléctrica") {
            cantServicioElectricidad = parseInt(cantServicioElectricidad) + 1;
            actualizarValor("cantServicioElectricidad", cantServicioElectricidad);
        }
        if (servicio == "Agua Potable") {
            cantServicioAgua = parseInt(cantServicioAgua) + 1;
            actualizarValor("cantServicioAgua", cantServicioAgua);
        }
        if (servicio == "Internet") {
            cantServicioInternet = parseInt(cantServicioInternet) + 1;
            actualizarValor("cantServicioInternet", cantServicioInternet);
        }
        if (servicio == "Telefonía") {
            cantServicioTelefonia = parseInt(cantServicioTelefonia) + 1;
            actualizarValor("cantServicioTelefonia", cantServicioTelefonia);
        }
        
        actualizarGrafico();

        inputCantPagarServicio.value = "";
        swal("Pago con éxito", "Su pago de servicio se ha aplicado exitosamente", "success");
        setTimeout(function() {
            swal.close();
        }, 5000);
    };

    // Función para realizar un retiro
    function realizarConsulta(event) {
        event.preventDefault();
        actualizarInfo();
    };
    
    // Función para descargar un pdf con el analisis
    function descargarAnalisis(event) {
        event.preventDefault();
        var fechaActual = new Date();

        
        // Inicializa el número de líneas en el documento PDF y crea una instancia de jsPDF.
        let lineas = 10;
        let doc = new jsPDF();
        
        // Agrega el encabezado al documento PDF con el nombre de usuario y la fecha actual.
        lineas += 10;
        doc.text(10, lineas, `Transacciones - ` + nombreUsuario + ` ` + apellidoUsuario + fechaActual);
        
        // Guarda el documento PDF con un nombre específico.
        doc.save("Reporte-" + nombreUsuario + "-" + apellidoUsuario + ".pdf");
    };

    // Función para actualizar el gráfico de análisis
    function actualizarGrafico() {
        analisisTransacciones.data.datasets[0].data = [cantDepositos, cantRetiros, cantServicioElectricidad, cantServicioAgua, cantServicioInternet, cantServicioTelefonia];
        analisisTransacciones.update();
    }

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

    // Evento para realizar retiros
    if (document.getElementById('formRetiro')) {
        document.getElementById('formRetiro').addEventListener('submit', realizarRetiro);
    }

    // Evento para realizar pagos de servicios
    if (document.getElementById('formPagoServicio')) {
        document.getElementById('formPagoServicio').addEventListener('submit', realizarPagoServicio);
    }

    // Evento para realizar consultas
    if (document.getElementById('formConsulta')) {
        document.getElementById('formConsulta').addEventListener('submit', realizarConsulta);
    }

    // Evento para descargar pdf con el analisis
    if (document.getElementById('formAnalisis')) {
        document.getElementById('formAnalisis').addEventListener('submit', descargarAnalisis);
    }
    
});
