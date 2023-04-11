/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

/// Creo el espacio de nombres
let Personas = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

// Tags que voy a usar para sustituir los campos
Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "FECHA": "### FECHA ###",
    "AÑO ENTRADA": "### AÑO ENTRADA ###",
}


/// Objeto para almacenar los datos de la persona que se está mostrando
Plantilla.personaMostrada = null

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
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Plantilla.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.Nombre_completo.Nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDOS, 'g'), persona.data.Nombre_completo.Apellidos)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA, 'g'), persona.data.Fecha)
        .replace(new RegExp(Plantilla.plantillaTags["AÑO ENTRADA"], 'g'), persona.data.año_entrada)
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
    return `<table class="listado-plantilla">
        <thead>
        <th>Nombre</th><th>Apellidos</th><th>Fecha</th><th>Direccion</th><th>Años participación</th><th>Nº participaciones mundiales en JJOO</th><th>Mejor estilo de natación</th>
        </thead>
        <tbody>
    `;
}

/**
 * Crea la cabecera para mostrar la info como tabla de listar nombres
 * @returns Cabecera de la tabla
 */
Plantilla.cabeceraTableNombres = function () {
    return `<table class="listado-plantilla">
        <thead>
        <th>Nombres</th><th>Apellidos</th>
        </thead>
        <tbody>
    `;
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

    return `<tr title="${p.ref['@ref'].id}">
    <td>${nombre.Nombre}</td>
    <td>${nombre.Apellidos}</td>
    <td>${fecha.dia}/${fecha.mes}/${fecha.año}</td>
    <td>${direccion.calle}, ${direccion.localidad}, ${direccion.provincia}, ${direccion.pais}</td>
    <td>${añosParticipacion}</td>
    <td>${añosParticipacionMundialesJJOO}</td>
    <td>${mejorEstiloNatación}</td>
    </tr>`;
}


/**
 * Muestra la información de cada plantilla en un elemento TR con sus correspondientes TD
 * @param {plantilla} p Datos del plantilla a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el plantilla.
 */
Plantilla.cuerpoTrPersonas = function (p) {
    const d = p.data
    const nombre = d.Nombre_completo;  
    const fecha = d.Fecha;
    const direccion = d.Direccion;
    const añosParticipacion = d.Anios_participacion_en_mundial;
    const añosParticipacionMundialesJJOO = d.Num_participaciones_mundiales_JJOO;
    const mejorEstiloNatación = d.Mejor_estilo_natacion;

    return `<tr title="${p.ref['@ref'].id}">
    <td>${nombre.Nombre}</td>
    <td>${nombre.Apellidos}</td>
    <td>${fecha.dia}/${fecha.mes}/${fecha.año}</td>
    <td>${direccion.calle}, ${direccion.localidad}, ${direccion.provincia}, ${direccion.pais}</td>
    <td>${añosParticipacion}</td>
    <td>${añosParticipacionMundialesJJOO}</td>
    <td>${mejorEstiloNatación}</td>
    <td>
            <div><a href="javascript:Personas.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
    </td>
    </tr>`;
}

/**
 * Muestra la información de cada plantilla en un elemento TR con sus correspondientes TD de los nombres 
 * @param {plantilla} p Datos del plantilla a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el plantilla.
 */
Plantilla.cuerpoTrNombres = function (p) {
    const d = p.data
    const nombre = d.Nombre_completo;  

    return `<tr title="${p.ref['@ref'].id}">
    <td>${nombre.Nombre}</td>
    <td>${nombre.Apellidos}</td>
    </tr>`;
}

/**
 * Muestra la información de cada plantilla en un elemento TR con sus correspondientes TD de los nombres alfabeticamente
 * @param {plantilla} p Datos del plantilla a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el plantilla.
 */
Plantilla.cuerpoTrNombresAlfabetic = function (p) {
    const d = p.data
    const nombre = d.Nombre_completo;
    
    nombre.sort(function(a, b){
          if(a.Nombre < b.Nombre) { return -1; }
          if(a.Nombre > b.Nombre) { return 1; }
          return 0;
      });

    return `<tr title="${p.ref['@ref'].id}">
    <td>${nombre.Nombre}</td>
    <td>${nombre.Apellidos}</td>
    </tr>`;
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
    Frontend.Article.actualizar( "Listado de plantillas", msj )
}


/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */
Plantilla.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    //let msj = Plantilla.personaComoFormulario(persona);
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizarA("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Plantilla.almacenaDatos(persona)
}


/**
 * Imprime los datos de una persona como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Plantilla.personaComoFormulario = function (persona) {
    return Plantilla.plantillaFormularioPersona.actualiza( persona );
}

/**
 * Almacena los datos de la persona que se está mostrando
 * @param {Persona} persona Datos de la persona a almacenar
 */

Plantilla.almacenaDatos = function (persona) {
    Plantilla.personaMostrada = persona;
}

/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
Plantilla.plantillaFormularioPersona = {}

/// Plantilla para poner los datos de varias personas dentro de una tabla
Plantilla.plantillaTablaPersonas = {}


// Cabecera de la tabla
Plantilla.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">Id</th>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        <th width="10%">eMail</th>
                        <th width="15%">Año contratación</th>
                        <th width="15%">Acciones</th>
                    </thead>
                    <tbody>
    `;


// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonas.cuerpo = `
    <tr title="${Plantilla.plantillaTags.ID}">
        <td>${Plantilla.plantillaTags.ID}</td>
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.APELLIDOS}</td>
        <td>${Plantilla.plantillaTags.FECHA}</td>
        <td>${Plantilla.plantillaTags["AÑO ENTRADA"]}</td>
        <td>
                    <div><a href="javascript:Personas.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

// Pie de la tabla
Plantilla.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;


             /**
 * Imprime los datos de una persona como una tabla usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Plantilla.personaComoTabla = function (persona) {
    return Personas.plantillaTablaPersonas.cabecera
        + Personas.plantillaTablaPersonas.actualizaA(persona)
        + Personas.plantillaTablaPersonas.pie;
}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaTablaPersonas.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.cuerpo, persona)
}

/**
 * Actualiza el formulario con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaFormularioPersona.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.formulario, persona)
}