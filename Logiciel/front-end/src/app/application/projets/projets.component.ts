import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Projet } from '../../interfaces/projet';
import { ProjetService } from '../../services/projet.service';
import { Historique } from 'src/app/interfaces/historique';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';


@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {

  searchQuery: string;
  projet: Projet;
  isUploaded: boolean = false;
  historique: Historique;
  selectedFile: File;
  name: string;

  constructor(private _route: ActivatedRoute,
    private _router: Router, private _projetService: ProjetService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.searchQuery = params.get('id');
      this._projetService.get_projet(this.searchQuery)
        .subscribe(
          res => {
          this.projet = res[0]
            this.afficherStats()
          },
          err => console.log(err)
        );
    });

  }

  onUpload() {

    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    this.isUploaded = true;
    this._projetService.upload_projet(uploadData, this.projet.idprojets)
      .subscribe(
        res => {
          this.projet.note = res.note;
          console.log("res");
          console.log(res);
        },
        err => {
          console.log("err");
          console.log(err);
        }
      );
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    var fullpath = this.selectedFile.name;
    var backslash = fullpath.lastIndexOf("\\");
    var filename = fullpath.substr(backslash + 1);

    var confirm_message = confirm("Files selected for import are \n Zip File: " + filename + "\n\nDo you want to proceed?");
  }

  newUpload() {
    this.isUploaded = false;
  }

  /*--------------------------------------------------
    Fonction: "newUpload()";
    @auteur: Juliette Ould-Aklouche;
    La fonction newUpload() permet de rafraîchir la 
    page projet;
    ----------------------------------------------------*/

  noteIsNull() {
    if (this.projet.note == null) {
      return true
    }
    else return false
  }

  /*--------------------------------------------------
    Fonction: "noteIsNull()";
    @auteur: Juliette Ould-Aklouche;
    La fonction noteIsNull() permet de vérifier
    si l'utilisateur à déjà été noté sur un projet';
  ----------------------------------------------------*/

  encadrantIsNull() {
    if (this.projet.encadrant == null) {
      return true
    }
    else return false
  }

  /*--------------------------------------------------
    Fonction: "encadrantIsNull()";
    @auteur: Juliette Ould-Aklouche;
    La fonction encadrantIsNull() permet de vérifier
    si le projet à un encadrant attitré ou non;
  ----------------------------------------------------*/

  historiqueIsNull() {
    if (this.historique == null) {
      return true
    }
    else return false
  }

  /*--------------------------------------------------
    Fonction: "historiqueIsNull()";
    @auteur: Juliette Ould-Aklouche;
    La fonction historiqueIsNull() permet de tester si 
    l'utilisateur n'a pas encore remis de projet prêt
    à être corrigé et donc n'a pas d'historique;
  ----------------------------------------------------*/

  updateHistorique() {
    this._projetService.get_historique(this.projet.idprojets)
      .subscribe(
        res => {
          this.historique = res;
          console.log(res);
        },
        err => console.log(err)
      );
  }

  /*--------------------------------------------------
    Fonction: "updateHistorique()";
    @auteur: Juliette Ould-Aklouche;
    La fonction updateHistorique() permet de "rafraîchir"
    l'historique de l'utilisateur en appelant la fonction
    "get_historique()";
    ----------------------------------------------------*/

  afficherStats(){
    let s1 = this.sum_data(this.projet.data1)
    let s2 = this.sum_data(this.projet.data2)
    let maxData;
    console.log(s1)
    console.log(s2);
    if (s1 > s2)
    {
      maxData = s1;
    }
    else
    {
      maxData = s2;
    }
    this.barChartData[0].data = this.projet.data1
    this.barChartData[1].data = this.projet.data2
    this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = maxData;
  }

  /*--------------------------------------------------
    Fonction: "afficherStats";
    @auteur: Samson MAZEAU;
    La fonction "afficherStats" permet de mettre à jour
    le graphique horizontal qui permet de visualiser pour
    chaque projet la réussite globale de celui-ci.
    "data1" contient les résultats obtenus pour la 
    première tentative et "data2" pour la seconde;
    ----------------------------------------------------*/


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          suggestedMin: 0,
          beginAtZero: true,
          suggestedMax: 50,
        }
      }]
    }
  };

  public barChartLabels: Label[] = ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Première tentative' },
    { data: [], label: 'Seconde tentative' }
  ];

  sum_data(data)
  {
    let size = data.length;
    let k = 0;
    let result = 0;

    while (k < size)
    {
      result = data[k] + result;
      k++;
    }
    return (result);
  }
}
