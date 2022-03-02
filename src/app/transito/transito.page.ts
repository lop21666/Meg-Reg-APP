import { Component, OnInit } from '@angular/core';
import { CepredenacService } from '../services/cepredenac.service';
import { format, parseISO } from 'date-fns';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { FronterasPage } from '../fronteras/fronteras.page';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-transito',
  templateUrl: './transito.page.html',
  styleUrls: ['./transito.page.scss'],
})
export class TransitoPage implements OnInit {

  paises;
  desde = null;
  hasta = null;
  pais = null;
  transitos;
  mostrarLista = false;

  constructor(private cepredenacService: CepredenacService, private modalController: ModalController,
              private navController: NavController, public loadingController: LoadingController,
              private alertService: AlertService) { }

  async ionViewWillEnter(){
    (await this.cepredenacService.getPaises()).subscribe((resp: any) => {
      if (resp.status){
        this.paises = resp.data;
      }else{
        this.alertService.presentAlert('Ha ocurrido un error en el servidor, intente de nuevo más tarde.')
      }
    });
  }

  async ngOnInit() {
    this.buscar();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  getPais(event){
    this.pais = event.detail.value;
  }

  async buscar(){
    await this.presentLoading();
    (await this.cepredenacService.getTransitos(this.desde, this.hasta, this.pais)).subscribe((resp: any) => {
      if (resp.status){
        this.transitos = resp.data;
        this.mostrarLista = true;
      }else{
        this.alertService.presentAlert('Ha ocurrido un error en el servidor, intente de nuevo más tarde.')
      }
      this.loadingController.dismiss();
    });
  }

  fechaDesde(event){
    this.desde = event.detail.value;
    let x = this.desde.split('T');
    this.desde = x[0].replace(/-/g, '/');
    let y = this.desde.split('/');
    this.desde = y[2] + '/' + y[1] + '/' + y[0];
  }

  fechaHasta(event){
    this.hasta = event.detail.value;
    let x = this.hasta.split('T');
    this.hasta = x[0].replace(/-/g, '/');
    let y = this.hasta.split('/');
    this.hasta = y[2] + '/' + y[1] + '/' + y[0];
  }

  async getFronteras(notificacion){
    await this.presentLoading();
    const modal = await this.modalController.create({
      component: FronterasPage,
      componentProps: {
        notificacion
      }
    });
    return await modal.present();
  }

  back(){
    this.navController.navigateBack('/');
  }

}
