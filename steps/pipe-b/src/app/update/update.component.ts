import { mergeMap, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { PeopleService } from '../shared/people-service';

@Component({
  selector: 'sfeir-update',
  templateUrl: 'update.component.html',
  styleUrls: ['update.component.css']
})
export class UpdateComponent implements OnInit {
  person: any;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router, private _peopleService: PeopleService) {
    this.person = {
      address: {}
    };
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        mergeMap((id: string) => this._peopleService.fetchOne(id))
      )
      .subscribe((person: any) => (this.person = person));
  }

  submit(person: any) {
    this._peopleService.update(person).subscribe(() => this._router.navigate(['/people']));
  }

  cancel() {
    this._router.navigate(['/people']);
  }
}
