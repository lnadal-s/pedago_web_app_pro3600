import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    success_register: boolean = false;

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm)
  {
        if(!f.valid)
            console.log("Invalid Form");
        else
        {
            this._auth.registerUser(f.value)
            .subscribe(
                res => {
                    this.success_register = true;
                },
                err => console.log(err)
            )
        }
  }

/*--------------------------------------------------
    Fonction: "onSubmit(f: NgForm)";
    @auteur: Lorenzo NADAL SANTA;
- f correspond aux donnnes remplies par l'utilisateur

La fonction onSubmit permet d'envoyer le formulaire
d'enregistrement au back-end;
--------------------------------------------------*/
}
