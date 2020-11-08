import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  pronun = 'You';

  constructor(public game: GameService, private router: Router) { }
  
  ngOnInit(): void {
    if(this.game.gameResult == 'Draw'){
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
