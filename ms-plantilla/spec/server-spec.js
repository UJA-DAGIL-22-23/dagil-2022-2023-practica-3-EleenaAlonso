/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor PLANTILLA:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Plantilla Acerca De', (done) => {
      supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  /**
   * Tests para acceso a la BBDD
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve Mireia  al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          for (let i = 0; i < res.body.data.length; i++) {
            let item = res.body.data[i];
            assert(res.body.data[i].data.hasOwnProperty('Nombre_completo'));
            assert(res.body.data[i].data.Nombre_completo.Nombre === item.data.Nombre_completo.Nombre);
            //console.log(item.data);

          }

          const p = {
            data: {
              Nombre_completo: {
                Nombre: 'Juan',
                Apellidos: 'Perez'
              },
              Fecha: {
                dia: '1',
                mes: '2',
                año: '2000'
              },
              Direccion: {
                calle: 'Calle Falsa',
                localidad: 'Ciudad Falsa',
                provincia: 'Provincia Falsa',
                pais: 'Pais Falso'
              },
              Anios_participacion_en_mundial: '4',
              Num_participaciones_mundiales_JJOO: '2',
              Mejor_estilo_natacion: 'Estilo libre'
            },
            ref: {
              '@ref': {
                id: '123456'
              }
            }
          };
          expect(Plantilla.cuerpoTr(p)).toBe(`<tr title="123456">
              <td>Juan</td>
              <td>Perez</td>
              <td>1/2/2000</td>
              <td>Calle Falsa, Ciudad Falsa, Provincia Falsa, Pais Falso</td>
              <td>4</td>
              <td>2</td>
              <td>Estilo libre</td>
              </tr>`);

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });
  });
});