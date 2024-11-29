import { Usuario } from 'src/app/model/usuario';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { DataBaseService } from 'src/app/services/data-base.service';

describe('Probar el comienzo de la aplicación',()=>{
  
  //Preparar el proyecto
  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    }).compileComponents();
  });

  //Se verifica que se cree la aplicación
  it('Se deberia crear la aplicación',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Probar que el titulo de al App sea AsistenciaDuoc',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('AsistenciaDuoc');
  });


  describe('Probar los servicios de la base de datos', () => {
    let servicio: DataBaseService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({});
      servicio = TestBed.inject(DataBaseService);
    });
  
    it('Test de prueba para la creacion de la base de datos', () => {
      expect(servicio).toBeTruthy();
    });
  
    it('Test para guardar el ussuario', async () => {
      const usuario: Usuario = Usuario.getUsuario('test@example.com', 'contraseña', 'Test', 'Usuario', 'Pregunta', 'Respuesta', 'N');
      await servicio.guardarUsuario(usuario);
      const usuarios = await servicio.leerUsuarios();
      expect(usuarios).toBeGreaterThan(0);
    });
  
    it('Test para probar el guardar el usuario por correo', async () => {
      const correo = 'test@example.com';
      const usuario: Usuario = Usuario.getUsuario(correo, 'contraseña', 'Test', 'Usuario', 'Pregunta', 'Respuesta', 'N');
      await servicio.guardarUsuario(usuario);
      const usuarioLeido = await servicio.leerUsuario(correo);
      expect(usuarioLeido).toBeDefined();
      expect(usuarioLeido?.correo).toBe(correo);
    });
  
    it('Test para cargar la lista de usuarios desde la base de datos', async () => {
      const usuariosFicticios: Usuario[] = [
        Usuario.getUsuario('usuario1@mail.com', 'password1', 'Usuario', '1', 'Pregunta1', 'Respuesta1', 'N'),
        Usuario.getUsuario('usuario2@mail.com', 'password2', 'Usuario', '2', 'Pregunta2', 'Respuesta2', 'N'),
      ];
      
      servicio.leerUsuarios = jasmine.createSpy().and.returnValue(Promise.resolve(usuariosFicticios));
      await servicio.leerUsuarios();

      servicio.listaUsuarios.subscribe(usuarios => {
        expect(usuarios).toEqual(usuariosFicticios, 'La lista de usuarios debería ser igual a la ficticia');
      });
    });
});
});