import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  declarations: [
    ImagenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe
  ]
})
export class PipesModule { }
