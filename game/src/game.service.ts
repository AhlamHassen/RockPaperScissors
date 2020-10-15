import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _selection? : 'rock' | 'paper' | 'scissors';

  get selection(){
    return this._selection;
  }

  constructor() { }

  selectedOption(option: 'rock' | 'paper' | 'scissors'){
    this._selection = option;
  }

  comitSelection(){
    if(this._selection == null){
      alert('No option was selected');
    }
    

  }
}
