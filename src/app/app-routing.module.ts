import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard } from './pages/auth/auth-guard.service';
import { CharMakerComponent } from './pages/char-maker/char-maker.component';
import {TerrainGenComponent} from './pages/terrain-gen/terrain-gen.component';
import { DnaCodeComponent } from './pages/dna-code/dna-code.component';
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'char-maker',
    component: CharMakerComponent
  },
  {
    path: 'dna-code',
    component: DnaCodeComponent
  },
  {
    path: 'terrain-gen',
    loadChildren: 'app/pages/terrain-gen/terrain-gen.module#TerrainGenModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'contact-us',
    loadChildren: 'app/pages/contact-us/contact-us.module#ContactUsModule',
  },
  {
    path: 'repository',
    loadChildren: 'app/pages/repository/repository.module#RepositoryModule',
  },
  {
    path: 'auto-rigger',
    loadChildren: 'app/pages/auto-rigger/auto-rigger.module#AutoRiggerModule',
  },
  {
    path: 'my-library',
    loadChildren: 'app/pages/library/library.module#LibraryModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'style-transfer',
    loadChildren: 'app/pages/style-transfer/style-transfer.module#StyleTransferModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'motion-editor',
    loadChildren: 'app/pages/motion-editor/motion-editor.module#MotionEditorModule',
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {}
