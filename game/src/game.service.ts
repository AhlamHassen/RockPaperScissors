import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  result: 'Win' | 'Loose';
  private _selection? : 'rock' | 'paper' | 'scissors';

  get selection(){
    return this._selection;
  }

  constructor(private router: Router) { }

  get computerSelection(){
    return 'scissors';
  }

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

  }
}