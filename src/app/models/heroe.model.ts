export class HeroeModel {
  id!: string| null;
  nombre!: string;
  poder!: string;
  vivo: boolean;
  constructor() {
    this.vivo = true;
  }
}