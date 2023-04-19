/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"
const TITULO_PLANTILLA = "Listado de plantillas"
const TITULO_NOMBRES = "Listado de nombres"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()

        })
})



/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */

// SPECS para Jasmine

//TDD para la Historia de Usuario 2 y 3 (HU 2 y HU 3)
describe("Plantilla.pieTable ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla cuando se le pasa un valor nulo", function() {
        expect(Plantilla.pieTable()).not.toBe(null);
    });
    it("debería devolver las etiquetas HTML para el pie de tabla cuando se le pasa un valor vacío", function() {
        expect(Plantilla.pieTable()).not.toBe("");
    });
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Plantilla.pieTable()).toBe("</tbody></table>");
        });
});


describe("Plantilla.TableNombres", function () {
    it("debería devolver un string vacío si se le pasa un valor nulo",
    function () {
        expect(Plantilla.cabeceraTableNombres()).not.toBe(null);
    });
    it("debería devolver un string vacío si se le pasa un valor vacío",
    function () {
        expect(Plantilla.cabeceraTableNombres()).not.toBe("");
    });
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            expect(Plantilla.cabeceraTableNombres()).toBe(`<table class="listado-plantilla"><thead><th>Nombres</th><th>Apellidos</th></thead><tbody>`);
        });
});


describe('Plantilla.cuerpoTrNombres', function () {
    // Preparar los datos de la prueba
    const p = {
        ref: { "@ref": { id: "ref persona 1" } },
        data: {
            Nombre_completo: { Nombre: "Mireia", Apellidos: "Belmonte García" }
        }
    }
    // Realizar los expect
    it("debería devolver una cadena vacía si se le pasa un valor nulo", function () {
        expect(Plantilla.cuerpoTrNombres(p)).not.toBe(null);
    });

    it("debería devolver una cadena vacía si se le pasa una cadena vacía", function () {
        expect(Plantilla.cuerpoTrNombres(p)).not.toBe("");
    });
    it("debería devolver una cadena que contenga los nombres de la plantilla",
        function () {
            expect(Plantilla.cuerpoTrNombres(p)).toBe(`<tr title="${p.ref['@ref'].id}"><td>${p.data.Nombre_completo.Nombre}</td><td>${p.data.Nombre_completo.Apellidos}</td></tr>`);
        });
});



describe('Plantilla.imprimeNombres', function () {
    // Preparar los datos de la prueba
    const vector = [
        {
            ref: { "@ref": { id: "ref persona 1" } },
            data: { Nombre_completo: { Nombre: "Mireia", Apellidos: "Belmonte García" } }
        },
        {
            ref: { "@ref": { id: "ref persona 2" } },
            data: { Nombre_completo: { Nombre: "Lionel", Apellidos: "Messi" } }
        }
    ];

    // Realizo los expect
    it("debería mostrar una tabla con los nombres de las plantillas en Frontend.Article",
        function () {
            const expectedMsj = Plantilla.cabeceraTableNombres() + Plantilla.cuerpoTrNombres(vector[0]) + Plantilla.cuerpoTrNombres(vector[1]) + Plantilla.pieTable();
            spyOn(Frontend.Article, 'actualizar');
            Plantilla.imprimeNombres(vector);
            expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de nombres', expectedMsj);
        });
});


//TDD para la Historia de Usuario 4 (HU 4)
describe("Plantilla.cabeceraTable", function () {
    // Realizo los expect
    it("debería devolver una cadena vacía si se le pasa un valor nulo", function () {
        expect(Plantilla.cabeceraTable()).not.toBe(null);
    });

    it("debería devolver una cadena vacía si se le pasa una cadena vacía", function () {
        expect(Plantilla.cabeceraTable()).not.toBe("");
    });
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            expect(Plantilla.cabeceraTable()).toBe(`<table class="listado-plantilla"><thead><th>Nombre</th><th>Apellidos</th><th>Fecha</th><th>Direccion</th><th>Años participación</th><th>Nº participaciones mundiales en JJOO</th><th>Mejor estilo de natación</th></thead><tbody>`);
        });
});


