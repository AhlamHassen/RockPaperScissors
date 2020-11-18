import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  rockSelected: boolean = false;
  paperSelected: boolean = false;
  scissorsSelected: boolean = false;
  userName = '';
  turnsPlayed = 0;
  currentOption: string;

  constructor(public gameservice: GameService) { 
    if(localStorage.getItem('username') != null){
      this.userName = JSON.parse(localStorage.getItem('username'));
    }
  }

  ngOnInit(): void {
  }

  optionClicked(option: 'rock' | 'paper' | 'scissors'){
    if(option == 'rock'){
      this.rockSelected = this.rockSelected? false : true;
      
      this.paperSelected = false;
      this.scissorsSelected = false;

    }else if(option == 'paper'){
      this.paperSelected = this.paperSelected? false : true;

      this.rockSelected = false;
      this.scissorsSelected = false;
    }else{
      this.scissorsSelected = this.scissorsSelected? false: true;

      this.rockSelected = false;
      this.paperSelected = false;
    }

    if(this.rockSelected != false || this.paperSelected != false || this.scissorsSelected != false){
      this.currentOption = option;
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
  
    if(this.rockSelected == false && this.paperSelected == false && this.scissorsSelected == false){
      alert('No option was selected');
      return;
    }
    
    this.turnsPlayed++;
    this.roundSelection(this.currentOption); 

    if(this.turnsPlayed == this.gameservice.gameRound){
      this.gameservice.post();
    }

  }

  
  roundSelection(option: string){
    if(this.turnsPlayed == 1){
      this.gameservice.selections[0] = option;
    }
    if(this.turnsPlayed == 2){
      this.gameservice.selections[1] = option;
    }
    if(this.turnsPlayed == 3){
      this.gameservice.selections[2] = option;
    }
    if(this.turnsPlayed == 4){
      this.gameservice.selections[3] = option;
    }
    if(this.turnsPlayed == 5){
      this.gameservice.selections[4] = option;
    }

    localStorage.setItem('playerSelections', JSON.stringify(this.gameservice.selections));
  }

}
