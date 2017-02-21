/**
 * Created by mxxiao on 2/2/17.
 */
import {Component, OnInit, HostBinding} from "@angular/core";
import {Params, ActivatedRoute, Router} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {slideInDownAnimation} from "../animation";
import {Crisis} from "./crisis.model";
import {CrisisService} from "./crisis.service";


@Component({
  templateUrl: './app/crisis-center/crisis-detail.component.html',
  animations: [slideInDownAnimation]
})
export class CrisisDetailComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  crisis: Crisis;

  constructor(private crisisService: CrisisService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params)=>this.crisisService.getCrisis(+params['id']))
      .subscribe(crisis=>this.crisis = crisis);
  }

  gotoCrisis(): void {
    let crisisId = this.crisis ? this.crisis.id : null;
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }

}
