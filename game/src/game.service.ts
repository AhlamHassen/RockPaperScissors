import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  result: 'Win' | 'Loose';
  private _selection? : 'rock' | 'paper' | 'scissors';
  private _compSelction: 'rock' | 'paper' | 'scissors';

  get selection(){
    return this._selection;
  }

  get compSelection(){
    return this._compSelction;
  }

  constructor(private router: Router, private httpClient: HttpClient) { }

  selectedOption(option: 'rock' | 'paper' | 'scissors'){
    this._selection = option;
  }

  comitSelection(){
    of(null).pipe(delay(1000)).subscribe(() => {
      if(this._selection == null){
        alert('No option was selected');
      }

      this.router.navigateByUrl('/results');

    });
  }

  playAgain(){
    of(null).pipe(delay(1000)).subscribe(() => {
      this.router.navigateByUrl('/play');
    });
    this._selection = null;
  }


  fromStorage(){
    if(this._selection === undefined ){
      if(localStorage.getItem('selection') != null){
        this._selection = JSON.parse(localStorage.getItem('selection'));
      }
    }
  }
}
