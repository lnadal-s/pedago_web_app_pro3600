import { Component, OnInit, Type, Input } from '@angular/core';
import { ProjetService } from '../../../services/projet.service';
import { Projet } from 'src/app/interfaces/projet';


interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string ;
  
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  
  
  constructor(private _projetService: ProjetService) {
    
    this.get_proj();
  }

    public projetS;
    public tabRoad;
    public triProjetJava1 = [];
    public triProjetJava2 : Projet[] =[]; 
    public triProjetJava3 : Projet[] =[];
    public triProjetShell1 : string[] = ['ok', 'uoi', 'non'];
    public triProjetShell2 : string[] = ['poiu', 'bcgf', 'azer']; 
    public triProjetShell3 : string[] = ['bite', 'int', 'zizou']; 
    public triProjetPhp1 : Projet[] = []; 
    public triProjetPhp2 : Projet[] = []; 
    public triProjetPhp3 : Projet[] = [];

    get_proj() {
      this._projetService.get_project()
      .subscribe(
          res => {
              this.projetS = res;
    
              this.triProjetJava1  = this.tri_lvrequis(1, 1, this.projetS);
              this.triProjetJava2 = this.tri_lvrequis(1, 2, this.projetS);
              this.triProjetJava3 = this.tri_lvrequis(1, 3, this.projetS);
              this.triProjetPhp1 = this.tri_lvrequis(3, 1, this.projetS);
              this.triProjetPhp2 = this.tri_lvrequis(3, 2, this.projetS);
              this.triProjetPhp3 = this.tri_lvrequis(3, 3, this.projetS);

              this.tabRoad = [ this.triProjetJava1, this.triProjetJava2, this.triProjetJava3, this.triProjetShell1, this.triProjetShell2, this.triProjetShell3, 
                  this.triProjetPhp1, this.triProjetPhp2, this.triProjetPhp3 ];
              
              console.log(this.tabRoad);
              console.log(this.triProjetShell1[0]);
              
  
              
             },
          err => console.log(err)
      )
  };


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


  ngOnInit(): void {
  }

  
  allColumns = [ 'name'];

  
  data: TreeNode<FSEntry>[] = [
    {
      data: { name: 'JAVA' },
      children: [
        { 
          data: { name: 'Novice'}, 
          children: [
            { data: { name: 'o' } },
            { data: { name: 'o'} },
            { data: { name: 'o' } },
            { data: { name: 'o' } },
            { data: { name: 'o' } },
            { data: { name: 'o' } },
          ],
        },
        { 
          data: { name: 'Intermédiaire'}, 
          children: [
            { data: { name: 'o' } },
            { data: { name: 'o'} },
            { data: { name: 'o' } },
            { data: { name: 'o' } },
            { data: { name: 'o' } },
            { data: { name: 'o'} },
          ],
        },
        {
          data: { name: 'Avancé'},
          children: [
            { data: { name: 'o'} },
            { data: { name: 'o'} },
            { data: { name: 'o'} },
            { data: { name: 'o'} },
            { data: { name: 'o'} },
            { data: { name: 'o' } },
          ],
        },
      ],
    },
    {
      data: { name: 'SHELL'},
      children: [
        {
          data: { name: 'Novice'}, 
          children: [
            { data: { name: this.triProjetShell1[0]} },
            { data: { name: this.triProjetShell1[1]} },
            { data: { name: this.triProjetShell1[2]} },
            { data: { name: 'o'} },
            { data: { name: 'o'} },
            { data: { name: 'o'} },
          ],
        },
        
        { data: { name: 'Intermédiaire'}, 
        children: [
          { data: { name: 'this.triProjetShell2[0].nom' } },
          { data: { name: 'this.triProjetShell2[1].nom'} },
          { data: { name: 'this.triProjetShell2[2].nom'} },
          { data: { name: 'f' } },
          { data: { name: 'f' } },
          { data: { name: 'f' } },
        ],
        },
        
        {
          data: { name: 'Avancé'},
          children: [
            { data: { name: 'this.triProjetShell3[0].nom'} },
            { data: { name: 'this.triProjetShell3[1].nom'} },
            { data: { name: 'r'} },
            { data: { name: 'r'} },
            { data: { name: 'r' } },
            { data: { name: 'r'} },


          ],
        },
      ],
    },
      {
        data: { name: 'PHP'},
        children: [
          { data: { name: 'Novice'},
          children: [
            { data: { name: 'r' } },
            { data: { name: 'r'} },
            { data: { name: 'r' } },
            { data: { name: 'r' } },
            { data: { name: 'r' } },
            { data: { name: 'r'} },
          ],
          },
            
          { data: { name: 'Intermédiaire'},
          children: [
            { data: { name: 'r'} },
            { data: { name: 'r'} },
            { data: { name: 'r'} },
            { data: { name: 'r'} },
            { data: { name: 'r'} },
            { data: { name: 'r'} },
            
          ],
          },
          
          { data: { name: 'Avancé'},
            children: [
              { data: { name: 'r'} },
              { data: { name: 'r'} },
              { data: { name: 'r' } },
              { data: { name: 'r'} },
              { data: { name: 'rr'} },
              { data: { name: 'r' } },
            ],
          },
        ],
      },
  ];
  
  
}
