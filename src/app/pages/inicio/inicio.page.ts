import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { AdminPage } from 'src/app/components/admin/admin.page';
import { DataBaseService } from 'src/app/services/data-base.service';
import { APIClientService } from 'src/app/services/apiclient.service';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
    QrComponent, MiclaseComponent,AdminPage, ForoComponent, MisdatosComponent
  ],
})
export class InicioPage implements OnInit {

  usuario: Usuario = new Usuario();
  componente_actual = 'qr';
  DataBaseService = DataBaseService
  

  constructor(
    private authService: AuthService, 
    private bd: DataBaseService,
    private api: APIClientService,
    ) { }
    

  ngOnInit() {
    this.componente_actual = 'qr';
    this.bd.datosQR.next('');
    
  }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (this.componente_actual === 'foro') this.api.cargarPublicaciones();
    if (this.componente_actual === 'misdatos') this.authService.leerUsuarioAutenticado();
    if  (this.componente_actual === 'admin') this.authService.leerUsuarioAutenticado();
  }

  cerrarSesion() {
    this.authService.logout();
  }

}
