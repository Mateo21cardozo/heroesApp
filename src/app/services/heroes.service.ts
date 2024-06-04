import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface HeroesResponse {
  [key: string]: HeroeModel;
}

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://crud-18477-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }
  borrarHeroe(id: string| null ) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemporal: any = { ...heroe };
    delete heroeTemporal.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemporal);
  }
  getHeroe(id: string | null) {
    return this.http.get<HeroeModel>(`${this.url}/heroes/${id}.json`);
  }
  getHeroes() {
    return this.http
      .get<HeroesResponse>(`${this.url}/heroes.json`)
      .pipe(map((resp) => this.crearArregloHeroes(resp)));
  }

  private crearArregloHeroes(heroesObj: HeroesResponse): HeroeModel[] {
    const heroes: HeroeModel[] = [];
    if (heroesObj === null) {
      return [];
    }
    console.log(heroesObj);
    Object.keys(heroesObj).forEach((key) => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }
}
