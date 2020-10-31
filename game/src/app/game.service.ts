import { Injectable, ɵPlayer } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { Game, Player, PlayerSelection } from './Player';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _userName: string;
  private _selection?: 'rock' | 'paper' | 'scissors';
  private _compSelction: string;
  private _gameResult: string;

  get selection() {
    return this._selection;
  }

  get compSelection() {
    return this._compSelction;
  }

  get gameResult() {
    return this._gameResult;
  }

  get userName(){
    return this._userName;
  }

  constructor(private router: Router, private httpClient: HttpClient) { 
    this.fromStorage();
  }

  selectedOption(option: 'rock' | 'paper' | 'scissors') {
    this._selection = option;
  }

  getUsername(username: string){
    this._userName = username;
  }

  comitSelection() {
    of(null).pipe(delay(1000)).subscribe(() => {
      if (this._selection == null) {
        alert('No option was selected');
        return;
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

    if(this.userName === undefined && localStorage.getItem('username') != null){
      this._userName = JSON.parse(localStorage.getItem('username'));
    }
  }


  // https://cors-anywhere.herokuapp.com/ -- removed this because of security issues.
  post() {
    let request = this.httpClient.post<Game>("http://awseb-AWSEB-1LR165618GBHW-307257313.us-east-1.elb.amazonaws.com/Cgame/PostSelection", {
      userName: this._userName,
      playerChoice: this._selection
    } as PlayerSelection);

    request.subscribe((response) => {
      this._compSelction = response.cpuChoice;
      localStorage.setItem('cpuSelection', JSON.stringify(this.compSelection));

      this._gameResult = response.gameResult;
      localStorage.setItem('gameResult', JSON.stringify(this.gameResult));
    });

  }
}
