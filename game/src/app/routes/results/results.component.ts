import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  playerChoiceclass: string;
  compChoiceClass?: string;
  gameResult?: string;
  pronun = 'You';

  constructor(private game: GameService, private router: Router) { }
  
  ngOnInit(): void {
    this.playerChoiceclass = this.game.selection;
    this.compChoiceClass = this.game.compSelection;
    this.gameResult = this.game.gameResult;

    if(this.gameResult == 'Draw'){
      this.pronun = 'It Is a';
    }
    else{
      this.pronun = 'You';
    }

  }

  tryAgain() {
    this.game.playAgain();
  }

  displayLeaderbrd(){
    this.game.get();
  }
}
