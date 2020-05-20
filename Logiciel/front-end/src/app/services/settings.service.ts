import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private http: HttpClient) { }
  private url_img = 'http://localhost:3000/settings/upload_img';
  private url_pwd = "http://localhost:3000/settings/update_pwd";

changePassword(oldpwd, newpwd)
{
  let obj = {
    "oldpwd" : oldpwd,
    "newpwd" : newpwd
  }
  return this.http.post<any>(this.url_pwd, obj)
}
  upload_img(img)
  {
    return this.http.post<any>(this.url_img, img);
  }
}