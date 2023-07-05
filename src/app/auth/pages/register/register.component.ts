import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerFormGroup = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(public authService: AuthService, private router: Router, public toastr: ToastrService){}
  register(){
    const {userName, password} = this.registerFormGroup.value
    this.authService.register(this.registerFormGroup.value)
    .subscribe(res => {
      if(res) {
        this.router.navigate(['/login']);
        this.toastr.success('Nice', 'User created');
        return
      }
    },(error) => {
      let message = error.error[0]?.description ? error.error[0]?.description : error.error.title 
      console.log(error)
      switch (error.status) {
        case 400:
          this.toastr.warning(message, '!Ooppss!');
          break;
        case 403:
          this.toastr.warning( 'Some fields are invalid!', 'Ooppss!');
          break;
      }
    })

     }
}
