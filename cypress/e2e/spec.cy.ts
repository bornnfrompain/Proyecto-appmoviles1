describe('Verificar mi Ingreso', () => {

  it('Verificar login con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/').then(() => {
      cy.get('#correo').invoke('val', 'correo-inexistente@duocuc.cl');
      cy.get('#password').invoke('val', '1234');
      cy.contains('Ingresa a tu cuenta').click();
      cy.intercept('/home').as('route').then(() => {
          cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
          cy.get('#saludo').should('contain.text', '¡Bienvenido Juan Pérez González!');
      });
    });
  });

  it('Verificar login con credenciales correctas', () => {
    cy.wait(3000);
    cy.visit('http://localhost:8100/').then(() => {
      cy.get('#correo').invoke('val', 'jperez@duocuc.cl');
      cy.get('#password').invoke('val', '5678');
      cy.wait(3000);
      cy.contains('Ingresa a tu cuenta').click();
      cy.intercept('/home').as('route').then(() => {
          cy.wait(3000);
          cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
          cy.get('#saludo').should('contain.text', '¡Bienvenido Juan Pérez González!');
          cy.wait(3000);
          cy.contains('Salir').click();
      });
    });
  });

  
});

describe('Verificar Foro',()=>{
  it('Verificar que agregue el foro', () => {
    cy.visit('http://localhost:8100/foro');

    cy.get('#titulo').type('Título de la publicación');
    cy.get('#contenido').type('Contenido de la publicación');
    cy.get('#btnGuardar').click();

    cy.get('.publicacion').should('exist');
    cy.get('.publicacion').contains('Título de la publicación');
    cy.get('.publicacion').contains('Contenido de la publicación');
  });

  it('Verificar eliminar la publicación', () => {
    cy.visit('http://localhost:8100/foro');
    cy.get('.publicacion').first().find('.btnEliminar').click();
    cy.get('.publicacion').should('not.exist');
  });



});

describe('Mis Datos - Actualización de Datos', () => {
  beforeEach(() => {
    cy.visit('/ruta-a-misdatos');
  });

  it('Debería actualizar los datos correctamente', () => {
    cy.get('[data-cy=nombre]').type('NuevoNombre');
    cy.get('[data-cy=apellido]').type('NuevoApellido');
    cy.get('[data-cy=correo]').type('nuevo@correo.com');
    cy.get('[data-cy=preguntaSecreta]').type('NuevaPreguntaSecreta');
    cy.get('[data-cy=respuestaSecreta]').type('NuevaRespuestaSecreta');
    cy.get('[data-cy=password]').type('nuevacontraseña');
    cy.get('[data-cy=repeticionPassword]').type('nuevacontraseña');

    cy.get('[data-cy=actualizarPerfilButton]').click();

    cy.contains('Sus datos fueron actualizados');
  });

});

describe('Verificar que todos los datos graben correctamente', () => {
  beforeEach(() => {
    // Puedes agregar lógica para navegar a la página de Mis Datos si es necesario
    cy.visit('/ruta-a-misdatos');
  });

  it('Debería mostrar mensajes de error al ingresar campos incorrectos', () => {
    // Simula entradas incorrectas y verifica los mensajes de error
    // Puedes adaptar las siguientes líneas según la estructura de tu aplicación
    cy.get('[data-cy=nombre]').type(''); // Campo vacío
    cy.get('[data-cy=apellido]').type(''); // Campo vacío
    cy.get('[data-cy=correo]').type('correo_invalido'); // Correo inválido
    cy.get('[data-cy=preguntaSecreta]').type(''); // Campo vacío
    cy.get('[data-cy=respuestaSecreta]').type(''); // Campo vacío
    cy.get('[data-cy=password]').type(''); // Campo vacío

    cy.contains('Debe ingresar un valor para el campo "Nombre"');
  });

  it('Debería mostrar un mensaje de error al repetir una contraseña incorrecta', () => {
    cy.get('[data-cy=password]').type('password123');
    cy.get('[data-cy=repeticionPassword]').type('password456');

    cy.contains('Las contraseñas escritas deben ser iguales.');
  });

});

describe('Verificar que mis datos se graben correctamente', () => {
  beforeEach(() => {
    // Puedes agregar lógica para navegar a la página de Mis Datos si es necesario
    cy.visit('/ruta-a-misdatos');
  });

  it('Debería actualizar los datos correctamente', () => {
    // Simula la entrada de datos válidos y realiza la actualización
    // Puedes adaptar las siguientes líneas según la estructura de tu aplicación
    cy.get('[data-cy=nombre]').type('NuevoNombre');
    cy.get('[data-cy=apellido]').type('NuevoApellido');
    cy.get('[data-cy=correo]').type('nuevo@correo.com');
    cy.get('[data-cy=preguntaSecreta]').type('NuevaPreguntaSecreta');
    cy.get('[data-cy=respuestaSecreta]').type('NuevaRespuestaSecreta');
    cy.get('[data-cy=password]').type('nuevacontraseña');
    cy.get('[data-cy=repeticionPassword]').type('nuevacontraseña');

    // Realiza la actualización de datos
    cy.get('[data-cy=actualizarPerfilButton]').click();

    cy.contains('Sus datos fueron actualizados');
  });
});

