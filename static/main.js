let modificar = false;
let ejidatarioid = null;
let modificarP = false;
let parcelaid = null;
let modificarPagos = false;
let pagoid = null;
let modificarAdeudo = false;
let adeudoid = null;

//Consultar tabla de ejidatarios
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("consultaEjidatarios");
    modal.addEventListener("show.bs.modal", function () {
        var tabla = document.getElementById("tablaDatosE").getElementsByTagName("tbody")[0];
        tabla.innerHTML = '';
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/inicioSistema/datosEjidatarios");
        xhr.onload = function () {
            console.log(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            data.forEach(function (row) {
                var newRow = tabla.insertRow(tabla.rows.length);
                newRow.innerHTML = "<td>" + row.id_ejidatario + "</td><td>" + row.nombre_ejidatario + "</td><td>" + row.apellido_paterno + "</td><td>" + row.apellido_materno + "</td><td>" + row.fecha_nacimiento + "</td><td>" + row.num_telefono + "</td><td>" + row.sexo + "</td><td>" + row.estado_civil + "</td><td>" + row.correo_electronico + "</td><td>" + row.codigo_postal + "</td><td>" + row.estado + "</td><td>" + row.municipio + "</td><td>" + row.localidad + "</td><td>" + row.direccion + "</td><td>" + row.calle + "</td><td>" + row.entre_calle + "</td><button type= 'button' class='btn btn-warning btn_modificar' data-bs-toggle = 'modal' data-bs-target = '#registroEjidatario'  style='color: rgb(255, 150, 0); border: none; margin:auto; text-decoration:underline'>" + "Modificar" + "</button><button type= 'button' class= 'btn btn-danger btn-eliminar'style='color: red; margin: auto; border:none; text-decoration:underline;'>" + "Eliminar" + "</button>"

                const eliminarE = newRow.querySelector('.btn-eliminar');
                eliminarE.addEventListener('click', async () => {
                    console.log(row.id_ejidatario)
                    const response = await fetch(`/eliminar/${row.id_ejidatario}`, {
                        method: 'DELETE'
                    })
                    const data = await response.json();
                    console.log(data)

                    newRow.remove();
                    alert("Usuario eliminado")
                })

                const modificarE = newRow.querySelector('.btn_modificar');
                modificarE.addEventListener('click', async () => {
                    const response1 = await fetch(`/buscarEjidatario/${row.id_ejidatario}`);
                    const data = await response1.json();
                    console.log(data);

                    registroEjidatario['inputNombre'].value = data.nombre_ejidatario;
                    registroEjidatario['inputApellidoP'].value = data.apellido_paterno;
                    registroEjidatario['inputApellidoM'].value = data.apellido_materno;
                    registroEjidatario['inputFechaN'].value = data.fecha_nacimiento;
                    registroEjidatario['inputNumTelefono'].value = data.telefono;
                    const radioButtons = document.getElementsByName('inlineRadioOptions');
                    let seleccionado = '';
                    for (let i = 0; i < radioButtons.length; i++) {
                        if (radioButtons[i].checked) {
                            seleccionado = radioButtons[i];
                            break
                        }
                    }
                    const sexo = seleccionado.value = data.sexo;
                    const select = document.getElementById('estadoCivilR');
                    const estadoCivil = select.options[select.selectedIndex].value = data.estado_civil;
                    registroEjidatario['inputEmail'].value = data.correo_electronico;
                    registroEjidatario['inputCodigoP'].value = data.codigo_postal;
                    registroEjidatario['inputEstado'].value = data.estado;
                    registroEjidatario['inputMunicipio'].value = data.municipio;
                    registroEjidatario['inputLocalidad'].value = data.localidad;
                    registroEjidatario['inputDireccion'].value = data.direccion;
                    registroEjidatario['inputCalle'].value
                        = data.calle;
                    registroEjidatario['inputCalle1'].value = data.entre_calle;

                    modificar = true;
                    ejidatarioid = data.id_ejidatario;
                })
            });
        };
        xhr.send();
    })
})

