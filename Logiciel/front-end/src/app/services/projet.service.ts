import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

    private _urlProjRegister = "http://localhost:3000/api/projets/sub/";
    private _urlUnRegister = "http://localhost:3000/api/projets/sub/";
    private _urlgetproj= "http://localhost:3000/api/projets/";
    private _urlUploadProjet = 'http://localhost:3000/projet/upload_projet/';
    private _urlGetHistorique = "http://localhost:3000/projet/historique/"
    private _urlGetData = "http://localhost:3000/api/projets/stats/";
    constructor(private http: HttpClient) { }
    
    get_projet(id: string)
    {
        return this.http.get<any>(this._urlgetproj + id);
    }

    get_project()
    {
        return this.http.get<any>(this._urlgetproj)
    };

    get_registered(id_proj: number)
    {
        return this.http.put<any>(this._urlProjRegister + id_proj, {"idprojets": id_proj, "note": null})
    };

    get_unregistered(id_proj: number)
    {
        return this.http.delete<any>(this._urlUnRegister + id_proj);
    };

    upload_projet(file, idprojet: number)
    {
        return this.http.post<any>(this._urlUploadProjet + idprojet, file);
    }

    get_historique(idprojet: number)
    {
        return this.http.get<any>(this._urlGetHistorique + idprojet)
    }

    get_stats(idprojet: number, tentative: number)
    {
        return this.http.get<any>(this._urlGetData + idprojet + "/" + tentative);
    }
}