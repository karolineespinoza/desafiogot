import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Api } from '../../providers/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public api: Api) {

  }

  public casas: any;
  public personajes: any;
  public showHouses: boolean = false;
  public showCharacters: boolean = false;

  ionViewDidLoad() {

    //Llamada a la API de GoT para obtener las casas
    this.api.get('houses', null, {})
      .subscribe(response => {
        this.casas = response;

        console.log(this.casas);
      }, (error) => {

      }
      );

    //Llamada a la API de GoT para obtener los personajes
    this.api.get('characters', null, {})
      .subscribe(response => {
        this.personajes = response;

        console.log(this.personajes);
      }, (error) => {

      });
  }

//Cambia valor de variable para mostrar u ocultar listado de personajes
  verPersonajes(e) {
    this.showCharacters = !this.showCharacters;
  }

  //Cambia valor de variable para mostrar u ocultar listado de casas
  verCasas(e) {
    this.showHouses = !this.showHouses;
  }
}
