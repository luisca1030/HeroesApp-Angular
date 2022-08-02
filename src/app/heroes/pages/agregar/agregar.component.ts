import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../Interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
     width: 60%;
     border-radius: 10px;
  }
`]
})
export class AgregarComponent implements OnInit {

  tituloAction : string = "Agregar";

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    if( !this.router.url.includes('editar')){
         return
    }

    this.tituloAction = 'Actualizar';

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroeId(id))
      )
      .subscribe(heroe =>{
            this.heroe = heroe
           // this.heroe.id ? this.tituloAction = "Actualizar" : "Agregar"
          });
  }

  guardar() {

    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {

      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(heroe => {
        //console.log('Actualizando', heroe);
       this.mostrarSnakBar('Registro actualizado');
      })

    } else {

      this.heroesService.agregarHeroe(this.heroe)
        .subscribe( heroe => {
           this.router.navigate(['/heroes/editar',heroe.id]);
           this.mostrarSnakBar('Registro creado');
        })
    }

  }


  borrarHeroe(){

    const dialogRef =  this.dialog.open(ConfirmarComponent , {
        width: '250px',
        data: {...this.heroe}
    });

    dialogRef.afterClosed().subscribe(result =>{
         if ( result ){

            this.heroesService.borrarHeroe(this.heroe.id !)
            .subscribe( heroe => {
              this.router.navigate(['/heroes']);
            });

         }
    });


  }


  mostrarSnakBar(mensaje : string){

     this.snackBar.open( mensaje ,'ok!', {
          duration: 2000
     });
  }

}
