import { Component } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent {
  heroe = new HeroeModel();
  HeroesService: any;
  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const Id = this.route.snapshot.paramMap.get('id');
    if (Id !== 'nuevo') {
      this.heroesService.getHeroe(Id).subscribe((resp) => {
        this.heroe = resp;
        this.heroe.id = Id;
      });
    }
  }
  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('formulario no valido');
      return;
    }
    Swal.fire({
      title: 'espere',
      text: 'guardando informacion',
      allowOutsideClick: false,
    });
    Swal.showLoading();
    let peticion: Observable<any>;
    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }
    peticion.subscribe((resp) => {
      Swal.fire({
        title: `${this.heroe.nombre}`,
        text: 'Se actualizo correctamente',
      }).then(()=> {
        form.resetForm();
        this.heroe= new HeroeModel
      })
    });
  }
}
