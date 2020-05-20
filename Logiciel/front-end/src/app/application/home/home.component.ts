import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: User;

  /* VARIABLES POUR LE DIAGRAMME RADAR */
  
  public radarChartLabels: Label[] = [];
  public radarChartData: ChartDataSets[] = [{ data: [], label: "cursus" }];
  public radarChartType: ChartType = 'radar';
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks: {
        suggestedMax: 100
      }
    }
  };
  /* FONCTIONS */
  constructor(private _authService: AuthService) {
    this.get_data();
  }

  ngOnInit(): void { };

  get_data_radar(user: User) {
    let cursus = user.cursus;
    let label = Object.keys(cursus);
    let size = label.length;
    let data: Array<number> = [];
    let k = 0;

    while (k < size) {
      data[k] = cursus[label[k]];
      k++;
    }
    this.radarChartLabels = label;
    this.radarChartData[0].data = data;
  }

  /*--------------------------------------------------
    Fonction: "get_data_radar(user: User)";
      @auteur: Lorenzo NADAL SANTA;
  - user correspond aux donnnes de  l'utilisateur
  
  Cette fonction permet d'adapter les donnees recuperer
  dans dans le profil user;
  user.cursus est de la forme :
  user.cursus {
    "shell": note, "java": note
  }
  cette fonction permet de dissocier les cles des valeurs
  pour les adapter aux proprietes de chartjs et du 
  diagramme radar
  --------------------------------------------------*/

  get_data() {
    this._authService.get_data().subscribe(
      res => {
        this.user = res[0];
        if (this.user.exp > 100) {
          this.user.level = Math.trunc(this.user.exp / 100);
          this.user.exp = this.user.exp - this.user.level * 100;
        }
        else {
          this.user.level = 0;
        }
        this.get_data_radar(this.user);
      },
      err => console.log(err)
    )
  };
  /*--------------------------------------------------
    Fonction: "get_data()";
      @auteur: Lorenzo NADAL SANTA;
  
  Cette fonction permet d'obtenir les donnees de 
  l'utilisateur;

  --------------------------------------------------*/
}
