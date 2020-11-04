import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PlayComponent } from './routes/play/play.component';
import { ResultsComponent } from './routes/results/results.component';
import { ReportComponent } from './routes/report/report.component';
import { RoundsComponent } from './routes/rounds/rounds.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    ResultsComponent,
    ReportComponent,
    RoundsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