//registro de ejidatarios
const registroEjidatario = document.querySelector('#formularioRegistroE');
registroEjidatario.addEventListener('submit', async e => {
    e.preventDefault();

    const nombre = registroEjidatario['inputNombre'].value;
    const apellidoP = registroEjidatario['inputApellidoP'].value;
    const apellidoM = registroEjidatario['inputApellidoM'].value;
    const fecha = registroEjidatario['inputFechaN'].value;
    const telefono = registroEjidatario['inputNumTelefono'].value;
    const radioButtons = document.getElementsByName('inlineRadioOptions');
    let seleccionado = '';
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            seleccionado = radioButtons[i];
            break
        }
    }
    const sexo = seleccionado.value;
    const select = document.getElementById('estadoCivilR');
    const estadoCivil = select.options[select.selectedIndex].value;
    const email = registroEjidatario['inputEmail'].value;
    const cp = registroEjidatario['inputCodigoP'].value;
    const estado = registroEjidatario['inputEstado'].value;
    const municipio = registroEjidatario['inputMunicipio'].value;
    const localidad = registroEjidatario['inputLocalidad'].value;
    const direccion = registroEjidatario['inputDireccion'].value;
    const calle = registroEjidatario['inputCalle'].value;
    const entreCalle = registroEjidatario['inputCalle1'].value;

    if (!modificar) {
        const response = await fetch('/inicioSistema/registroEjidatario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                apellidoP,
                apellidoM,
                fecha,
                telefono,
                sexo,
                estadoCivil,
                email,
                cp,
                estado,
                municipio,
                localidad,
                direccion,
                calle,
                entreCalle,
            })
        })
        const data = await response.json();
        console.log(data);
        registroEjidatario.reset();
        //newRow.push(data);
    } else {
        console.log("Actualizando")
        const response = await fetch(`/modificar/${ejidatarioid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                apellidoP,
                apellidoM,
                fecha,
                telefono,
                sexo,
                estadoCivil,
                email,
                cp,
                estado,
                municipio,
                localidad,
                direccion,
                calle,
                entreCalle,
            }),
        });
        const data = await response.json();
        console.log(data);
        registroEjidatario.reset();
    }
})

//registro de párcelas
const registroParcela = document.querySelector('#formularioRegistroP');
registroParcela.addEventListener('submit', async e => {
    e.preventDefault();

    const largo = registroParcela['inputLargo'].value;
    const ancho = registroParcela['inputAncho'].value;
    const metrosCuadrados = registroParcela['inputmtrs'].value;
    const propietario = registroParcela['inputPropietario'].value;

    if (!modificarP) {
        const response = await fetch('/inicioSistema/registroParcela', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                largo,
                ancho,
                metrosCuadrados,
                propietario
            })
        })
        const data = await response.json();
        console.log(data);
        registroParcela.reset();
    } else {
        console.log("Actualizando")
        const response = await fetch(`/modificarP/${parcelaid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                largo,
                ancho,
                metrosCuadrados,
                propietario
            })
        })
        const data = await response.json();
        console.log(data);
        registroParcela.reset();
    }
})


