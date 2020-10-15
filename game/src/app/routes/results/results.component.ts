import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private game: GameService) { }

  ngOnInit(): void {
  }

  tryAgain(){
    this.game.playAgain();
  }
}
