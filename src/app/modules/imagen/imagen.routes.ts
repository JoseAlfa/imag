import { RouterModule, Routes } from '@angular/router';
import { ImagenComponent } from './imagen.component';
import { ContainerComponent } from './components/container/container.component';
const rutas :Routes=[
    { path : '' , component : ImagenComponent },
    { path : 'hola' , component : ContainerComponent }
];
export const Rutas = RouterModule.forChild(rutas);