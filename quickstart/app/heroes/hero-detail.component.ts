/**
 * Created by mxxiao on 2/2/17.
 */
import {Component, OnInit, Input, HostBinding} from "@angular/core";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import "rxjs/add/operator/switchMap";
import {HeroService} from "./hero.service";
import {slideInDownAnimation} from "../animation";
import {Hero} from "./hero.model";


@Component({
  templateUrl: 'app/heroes/hero-detail.component.html',
  styleUrls: ['./app/heroes/hero-detail.component.css'],
  animations: [slideInDownAnimation]
})
export class HeroDetailComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  hero: Hero;

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params)=>this.heroService.getHero(+params['id']))
      .subscribe(hero=>this.hero = hero);
  }

  gotoHeroes(): void {
    let heroId = this.hero ? this.hero.id : null;
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

}
