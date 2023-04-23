/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};


// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}

/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}

/**
 * Función que recuperar todos los plantilla llamando al MS plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */ 
Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los plantilla que se han descargado
    let vectorPlantilla = null
    if (response) {
        vectorPlantilla = await response.json()
        callBackFn(vectorPlantilla.data)
    }
}

/**
 * Función que recuperar todos los plantilla llamando al MS plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */ 
Plantilla.recuperaAlfabetic = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los plantilla que se han descargado
    let vectorPlantilla = null
    if (response) {
        vectorPlantilla = await response.json()
        vectorPlantilla.data.sort((a,b) => {
            const nomA = a.data.Nombre_completo.Apellidos.toLowerCase();
            const nomB = b.data.Nombre_completo.Apellidos.toLowerCase();
            
            if(nomA < nomB) { 
                return -1; 
            }
            if(nomA > nomB) { 
                return 1; 
            }
            return 0;
        });

        callBackFn(vectorPlantilla.data)
    }
}

/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        console.log(idPersona);
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const plantilla = await response.json()
            callBackFn(plantilla)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}


/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} nopmbre nombre de la persona a buscar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaBuscar = async function (callBackFn, nombre) {
    let response = null
    //console.log(nombre);
    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Filtro el vector de personas para obtener solo la que tiene el nombre pasado como parámetro
    let vectorPlantilla = null
    if (response) {
        vectorPlantilla = await response.json()
        //console.log(vectorPlantilla.data[0].data)     
        const filtro = vectorPlantilla.data.filter(persona => persona.data.Nombre_completo.Nombre === nombre);
        //console.log(filtro)        
        callBackFn(filtro)
    }else{
        console.error('Error')
    }
}


/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} var1 nombre de la persona a buscar
 * @param {String} var2 localidad de la persona a buscar
 * @param {String} var3 mejor estilo de natacion de la persona a buscar
 * @param {String} var4 años de participacion en mundial de la persona a buscar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaBuscarCuatro = async function (callBackFn, var1, var2, var3,var4) {
    let response = null
    //console.log(nombre);
    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Filtro el vector de personas para obtener solo la que tiene el nombre pasado como parámetro
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
       // console.log(vectorPersonas.data)     
        const filtro = vectorPersonas.data.filter(persona => persona.data.Nombre_completo.Nombre === var1 && persona.data.Direccion.localidad === var2 && persona.data.Mejor_estilo_natacion === var3 && persona.data.Anios_participacion_en_mundial.filter(Anios_participacion_en_mundial => Anios_participacion_en_mundial === var4))
        console.log(filtro)        
        callBackFn(filtro)
    }
}

/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} var1 nombre de la persona a buscar
 * @param {String} var2 localidad de la persona a buscar
 * @param {String} var3 mejor estilo de natacion de la persona a buscar
 * @param {String} var4 años de participacion en mundial de la persona a buscar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaBuscarPorUno = async function (callBackFn, var1, var2, var3,var4) {
    let response = null
    //console.log(nombre);
    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Filtro el vector de personas para obtener solo la que tiene el nombre pasado como parámetro
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
       // console.log(vectorPersonas.data)     
        const filtro = vectorPersonas.data.filter(persona => persona.data.Nombre_completo.Nombre === var1 || persona.data.Direccion.localidad === var2 || persona.data.Mejor_estilo_natacion === var3 || persona.data.Direccion.pais === var4)
        //console.log(filtro)        
        callBackFn(filtro)
    }
}


/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} nom dato de la persona a buscar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaListarPor = async function (callBackFn,nom) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los plantilla que se han descargado
    let vectorPlantilla = null
    if (response) {
        vectorPlantilla = await response.json()
        vectorPlantilla.data.sort((a,b) => {
            const campoA = a.data[nom].toLowerCase();
            const campoB = b.data[nom].toLowerCase();

            if(campoA < campoB) { 
                return -1; 
            }
            if(campoA > campoB) { 
                return 1; 
            }
            return 0;
        });

        callBackFn(vectorPlantilla.data)
    }
}



/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} nom dato de la persona a buscar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaNumeros = async function (callBackFn, nom) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los plantilla que se han descargado
    let vectorPlantilla = null
    if (response) {
        vectorPlantilla = await response.json()
        vectorPlantilla.data.sort((a,b) => {
            const campoA = parseFloat(a.data[nom]);
            const campoB = parseFloat(b.data[nom]);

            if(campoA < campoB) { 
                return -1; 
            }
            if(campoA > campoB) { 
                return 1; 
            }
            return 0;
        });

        callBackFn(vectorPlantilla.data)
    }
}



