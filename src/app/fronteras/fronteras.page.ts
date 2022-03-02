import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { CepredenacService } from '../services/cepredenac.service';
import { AlertService } from '../services/alert.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fronteras',
  templateUrl: './fronteras.page.html',
  styleUrls: ['./fronteras.page.scss'],
})
export class FronterasPage implements OnInit {

  @Input() notificacion;

  viewEntered;
  fronteras;
  documentos;

  constructor(public modalController: ModalController, private cepredenacService: CepredenacService,
              public loadingController: LoadingController, public alert: AlertService, private sanitizer: DomSanitizer,
              private alertService: AlertService) { }

  async ionViewDidEnter() {
    (await this.cepredenacService.getFronteras(this.notificacion)).subscribe((resp: any) => {
      if (resp.status){
        this.fronteras = resp.data;
      }else{
        this.alertService.presentAlert('Ha ocurrido un error en el servidor, intente de nuevo más tarde.')
      }
    });
    (await this.cepredenacService.getDocumentos(this.notificacion)).subscribe((resp: any) => {
      if (resp.status){
        this.documentos = resp.data;
      }else{
        this.alertService.presentAlert('Ha ocurrido un error en el servidor, intente de nuevo más tarde.')
      }
    });
    this.viewEntered = true;
    this.loadingController.dismiss();
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  ngOnInit() {
  }

  back(){
    this.modalController.dismiss();
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

  async cambiarDeSituacion(front, frontera, notificacion, situacion){
    if (situacion === '2'){
      this.alert.presentAlert('Este tránsito ya se encuentra Arribado o Comparecido.');
    }else{
      (await this.cepredenacService.cambioSituacion(notificacion, frontera, 'Cambio de situacion')).subscribe((resp: any) => {
        if (resp.data){
          this.alert.presentToast('La situacion ha cambiado correctamente', 'success', 3000);
          const index = this.fronteras.indexOf(front);
          this.fronteras[index].situacion = 2;
          this.fronteras[index].situacion_descripcion = 'Arribado o Comparecido';
        }else{
          this.alert.presentToast('Ha ocurrido un error en el servidor, vuelve a intentarlo de nuevo más tarde', 'danger', 3000);
        }
      });
    }
  }

}
