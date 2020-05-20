import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.css']
})
export class DataUserComponent implements OnInit {
    user: User;

    constructor(private _authService: AuthService) {
    }
    
    ngOnInit(): void {
        this._authService.get_data().subscribe(
            res => 
            {
                this.user = res[0];
                if (this.user.exp > 100)
                {
                    this.user.level = Math.trunc(this.user.exp / 100);
                    this.user.exp = this.user.exp - this.user.level * 100;
                }
                else
                {
                    this.user.level = 0;
                }
                if (this.user.urlimg == null)
                {
                    this.user.urlimg = "http://localhost:3000/api/photos/default.png";
                }
                else
                {
                    this.user.urlimg = "http://localhost:3000/api/photos/" + this.user.urlimg;
                }
            }, 
            err => console.log(err)
        )
    }

    /*--------------------------------------------------
    Fonction: "ngOnInit()";
      @auteur: Lorenzo NADAL SANTA;
    
    retourne 
    --------------------------------------------------*/
    
}