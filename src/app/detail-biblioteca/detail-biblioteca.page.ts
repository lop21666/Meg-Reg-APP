import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { CepredenacService } from '../services/cepredenac.service';
import { PdfPage } from '../pdf/pdf.page';
import { DomSanitizer } from '@angular/platform-browser';
import { DetailItemPage } from '../detail-item/detail-item.page';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-detail-biblioteca',
  templateUrl: './detail-biblioteca.page.html',
  styleUrls: ['./detail-biblioteca.page.scss'],
})
export class DetailBibliotecaPage implements OnInit {

  @Input() fase;

  viewEntered;
  referencias;
  pais = null;
  actor = null;
  paises;
  actores;
  mostrarLista = false;
  safeUrl;


  constructor(public modalController: ModalController, private cepredenacService: CepredenacService,
              public loadingController: LoadingController, private sanitizer: DomSanitizer, private alertService: AlertService) { }

  async ionViewDidEnter() {
    (await this.cepredenacService.getPaises()).subscribe((resp: any) => {
      if (resp.status){
        this.paises = resp.data;
      }else{
        this.alertService.presentAlert('Ha ocurrido un error en el servidor, intente de nuevo más tarde.')
      }
    });
    (await this.cepredenacService.getActores()).subscribe((resp: any) => {
      if (resp.status){
        this.actores = resp.data;
      }else{
        this.alertService.presentAlert('Ha ocurrido un error en el servidor, intente de nuevo más tarde.')
      }
    });

    (await this.cepredenacService.getReferencias(this.fase, this.actor, this.pais)).subscribe((resp: any)=>{
      if (resp.status){
        this.referencias = resp.data;
      }else{
        this.alertService.presentAlert('Ha ocurrido un error en el servidor, intente de nuevo más tarde.')
      }
    });
    this.viewEntered = true;
    setTimeout(() => {
      this.mostrarLista = true;
      this.loadingController.dismiss();
    }, 1000);
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  ngOnInit() {
  }

  back(){
    this.modalController.dismiss();
  }

  getPais(event){
    this.pais = event.detail.value;
  }

  getActor(event){
    this.actor = event.detail.value;
  }

  async buscar(){
    await this.presentLoading();
    (await this.cepredenacService.getReferencias(this.fase, this.actor, this.pais)).subscribe((resp: any) => {
      if (resp.status){
        this.referencias = resp.data;
        this.mostrarLista = true;
      }else{
        this.alertService.presentAlert('Ha ocurrido un error en el servidor, intente de nuevo más tarde.')
      }
      this.loadingController.dismiss();
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async verpdf(url){

    const safeUrl: any = await this.sanitizer.bypassSecurityTrustResourceUrl(url);
    await window.open(safeUrl.changingThisBreaksApplicationSecurity, '_system');

  }

  async Item(item){
    await this.presentLoading();
    const modal = await this.modalController.create({
      component: DetailItemPage,
      componentProps: {
        item
      }
    });
    return await modal.present();
  }



}