//Consultar tabla de parcelas
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("consultaParcelas");
    modal.addEventListener("show.bs.modal", function () {
        var tabla = document.getElementById("tablaDatosP").getElementsByTagName("tbody")[0];
        tabla.innerHTML = '';
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/inicioSistema/datosParcelas");
        xhr.onload = function () {
            console.log(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            data.forEach(function (row) {
                var newRow = tabla.insertRow(tabla.rows.length);
                newRow.innerHTML = "<td>" + row.id_parcela + "</td><td>" + row.largo + "</td><td>" + row.ancho + "</td><td>" + row.metros_cuadrados + "</td><td>" + row.nombre_propietario + "</td><button type= 'button' class='btn btn-warning btn_modificarP' data-bs-toggle = 'modal' data-bs-target = '#registroParcelas'  style='color: rgb(255, 150, 0); border:none; margin:auto; text-decoration:underline;'>" + "Modificar" + "</button><button type= 'button' class= 'btn btn-danger btn-eliminarP' style='color: red; text-decoration:underline; margin:auto; border:none'>" + "Eliminar" + "</button>"

                const eliminarP = newRow.querySelector('.btn-eliminarP');
                eliminarP.addEventListener('click', async () => {
                    console.log(row.id_parcela)
                    const response = await fetch(`/eliminarP/${row.id_parcela}`, {
                        method: 'DELETE'
                    })
                    const data = await response.json();
                    console.log(data)

                    newRow.remove();
                    alert("Usuario eliminado")
                })

                const modificarPa = newRow.querySelector('.btn_modificarP');
                modificarPa.addEventListener('click', async () => {
                    const responseP = await fetch(`/buscarParcela/${row.id_parcela}`);
                    const data = await responseP.json();
                    console.log(data);

                    registroParcela['inputLargo'].value = data.largo;
                    registroParcela['inputAncho'].value = data.ancho;
                    registroParcela['inputmtrs'].value = data.metros_cuadrados;
                    registroParcela['inputPropietario'].value = data.nombre_propietario;


                    modificarP = true;
                    parcelaid = data.id_parcela;
                })
            });
        };
        xhr.send();
    })
})



//Buscar Ejidatatrio para el modal de registro de parcelas
/*
const formularioBuscarE = document.querySelector('#formularioBuscar');
formularioBuscarE.addEventListener('click', async e => {
    e.preventDefault();

    const buscar = formularioBuscarE['inputBuscar'].value;

    const response = await fetch('/buscarEjidatario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            buscar
        })
    })
    const data = await response.json();
    console.log(data);
    registroParcela.reset();
})
*/

//registro de pagos
const registroPagos = document.querySelector('#formularioPagos');
registroPagos.addEventListener('submit', async e => {
    e.preventDefault();

    const nomPropietario = registroPagos['inputNomPago'].value;
    const concepto = registroPagos['inputConcepto'].value;
    const numParcela = registroPagos['inputNumParP'].value;
    const localidad = registroPagos['inputLocalidadP'].value;
    const monto = registroPagos['inputMonto'].value;
    const adeudos = registroPagos['inputAdeudos'].value;
    const total = registroPagos['inputTotalP'].value;

    if (!modificarPagos) {
        const response = await fetch('/inicioSistema/registroPagos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomPropietario,
                concepto,
                numParcela,
                localidad,
                monto,
                adeudos,
                total
            })
        })
        const data = await response.json();
        console.log(data);
        registroPagos.reset();
    } else {
        const response = await fetch(`/modificarPagos/${pagoid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomPropietario,
                concepto,
                numParcela,
                localidad,
                monto,
                adeudos,
                total
            })
        })
        const data = await response.json();
        console.log(data);
        registroPagos.reset();
    }
})

//Consultar tabla de pagos
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("consultaPagos");
    modal.addEventListener("show.bs.modal", function () {
        var tabla = document.getElementById("tablaDatosPa").getElementsByTagName("tbody")[0];
        tabla.innerHTML = '';
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/inicioSistema/datosPagos");
        xhr.onload = function () {
            console.log(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            data.forEach(function (row) {
                var newRow = tabla.insertRow(tabla.rows.length);
                newRow.innerHTML = "<td>" + row.id_pago + "</td><td>" + row.nombre_propietario + "</td><td>" + row.concepto + "</td><td>" + row.numero_parcela + "</td><td>" + row.localidad + "</td><td>" + row.monto + "</td><td>" + row.adeudos + "</td><td>" + row.total + "</td><button type= 'button' class='btn btn-warning btn_modificarPa' data-bs-toggle = 'modal' data-bs-target = '#registroPagos'  style='background: yellow; color: black;'>" + "Modificar" + "</button><button type= 'button' class= 'btn btn-danger btn-eliminarPa'style='background: red; color: black;'>" + "Eliminar" + "</button>"

                const eliminarPa = newRow.querySelector('.btn-eliminarPa');
                eliminarPa.addEventListener('click', async () => {
                    console.log(row.id_pago)
                    const response = await fetch(`/eliminarPagos/${row.id_pago}`, {
                        method: 'DELETE'
                    })
                    const data = await response.json();
                    console.log(data)

                    newRow.remove();
                    alert("Usuario eliminado")
                })

                const modificarPag = newRow.querySelector('.btn_modificarPa');
                modificarPag.addEventListener('click', async () => {
                    const responseP = await fetch(`/buscarPagos/${row.id_pago}`);
                    const data = await responseP.json();
                    console.log(data);

                    registroPagos['inputNomPago'].value = data.nombre_propietario;
                    registroPagos['inputConcepto'].value = data.concepto;
                    registroPagos['inputNumParP'].value = data.numero_parcela;
                    registroPagos['inputLocalidadP'].value = data.localidad;
                    registroPagos['inputMonto'].value = data.monto;
                    registroPagos['inputAdeudos'].value = data.adeudos;
                    registroPagos['inputTotalP'].value = data.total;


                    modificarPagos = true;
                    pagoid = data.id_pago;
                })
            });
        };
        xhr.send();
    })
})

//registro de adeudos
const registroAdeudos = document.querySelector('#formularioAdeudos');
registroAdeudos.addEventListener('submit', async e => {
    e.preventDefault();

    const numParcela = registroAdeudos['inputParA'].value;
    const anios = registroAdeudos['inputAnios'].value;
    const totalA = registroAdeudos['inputTotal'].value;


    if(!modificarAdeudo){

        const response = await fetch('/inicioSistema/registroAdeudos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numParcela,
                anios,
                totalA
            })
        })
        const data = await response.json();
        console.log(data);
        registroAdeudos.reset();
    }else{
        console.log("Actualizando")
        const response = await fetch(`/modificarAdeudos/${adeudoid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numParcela,
                anios,
                totalA
            })
        })
        const data = await response.json();
        console.log(data);
        registroAdeudos.reset();
    }
    
})

