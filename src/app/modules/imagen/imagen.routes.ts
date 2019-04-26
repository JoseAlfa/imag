import { RouterModule, Routes } from '@angular/router';
import { ImagenComponent } from './imagen.component';
const rutas :Routes=[
    {path:'',component:ImagenComponent}
];
export const Rutas = RouterModule.forChild(rutas);