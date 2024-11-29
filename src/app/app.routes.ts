import { Routes } from '@angular/router';
import { loginGuard } from './guards/login-guard.service';
import { authGuard } from './guards/auth-guard.service';
import { importProvidersFrom } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ingreso',
    pathMatch: 'full',
  },
  {
    path: 'ingreso',
    loadComponent: () => import('./pages/ingreso/ingreso.page').then( m => m.IngresoPage),
    canActivate: [loginGuard]
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage),
    canActivate: [authGuard]
  },
  {
    path: 'correo',
    loadComponent: () => import('./pages/correo/correo.page').then( m => m.CorreoPage)
  },
  {
    path: 'pregunta',
    loadComponent: () => import('./pages/pregunta/pregunta.page').then( m => m.PreguntaPage)
  },
  {
    path: 'correcto',
    loadComponent: () => import('./pages/correcto/correcto.page').then( m => m.CorrectoPage)
  },

  {
    path: 'incorrecto',
    loadComponent: () => import('./pages/incorrecto/incorrecto.page').then( m => m.IncorrectoPage)
  },
  
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'foro',
    loadComponent: () => import('./components/foro/foro.component').then( m => m.ForoComponent)
  },
  {
  path: 'misdatos',
  loadComponent: () => import('./components/misdatos/misdatos.component').then(m => m.MisdatosComponent)
  },
  {
    path: 'error404',
    loadComponent: () => import('./error404/error404.page').then( m => m.Error404Page)
  },
  { path: '**', redirectTo: 'error404' }  // Cualquier ruta no definida redirigirá a la página de error 404
];
