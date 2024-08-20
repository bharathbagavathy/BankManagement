import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl =  'http://localhost:5104/api/User/Register';
  private loginUrl = 'http://localhost:5104/api/User/login';

  private role: string = '';

  constructor(private http: HttpClient) {}

  registerUser(registerData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.apiUrl, registerData,{headers});
  }
  
  loginUser(loginData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.loginUrl, loginData,{headers})
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token); // Store the token
          this.role = response.result.user.role; // Store the role
        })
      );
  }

  
  getRole(): string {
    return this.role;
  }

  isManager(): boolean {
    return this.role === 'Manager';
  }

  isCustomer(): boolean {
    return this.role === 'Customer';
  }

}
