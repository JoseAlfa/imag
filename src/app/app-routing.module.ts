import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagenComponent } from './modules/imagen/imagen.component';

const routes: Routes = [
  {path:'**',component:ImagenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
