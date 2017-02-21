import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {Crisis} from "./crisis.model";
import {CrisisService} from "./crisis.service";


@Component({
  templateUrl: './app/crisis-center/crisis-list.component.html',
  styleUrls: ['./app/crisis-center/crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {

  allCrisis: Promise<Crisis[]>;

  private selectedCrisis: Crisis;


  constructor(private crisisService: CrisisService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.allCrisis = this.crisisService.getAllCrisis()
  }

  isSelected(crisis: Crisis) {
    return crisis === this.selectedCrisis;
  }

  onSelect(crisis: Crisis) {
    this.selectedCrisis = crisis;

    // Navigate with relative link
    this.router.navigate([crisis.id], {relativeTo: this.route});
  }
}
