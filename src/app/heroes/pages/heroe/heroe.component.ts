import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap,tap  } from "rxjs";
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../Interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
     img {
         width:100%;
         border-radius: 5px;
     }
  `
  ]
})
export class HeroeComponent implements OnInit {

   heroe !: Heroe;

  constructor(private activatedRoute : ActivatedRoute,
              private  heroesService: HeroesService,
              private router :Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.heroesService.getHeroeId(id) )
      )
      .subscribe(heroe => this.heroe = heroe)
  }

  regresar(){
      this.router.navigate(['/heroes/listado']);
  }

}