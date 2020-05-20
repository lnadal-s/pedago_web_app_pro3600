import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
    constructor (private _authService: AuthService, private _router: Router){}

    canActivate(): boolean {
        if (this._authService.loggedIn())
            return (false);
        else
        {
            return (true);
        }
  }
  
/*--------------------------------------------------
  Fonction: "canActivate";
  @auteur: Lorenzo NADAL SANTA;
Retourne true si l'utilisateur n'est pas connecte;

Cette fonction permet a l'utilisateur qui est deja
connecte de ne pas avoir acces a l'interface de 
connexion;
--------------------------------------------------*/
}
