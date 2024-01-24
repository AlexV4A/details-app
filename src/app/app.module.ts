import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { CustomTooltipDirective } from './shared/directives/custom-tooltip/custom-tooltip.directive';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CustomTooltipComponent } from './shared/components/custom-tooltip/custom-tooltip.component';
import { HttpClientService } from './shared/services/http-client.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CustomTooltipComponent,
    CustomTooltipDirective,
    SignUpComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [HttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
