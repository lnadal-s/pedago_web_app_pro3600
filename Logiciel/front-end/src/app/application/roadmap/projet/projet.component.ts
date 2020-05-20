import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ProjetService } from '../../../services/projet.service';
import { NbDialogService } from '@nebular/theme';
import { Projet } from '../../../interfaces/projet';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {

    @Input() projet: Projet;
    
    constructor( private _projetService: ProjetService,  private route: ActivatedRoute, private router: Router, private dialogService: NbDialogService)
    {this.route.params.subscribe( params => this.onSearch(params['term']));
    }
    
    ngOnInit(): void {
    }

    onSearch(term:number) {
        this.router.navigate(['projet', term]);
      }

    Register(){
        this._projetService.get_registered(this.projet.idprojets)
        .subscribe(
            res => {
                if (res.status = 200)
                {
                    this.projet.isRegistered = true;
                }
            },
            err => console.log(err)
        )
    };

    UnRegister()
    {
        this._projetService.get_unregistered(this.projet.idprojets)
        .subscribe(
            res => 
            {
                if (res.status = 200)
                {
                    this.projet.isRegistered = false;
                }
            },
            err => console.log(err)
        )

    }
}
