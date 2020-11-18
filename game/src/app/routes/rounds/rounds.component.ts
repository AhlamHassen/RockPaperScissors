import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent implements OnInit {
  userName = '';
  oneRound : boolean = false;
  threeRounds: boolean = false;
  fiveRounds: boolean = false;
  roundNumber = 0;

  constructor(public gameservice: GameService) { 
    if(localStorage.getItem('username') != null){
      this.userName = JSON.parse(localStorage.getItem('username'));
    }
  }

  ngOnInit(): void {
  }

  optionClicked(option: 'oneRound' | 'threeRounds' | 'fiveRounds'){
    if(option == 'oneRound'){
      this.oneRound = this.oneRound? false : true;
      
      this.threeRounds = false;
      this.fiveRounds = false;

    }else if(option == 'threeRounds'){
      this.threeRounds = this.threeRounds? false : true;

      this.oneRound = false;
      this.fiveRounds = false;
    }else{
      this.fiveRounds = this.fiveRounds? false: true;

      this.oneRound = false;
      this.threeRounds = false;
    }

    if(this.oneRound != false || this.threeRounds != false || this.fiveRounds != false){
      switch(this.oneRound || this.threeRounds || this.fiveRounds){
        case this.oneRound:
          this.roundNumber = 1;
          break;
        case this.threeRounds:
          this.roundNumber = 3;
          break;
        case this.fiveRounds:
          this.roundNumber = 5;
          break;
      }

      this.gameservice.getGameRound(this.roundNumber);
    }

  }

  onKey(value: any){
    this.userName = value;
    this.gameservice.getUsername(this.userName);
    if(this.userName != null || this.userName != ''){
      localStorage.setItem('username', JSON.stringify(this.userName));
    }
  }

  buttonClicked(){
    if(this.userName == '' && localStorage.getItem('username') == null){
      alert("There was no username entered");
      return;
    }
    else if(localStorage.getItem('username') != null && this.userName == ''){
      alert("There was no username entered");
      return; 
    }

    if(this.oneRound == false && this.threeRounds == false && this.fiveRounds == false){
      alert('No option was selected');
      return;
    }
    this.gameservice.comitRoundSelection();
    localStorage.setItem('gameRound', JSON.stringify(this.gameservice.gameRound));

    this.gameservice.playerSelections = [];
    localStorage.removeItem('playerSelections');

    this.gameservice.compSelections = [];
    localStorage.removeItem('compSelections');
    
  }

}
