import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenComponent } from './imagen.component';
import { Rutas } from './imagen.routes';
import { ContainerComponent } from './components/container/container.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [ImagenComponent, ContainerComponent],
  imports: [
    CommonModule,
    Rutas,
    BrowserAnimationsModule,
    DragDropModule
  ]
})
export class ImagenModule { }
