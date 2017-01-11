import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  heroes: Hero[] = [];

  // dependency injection (of the service)
  constructor(private heroService: HeroService) {
    // don't do anything
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then((data) => this.heroes = data.slice(1,5));
  }
}
