import { Component  } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

    pwd_change: boolean = false;
    photo_upload: boolean = false;

    selectedFile: File;
    user: User;
    
    constructor(private _settingsService: SettingsService, private _authService: AuthService) { }

    ngOnInit(): void {
      this._authService.get_data().subscribe(
          (res) => 
          {
              console.log(res);
              this.user = res[0];
          }, 
          err => console.log(err)
      )
  }

    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      //>var fileName = this.selectedFile.name;
      //var infoArea = document.getElementById( 'myFile' );
      //infoArea.textContent = 'File name: ' + fileName; 
      var fullpath = this.selectedFile.name;
  var backslash = fullpath.lastIndexOf("\\");
  var filename = fullpath.substr(backslash+1);

  var confirm_message = confirm("Files selected for import are \n Zip File: "+filename+"\n\nDo you want to proceed?");
  if (confirm_message == false) {
    return false;
 } else {
   return true;
 }
    }
    
    onSubmit(f: NgForm)
    {
      if (!f.valid)
      {
          console.log("Mauvais Pwd");
      }
      else
      {
        this._settingsService.changePassword(f.value.oldpassword, f.value.password)
          .subscribe(err => 
            {
              console.log("err");
              console.log(err);
            },
            res => {
              this.pwd_change = true;
              console.log("res");
              console.log(res);
            }
            );
      }
    }

    onUpload() {
      
      const uploadData = new FormData();
      uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
      this._settingsService.upload_img(uploadData)
        .subscribe(err => 
          {
            console.log("err");
            console.log(err);
          },
          res => {
            this.photo_upload = true;
            console.log("res");
            console.log(res);
          }
    );
    }
}