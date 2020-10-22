import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../../game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  rockSelected: boolean = false;
  paperSelected: boolean = false;
  scissorsSelected: boolean = false;

  constructor(private gameservice: GameService) { }

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
      this.gameservice.selectedOption(option);
    }

  }

  buttonClicked(){
    if(this.rockSelected == false && this.paperSelected == false && this.scissorsSelected == false){
      console.log('all are false');
      alert('No option was selected');
      return;
    }
    this.gameservice.comitSelection();
    localStorage.setItem('playerSelection', JSON.stringify(this.gameservice.selection));
    this.gameservice.get();
  }

}