describe('Plantilla.cuerpoTr', function () {
    // Preparar los datos de la prueba
    const p = {
        ref: { "@ref": { id: "ref persona 1" } },
        data: {
            Nombre_completo: { Nombre: "Mireia", Apellidos: "Belmonte García" },
            Fecha: { dia: 1, mes: 1, año: 2000 },
            Direccion: {
                calle: "Calle Falsa 123",
                localidad: "Springfield",
                provincia: "Estados Unidos",
                pais: "EEUU",
            },
            Anios_participacion_en_mundial: 2,
            Num_participaciones_mundiales_JJOO: 1,
            Mejor_estilo_natacion: "Mariposa",
        }
    }

    // Realizo los expect
    it("debería devolver una cadena vacía si se le pasa un valor nulo", function () {
    expect(Plantilla.cuerpoTr(p)).not.toBe(null);
    });

    it("debería devolver una cadena vacía si se le pasa una cadena vacía", function () {
        expect(Plantilla.cuerpoTr(p)).not.toBe("");
    });

    it("debería devolver una cadena que contenga todos los datos de la plantilla de personas",
        function () {
            expect(Plantilla.cuerpoTr(p)).toBe(`<tr title="${p.ref['@ref'].id}"><td>${p.data.Nombre_completo.Nombre}</td><td>${p.data.Nombre_completo.Apellidos}</td><td>${p.data.Fecha.dia}/${p.data.Fecha.mes}/${p.data.Fecha.año}</td><td>${p.data.Direccion.calle}, ${p.data.Direccion.localidad}, ${p.data.Direccion.provincia}, ${p.data.Direccion.pais}</td><td>${p.data.Anios_participacion_en_mundial}</td><td>${p.data.Num_participaciones_mundiales_JJOO}</td><td>${p.data.Mejor_estilo_natacion}</td></tr>`);
        });
});


describe('Plantilla.imprime', function () {
    // Preparar los datos de la prueba
    const vector = [
        {
            ref: { "@ref": { id: "ref persona 1" } },
            data: { 
                Nombre_completo: { Nombre: "Mireia", Apellidos: "Belmonte García" },
                Fecha: { dia: 1, mes: 1, año: 2000 },
                Direccion: {
                    calle: "Calle Falsa 123",
                    localidad: "Springfield",
                    provincia: "Estados Unidos",
                    pais: "EEUU",
                },
                Anios_participacion_en_mundial: 2,
                Num_participaciones_mundiales_JJOO: 1,
                Mejor_estilo_natacion: "Mariposa",
            }
        },
        {
            ref: { "@ref": { id: "ref persona 2" } },
            data: { 
                Nombre_completo: { Nombre: "Lionel", Apellidos: "Messi" },
                Fecha: { dia: 1, mes: 1, año: 2000 },
                Direccion: {
                    calle: "Calle Falsa 123",
                    localidad: "Springfield",
                    provincia: "Estados Unidos",
                    pais: "EEUU",
                },
                Anios_participacion_en_mundial: 2,
                Num_participaciones_mundiales_JJOO: 1,
                Mejor_estilo_natacion: "Mariposa",
        }
        }
    ];

    // Realizo los expect  
    it("debería mostrar una tabla con todos los datos de las plantillas de personas en Frontend.Article",
        function () { 
            const expectedMsj = Plantilla.cabeceraTable() + Plantilla.cuerpoTr(vector[0]) + Plantilla.cuerpoTr(vector[1]) + Plantilla.pieTable();
            spyOn(Frontend.Article, 'actualizar');
            Plantilla.imprime(vector);
            expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de plantillas', expectedMsj);
        });
});


//TDD para la Historia de Usuario 6 (HU 6)
describe('Plantilla.imprimeUnaPersona', function () {
    // Preparar los datos de la prueba
    const p = {
        ref: { "@ref": { id: "ref persona 1" } },
        data: {
            Nombre_completo: { Nombre: "Mireia", Apellidos: "Belmonte García" },
            Fecha: { dia: 1, mes: 1, año: 2000 },
            Direccion: {
                calle: "Calle Feliz",
                localidad: "Springfield",
                provincia: "Estados Unidos",
                pais: "EEUU",
            },
            Anios_participacion_en_mundial: 2,
            Num_participaciones_mundiales_JJOO: 1,
            Mejor_estilo_natacion: "Mariposa",
        }
    }
    // Realizo los expect
    it("debería mostrar una tabla con todos los datos de una persona en Frontend.Article",
        function () {
            const expectedMsj = Plantilla.cabeceraTable() + Plantilla.cuerpoTr(p) + Plantilla.pieTable();
            spyOn(Frontend.Article, 'actualizar');
            Plantilla.imprimeUnaPersona(p);
            expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Mostrar una persona', expectedMsj);
        });
});
  