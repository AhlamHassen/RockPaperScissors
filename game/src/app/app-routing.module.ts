import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayComponent } from './routes/play/play.component';
import { ReportComponent } from './routes/report/report.component';
import { ResultsComponent } from './routes/results/results.component';
import { RoundsComponent } from './routes/rounds/rounds.component';

const routes: Routes = [
  {path: "play", component: PlayComponent},
  {path: "results", component: ResultsComponent},
  {path: "report", component: ReportComponent},
  {path: "rounds", component: RoundsComponent},

  {path: "**", redirectTo: "rounds"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
