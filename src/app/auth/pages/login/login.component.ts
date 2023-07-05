import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(public authService: AuthService, private router: Router, public toastr: ToastrService){}
  
   login(){
    const {userName, password} = this.loginFormGroup.value
    this.authService.login(userName, password)
    .subscribe(res => {
      if(res.token) {
        this.router.navigate(['/']);
        this.toastr.success('Nice to see you!', 'Welcome!');
      }
    },(error) => {
      switch (error.status) {
        case 400:
          this.toastr.warning('Invalid credentials!', '!Ooppss!');
          break;
        case 403:
          this.toastr.warning('Invalid credentials!','Ooppss!');
          break;
      }
    })

     }
}
