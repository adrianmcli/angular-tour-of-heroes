import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-hero-detail',
  template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div>
        <label>id: </label>
        <span>{{hero.id}}</span>
      </div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name" />
      </div>
      <button (click)="goBack()">Back</button>
    </div>
  `,
  styles: ['hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input()
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    // nothing inside constructor
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) =>
      this.heroService.getHero(Number(params['id']))
    ).subscribe(data => this.hero = data);
  }

}
