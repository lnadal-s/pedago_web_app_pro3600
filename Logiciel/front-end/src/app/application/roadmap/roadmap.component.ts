import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../../services/projet.service';
import { Projet } from 'src/app/interfaces/projet';



@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {

    searchText;
    
    constructor( private _projetService: ProjetService) { 
        this.get_proj();
    }
    
    
    public projetS;
    public tabRoad;
    public triProjetJava1 : Projet[];
    public triProjetJava2 : Projet[]; 
    public triProjetJava3 : Projet[];
    public triProjetShell1 : Projet[];
    public triProjetShell2 : Projet[]; 
    public triProjetShell3 : Projet[]; 
    public triProjetPhp1 : Projet[]; 
    public triProjetPhp2 : Projet[]; 
    public triProjetPhp3 : Projet[];
    

    get_proj() {
        this._projetService.get_project()
        .subscribe(
            res => {
                this.projetS = res;
      
                this.triProjetJava1  = this.tri_lvrequis(1, 1, this.projetS);
                this.triProjetJava2 = this.tri_lvrequis(1, 2, this.projetS);
                this.triProjetJava3 = this.tri_lvrequis(1, 3, this.projetS);
                this.triProjetShell1 = this.tri_lvrequis(2, 1, this.projetS);
                this.triProjetShell2 = this.tri_lvrequis(2, 2, this.projetS);
                this.triProjetShell3 = this.tri_lvrequis(2, 3, this.projetS);
                this.triProjetPhp1 = this.tri_lvrequis(3, 1, this.projetS);
                this.triProjetPhp2 = this.tri_lvrequis(3, 2, this.projetS);
                this.triProjetPhp3 = this.tri_lvrequis(3, 3, this.projetS);

                this.tabRoad = [ this.triProjetJava1, this.triProjetJava2, this.triProjetJava3, this.triProjetShell1, this.triProjetShell2, this.triProjetShell3, 
                    this.triProjetPhp1, this.triProjetPhp2, this.triProjetPhp3 ];
                
                console.log(this.tabRoad);
                
    
                
               },
            err => console.log(err)
        )
    };

    /*--------------------------------------------------
    Fonction: "get_proj()";
    @auteur: Lorenzo NADAL SANTA;
    La fonction get_proj() a pour but de récupérer toutes
    les attributs de la table "projets" dans un seul et
    même tableau "projetS" ;
    ----------------------------------------------------*/
  
      tri_lvrequis(moduleId : number, lvRequis : number, projets : Projet[]) : Projet[] {
        var tab : Projet[] = [];
  
        for(var proj of projets) {
          if (proj.lvlrequis === lvRequis && proj.moduleId === moduleId){
              tab.push(proj);
          }
        }
        
        return tab;
      };

    /*--------------------------------------------------
     Fonction: "tri_lvrequis";
    @auteur: Samson MAZEAU;
    La fonction tri_lvrequis renvoie un tableau 
    contenant tous les projets d'un même niveau et d'un 
    même module;
    ----------------------------------------------------*/

    ngOnInit(){}
}