/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} nom dato de la persona a buscar
 * @param {String} nom1 dato de la persona a buscar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaVarios = async function (callBackFn, nom, nom1) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los plantilla que se han descargado
    let vectorPlantilla = null
    if (response) {
        vectorPlantilla = await response.json()
        vectorPlantilla.data.sort((a,b) => { //descomponiendo los caracteres acentuados
            const campoA = a.data[nom][nom1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            const campoB = b.data[nom][nom1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

            if(campoA < campoB) { 
                return -1; 
            }
            if(campoA > campoB) { 
                return 1; 
            }
            return 0;
        });

        callBackFn(vectorPlantilla.data)
    }
}



/**
 * Función principal para recuperar los plantilla desde el MS y, posteriormente, imprimir los nombres.
 * @returns True
 */
Plantilla.listarNombres = function () {
    this.recupera(this.imprimeNombres);
}

/**
 * Función principal para recuperar los plantilla desde el MS y, posteriormente, imprimir los nombres alfabéticamente.
 * @returns True
 */
Plantilla.listarNombresAlfabetic = function () {
    this.recuperaAlfabetic(this.imprimeNombres);
}

/**
 * Función principal para recuperar los plantilla desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Plantilla.listar = function () {
    this.recupera(this.imprime);
}

/**
 * Función principal para recuperar los plantilla desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Plantilla.mostrar = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}


/**
 * Función principal para recuperar los plantilla desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Plantilla.listarBuscar = function (buscar) {
    this.recuperaBuscar(this.imprime, buscar);
}

/**
 * Función principal para recuperar los plantilla desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Plantilla.listarBuscarCuatro = function (search1,search2, search3,search4) {
    this.recuperaBuscarCuatro(this.imprime,search1,search2,search3,search4);
}

/**
 * Función principal para recuperar los plantilla desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Plantilla.listarBuscarPorUno = function (search1,search2, search3,search4) {
    this.recuperaBuscarPorUno(this.imprime,search1,search2,search3,search4);
}

/**
 * Función principal para recuperar los plantilla desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Plantilla.listarPor = function (campo) {
    this.recuperaListarPor(this.imprime, campo);
}


/**
 * Función principal para recuperar los plantilla desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Plantilla.listarPorNum = function (campo) {
    Plantilla.recuperaNumeros(this.imprime, campo);
}


/**
 * Función principal para recuperar los plantilla desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Plantilla.listarPorVarios = function (campo, campo1) {
    Plantilla.recuperaVarios(this.imprime, campo, campo1);
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}


// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Plantilla.cabeceraTable = function () {
    return `<table class="listado-plantilla"><thead><th>Nombre</th><th>Apellidos</th><th>Fecha</th><th>Direccion</th><th>Años participación</th><th>Nº participaciones mundiales en JJOO</th><th>Mejor estilo de natación</th></thead><tbody>`;
}

/**
 * Crea la cabecera para mostrar la info como tabla de listar nombres
 * @returns Cabecera de la tabla
 */
Plantilla.cabeceraTableNombres = function () {
    return `<table class="listado-plantilla"><thead><th>Nombres</th><th>Apellidos</th></thead><tbody>`;
}


/**
 * Muestra la información de cada plantilla en un elemento TR con sus correspondientes TD
 * @param {plantilla} p Datos del plantilla a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el plantilla.
 */
Plantilla.cuerpoTr = function (p) {
    const d = p.data
    const nombre = d.Nombre_completo;  
    const fecha = d.Fecha;
    const direccion = d.Direccion;
    const añosParticipacion = d.Anios_participacion_en_mundial;
    const añosParticipacionMundialesJJOO = d.Num_participaciones_mundiales_JJOO;
    const mejorEstiloNatación = d.Mejor_estilo_natacion;

    return `<tr title="${p.ref['@ref'].id}"><td>${nombre.Nombre}</td><td>${nombre.Apellidos}</td><td>${fecha.dia}/${fecha.mes}/${fecha.año}</td><td>${direccion.calle}, ${direccion.localidad}, ${direccion.provincia}, ${direccion.pais}</td><td>${añosParticipacion}</td><td>${añosParticipacionMundialesJJOO}</td><td>${mejorEstiloNatación}</td></tr>`;
}


/**
 * Muestra la información de cada plantilla en un elemento TR con sus correspondientes TD de los nombres 
 * @param {plantilla} p Datos del plantilla a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el plantilla.
 */
Plantilla.cuerpoTrNombres = function (p) {
    const d = p.data
    const nombre = d.Nombre_completo;  

    return `<tr title="${p.ref['@ref'].id}"><td>${nombre.Nombre}</td><td>${nombre.Apellidos}</td></tr>`;
}


/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Plantilla.pieTable = function () {
  return "</tbody></table>";
}

/**
 * Función para mostrar en pantalla todos los plantilla que se han recuperado de la BBDD.
 * @param {Vector_de_plantilla} vector Vector con los datos de los plantilla a mostrar
 */
Plantilla.imprime = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de plantillas", msj )
}


/**
 * Función para mostrar en pantalla todos los nombres de plantilla que se han recuperado de la BBDD.
 * @param {Vector_de_plantilla} vector Vector con los datos de los plantilla a mostrar
 */
Plantilla.imprimeNombres = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTableNombres();
    vector.forEach(e => msj += Plantilla.cuerpoTrNombres(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de nombres", msj )
}


/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */
Plantilla.imprimeUnaPersona = function (persona) {
    let msj = "";
    msj += Plantilla.cabeceraTable();
    msj += Plantilla.cuerpoTr(persona);
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Mostrar una persona", msj )
}
