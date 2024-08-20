import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:5104/api'; ;  // Replace with your actual backend API URL

  constructor(private http: HttpClient) { }

  depositamount(cardNo: number, pin: number, cvv: number, expiryDate: string, accountNumber: string, depositAmount: number): Observable<any> {
    const url = `${this.baseUrl}/Deposit/${cardNo}`;
    const body = {
      accountNo: accountNumber,
      pin: pin,
      cvv: cvv,
      expiryDate: expiryDate,
      depositAmount: depositAmount
    };
    
    return this.http.post(url, body, this.getHttpOptions());
  }

  withdrawamount(cardNo: number, pin: number, cvv: number, expiryDate: string, accountNumber: string, withdrawAmount: number): Observable<any> {
    const url = `${this.baseUrl}/Withdraw/${cardNo}`;
    const body = {
      accountNo: accountNumber,
      pin: pin,
      cvv: cvv,
      expiryDate: expiryDate,
      withdrawAmount: withdrawAmount
    };
    
    return this.http.post(url, body, this.getHttpOptions());
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Assuming you're using a JWT for authentication
      })
    };
  }
}
