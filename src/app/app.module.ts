import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes.component';

import { RouterModule } from '@angular/router';

const Routing = RouterModule.forRoot([
  {
    path: 'heroes',
    component: HeroesComponent,
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
