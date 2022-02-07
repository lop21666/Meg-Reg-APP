import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.page.html',
  styleUrls: ['./detail-item.page.scss'],
})
export class DetailItemPage implements OnInit {

  @Input() item;
  viewEntered;

  constructor(public loadingController: LoadingController, public modalController: ModalController,
              private sanitizer: DomSanitizer) { }

  async ionViewDidEnter() {
    this.loadingController.dismiss();
    this.viewEntered = true;
  }

  ngOnInit() {
  }

  back(){
    this.modalController.dismiss();
  }

  async verpdf(url){

    const safeUrl: any = await this.sanitizer.bypassSecurityTrustResourceUrl(url);
    await window.open(safeUrl.changingThisBreaksApplicationSecurity, '_system');

  }

}
