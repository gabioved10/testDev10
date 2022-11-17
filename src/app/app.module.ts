import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NgxGraphModule } from '@swimlane/ngx-graph';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
// import { NgxGraphComponent } from './ngx-graph/ngx-graph.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
