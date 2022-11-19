import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NgxGraphComponent } from './ngx-graph/ngx-graph.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NgxGraphComponent

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
