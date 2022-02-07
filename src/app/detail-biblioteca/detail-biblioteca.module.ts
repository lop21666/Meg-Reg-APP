import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailBibliotecaPageRoutingModule } from './detail-biblioteca-routing.module';

import { DetailBibliotecaPage } from './detail-biblioteca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailBibliotecaPageRoutingModule
  ],
  declarations: [DetailBibliotecaPage]
})
export class DetailBibliotecaPageModule {}
