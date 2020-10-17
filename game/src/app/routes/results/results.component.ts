import { Component, HostListener, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit{

  nameOfclass: string;

  constructor(private game: GameService, private router: Router) { }

  ngOnInit(): void {
    this.game.fromStorage();
    this.nameOfclass = this.game.selection;
    console.log('game selection: ' + this.nameOfclass);
  }

  tryAgain(){
    this.game.playAgain();
  }
}
