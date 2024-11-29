import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  title = 'AsistenciaDuoc';
  constructor(private storage: Storage) {}
  async ngOnInit() {
    await this.storage.create();
  }
}
