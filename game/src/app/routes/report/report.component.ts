import { Component, OnInit } from '@angular/core';
import { LeaderboardLine } from 'src/app/Player';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(public game: GameService) { }

  ngOnInit(): void {
  }

}
