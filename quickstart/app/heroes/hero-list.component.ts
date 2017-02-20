import {Component, OnInit} from "@angular/core";
import {HeroService} from "./hero.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Hero} from "./hero.model";
import "rxjs/add/operator/switchMap";
import {Observable} from "rxjs";


@Component({
  selector: 'hero-list',
  templateUrl: 'app/heroes/hero-list.component.html',
  styleUrls: ['./app/heroes/hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  heroes: Observable<Hero[]>;

  private selectedId: number;


  constructor(private heroService: HeroService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.heroes = this.route.params
      .switchMap((params: Params)=> {
        this.selectedId = +params['id'];
        return this.heroService.getHeroes();
      })
  }

  isSelected(hero: Hero) {
    return hero.id = this.selectedId;
  }

  onSelect(hero: Hero) {
    this.router.navigate(['/hero', hero.id]);
  }
}
