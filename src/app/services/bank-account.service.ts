import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  private accountsURL = 'http://localhost:5104/api/BankAPI'; 

  constructor(private http: HttpClient) { }

  CreateAccount(accountData: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.accountsURL}/CreateAccount`, accountData);
  }

  UpdateAccount(accountNo: string, accountData: any): Observable<ApiResponse<any>> {
  return this.http.post<ApiResponse<any>>(`${this.accountsURL}/${accountNo}`, accountData);
  }


  GetAccounts(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.accountsURL}/GetAccountDetails`);
  }
  
  GetAccount(accountId: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.accountsURL}/${accountId}`);
  }

  DeleteAccount(accountId: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.accountsURL}/${accountId}`);
  }
}
