import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData={ 
    username: '',
    password: ''
  }
  constructor(private userService:UserService, private router:Router){}
  onSubmit() {
    this.userService.loginUser(this.loginData).subscribe(
      response => {
        //sessionStorage.setItem('accountNumber', response.result.accountNumber);

        if (this.userService.isManager()) {
          this.router.navigate(['/manager-dashboard']);
        } else if (this.userService.isCustomer()) {
          this.router.navigate(['/customer-dashboard']);
        } else {
          alert("Unknown role");
        }
      },
      error => {
        alert('Invalid username or password');
      }
    );
  }
}