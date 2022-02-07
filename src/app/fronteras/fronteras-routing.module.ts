import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FronterasPage } from './fronteras.page';

const routes: Routes = [
  {
    path: '',
    component: FronterasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FronterasPageRoutingModule {}