//Consultar tabla de adeudos
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("consultaAdeudos");
    modal.addEventListener("show.bs.modal", function () {
        var tabla = document.getElementById("tablaDatosA").getElementsByTagName("tbody")[0];
        tabla.innerHTML = '';
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/inicioSistema/datosAdeudos");
        xhr.onload = function () {
            console.log(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            data.forEach(function (row) {
                var newRow = tabla.insertRow(tabla.rows.length);
                newRow.innerHTML = "<td>" + row.id_adeudo + "</td><td>" + row.numero_parcela + "</td><td>" + row.años + "</td><td>" + row.total + "</td><button type= 'button' class='btn btn-warning btn_modificarAdeudos' data-bs-toggle = 'modal' data-bs-target = '#registroAdeudos'  style='background: yellow; color: black;'>" + "Modificar" + "</button><button type= 'button' class= 'btn btn-danger btn-eliminarAdeudos'style='background: red; color: black;'>" + "Eliminar" + "</button>"

                const eliminarAdeu = newRow.querySelector('.btn-eliminarAdeudos');
                eliminarAdeu.addEventListener('click', async () => {
                    console.log(row.id_adeudo)
                    const response = await fetch(`/eliminarAdeudos/${row.id_adeudo}`, {
                        method: 'DELETE'
                    })
                    const data = await response.json();
                    console.log(data)

                    newRow.remove();
                    alert("Usuario eliminado")
                })

                const modificarAdeu = newRow.querySelector('.btn_modificarAdeudos');
                modificarAdeu.addEventListener('click', async () => {
                    const responseAde = await fetch(`/buscarAdeudo/${row.id_adeudo}`);
                    const data = await responseAde.json();
                    console.log(data);

                    registroAdeudos['inputParA'].value = data.numero_parcela;
                    registroAdeudos['inputAnios'].value = data.años;
                    registroAdeudos['inputTotal'].value = data.total;


                    modificarAdeudo = true;
                    adeudoid = data.id_adeudo;
                })
            });
        };
        xhr.send();
    })
})


document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = {
        correo: document.getElementById('inputEmail1').value,
        contrasenia: document.getElementById('inputPassword').value
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Manejar la respuesta del servidor
    })
    .catch(error => console.error('Error:', error));
});
