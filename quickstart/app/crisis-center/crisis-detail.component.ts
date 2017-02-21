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

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  canDeactivate(): Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

}
