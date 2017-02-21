import {Component, OnInit} from "@angular/core";
import {HeroService} from "./hero.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Hero} from "./hero.model";
import "rxjs/add/operator/switchMap";


@Component({
  selector: 'hero-list',
  templateUrl: 'app/heroes/hero-list.component.html',
  styleUrls: ['./app/heroes/hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  heroes: Promise<Hero[]>;

  private selectedHero: Hero;


  constructor(private heroService: HeroService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.heroes = this.heroService.getHeroes()
  }

  isSelected(hero: Hero) {
    return hero === this.selectedHero;
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.router.navigate(['/detail', hero.id]);
  }
}
