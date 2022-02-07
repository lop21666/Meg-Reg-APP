import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FronterasPageRoutingModule } from './fronteras-routing.module';

import { FronterasPage } from './fronteras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FronterasPageRoutingModule
  ],
  declarations: [FronterasPage]
})
export class FronterasPageModule {}
