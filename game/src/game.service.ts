import { Injectable, ɵPlayer } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { Game, Player } from './app/Player';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _gameResult: string;
  private _selection?: 'rock' | 'paper' | 'scissors';
  private _compSelction: string;

  get selection() {
    return this._selection;
  }

  get compSelection() {
    return this._compSelction;
  }

  get gameResult() {
    return this._gameResult;
  }

  constructor(private router: Router, private httpClient: HttpClient) { }

  selectedOption(option: 'rock' | 'paper' | 'scissors') {
    this._selection = option;
  }

  comitSelection() {
    of(null).pipe(delay(1000)).subscribe(() => {
      if (this._selection == null) {
        alert('No option was selected');
      }

      this.router.navigateByUrl('/results');

    });
  }

  playAgain() {
    of(null).pipe(delay(1000)).subscribe(() => {
      this.router.navigateByUrl('/play');
    });
    this._selection = null;
  }


  fromStorage() {
    if (this._selection === undefined && this._compSelction === undefined && this._gameResult === undefined) {
      if (localStorage.getItem('playerSelection') != null) {
        this._selection = JSON.parse(localStorage.getItem('playerSelection'));
      }
      if (localStorage.getItem('cpuSelection') != null) {
        this._compSelction = JSON.parse(localStorage.getItem('cpuSelection'));
      }
      if (localStorage.getItem('gameResult') != null) {
        this._gameResult = JSON.parse(localStorage.getItem('gameResult'));
      }
    }
  }


  // https://cors-anywhere.herokuapp.com/ -- removed this because of security issues.
  get() {
    let request = this.httpClient.post<Game>("http://awseb-AWSEB-1LR165618GBHW-307257313.us-east-1.elb.amazonaws.com/Cgame/PostSelection", {
      PlayerChoice: this._selection
    } as Player);

    request.subscribe((response) => {
      this._compSelction = response.cpuChoice;
      localStorage.setItem('cpuSelection', JSON.stringify(this.compSelection));

      this._gameResult = response.gameResult;
      localStorage.setItem('gameResult', JSON.stringify(this.gameResult));
    });

  }
}
