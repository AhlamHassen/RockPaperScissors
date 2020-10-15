import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayComponent } from './routes/play/play.component';
import { ResultsComponent } from './routes/results/results.component';

const routes: Routes = [
  {path: "play", component: PlayComponent},
  {path: "result", component: ResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
