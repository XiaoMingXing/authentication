import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Hero} from "../models/hero.model";
import {HeroService} from "../services/hero.service";

@Component({
  selector: 'my-heroes',
  templateUrl: '/app/views/heroes.component.html',
  styleUrls: ['./app/styles/heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;
  heroes: Hero[];

  constructor(private heroService: HeroService,
              private router: Router) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(()=> {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes=>this.heroes = heroes);
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

}