import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader.component';
import { SharedModule } from '../../shared/shared.module';
import { LoaderService } from '../../services/loader.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  providers: [LoaderService]
})
export class LoaderModule { }
