import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { DetailBibliotecaPage } from '../detail-biblioteca/detail-biblioteca.page';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {

  constructor(private modalController: ModalController, private navController: NavController,
              public loadingController: LoadingController) { }

  ngOnInit() {
  }

  back(){
    this.navController.navigateBack('/');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async getDetail(fase){
    await this.presentLoading();
    const modal = await this.modalController.create({
      component: DetailBibliotecaPage,
      componentProps: {
        fase
      }
    });
    return await modal.present();
  }

}
