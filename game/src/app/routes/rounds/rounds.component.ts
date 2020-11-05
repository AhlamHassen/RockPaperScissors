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

  constructor(public gameservice: GameService) { }

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
      //
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
    // this.gameservice.comitSelection();
    // localStorage.setItem('playerSelection', JSON.stringify(this.gameservice.selection));
    
  }

}
