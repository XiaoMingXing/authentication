/**
 * Created by mxxiao on 2/3/17.
 */
import {Component, OnInit} from "@angular/core";
import {Hero} from "../models/hero.model";
import {HeroService} from "../services/hero.service";

@Component({
  selector: 'my-dashboard',
  templateUrl: './app/views/dashboard.component.html',
  styleUrls: [ './app/styles/dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.heroService.getHeroes().then(heroes=>this.heroes = heroes.slice(1, 5));
  }


}
