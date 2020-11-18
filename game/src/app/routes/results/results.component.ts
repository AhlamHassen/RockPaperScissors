import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  userName = '';

  @HostBinding('class.ifThreeTurn') isThree = false;
  @HostBinding('class.ifFiveTurn') isFive = false;

  constructor(public game: GameService, private router: Router) { }
  
  ngOnInit(): void {
    if(this.game.gameResult == 'Draw'){
      this.game.pronoun = 'It Is a';
    }
    else{
      this.game.pronoun = 'You';
    }

    if(this.game.gameRound == 1){
      this.isThree = false;
      this.isFive = false;
    }

    if(this.game.gameRound == 3){
      this.isThree = true;
      this.isFive = false;
    }

    if(this.game.gameRound == 5){
      this.isFive = true;
      this.isThree = false;
    } 
    console.log(this.game.selections);
  }

  tryAgain() {
    this.game.playAgain();
  }

  displayLeaderbrd(){
    this.game.get();
  }

  onKey(value: any){
    this.userName = value;
    this.game.getUsername(this.userName);
    if(this.userName != null || this.userName != ''){
      localStorage.setItem('username', JSON.stringify(this.userName));
    }
  }
}
