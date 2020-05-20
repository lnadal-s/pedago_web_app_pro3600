import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
    constructor (private _authService: AuthService, private _router: Router) {}

    canActivate() : boolean {
        if (this._authService.loggedIn())
        {
            return true;
        }
        else
        {
            this._router.navigate(['login']);
            return false;
        }
    }
/*--------------------------------------------------
    Fonction: "canActivate";
    @auteur: Lorenzo NADAL SANTA;
Retourne true si l'utilisateur est bien connecte
sinon il redirige l'utilisateur vers l'interface de
connexion;
--------------------------------------------------*/
}
