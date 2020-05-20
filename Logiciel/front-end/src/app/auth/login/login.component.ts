import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm)
  {
    if (!f.valid)
    {
        console.log("Mauvais courriel ou Pwd");
    }
    else
    {
        this._auth.loginUser(f.value)
        .subscribe(
            res => {
                    localStorage.setItem('token', res.token)  
                    this._router.navigate(['']);
                    },
            err => console.log(err)
        )
        return true;

    }
  }
/*--------------------------------------------------
  Fonction: "onSubmit(f: NgForm)";
    @auteur: Lorenzo NADAL SANTA;
- f correspond aux donnnes remplies par l'utilisateur

La fonction onSubmit permet d'envoyer le formulaire
de connexion au back-end et de stocker le token generer
dans le back-end qui garantie l'identite de l'utilisateur
lorsque ce dernier navigue dans l'application.
Il est visible dans le Local Storage du navigateur
--------------------------------------------------*/

}
