import {Injectable} from "@angular/core";
import {Crisis} from "./crisis.model";
const CRISES = [
  new Crisis(1, 'Dragon Burning Cities'),
  new Crisis(2, 'Sky Rains Great White Sharks'),
  new Crisis(3, 'Giant Asteroid Heading For Earth'),
  new Crisis(4, 'Procrastinators Meeting Delayed Again'),
];

let crisisPromise = Promise.resolve(CRISES);

Injectable()
export class CrisisService {
  getAllCrisis() {
    return crisisPromise;
  }

  getCrisis(id: number | string) {
    return crisisPromise
      .then(allCrisis => allCrisis.find(crisis => crisis.id === +id));
  }
}

