import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {
  usu = new Usuario ();
  respuestaSecreta = ''
  preguntaSecreta=''
  nombre=''
  apellido =''

  constructor(private router: Router, private alertController: AlertController, private authService: AuthService) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav) {
      if (nav.extras.state) {
        this.usu = nav.extras.state['usuario'];
        console.log(this.usu)
        this.preguntaSecreta=this.usu.preguntaSecreta;
        this.nombre=this.usu.nombre;
        this.apellido=this.usu.apellido;

        console.log(this.usu.toString());
        return;
      }
    }
  }
   


  recuperarContrasena(){
    if (this.usu === undefined){
    }else{
      if(this.usu.respuestaSecreta==this.respuestaSecreta){
        this.router.navigate(['/correcto']);
        this.authService.transmitirContraseña(this.usu.password);

      }else{
        this.router.navigate(['/incorrecto']);
      }
    }
    
  }

  volverAlInicio(){
    this.router.navigate(['/ingreso']);
  }
 
  goBack() {
    window.history.back();
  }
}