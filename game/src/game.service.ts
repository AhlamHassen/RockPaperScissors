import { Injectable, ɵPlayer } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { Game, GameEnvelope, Player } from './app/Player';

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

  
  // https://cors-anywhere.herokuapp.com/ -- added infront of my API to prevent Referrer Policy: strict-origin-when-cross-origin
  get(){
    let request = this.httpClient.post<Game>("https://cors-anywhere.herokuapp.com/http://awseb-AWSEB-1LR165618GBHW-307257313.us-east-1.elb.amazonaws.com/Cgame/PostSelection", {
      PlayerChoice : this._selection
    } as Player);

    request.subscribe((response) => {
      console.log(response);
    });
  }
}
