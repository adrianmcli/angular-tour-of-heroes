import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-heroes',
  template: `
    <h2>My Heroes</h2>
    <div>
      <label>Hero name:</label>
      <input type="text" #heroName />
      <button (click)="add(heroName.value); heroName.value=''">Add</button>
    </div>
    <ul class="heroes">
      <li
        *ngFor="let hero of heroes"
        (click)="onSelect(hero)"
        [class.selected]="hero === selectedHero"
        >
        <span class="badge">{{hero.id}}</span>
        <span>{{hero.name}}</span>
        <button class="delete"
          (click)="delete(hero); $event.stopPropagation()">x</button>
      </li>
    </ul>
    <div *ngIf="selectedHero">
      <h2>{{selectedHero.name | uppercase}} is my hero</h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>
  `,
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero)
      .then(() => {
        this.heroes = this.heroes.filter(h => h!== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      })
  }

  onSelect(hero: Hero): void {
    // set selected hero
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroesSlowly()
      .then((data) => this.heroes = data);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  // by calling private heroService: HeroService,
  // this automatically does 2 things:
  // 1. defines a private heroService property
  // 2. identifies this property as the HeroService injection point
  constructor(
    private heroService: HeroService,
    private router: Router,
  ) {
    // we choose not to call getHeroes() here because it is
    // bad to make the constructor too complex
  }

  // life cycle hook for when component is initialized
  ngOnInit(): void {
    this.getHeroes();
  }
}
