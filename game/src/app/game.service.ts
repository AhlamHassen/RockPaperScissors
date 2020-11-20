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
  private _gameResult?: string;
  private _gameRound: number;
  private _leaderboard : LeaderboardLine[];
  public playerSelections = [];
  public compSelections = [];
  public pronoun = 'You';

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

  getUsername(username: string){
    this._userName = username;
  }

  getGameRound(num : number){
    this._gameRound = num;
  }

  comitPlaySelection() {
    of(null).pipe(delay(600)).subscribe(() => {
      this.router.navigateByUrl('/results');
    });
  }

  comitRoundSelection() {
    of(null).pipe(delay(600)).subscribe(() => {
      if (this._gameRound == null) {
        alert('No option was selected');
        return;
      }

      this.router.navigateByUrl('/play');

    });
  }

  playAgain() {
    this.playerSelections = [];
    localStorage.removeItem('playerSelections');

    this.compSelections = [];
    localStorage.removeItem('compSelections');

    this.router.navigateByUrl('/play');
  }

  fromStorage() {
    if (this._gameResult === undefined && localStorage.getItem('gameResult') != null) {
      this._gameResult = JSON.parse(localStorage.getItem('gameResult'));
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

    if(this.playerSelections.length === 0 && localStorage.getItem('playerSelections') != null){
      this.playerSelections = JSON.parse(localStorage.getItem('playerSelections'));
    }

    if(this.compSelections.length === 0 && localStorage.getItem('compSelections') != null){
      this.compSelections = JSON.parse(localStorage.getItem('compSelections'));
    }
  }


  // https://cors-anywhere.herokuapp.com/ -- removed this because of security issues.
  post() {
    if (this.playerSelections.length == 0) {
      alert('No option was selected');
      return;
    }

    let request = this.httpClient.post<Game>("http://awseb-AWSEB-1MCJAEJ2VWR4K-868425229.us-east-1.elb.amazonaws.com/Cgame/PostSelection", {
      userName: this._userName,
      gameRound: this.gameRound,
      playerSelections: this.playerSelections
    } as PlayerSelection);

    request.subscribe((response) => {
      this.compSelections = response.cpuSelections;
      localStorage.setItem('compSelections', JSON.stringify(this.compSelections));

      this._gameResult = response.gameResult;
      localStorage.setItem('gameResult', JSON.stringify(this._gameResult));
      
      if(this.gameResult == 'Draw'){
        this.pronoun = 'It Is a';
      }
      else{
        this.pronoun = 'You';
      }

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
