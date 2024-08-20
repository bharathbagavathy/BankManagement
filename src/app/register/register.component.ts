import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registrationError: string = '';
  registrationSuccess: string = '';

  registerData={
    username:  '',
    name:'',
    password:  '',
    confirmPassword: '',
    role:''
  }
  

  constructor(private userService:UserService){}
  
  onSubmit() {
    console.log('Register button clicked');
    console.log('Register Data:', this.registerData);
    
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.registrationError = "Passwords do not match";
      alert(this.registrationError);
      return;
    }

    this.userService.registerUser(this.registerData).subscribe({
      next: (response) => {
        this.registrationSuccess = "Registration successful!";
        this.registrationError = '';
        
      },
      error: (error) => {
        this.registrationError = "Registration failed. Please try again.";
        this.registrationSuccess = '';
        console.error(error); 
      }
    });
  }
}
