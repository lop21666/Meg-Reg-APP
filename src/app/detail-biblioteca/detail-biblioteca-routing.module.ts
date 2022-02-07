import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailBibliotecaPage } from './detail-biblioteca.page';

const routes: Routes = [
  {
    path: '',
    component: DetailBibliotecaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailBibliotecaPageRoutingModule {}
