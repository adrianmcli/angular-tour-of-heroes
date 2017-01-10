import { Component } from '@angular/core';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li
        *ngFor="let hero of heroes"
        (click)="onSelect(hero)"
        [class.selected]="hero === selectedHero"
        >
        <span class="badge">{{hero.id}}</span>
        {{hero.name}}
      </li>
    </ul>
    <app-hero-detail [hero]="selectedHero"></app-hero-detail>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes!';
  selectedHero: Hero;
  heroes: Hero[];

  onSelect(hero: Hero): void {
    // set selected hero
    this.selectedHero = hero;
  }

  // by calling private heroService: HeroService,
  // this automatically does 2 things:
  // 1. defines a private heroService property
  // 2. identifies this property as the HeroService injection point
  constructor(private heroService: HeroService) {
    // now that this.heroService has been initialized
    // from the param, we can simply call its method
    // to get the data we want
    this.heroes = this.heroService.getHeroes();
  }
}
