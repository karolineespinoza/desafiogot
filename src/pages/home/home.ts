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
    this.api.get('houses', null, {})
      .subscribe(response => {
        this.casas = response;

        console.log(this.casas);
      }
      );

    this.api.get('characters', null, {})
      .subscribe(response => {
        this.personajes = response;

        console.log(this.personajes);
      }, (error) => {

      }, () => {
        this.personajes.forEach(p => {
          //let num = p["allegiances"].lastIndexOf("/")
          if (p["allegiances"].length > 0) {
            let num = p["allegiances"][0].lastIndexOf("/");
            this.api.get('houses', p["allegiances"].toString().substring(num+ 1), {})
              .subscribe(response => {
                //this.personajes = response;

                console.log(this.personajes);
              });
          }
        });
      });
  }


  verPersonajes(e) {
    this.showCharacters = !this.showCharacters;
  }

  verCasas(e) {
    this.showHouses = !this.showHouses;
  }
}
