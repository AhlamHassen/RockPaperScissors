import { Injectable, ɵPlayer } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { Game, LeaderboardLine, Player, PlayerSelection } from './Player';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _userName: string;
  private _selection?: 'rock' | 'paper' | 'scissors';
  private _compSelection?: string;
  private _gameResult?: string;
  private _gameRound: number;
  private _leaderboard : LeaderboardLine[];

  get selection() {
    return this._selection;
  }

  get compSelection() {
    return this._compSelection;
  }

  get gameResult() {
    return this._gameResult;
  }

  get userName(){
    return this._userName;
  }

  get gameRound(){
    return this._gameRound;
  }

  get leaderboard(){
    return this._leaderboard;
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

  getGameRound(num : number){
    this._gameRound = num;
  }

  comitPlaySelection() {
    of(null).pipe(delay(1000)).subscribe(() => {
      this.router.navigateByUrl('/results');
    });
  }

  comitRoundSelection() {
    of(null).pipe(delay(1000)).subscribe(() => {
      if (this._gameRound == null) {
        alert('No option was selected');
        return;
      }

      this.router.navigateByUrl('/play');

    });
  }

  playAgain() {
    of(null).pipe(delay(1000)).subscribe(() => {
      this.router.navigateByUrl('/play');
    });

  }


  fromStorage() {
    if (this._selection === undefined && this._compSelection === undefined && this._gameResult === undefined) {
      if (localStorage.getItem('playerSelection') != null) {
        this._selection = JSON.parse(localStorage.getItem('playerSelection'));
      }
      if (localStorage.getItem('cpuSelection') != null) {
        this._compSelection = JSON.parse(localStorage.getItem('cpuSelection'));
      }
      if (localStorage.getItem('gameResult') != null) {
        this._gameResult = JSON.parse(localStorage.getItem('gameResult'));
      }
    }

    if(this.userName === undefined && localStorage.getItem('username') != null){
      this._userName = JSON.parse(localStorage.getItem('username'));
    }

    if(this._leaderboard === undefined && localStorage.getItem('Leaderboard') != null){
      this._leaderboard = JSON.parse(localStorage.getItem('Leaderboard'));
    }

    if(this._gameRound === undefined && localStorage.getItem('gameRound') != null){
      this._gameRound = JSON.parse(localStorage.getItem('gameRound'));
    }
  }


  // https://cors-anywhere.herokuapp.com/ -- removed this because of security issues.
  post() {
    if (this._selection == null) {
      alert('No option was selected');
      return;
    }

    let request = this.httpClient.post<Game>("http://awseb-AWSEB-1MCJAEJ2VWR4K-868425229.us-east-1.elb.amazonaws.com/Cgame/PostSelection", {
      userName: this._userName,
      playerChoice: this._selection
    } as PlayerSelection);

    request.subscribe((response) => {
      this._compSelection = response.cpuChoice;
      localStorage.setItem('cpuSelection', JSON.stringify(this._compSelection));

      this._gameResult = response.gameResult;
      localStorage.setItem('gameResult', JSON.stringify(this._gameResult));
    }, (error) => {
      alert("The API is down");
      console.log(error);
    });

    this.comitPlaySelection();
  }

  get(){
    let request = this.httpClient.get<LeaderboardLine[]>("http://awseb-AWSEB-1MCJAEJ2VWR4K-868425229.us-east-1.elb.amazonaws.com/Cgame/Leaderboard");
    request.subscribe((response) =>{
     this._leaderboard = response;
     localStorage.setItem('Leaderboard', JSON.stringify(this._leaderboard));      
    })
  }
}
