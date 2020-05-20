import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private _registerUrl = "http://localhost:3000/api/register";
    private _loginUrl = "http://localhost:3000/api/login";
    private _urlDataUser = "http://localhost:3000/api/user";

    cachedValued: Array<{
        [query: string]: User
    }> = [];

    constructor(private http: HttpClient, private router: Router) { }

    registerUser(user) {
        return this.http.post<any>(this._registerUrl, user)
    }

    /*--------------------------------------------------
    Fonction: "registerUser(user)";
    @auteur: Lorenzo NADAL SANTA;
    
    - cette fonction fait une requete http vers le back-end
    en envoyant dans le body les donnees saisies par
    l'utilisateur dans le formulaire et retourne un observable;
    --------------------------------------------------*/

    loginUser(user)
    {
        return this.http.post<any>(this._loginUrl, user);
    }

    /*--------------------------------------------------
    Fonction: "loginUser(user)";
    @auteur: Lorenzo NADAL SANTA;
    
    - cette fonction fait une requete http vers le back-end
    en envoyant dans le body les donnees saisies par
    l'utilisateur dans le formulaire et retourne un observable;
    --------------------------------------------------*/

    loggedIn()
    {
        return !!localStorage.getItem('token');
    }

    /*--------------------------------------------------
    Fonction: "loggedIn()";
    @auteur: Lorenzo NADAL SANTA;
    
    - cette fonction verifie si l'utilisateur est bien
    authentifie en faisant une requete au back-end qui
    verifie si le token dans la requete est conforme a
    ceux delivres;
    le token est ajoute dans la requete par le biais du
    token-interceptor;
    --------------------------------------------------*/

    logoutUser()
    {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    /*--------------------------------------------------
    Fonction: "getToken()";
    @auteur: Lorenzo NADAL SANTA;
    
    - cette fonction supprinne le Token qui donne l'acces
    a la plateforme et redirige l'utilisateur vers
    l'interface de connexion;
    --------------------------------------------------*/

    getToken()
    {
        return localStorage.getItem('token');
    }
    
    /*--------------------------------------------------
    Fonction: "getToken()";
    @auteur: Lorenzo NADAL SANTA;
    
    - retourne le token stocker dans le localstorage;
    - cette fonction est utilise dans le service
    token-interceptor
    --------------------------------------------------*/

    get_data = () =>
    {
        return this.http.get(this._urlDataUser);

    }
/*--------------------------------------------------
    Fonction: "get_data = ()";
    @auteur: Lorenzo NADAL SANTA;
    retourne un observable sur la requete http qui
    demande les donnnees de l'utilisateur connecte
--------------------------------------------------*/

}
