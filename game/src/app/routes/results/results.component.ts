import { Component, HostListener, OnInit} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { GameService } from 'src/game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  nameOfclass: string;

  constructor(private game: GameService, private router: Router) { }

  @HostListener("window:beforeunload", ["$event"]) 
  unloadHandler(event: Event) {
    return false;
  }
 
  ngOnInit(): void {
    this.nameOfclass = this.game.selection;
  }

  tryAgain(){
    this.game.playAgain();
  }
}
