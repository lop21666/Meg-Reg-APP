import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private navController: NavController, private storage: Storage) {}

  getTransitos(){
    this.navController.navigateForward('/transito');
  }

  getBiblioteca(){
    this.navController.navigateForward('/biblioteca');
  }

  async logOut(){
    this.navController.navigateRoot('/login');
    this.storage.clear();
  }

}
