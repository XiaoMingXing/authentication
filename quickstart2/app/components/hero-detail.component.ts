/**
 * Created by mxxiao on 2/2/17.
 */
import {Component, OnInit, Input} from "@angular/core";
import {Hero} from "../models/hero.model";
import {Params, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {HeroService} from "../services/hero.service";
import "rxjs/add/operator/switchMap";


@Component({
  selector: 'my-hero-detail',
  templateUrl: '/app/views/hero-detail.component.html',
  styleUrls: ['./app/styles/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location) {

  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params)=>this.heroService.getHero(+params['id']))
      .subscribe(hero=>this.hero = hero);
  }

  @Input()
  hero: Hero;

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
