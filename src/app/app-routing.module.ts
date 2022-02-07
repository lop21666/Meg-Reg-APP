import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  {
    canActivate: [GuardGuard],
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'transito',
    loadChildren: () => import('./transito/transito.module').then( m => m.TransitoPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'biblioteca',
    loadChildren: () => import('./biblioteca/biblioteca.module').then( m => m.BibliotecaPageModule)
  },
  {
    path: 'fronteras',
    loadChildren: () => import('./fronteras/fronteras.module').then( m => m.FronterasPageModule)
  },
  {
    path: 'detail-biblioteca',
    loadChildren: () => import('./detail-biblioteca/detail-biblioteca.module').then( m => m.DetailBibliotecaPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'security',
    loadChildren: () => import('./security/security.module').then( m => m.SecurityPageModule)
  },
  {
    path: 'pdf',
    loadChildren: () => import('./pdf/pdf.module').then( m => m.PdfPageModule)
  },
  {
    path: 'detail-item',
    loadChildren: () => import('./detail-item/detail-item.module').then( m => m.DetailItemPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
